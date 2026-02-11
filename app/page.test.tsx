/* eslint-disable react/display-name */
import React from 'react'
import { render, screen, fireEvent, act } from '@testing-library/react'
import Home from './page'

jest.mock('./components/ui/LoadingScreen', () => () => <div data-testid="loading-screen" />)
jest.mock('./components/ui/AmbientBg', () => () => <div data-testid="ambient-bg" />)
jest.mock('./components/ui/GridOverlay', () => () => <div data-testid="grid-overlay" />)
jest.mock('./components/layout/Header', () => () => <div data-testid="header">Header</div>)

jest.mock('./components/layout/MenuGrid', () => {
  return function MockMenuGrid(props: { showSection: (sectionId: string) => void }) {
    return (
      <div data-testid="menu-grid">
        <button onClick={() => props.showSection('about')}>Open About</button>
      </div>
    )
  }
})

jest.mock('./components/sections/Introduction', () => () => <div data-testid="introduction-section" />)
jest.mock('./components/sections/Services', () => () => <div data-testid="services-section" />)
jest.mock('./components/sections/Gallery', () => () => <div data-testid="gallery-section" />)
jest.mock('./components/sections/Testimonials', () => () => <div data-testid="testimonials-section" />)
jest.mock('./components/sections/Contact', () => () => <div data-testid="contact-section" />)
jest.mock('./components/sections/About', () => {
  return function MockAbout(props: { backToMenu: () => void; isActive: boolean }) {
    return (
      <div data-testid="about-section">
        <span>{props.isActive ? 'active' : 'inactive'}</span>
        <button onClick={props.backToMenu}>Back To Menu</button>
      </div>
    )
  }
})

describe('Home page navigation', () => {
  beforeEach(() => {
    jest.useFakeTimers()
    window.localStorage.clear()
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
  })

  it('shows menu by default and opens about section after click', () => {
    render(<Home />)

    expect(screen.getByTestId('menu-grid')).toBeInTheDocument()
    expect(screen.getByTestId('header')).toBeInTheDocument()

    fireEvent.click(screen.getByText('Open About'))
    act(() => {
      jest.advanceTimersByTime(550)
    })

    expect(screen.queryByTestId('menu-grid')).not.toBeInTheDocument()
    expect(screen.getByTestId('about-section')).toHaveTextContent('active')
  })

  it('returns to menu after back action from section', () => {
    render(<Home />)

    fireEvent.click(screen.getByText('Open About'))
    act(() => {
      jest.advanceTimersByTime(550)
    })

    fireEvent.click(screen.getByText('Back To Menu'))
    act(() => {
      jest.advanceTimersByTime(200)
    })

    expect(screen.getByTestId('menu-grid')).toBeInTheDocument()
    expect(screen.getByTestId('header')).toBeInTheDocument()
  })

  it('restores last active section from localStorage', () => {
    window.localStorage.setItem('homepage_active_section', 'about')

    render(<Home />)

    expect(screen.queryByTestId('menu-grid')).not.toBeInTheDocument()
    expect(screen.getByTestId('about-section')).toHaveTextContent('active')
  })
})
