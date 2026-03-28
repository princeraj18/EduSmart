import React from 'react'
import './pages.css'

const Terms = () => {
  return (
    <div className="page-container text-black">
      <section className="hero">
        <div>
          <h1>Terms & Conditions</h1>
          <p>Please read these terms carefully before using our platform.</p>
        </div>
      </section>

      <div className="card" style={{marginTop:16}}>
        <h3>1. Acceptance</h3>
        <p>By using EduPath you agree to these terms. If you do not agree, do not use the service.</p>

        <h3>2. Content</h3>
        <p>All course content is provided by instructors. We strive for accuracy but disclaim warranties.</p>

        <h3>3. Payments</h3>
        <p>Payments are processed via our payment provider and are subject to their terms.</p>

        <h3>4. Refunds</h3>
        <p>Refund eligibility is described on the purchase page and in the payment policy.</p>

        <h3>5. Contact</h3>
        <p>Questions about these terms can be sent to support@edupath.example</p>
      </div>
    </div>
  )
}

export default Terms
