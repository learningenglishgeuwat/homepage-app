'use client'

import { useEffect } from 'react'

type ErrorPageProps = {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-2xl flex-col items-center justify-center px-6 text-center">
      <h1 className="text-3xl font-bold">Terjadi Kesalahan</h1>
      <p className="mt-3 text-sm text-gray-600">
        Maaf, ada kendala saat memuat halaman ini.
      </p>
      <button
        className="mt-6 rounded-md bg-black px-4 py-2 text-white hover:opacity-90"
        onClick={() => reset()}
        type="button"
      >
        Coba Lagi
      </button>
    </main>
  )
}
