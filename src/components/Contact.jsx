import React, { useState } from 'react'
import useReveal from '../hooks/useReveal'

// Put your Web3Forms key in a Vite env var named VITE_WEB3FORMS_KEY
// Example: create a .env file with
// VITE_WEB3FORMS_KEY=your_web3forms_key_here
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY || 'YOUR_WEB3FORMS_KEY'

const Contact = () => {
  const [ref, visible] = useReveal(0.12)
  const [status, setStatus] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus(null)
    setSubmitting(true)

    try {
      // Build form data
      const form = e.target
      const formData = new FormData(form)
      // Add Web3Forms access key and a subject
      formData.append('access_key', WEB3FORMS_KEY)
      formData.append('subject', 'New portfolio enquiry')

      // If the developer left the placeholder key, don't attempt remote submit
      if (!WEB3FORMS_KEY || WEB3FORMS_KEY === 'YOUR_WEB3FORMS_KEY') {
        // Local fallback for development
        setStatus('Thanks — I will get back to you soon! (local preview)')
        form.reset()
        return
      }

      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      })

      const json = await res.json()
      if (json.success) {
        setStatus('Thanks — I will get back to you soon!')
        form.reset()
      } else {
        console.error('Web3Forms response error', json)
        setStatus('Something went wrong while sending your message. Please try again or email me directly.')
      }
    } catch (err) {
      console.error('Contact submit error', err)
      setStatus('Unable to send message right now. Please email me directly.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="contact" ref={ref} className={`relative py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-white via-blue-50/30 to-white overflow-hidden ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'} transition-all duration-700`}>
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-purple-200/20 to-pink-200/20 rounded-full blur-3xl -ml-32 -mb-32"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Header */}
        <div className={`text-center mb-12 sm:mb-16 ${visible ? 'fade-in-scale' : 'opacity-0'}`}>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[color:var(--color-heading)] mb-4">
            Get In Touch
          </h2>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="hidden sm:block w-16 lg:w-24 accent-line"></div>
            <div className="w-2 h-2 rounded-full bg-[color:var(--color-accent)]"></div>
            <div className="hidden sm:block w-16 lg:w-24 accent-line"></div>
          </div>
          <p className="text-lg sm:text-xl text-[color:var(--color-muted)] max-w-2xl mx-auto">
            Got a project or opportunity? I'd love to hear from you. Send me a message and I'll reply as soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <div className={`bg-white rounded-2xl shadow-xl p-8 sm:p-10 border border-gray-100 ${visible ? 'fade-in-scale stagger-1' : 'opacity-0'}`}>
            <h3 className="text-2xl font-semibold text-[color:var(--color-heading)] mb-6">Send a Message</h3>
            <form onSubmit={handleSubmit} aria-describedby="contact-status">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[color:var(--color-heading)] mb-2">
                    Name
                  </label>
                  <input 
                    id="name"
                    name="name" 
                    required 
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[color:var(--color-accent)] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-accent)]/20 transition-all duration-300 hover:border-gray-300 bg-gray-50 focus:bg-white" 
                    placeholder="Your name" 
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[color:var(--color-heading)] mb-2">
                    Email
                  </label>
                  <input 
                    id="email"
                    name="email" 
                    type="email" 
                    required 
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[color:var(--color-accent)] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-accent)]/20 transition-all duration-300 hover:border-gray-300 bg-gray-50 focus:bg-white" 
                    placeholder="you@example.com" 
                  />
                </div>
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-[color:var(--color-heading)] mb-2">
                  Message
                </label>
                <textarea 
                  id="message"
                  name="message" 
                  required 
                  rows="6" 
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[color:var(--color-accent)] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-accent)]/20 transition-all duration-300 hover:border-gray-300 resize-none bg-gray-50 focus:bg-white" 
                  placeholder="Tell me about your project..."
                ></textarea>
              </div>
              <button 
                type="submit" 
                disabled={submitting} 
                className={`w-full px-8 py-4 rounded-xl cursor-pointer text-white font-semibold hover:shadow-xl transition-all duration-300 transform hover-lift ${
                  submitting 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-[color:var(--color-primary)] to-[color:var(--color-accent)] hover:from-[color:var(--color-primary)]/90 hover:to-[color:var(--color-accent)]/90 hover:-translate-y-1 hover:scale-105'
                }`}
              >
                {submitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  'Send Message'
                )}
              </button>
              <div id="contact-status" className="mt-4 text-sm text-center" aria-live="polite">
                {status && (
                  <div className={`p-4 rounded-xl ${status.includes('Thanks') ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                    {status}
                  </div>
                )}
              </div>
            </form>
          </div>

          {/* Contact Info */}
          <div className={`space-y-8 ${visible ? 'fade-in-scale stagger-2' : 'opacity-0'}`}>
            <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-10 border border-gray-100 text-left">
              <h3 className="text-2xl font-semibold text-[color:var(--color-heading)] mb-6 text-left">Let's Connect</h3>
              <p className="text-[color:var(--color-muted)] mb-8 leading-relaxed text-left">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Feel free to reach out through any of these channels.
              </p>
              
              <div className="space-y-4">
                <a 
                  href="mailto:krinakhunt12@gmail.com" 
                  className="flex items-center gap-4 p-4 rounded-xl border-2 border-gray-200 hover:border-[color:var(--color-accent)] hover:bg-[color:var(--color-accent)]/5 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-[color:var(--color-accent)] group-hover:scale-110 transition-all duration-300">
                    <svg className="w-6 h-6 text-[color:var(--color-accent)] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-[color:var(--color-heading)]">Email</div>
                    <div className="text-sm text-[color:var(--color-muted)]">krinakhunt12@gmail.com</div>
                  </div>
                </a>

                <a 
                  href="https://www.linkedin.com/in/krina-khunt-232732267" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl border-2 border-gray-200 hover:border-[color:var(--color-accent)] hover:bg-[color:var(--color-accent)]/5 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-[color:var(--color-accent)] group-hover:scale-110 transition-all duration-300">
                    <svg className="w-6 h-6 text-[color:var(--color-accent)] group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5.001 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.78v1.61h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.66 4.78 6.11V21H17v-5.2c0-1.24-.02-2.83-1.73-2.83-1.73 0-1.99 1.35-1.99 2.75V21H9z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-[color:var(--color-heading)]">LinkedIn</div>
                    <div className="text-sm text-[color:var(--color-muted)]">Connect with me</div>
                  </div>
                </a>

                <a 
                  href="https://github.com/krinakhunt12" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl border-2 border-gray-200 hover:border-[color:var(--color-accent)] hover:bg-[color:var(--color-accent)]/5 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-[color:var(--color-accent)] group-hover:scale-110 transition-all duration-300">
                    <svg className="w-6 h-6 text-[color:var(--color-accent)] group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.09 3.29 9.41 7.86 10.94.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.36-1.3-1.72-1.3-1.72-1.06-.72.08-.71.08-.71 1.18.08 1.8 1.21 1.8 1.21 1.04 1.78 2.73 1.27 3.4.97.11-.75.41-1.27.74-1.56-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 2.87-.39c.97 0 1.95.13 2.87.39 2.19-1.49 3.15-1.18 3.15-1.18.62 1.58.23 2.75.11 3.04.73.81 1.18 1.84 1.18 3.1 0 4.42-2.7 5.39-5.27 5.67.42.36.8 1.08.8 2.18 0 1.57-.01 2.83-.01 3.22 0 .31.21.68.8.56C20.71 21.41 24 17.09 24 12c0-6.27-5.23-11.5-12-11.5z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-[color:var(--color-heading)]">GitHub</div>
                    <div className="text-sm text-[color:var(--color-muted)]">View my projects</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
