// src/components/EmailSignup.tsx

import { useState } from 'react'
import { Mail, Check, Loader } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface EmailSignupProps {
  variant?: 'homepage' | 'article' | 'footer'
  title?: string
  description?: string
}

export default function EmailSignup({ 
  variant = 'homepage',
  title,
  description 
}: EmailSignupProps) {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Using Formspree (same as your contact form)
      // TODO: Replace with your actual Formspree endpoint for newsletter
      const response = await fetch('https://formspree.io/f/mnngzrdn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          _subject: 'New European Living Newsletter Signup',
          signup_source: variant,
          message: `Newsletter signup from ${variant} section`
        })
      })

      if (response.ok) {
        setSuccess(true)
        setEmail('')
      } else {
        throw new Error('Failed to subscribe')
      }
    } catch (err) {
      console.error('Signup error:', err)
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Reset success message after 5 seconds
  if (success) {
    setTimeout(() => setSuccess(false), 5000)
  }

  // Different styles based on variant
  const getStyles = () => {
    switch (variant) {
      case 'homepage':
        return {
          container: 'bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-dark)] text-[#f7f7ec] rounded-2xl p-8 shadow-xl',
          input: 'bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20 focus:border-white/40',
          button: 'bg-[var(--brand-gold)] text-[#131312] hover:bg-[var(--brand-button)] font-bold'
        }
      case 'article':
        return {
          container: 'bg-[#f4f5f0] border border-[#9da586]/30 rounded-xl p-6',
          input: 'bg-white border-[#9da586]/40 focus:border-[var(--brand-primary)] text-[#131312]',
          button: 'bg-[var(--brand-primary)] text-white hover:bg-[var(--brand-dark)] font-medium'
        }
      case 'footer':
        return {
          container: 'bg-[#131312] text-[#f4f5f0] rounded-lg p-6',
          input: 'bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-white/40',
          button: 'bg-[var(--brand-button)] text-[#f7f7ec] hover:bg-[#9da586] font-medium'
        }
    }
  }

  const styles = getStyles()

  return (
    <div className={styles.container}>
      <AnimatePresence mode="wait">
        {success ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-center py-4"
          >
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold mb-2">
              🎉 You're In!
            </h3>
            <p className="opacity-90">
              Check your email for your FREE "Weekend Trip Guide" from your base.
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex items-start gap-4 mb-6">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                variant === 'homepage' ? 'bg-white/10' : 
                variant === 'article' ? 'bg-[var(--brand-primary)]/10' : 
                'bg-white/10'
              }`}>
                <Mail className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2">
                  {title || '🗺️ Get Weekend Trip Ideas'}
                </h3>
                <p className="text-lg opacity-90">
                  {description || 'Join military families getting FREE destination guides, travel tips, and phrase lessons every Thursday.'}
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  disabled={loading}
                  className={`flex-1 px-4 py-3 rounded-lg border focus:ring-2 focus:ring-offset-2 focus:outline-none transition-all disabled:opacity-50 ${styles.input}`}
                />
                <button
                  type="submit"
                  disabled={loading}
                  className={`px-8 py-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95 flex items-center justify-center gap-2 whitespace-nowrap ${styles.button}`}
                >
                  {loading ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      Joining...
                    </>
                  ) : (
                    <>
                      Join Free
                      <Mail className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>

              {error && (
                <p className="text-red-400 text-sm">{error}</p>
              )}

              <div className="text-xs flex flex-wrap items-center gap-x-4 gap-y-1 opacity-70">
                <span className="flex items-center gap-1">
                  ✓ No spam, ever
                </span>
                <span className="flex items-center gap-1">
                  ✓ Unsubscribe anytime
                </span>
                <span className="flex items-center gap-1">
                  ✓ Military-focused content
                </span>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Helper components for easy placement
export function EmailSignupHomepage() {
  return (
    <section className="py-16 px-6 bg-[var(--brand-bg)]">
      <div className="max-w-4xl mx-auto">
        <EmailSignup variant="homepage" />
      </div>
    </section>
  )
}

export function EmailSignupArticle() {
  return (
    <div className="my-12">
      <EmailSignup 
        variant="article"
        title="Loved this article?"
        description="Get more travel tips, destination guides, and essential phrases delivered to your inbox every Thursday."
      />
    </div>
  )
}

export function EmailSignupFooter() {
  return (
    <EmailSignup 
      variant="footer"
      title="Stay Connected"
      description="Weekly travel inspiration for military families in Europe."
    />
  )
}
