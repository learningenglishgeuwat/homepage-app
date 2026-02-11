import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Introduction from './Introduction'

describe('Introduction section', () => {
  it('renders key section content', () => {
    render(<Introduction backToMenu={jest.fn()} isActive={true} />)

    expect(screen.getByRole('button', { name: 'Kembali ke Menu' })).toBeInTheDocument()
    expect(screen.getByText(/Intinya GEUWAT/i)).toBeInTheDocument()
    expect(screen.getByText('Jalur Personal')).toBeInTheDocument()
    expect(screen.getByText('Modul Skill')).toBeInTheDocument()
    expect(screen.getByText('Akses Aman')).toBeInTheDocument()
  })

  it('calls backToMenu when back button is clicked', () => {
    const backToMenu = jest.fn()
    render(<Introduction backToMenu={backToMenu} isActive={true} />)

    fireEvent.click(screen.getByRole('button', { name: 'Kembali ke Menu' }))

    expect(backToMenu).toHaveBeenCalledTimes(1)
  })

  it('renders module marquee items', () => {
    render(<Introduction backToMenu={jest.fn()} isActive={true} />)

    expect(screen.getAllByText('Pengucapan').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Speaking').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Achievement').length).toBeGreaterThan(0)
  })
})
