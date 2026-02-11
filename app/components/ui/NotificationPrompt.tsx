'use client'

import { useEffect, useState } from 'react'

type BrowserNotificationPermission =
  | NotificationPermission
  | 'unsupported'

export default function NotificationPrompt() {
  const [permission, setPermission] =
    useState<BrowserNotificationPermission>('default')
  const [isRequesting, setIsRequesting] = useState(false)

  useEffect(() => {
    if (!('Notification' in window)) {
      setPermission('unsupported')
      return
    }

    setPermission(Notification.permission)
  }, [])

  const requestPermission = async () => {
    if (!('Notification' in window) || permission === 'unsupported') return

    setIsRequesting(true)
    try {
      const result = await Notification.requestPermission()
      setPermission(result)

      if (result === 'granted') {
        new Notification('Notifikasi aktif', {
          body: 'Kamu akan menerima update penting dari GEUWAT.',
        })
      }
    } finally {
      setIsRequesting(false)
    }
  }

  if (permission === 'granted') {
    return null
  }

  return (
    <section className="notification-prompt" aria-live="polite">
      <p className="notification-prompt__title">Aktifkan notifikasi?</p>
      <p className="notification-prompt__desc">
        {permission === 'unsupported'
          ? 'Browser ini belum mendukung notifikasi web.'
          : permission === 'denied'
            ? 'Izin notifikasi ditolak. Buka pengaturan browser untuk mengaktifkan kembali.'
            : 'Nyalakan notifikasi untuk menerima info update terbaru.'}
      </p>
      {permission !== 'unsupported' && (
        <button
          className="notification-prompt__button"
          type="button"
          onClick={requestPermission}
          disabled={isRequesting}
        >
          {isRequesting ? 'Meminta izin...' : 'Izinkan notifikasi'}
        </button>
      )}
    </section>
  )
}
