import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Gallery from './Gallery'

describe('Gallery section', () => {
  it('renders gallery header and both gallery items', () => {
    render(<Gallery backToMenu={jest.fn()} />)

    expect(screen.getByText('Galeri Kami')).toBeInTheDocument()
    expect(screen.getByText('Menampilkan program dan pencapaian terbaik')).toBeInTheDocument()
    expect(screen.getByAltText('Tampilan Laptop')).toHaveAttribute(
      'src',
      expect.stringContaining('LaptopView.png')
    )
    expect(screen.getByAltText('Tampilan HP')).toHaveAttribute(
      'src',
      expect.stringContaining('HpView.png')
    )
  })

  it('calls backToMenu when clicking back button', () => {
    const backToMenu = jest.fn()
    render(<Gallery backToMenu={backToMenu} />)

    fireEvent.click(screen.getByRole('button', { name: 'Kembali ke Menu' }))

    expect(backToMenu).toHaveBeenCalledTimes(1)
  })
})
