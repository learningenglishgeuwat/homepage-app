'use client'

import { useEffect, useState } from 'react'

type BrowserNotificationPermission =
  | NotificationPermission
  | 'unsupported'

export default function NotificationPrompt() {
  const dismissStorageKey = 'homepage_notification_prompt_dismissed'
  const [permission, setPermission] =
    useState<BrowserNotificationPermission>('default')
  const [isRequesting, setIsRequesting] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    const hasDismissed = window.localStorage.getItem(dismissStorageKey) === '1'
    if (hasDismissed) {
      setIsDismissed(true)
    }

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

  const dismissPrompt = () => {
    window.localStorage.setItem(dismissStorageKey, '1')
    setIsDismissed(true)
  }

  if (permission === 'granted' || isDismissed) {
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
            : 'Notifikasi bersifat opsional. Aktifkan jika ingin menerima update terbaru.'}
      </p>
      <div className="notification-prompt__actions">
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
        <button
          className="notification-prompt__button notification-prompt__button--secondary"
          type="button"
          onClick={dismissPrompt}
          disabled={isRequesting}
        >
          Nanti saja
        </button>
      </div>
    </section>
  )
}
