import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Testimonials from './Testimonials'

describe('Testimonials section', () => {
  it('renders testimonial section title and cards', () => {
    render(<Testimonials backToMenu={jest.fn()} isActive={true} />)

    expect(screen.getByText('Testimoni')).toBeInTheDocument()
    expect(screen.getByText('Cerita nyata dari siswa yang berhasil')).toBeInTheDocument()
    expect(screen.getByText('BeginiAmat')).toBeInTheDocument()
    expect(screen.getByText('ChatGakPAsti')).toBeInTheDocument()
    expect(screen.getByText('Kumlod')).toBeInTheDocument()
    expect(screen.getByText('Lamakan?')).toBeInTheDocument()
  })

  it('renders card structure in order: role, stars, review', () => {
    const { container } = render(<Testimonials backToMenu={jest.fn()} isActive={true} />)

    const cards = Array.from(container.querySelectorAll('.testimonial-card'))
    expect(cards.length).toBe(4)

    cards.forEach((card) => {
      const role = card.querySelector('.author-info p')
      const rating = card.querySelector('.testimonial-rating')
      const review = card.querySelector('.testimonial-content')
      const stars = card.querySelectorAll('.star')

      expect(role?.textContent).toBe('AI Commentator')
      expect(stars.length).toBe(5)
      expect(role).toBeTruthy()
      expect(rating).toBeTruthy()
      expect(review).toBeTruthy()

      if (!role || !rating || !review) {
        throw new Error('Expected role, rating, and review elements to exist in testimonial card')
      }

      const roleBeforeRating = role.compareDocumentPosition(rating) & Node.DOCUMENT_POSITION_FOLLOWING
      const ratingBeforeReview = rating.compareDocumentPosition(review) & Node.DOCUMENT_POSITION_FOLLOWING

      expect(roleBeforeRating).toBeTruthy()
      expect(ratingBeforeReview).toBeTruthy()
    })
  })

  it('calls backToMenu when back button is clicked', () => {
    const backToMenu = jest.fn()
    render(<Testimonials backToMenu={backToMenu} isActive={true} />)

    fireEvent.click(screen.getByRole('button', { name: 'Kembali ke Menu' }))

    expect(backToMenu).toHaveBeenCalledTimes(1)
  })
})
