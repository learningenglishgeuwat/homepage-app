import styles from './TermsModal.module.css'
import { useEffect } from 'react'

interface TermsModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function TermsModal({ isOpen, onClose }: TermsModalProps) {
  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
      document.body.style.top = '0'
      document.body.style.left = '0'
      document.body.style.right = '0'
      document.body.style.bottom = '0'
    } else {
      // Restore body scroll when modal is closed
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.left = ''
      document.body.style.right = ''
      document.body.style.bottom = ''
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.left = ''
      document.body.style.right = ''
      document.body.style.bottom = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-start justify-center p-3 pt-6 z-50" onClick={onClose}>
      <div className={`glass-card rounded-2xl p-3 sm:p-4 max-w-xl w-full h-[66vh] sm:h-[60vh] flex flex-col ${styles.modalScroll}`} style={{ 
          scrollbarWidth: 'thin', 
          scrollbarColor: 'var(--primary) transparent',
          WebkitOverflowScrolling: 'touch'
        } as React.CSSProperties} onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-3 flex-shrink-0">
          <h2 className="text-base sm:text-lg font-bold text-white">Ketentuan dan Kebijakan Privasi</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="space-y-3 text-gray-300 pr-1 flex-1 overflow-y-auto">
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Ketentuan &amp; Kebijakan Privasi GEUWAT</h3>
            <p className="text-sm">
              Dokumen ini menjelaskan ketentuan penggunaan dan kebijakan privasi yang berlaku bagi seluruh pengguna platform GEUWAT.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-2">1. Ketentuan Penggunaan</h3>
            <p className="text-sm mb-3">
              Dengan menggunakan platform GEUWAT, Anda menyetujui ketentuan berikut:
            </p>
            <ul className="list-disc list-inside text-sm mt-2 space-y-1">
              <li>Platform GEUWAT digunakan khusus untuk pembelajaran bahasa Inggris.</li>
              <li>Pengguna bertanggung jawab penuh atas keamanan akun, termasuk email dan kata sandi.</li>
              <li>Satu akun hanya dapat digunakan oleh satu pengguna.</li>
              <li>Pengguna dilarang menyalahgunakan sistem referral, termasuk namun tidak terbatas pada pembuatan akun palsu, manipulasi data, atau tindakan lain yang bertujuan memperoleh keuntungan tidak wajar.</li>
              <li>GEUWAT berhak membatalkan manfaat referral, menyesuaikan status akun, atau mengambil tindakan lain yang dianggap perlu apabila ditemukan indikasi penyalahgunaan referral.</li>
              <li>GEUWAT berhak membatasi, menangguhkan, atau menghentikan akses pengguna apabila diperlukan untuk alasan keamanan, hukum, atau operasional, dengan atau tanpa pemberitahuan sebelumnya.</li>
              <li>Segala bentuk penyalahgunaan layanan dapat mengakibatkan pembatasan atau penonaktifan akun.</li>
              <li>GEUWAT berhak menyesuaikan ketentuan penggunaan sewaktu-waktu. Pengguna disarankan meninjau pembaruan secara berkala.</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-2">2. Pengumpulan Data</h3>
            <p className="text-sm mb-3">
              Kami mengumpulkan data yang diperlukan untuk menyediakan dan mengelola layanan, antara lain:
            </p>
            <ul className="list-disc list-inside text-sm mt-2 space-y-1">
              <li>Informasi identitas dasar (nama, email, nomor kontak)</li>
              <li>Data akun, langganan, dan informasi referral (jika digunakan)</li>
              <li>Data perangkat dan aktivitas yang relevan untuk keamanan sistem</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-2">3. Penggunaan Data</h3>
            <p className="text-sm mb-3">
              Data yang dikumpulkan digunakan untuk:
            </p>
            <ul className="list-disc list-inside text-sm mt-2 space-y-1">
              <li>Memproses pendaftaran, referral, dan pengelolaan akun</li>
              <li>Memberikan akses ke fitur pembelajaran</li>
              <li>Menjaga keamanan akun dan sistem</li>
              <li>Komunikasi terkait layanan dan informasi penting</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-2">4. Keamanan Data</h3>
            <p className="text-sm">
              GEUWAT menerapkan langkah-langkah keamanan yang wajar dan sistem terkelola untuk melindungi data pengguna. Akses data dibatasi hanya untuk keperluan operasional.
            </p>
            <p className="text-sm mt-3">
              Kami tidak membagikan data pribadi kepada pihak ketiga tanpa persetujuan pengguna, kecuali diwajibkan oleh hukum.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-2">5. Hak Pengguna</h3>
            <p className="text-sm mb-3">
              Pengguna memiliki hak untuk:
            </p>
            <ul className="list-disc list-inside text-sm mt-2 space-y-1">
              <li>Mengakses dan memperbarui data akun</li>
              <li>Mengajukan permintaan penghapusan data dengan menghubungi admin</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-2">6. Cookies</h3>
            <p className="text-sm">
              Platform GEUWAT menggunakan cookies dan teknologi serupa untuk menjaga sesi login dan memastikan keamanan serta kenyamanan penggunaan layanan.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-2">7. Perubahan Kebijakan</h3>
            <p className="text-sm">
              Kebijakan ini dapat diperbarui dari waktu ke waktu. Setiap perubahan akan diinformasikan melalui platform atau saluran komunikasi resmi.
            </p>
            <p className="text-sm mt-3">
              Penggunaan layanan yang berkelanjutan dianggap sebagai persetujuan atas kebijakan yang diperbarui.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-2">8. Kontak</h3>
            <p className="text-sm mb-3">
              Untuk pertanyaan terkait ketentuan penggunaan atau kebijakan privasi, silakan hubungi:
            </p>
            <p className="text-sm"><strong>Email:</strong> learningenglishgeuwat@gmail.com</p>
            <p className="text-sm"><strong>WhatsApp:</strong> +62 858-4600-3119</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-2">9. Disclaimer</h3>
            <p className="text-sm mb-3">
              GEUWAT menyediakan layanan pembelajaran sebagaimana adanya dan tidak menjamin hasil pembelajaran tertentu.
            </p>
            <p className="text-sm mb-3">
              Pengguna bertanggung jawab atas penggunaan layanan dan hasil yang diperoleh. GEUWAT tidak bertanggung jawab atas kerugian langsung maupun tidak langsung yang timbul dari penggunaan platform.
            </p>
            <p className="text-sm">
              GEUWAT tidak bertanggung jawab atas gangguan layanan sementara yang disebabkan oleh pemeliharaan sistem, pembaruan, atau faktor teknis lainnya.
            </p>
          </div>
        </div>
        
        <div className="mt-3 sm:mt-4 flex justify-end flex-shrink-0">
          <button
            onClick={onClose}
            className="px-3 sm:px-5 py-2 font-medium rounded-lg transition-colors text-xs sm:text-sm"
            style={{
              background: 'var(--primary)',
              color: 'var(--dark-1)'
            }}
          >
            Saya Mengerti
          </button>
        </div>
      </div>
    </div>
  )
}
