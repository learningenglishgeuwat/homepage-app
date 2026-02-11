import React from 'react'
import { render, screen, fireEvent, act } from '@testing-library/react'
import About from './About'

describe('About section', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
  })

  it('renders about section content', () => {
    render(<About backToMenu={jest.fn()} isActive={true} />)

    expect(screen.getByText('Tentang GEUWAT')).toBeInTheDocument()
    expect(screen.getByText('GEUWAT Progress Simulation')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Start Progress' })).toBeInTheDocument()
    expect(screen.getByText('Pakai aplikasi GEUWAT')).toBeInTheDocument()
    expect(screen.getByText('Tanpa aplikasi GEUWAT')).toBeInTheDocument()
  })

  it('calls backToMenu when back button is clicked', () => {
    const backToMenu = jest.fn()
    render(<About backToMenu={backToMenu} isActive={true} />)

    fireEvent.click(screen.getByRole('button', { name: 'Kembali ke Menu' }))

    expect(backToMenu).toHaveBeenCalledTimes(1)
  })

  it('runs progress simulation when start button is clicked', () => {
    const { container } = render(<About backToMenu={jest.fn()} isActive={true} />)

    fireEvent.click(screen.getByRole('button', { name: 'Start Progress' }))

    expect(screen.getByRole('button', { name: 'Running...' })).toBeInTheDocument()
    expect(screen.getByText('Simulasi berjalan')).toBeInTheDocument()

    act(() => {
      jest.advanceTimersByTime(1700)
    })

    const activeSteps = container.querySelectorAll('.workflow-step.active')
    expect(activeSteps.length).toBeGreaterThan(0)

    act(() => {
      jest.advanceTimersByTime(7000)
    })

    expect(screen.getByRole('button', { name: 'Start Progress' })).toBeInTheDocument()
    expect(screen.getByText('Klik untuk memulai simulasi')).toBeInTheDocument()
  })

  it('resets simulation state when section becomes inactive', () => {
    const { rerender, container } = render(<About backToMenu={jest.fn()} isActive={true} />)

    fireEvent.click(screen.getByRole('button', { name: 'Start Progress' }))
    act(() => {
      jest.advanceTimersByTime(1700)
    })

    expect(container.querySelectorAll('.workflow-step.active').length).toBeGreaterThan(0)

    rerender(<About backToMenu={jest.fn()} isActive={false} />)

    expect(container.querySelectorAll('.workflow-step.active').length).toBe(0)
    expect(screen.getByRole('button', { name: 'Start Progress' })).toBeInTheDocument()
    expect(screen.getByText('Klik untuk memulai simulasi')).toBeInTheDocument()
  })
})
