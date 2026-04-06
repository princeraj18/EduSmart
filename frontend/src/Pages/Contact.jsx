import React, { useState } from 'react'
import { Mail, Phone, MapPin, Send, Handshake } from 'lucide-react'
import { createSupportApi } from '@/Api/support.api'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'

const Contact = () => {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', subject: '', message: '' })

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await createSupportApi({
        name: `${form.firstName} ${form.lastName}`.trim(),
        email: form.email,
        subject: form.subject,
        message: form.message,
      })
      alert('Thanks, your message was sent. We will get back to you shortly.')
      setForm({ firstName: '', lastName: '', email: '', phone: '', subject: '', message: '' })
    } catch (err) {
      console.error(err)
      alert('Failed to send message, please try again later.')
    }
  }

  return (
    <div className='page-container page-surface'>
      <section data-animate='hero' className='glass-panel rounded-[38px] p-8 md:p-12'>
        <div className='editorial-label'>Contact</div>
        <h1 data-hero-line className='mt-5 text-5xl font-black md:text-7xl'>Talk to the team behind your learning experience.</h1>
        <p data-hero-line className='mt-5 max-w-3xl text-lg leading-8 text-[var(--muted-foreground)]'>
          Questions, support requests, and collaboration ideas are all welcome. We redesigned this page to feel as inviting as the platform itself.
        </p>
      </section>

      <div data-animate='stagger' className='mt-10 grid gap-5 md:grid-cols-4'>
        {[
          [Mail, 'Email Us', 'support@edupath.com'],
          [Phone, 'Call Us', '+1 (555) 123-4567'],
          [MapPin, 'Visit Us', '123 Education Street, Learning City'],
          [Handshake, 'Support Hours', 'Customer support 24x7'],
        ].map(([Icon, title, value]) => (
          <div key={title} className='feature-card-shell rounded-[28px] p-6 text-center'>
            <div className='mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#133a5e] text-white'>
              <Icon className='h-5 w-5' />
            </div>
            <h3 className='text-xl font-bold'>{title}</h3>
            <p className='mt-3 text-[var(--muted-foreground)]'>{value}</p>
          </div>
        ))}
      </div>

      <section data-animate='zoom' className='feature-card-shell mt-10 rounded-[34px] p-6 md:p-8'>
        <h2 className='text-3xl font-black'>Send us a message</h2>
        <p className='mt-2 text-[var(--muted-foreground)]'>Fill out the form below and our team will get back to you shortly.</p>

        <form onSubmit={handleSubmit} className='mt-6 grid grid-cols-1 gap-4 md:grid-cols-2'>
          {[
            ['firstName', 'First Name', 'John'],
            ['lastName', 'Last Name', 'Doe'],
            ['email', 'Email Address', 'john@example.com'],
            ['phone', 'Phone Number', '+1 (555) 000-0000'],
          ].map(([name, label, placeholder]) => (
            <div key={name}>
              <label className='mb-2 block text-sm font-semibold text-[var(--foreground)]'>{label}</label>
              <input
                type={name === 'email' ? 'email' : 'text'}
                name={name}
                value={form[name]}
                onChange={handleChange}
                placeholder={placeholder}
                className='w-full rounded-2xl border border-[var(--border)] bg-white/70 px-4 py-3 text-[var(--foreground)] outline-none ring-0 transition focus:border-[#178582]'
              />
            </div>
          ))}

          <div className='md:col-span-2'>
            <label className='mb-2 block text-sm font-semibold text-[var(--foreground)]'>Subject</label>
            <input name='subject' value={form.subject} onChange={handleChange} placeholder='How can we help you?' className='w-full rounded-2xl border border-[var(--border)] bg-white/70 px-4 py-3 text-[var(--foreground)] outline-none transition focus:border-[#178582]' />
          </div>

          <div className='md:col-span-2'>
            <label className='mb-2 block text-sm font-semibold text-[var(--foreground)]'>Message</label>
            <textarea name='message' value={form.message} onChange={handleChange} rows={6} placeholder='Tell us more about your request...' className='w-full rounded-3xl border border-[var(--border)] bg-white/70 px-4 py-3 text-[var(--foreground)] outline-none transition focus:border-[#178582]' />
          </div>

          <div className='md:col-span-2 flex justify-end'>
            <button type='submit' className='brand-button inline-flex items-center gap-2'>
              <Send className='h-4 w-4' />
              Send Message
            </button>
          </div>
        </form>
      </section>

      <section data-animate='fade' className='mt-10'>
        <h3 className='text-2xl font-black text-[var(--foreground)]'>Frequently asked questions</h3>
        <Accordion type='single' collapsible className='mt-5 space-y-3'>
          <AccordionItem value='q1' className='feature-card-shell rounded-[24px] border-none px-5'>
            <AccordionTrigger>How long does it take to get a response?</AccordionTrigger>
            <AccordionContent>We typically respond within 24 hours during business days.</AccordionContent>
          </AccordionItem>
          <AccordionItem value='q2' className='feature-card-shell rounded-[24px] border-none px-5'>
            <AccordionTrigger>Can I schedule a call with your team?</AccordionTrigger>
            <AccordionContent>Yes, mention your preferred time in the message and we will coordinate with you.</AccordionContent>
          </AccordionItem>
          <AccordionItem value='q3' className='feature-card-shell rounded-[24px] border-none px-5'>
            <AccordionTrigger>Do you offer support in other languages?</AccordionTrigger>
            <AccordionContent>We currently provide support in English, Spanish, and French.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
    </div>
  )
}

export default Contact
