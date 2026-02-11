// Simple registration - send to WhatsApp
export async function registerUser(userData: {
  fullname: string
  email: string
  whatsapp: string
  referral?: string
}): Promise<{ success: boolean; error?: string }> {
  try {
    // Format WhatsApp message
    const message = `Hi GEUWAT,\n\n` +
      `*📝 REGISTRASI MEMBER BARU*\n\n` +
      `👤 *Nama:* ${userData.fullname}\n` +
      `📧 *Email:* ${userData.email}\n` +
      `📱 *WhatsApp:* ${userData.whatsapp}\n` +
      `${userData.referral ? `🎁 *Referral:* ${userData.referral}\n` : ''}\n` +
      `*Mohon proses pendaftaran member baru ini.*\n\n` +
      `Terima kasih`

    // WhatsApp admin number (ganti dengan nomor admin)
    const adminPhone = '6285846003119' // Ganti dengan nomor WhatsApp admin
    
    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${adminPhone}?text=${encodeURIComponent(message)}`
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank')
    
    return { success: true }
  } catch (error) {
    return { success: false, error: 'Gagal mengirim pesan WhatsApp' }
  }
}
