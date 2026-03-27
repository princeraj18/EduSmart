import { GoogleGenerativeAI } from "@google/generative-ai";
import { Quiz } from "../models/quiz.model.js";
import { ENV } from "../config/env.js";
import { Questions } from "../models/question.model.js";
import { Modules } from "../models/module.model.js";

const genAi = new GoogleGenerativeAI(ENV.GEMINI_API_KEY);
const model = genAi.getGenerativeModel({ model: "gemini-2.5-flash" });

/* ================= CHECK QUIZ ================= */
export const checkQuiz = async (req, res) => {
  try {
    const moduleId = req.params.id;

    const quiz = await Quiz.findOne({
      userId: req.user._id,
      moduleId,
    });

    return res.status(200).json({
      success: true,
      hasQuiz: !!quiz,
      quiz: quiz || null,
    });
  } catch (error) {
    console.log(error, "from checkQuiz");
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

/* ================= GENERATE QUIZ ================= */
export const generateQuiz = async (req, res) => {
  try {
    const { moduleId, content } = req.body;

    if (!moduleId || !content) {
      return res.status(400).json({
        message: "ModuleId or content is missing",
      });
    }

    const existingQuiz = await Quiz.findOne({
      userId: req.user._id,
      moduleId,
    });

    if (existingQuiz && existingQuiz.questions?.length > 0) {
      return res.status(200).json({
        message: "Quiz already exists for this module",
      });
    }

    const newQuiz = await Quiz.create({
      userId: req.user._id,
      moduleId,
    });

    const prompt = `
Generate 10 technical questions for ${content}.
Each question must be multiple choice with 4 options.

Return ONLY valid JSON in this format:
{
  "questions": [
    {
      "question": "string",
      "options": ["string", "string", "string", "string"],
      "correctOption": "string",
      "explanation": "string"
    }
  ]
}
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    // Clean AI response
    const cleanText = text
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    let parsed;

    try {
      parsed = JSON.parse(cleanText);
    } catch (error) {
      console.log("JSON Parse Error:", cleanText);

      await Quiz.findByIdAndDelete(newQuiz._id);

      return res.status(500).json({
        message: "AI returned invalid JSON format",
      });
    }

    const generatedQuestions = parsed.questions || [];

    if (!Array.isArray(generatedQuestions) || generatedQuestions.length === 0) {
      await Quiz.findByIdAndDelete(newQuiz._id);

      return res.status(500).json({
        message: "No valid questions generated",
      });
    }

    // Validate & prepare data
    const questionDocs = generatedQuestions
      .filter(
        (q) =>
          q.question &&
          Array.isArray(q.options) &&
          q.options.length === 4 &&
          q.correctOption
      )
      .map((q) => ({
        quizId: newQuiz._id,
        content: q.question,
        options: q.options,
        correctOption: q.correctOption,
        explanation: q.explanation || "",
      }));

    if (questionDocs.length === 0) {
      await Quiz.findByIdAndDelete(newQuiz._id);

      return res.status(500).json({
        message: "Invalid question format from AI",
      });
    }

    // 🔥 Fast insert
    const createdQuestions = await Questions.insertMany(questionDocs);

    const ids = createdQuestions.map((q) => q._id);

    await Quiz.findByIdAndUpdate(
      newQuiz._id,
      { $push: { questions: { $each: ids } } },
      { new: true }
    );

    await Modules.findByIdAndUpdate(
      moduleId,
      { quiz: newQuiz._id },
      { new: true }
    );

    return res.status(201).json({
      success: true,
      message: "Quiz generated successfully",
    });
  } catch (error) {
    console.log(error, "from generateQuiz");

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

/* ================= GET QUIZ ================= */
export const getQuiz = async (req, res) => {
  try {
    const quizId = req.params.id;

    if (!quizId) {
      return res.status(400).json({
        message: "Quiz ID is required",
      });
    }

    const quiz = await Quiz.findOne({
      _id: quizId,
      userId: req.user._id,
    }).populate("questions");

    if (!quiz) {
      return res.status(404).json({
        message: "Quiz not found",
      });
    }

    return res.status(200).json({
      success: true,
      quiz,
    });
  } catch (error) {
    console.log(error, "from getQuiz");

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};