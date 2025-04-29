import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import AngerAssessment from './index'

// Mock Next.js useSearchParams to provide a participantId
jest.mock('next/navigation', () => ({
  useSearchParams: () => ({ get: () => 'participant123' }),
}))

describe('AngerAssessment component', () => {
  it('renders initial question and Next button disabled', () => {
    render(<AngerAssessment />)
    // First question text
    expect(
      screen.getByText('When you were angry, would you go off by yourself?'),
    ).toBeInTheDocument()
    const nextButton = screen.getByRole('button', { name: 'Next' })
    expect(nextButton).toBeDisabled()
  })

  it('enables Next button after selecting an answer', async () => {
    render(<AngerAssessment />)
    const radio = screen.getByRole('radio', { name: /Hardly ever/ })
    fireEvent.click(radio)
    const nextButton = screen.getByRole('button', { name: 'Next' })
    expect(nextButton).toBeEnabled()
  })

  it('plays audio when clicking play button', async () => {
    const playMock = jest.fn()
    // @ts-ignore
    global.Audio = jest.fn().mockImplementation(() => ({ play: playMock }))
    render(<AngerAssessment />)
    const playBtn = screen.getByLabelText('Play question audio')
    fireEvent.click(playBtn)
    expect(global.Audio).toHaveBeenCalled()
    expect(playMock).toHaveBeenCalled()
  })
})
