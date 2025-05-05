import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import * as appwriteService from '@/services/appwrite'
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

  it('submits assessment on last question and shows thank you message', async () => {
    const submitSpy = jest
      .spyOn(appwriteService, 'createAssessment')
      .mockResolvedValue({} as any)
    render(<AngerAssessment />)
    // Iterate through all 12 questions
    for (let i = 0; i < 12; i++) {
      // Select an answer
      const radio = await screen.findByRole('radio', { name: /Hardly ever/ })
      fireEvent.click(radio)
      // Click Next or Submit
      const buttonLabel = i < 11 ? 'Next' : 'Submit'
      const button = screen.getByRole('button', { name: buttonLabel })
      fireEvent.click(button)
    }
    expect(submitSpy).toHaveBeenCalledTimes(1)
    // After submission, thank you message is displayed
    await screen.findByText('Yay you are done!')
  })
})
