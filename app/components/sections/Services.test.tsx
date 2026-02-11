import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Services from './Services'

describe('Services section', () => {
  it('renders modul tab by default with locked badges', () => {
    render(<Services backToMenu={jest.fn()} isActive={true} />)

    expect(screen.getByText('Fitur Kami')).toBeInTheDocument()
    expect(screen.getByText('Pronunciation')).toBeInTheDocument()
    expect(screen.getByText('Vocabulary')).toBeInTheDocument()
    expect(screen.getByText('Grammar')).toBeInTheDocument()
    expect(screen.getByText('Speaking')).toBeInTheDocument()
    expect(screen.getAllByText('Locked')).toHaveLength(3)
  })

  it('toggles pronunciation topic dropdown label when pronunciation is clicked', () => {
    render(<Services backToMenu={jest.fn()} isActive={true} />)

    const pronunciationCard = screen.getByRole('button', { name: /Pronunciation/i })
    expect(screen.getByText('Lihat topik')).toBeInTheDocument()

    fireEvent.click(pronunciationCard)
    expect(screen.getByText('Sembunyikan topik')).toBeInTheDocument()
  })

  it('opens desain tab and renders both youtube videos', () => {
    render(<Services backToMenu={jest.fn()} isActive={true} />)

    fireEvent.click(screen.getByRole('button', { name: 'Desain' }))

    const laptop = screen.getByTitle('Desain Laptop')
    const hp = screen.getByTitle('Desain HP')

    expect(laptop).toHaveAttribute('src', expect.stringContaining('33JP1F-lfAs'))
    expect(hp).toHaveAttribute('src', expect.stringContaining('FMD3y8bXcZ8'))
  })

  it('calls backToMenu from back button', () => {
    const backToMenu = jest.fn()
    render(<Services backToMenu={backToMenu} isActive={true} />)

    fireEvent.click(screen.getByRole('button', { name: 'Kembali ke Menu' }))

    expect(backToMenu).toHaveBeenCalledTimes(1)
  })
})
