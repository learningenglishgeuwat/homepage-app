'use client'

import React, { useState, useEffect } from 'react'
import { User, Mail, Phone, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import AmbientBg from '../components/ui/AmbientBg'
import GridOverlay from '../components/ui/GridOverlay'
import TermsModal from './components/TermsModal'
import { registerUser } from '../../lib/register'

interface FormData {
  fullName: string
  email: string
  whatsapp: string
  referral: string
  agreeTerms: boolean
}

export default function RegisterPage() {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    whatsapp: '',
    referral: '',
    agreeTerms: false
  })

  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [showTermsModal, setShowTermsModal] = useState(false)

  // Get referral code from URL if exists
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const ref = urlParams.get('ref')
    
    if (ref) {
      setFormData(prev => ({ ...prev, referral: ref }))
    }
  }, [])

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Nama lengkap wajib diisi'
    } else if (formData.fullName.length < 3) {
      newErrors.fullName = 'Nama lengkap minimal 3 karakter'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email wajib diisi'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Format email tidak valid'
    }

    if (!formData.whatsapp.trim()) {
      newErrors.whatsapp = 'Nomor WhatsApp wajib diisi'
    } else if (!/^[0-9+\-\s()]+$/.test(formData.whatsapp)) {
      newErrors.whatsapp = 'Format nomor WhatsApp tidak valid'
    }

    
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = true
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      // Send registration to WhatsApp
      const result = await registerUser({
        fullname: formData.fullName,
        email: formData.email,
        whatsapp: formData.whatsapp,
        referral: formData.referral || undefined
      })

      if (result.success) {
        setSubmitSuccess(true)
      } else {
        setErrors({ email: result.error || 'Pendaftaran gagal. Silakan coba lagi.' })
      }
    } catch (error) {
      console.error('Registration error:', error)
      setErrors({ email: 'Terjadi kesalahan saat pendaftaran. Silakan coba lagi.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    
    // Clear error for this field
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }))
    }
  }

  if (submitSuccess) {
    return (
      <>
        <AmbientBg />
        <GridOverlay />
        <div className="min-h-screen flex items-center justify-center relative z-10">
          <div className="container">
            <div className="max-w-md w-full mx-auto glass-card rounded-2xl p-4 sm:p-6 md:p-8 text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'var(--glow-green)' }}>
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">Pendaftaran Berhasil!</h2>
              <p className="text-gray-300 mb-6">
                Data pendaftaran Anda telah dikirim ke WhatsApp admin. Kami akan segera menghubungi Anda untuk proses selanjutnya.
              </p>
              <div className="space-y-3">
                <button
                  onClick={() => window.location.href = '/'}
                  className="w-full py-3 rounded-lg font-medium transition-colors"
                  style={{
                    background: 'var(--primary)',
                    color: 'var(--dark-1)'
                  }}
                >
                  Kembali ke Beranda
                </button>
                <button
                  onClick={() => window.location.reload()}
                  className="w-full py-3 rounded-lg font-medium transition-colors border"
                  style={{
                    background: 'transparent',
                    borderColor: 'var(--glass-border)',
                    color: 'white'
                  }}
                >
                  Daftar Lagi
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <AmbientBg />
      <GridOverlay />
      <Link href="/" className="back-btn">
        Kembali ke Menu
      </Link>
      <div className="min-h-screen flex items-center justify-center relative z-10">
        <div className="container">
          <div className="max-w-sm w-full mx-auto glass-card rounded-2xl p-3 sm:p-4 md:p-5">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3" style={{ background: 'var(--glow-cyan)' }}>
                <User className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-lg sm:text-xl font-bold text-white mb-1">Form Pendaftaran</h1>
              <p className="text-gray-400 text-xs">Bergabung dengan platform pembelajaran English GEUWAT</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                  Nama Lengkap
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={`w-full pl-9 pr-3 py-2 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-transparent ${
                      errors.fullName ? 'border-red-500' : 'border'
                    }`}
                    style={{
                      background: 'var(--glass-bg)',
                      borderColor: errors.fullName ? '#ef4444' : 'var(--glass-border)'
                    }}
                    placeholder="Masukkan nama lengkap Anda"
                  />
                </div>
                {errors.fullName && (
                  <p className="mt-1 text-sm text-red-400 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.fullName}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                  Alamat Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full pl-9 pr-3 py-2 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-transparent ${
                      errors.email ? 'border-red-500' : 'border'
                    }`}
                    style={{
                      background: 'var(--glass-bg)',
                      borderColor: errors.email ? '#ef4444' : 'var(--glass-border)'
                    }}
                    placeholder="Masukkan email Anda"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-400 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* WhatsApp */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                  Nomor WhatsApp
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="tel"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleInputChange}
                    className={`w-full pl-9 pr-3 py-2 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-transparent ${
                      errors.whatsapp ? 'border-red-500' : 'border'
                    }`}
                    style={{
                      background: 'var(--glass-bg)',
                      borderColor: errors.whatsapp ? '#ef4444' : 'var(--glass-border)'
                    }}
                    placeholder="+62 812-3456-7890"
                  />
                </div>
                {errors.whatsapp && (
                  <p className="mt-1 text-sm text-red-400 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.whatsapp}
                  </p>
                )}
              </div>

              {/* Referral */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                  Kode Referral (Opsional)
                </label>
                <input
                  type="text"
                  name="referral"
                  value={formData.referral}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-transparent border"
                  style={{
                    background: 'var(--glass-bg)',
                    borderColor: 'var(--glass-border)'
                  }}
                  placeholder="Masukkan kode referral"
                />
              </div>

              
              {/* Terms and Privacy */}
              <div className="space-y-3">
                <label className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleInputChange}
                    className="mt-1 w-4 h-4 rounded focus:outline-none focus:ring-2"
                    style={{
                      background: 'var(--glass-bg)',
                      borderColor: 'var(--glass-border)',
                      accentColor: 'var(--primary)'
                    }}
                  />
                  <span className="text-xs sm:text-sm text-gray-300">
                    Saya setuju dengan{' '}
                    <button
                      type="button"
                      onClick={() => setShowTermsModal(true)}
                      className="text-cyan-400 hover:text-cyan-300 underline transition-colors text-xs sm:text-sm"
                    >
                      Ketentuan dan Kebijakan Privasi
                    </button>
                  </span>
                </label>
                {errors.agreeTerms && (
                  <p className="text-xs sm:text-sm text-red-400 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    Anda harus menyetujui ketentuan dan kebijakan
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm"
                style={{
                  background: 'var(--primary)',
                  color: 'var(--dark-1)'
                }}
              >
                {isSubmitting ? 'Membuat Akun...' : 'Daftar'}
              </button>
            </form>

            {/* Login Link */}
            <div className="mt-4 text-center">
              <p className="text-xs sm:text-sm text-gray-400">
                Already have an account?{' '}
                <Link href="https://learningenglishgeuwat.vercel.app" className="font-medium transition-colors text-xs sm:text-sm"
                  style={{ color: 'var(--primary)' }}>
                  Masuk
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Terms and Privacy Modal */}
      <TermsModal isOpen={showTermsModal} onClose={() => setShowTermsModal(false)} />
    </>
  )
}
