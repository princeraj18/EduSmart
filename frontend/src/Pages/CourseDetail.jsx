import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './pages.css'
import { getSingleCourseApi } from '@/Api/course.api'

const CourseDetail = () => {
  const { id } = useParams()
  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!id) return
    setLoading(true)
    getSingleCourseApi(id)
      .then((res) => setCourse(res?.course || res))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <div className="page-container">Loading course…</div>

  if (!course) return <div className="page-container">Course not found.</div>

  return (
    <div className="page-container">
      <div className="card course-hero">
        <h1>{course.title || 'Untitled Course'}</h1>
        <div className="course-meta">
          <div>Instructor: {course.instructor || course.author || 'Unknown'}</div>
          <div>Duration: {course.duration || '—'}</div>
          <div>Price: {course.price ? `$${course.price}` : 'Free'}</div>
        </div>
        <p style={{marginTop:8,color:'#334155'}}>{course.description || 'No description available.'}</p>
      </div>

      <div className="grid" style={{marginTop:20}}>
        <div className="card">
          <h3>What you'll learn</h3>
          <ul>
            {(course?.whatYouWillLearn || course?.outcomes || []).map((t, i) => (
              <li key={i}>{t}</li>
            ))}
            {(!course?.whatYouWillLearn && !course?.outcomes) && <li>Practical skills and projects.</li>}
          </ul>
        </div>

        <div className="card">
          <h3>Curriculum</h3>
          <ol>
            {(course?.modules || course?.sections || []).map((m, i) => (
              <li key={i}>{m.title || m.name || `Module ${i + 1}`}</li>
            ))}
            {(!course?.modules && !course?.sections) && <li>Curriculum details coming soon.</li>}
          </ol>
        </div>
      </div>
    </div>
  )
}

export default CourseDetail
