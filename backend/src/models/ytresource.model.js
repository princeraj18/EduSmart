import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,

    category: {
      type: String,
      enum: ["frontend", "backend", "dsa", "devops", "fullstack"],
      required: true,
    },

    level: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      default: "beginner",
    },

    type: {
      type: String,
      enum: ["video", "playlist"],
      default: "playlist",
    },

    youtubeUrl: {
      type: String,
      required: true,
    },

    playlistId: String,

    thumbnailUrl: String,
    thumbnailPublicId: String,

    createdBy: {
      type: String, // admin id or name
    },
  },
  { timestamps: true }
);

export default mongoose.model('YtResource', resourceSchema);