import React, { useState } from 'react'
import './pages.css'
import { Mail, Phone, MapPin, Clock, Send, Handshake } from 'lucide-react'
import { createSupportApi } from '@/Api/support.api'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'

const Contact = () => {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', subject: '', message: '' })

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const payload = {
        name: `${form.firstName} ${form.lastName}`.trim(),
        email: form.email,
        subject: form.subject,
        message: form.message
      }

      await createSupportApi(payload)
      alert('Thanks — your message was sent. We will get back to you shortly.')
      setForm({ firstName: '', lastName: '', email: '', phone: '', subject: '', message: '' })
    } catch (err) {
      console.error(err)
      alert('Failed to send message — please try again later.')
    }
  }

  return (
    <div className="page-container">
      {/* Hero */}
      <section className="mb-8">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 px-6 rounded-xl text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold">Get In Touch</h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-[var(--muted-foreground)]">Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
        </div>
      </section>

      {/* Contact cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="card flex flex-col items-center text-center p-6">
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
            <Mail className="text-blue-600 w-6 h-6" />
          </div>
          <h4 className="font-semibold text-lg">Email Us</h4>
<a
  href="https://mail.google.com/mail/?view=cm&fs=1&to=support@edupath.com"
  target="_blank"
  rel="noopener noreferrer"
  className="text-blue-600 hover:underline"
>
  support@edupath.com
</a>        </div>

        <div className="card flex flex-col items-center text-center p-6">
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
            <Phone className="text-blue-600 w-6 h-6" />
          </div>
          <h4 className="font-semibold text-lg">Call Us</h4>
          <a href="tel:+15551234567" className="text-blue-600 mt-2">+1 (555) 123-4567</a>
        </div>

        <div className="card flex flex-col items-center text-center p-6">
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
            <MapPin className="text-blue-600 w-6 h-6" />
          </div>
          <h4 className="font-semibold text-lg">Visit Us</h4>
          <p className="text-blue-600 mt-2">123 Education Street, Learning City</p>
        </div>

        <div className="card flex flex-col items-center text-center p-6">
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
            
            <Handshake className="text-blue-600 w-6 h-6"/>
          </div>
          <h4 className="font-semibold text-lg">Business Hours</h4>
          <p className="mt-2 text-[var(--muted-foreground)] text-blue-600">Customer support<br/>24x7</p>
        </div>
      </div>

      {/* Message form */}
      <section className="mb-10">
        <h2 className="text-3xl font-extrabold text-center mb-2">Send Us a Message</h2>
        <p className="text-center text-[var(--muted-foreground)] mb-6">Fill out the form below and our team will get back to you shortly</p>

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md max-w-5xl mx-auto">
          <div className="grid text-black grid-cols-1 md:grid-cols-2 gap-4">
            <div >
              <label className="block text-sm font-medium text-black mb-1">First Name *</label>
              <input name="firstName" value={form.firstName} onChange={handleChange} className="w-full px-4 py-3 rounded-lg bg-gray-300 border border-gray-200" placeholder="John" />
            </div>

            <div>
              <label className="block text-black text-sm font-medium mb-1">Last Name *</label>
              <input name="lastName" value={form.lastName} onChange={handleChange} className="w-full px-4 py-3 rounded-lg bg-gray-300 border border-gray-200" placeholder="Doe" />
            </div>

            <div>
              <label className="block text-black text-sm font-medium mb-1">Email Address *</label>
<input 
    type="email" 
    id="email"
    name="email" 
    value={form.email} 
    onChange={handleChange} 
    required
    autoComplete="email"
    className="w-full px-4 py-3 rounded-lg bg-gray-300 border border-gray-200 text-black focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-colors" 
    placeholder="john@example.com" 
  />   </div>

            <div>
              <label className="block text-black text-sm font-medium mb-1">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-300 border text-black border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                placeholder="+1 (555) 000-0000"
                aria-label="Phone Number"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-black text-sm font-medium mb-1">Subject *</label>
              <input name="subject" value={form.subject} onChange={handleChange} className="w-full px-4 py-3 rounded-lg bg-gray-300 border border-gray-200" placeholder="How can we help you?" />
            </div>

            <div className="md:col-span-2">
              <label className="block text-black text-sm font-medium mb-1">Message *</label>
              <textarea name="message" value={form.message} onChange={handleChange} rows={6} className="w-full px-4 py-3 rounded-lg bg-gray-300 border border-gray-200" placeholder="Tell us more about your inquiry..."></textarea>
            </div>

            <div className="md:col-span-2 text-right">
              <button type="submit" className="btn inline-flex items-center gap-2">
                <Send className="w-4 h-4" />
                Send Message
              </button>
            </div>
          </div>
        </form>
      </section>

      {/* FAQ */}
      <section className="max-w-5xl text-black mx-auto mb-10">
        <h3 className="text-2xl text-white font-bold mb-4">Frequently Asked Questions</h3>
        <Accordion type="single" collapsible className="space-y-3">
          <AccordionItem value="q1" className="bg-blue-400 rounded-xl p-4 shadow-sm">
            <AccordionTrigger>How long does it take to get a response?</AccordionTrigger>
            <AccordionContent>
              We typically respond to all inquiries within 24 hours during business days. For urgent matters, please call our support line.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="q2" className="bg-blue-400 rounded-xl p-4 shadow-sm">
            <AccordionTrigger>Can I schedule a call with your team?</AccordionTrigger>
            <AccordionContent>
              Yes — please mention your preferred time in the message, and we'll arrange a call that works for both parties.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="q3" className="bg-blue-400 rounded-xl p-4 shadow-sm">
            <AccordionTrigger>Do you offer support in other languages?</AccordionTrigger>
            <AccordionContent>
              Currently, we provide support in English, Spanish, and French. Please specify your preferred language in your message.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* Map placeholder */}
      <section className="mb-16">
        <h3 className="text-2xl text-center font-bold mb-4">Our Location</h3>
        <div className="bg-gray-100 rounded-xl h-56 flex items-center justify-center">
          <div className="text-center text-[var(--muted-foreground)]">
            <MapPin className="mx-auto w-8 h-8 mb-2 text-[var(--muted-foreground)]" />
            <p className="font-medium">Map integration placeholder</p>
            <p className="text-sm">123 Education Street, Learning City, ED 12345</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
