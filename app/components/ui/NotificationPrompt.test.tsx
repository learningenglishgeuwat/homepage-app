import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import NotificationPrompt from './NotificationPrompt'

describe('NotificationPrompt', () => {
  afterEach(() => {
    window.localStorage.clear()
  })

  it('allows user to dismiss prompt optionally', () => {
    render(<NotificationPrompt />)

    const dismissButton = screen.getByRole('button', { name: 'Nanti saja' })
    fireEvent.click(dismissButton)

    expect(screen.queryByText('Aktifkan notifikasi?')).not.toBeInTheDocument()
    expect(window.localStorage.getItem('homepage_notification_prompt_dismissed')).toBe('1')
  })
})
