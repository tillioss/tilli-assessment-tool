import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import RadioGroup from './index'

describe('RadioGroup component', () => {
  const options = [
    { label: 'Option A', value: 'a', audio: 'audioA.mp3' },
    { label: 'Option B', value: 'b' },
  ]

  it('renders options and highlights selected', () => {
    const onChange = jest.fn()
    render(<RadioGroup options={options} selected="b" onChange={onChange} />)
    const radioA = screen.getByRole('radio', { name: 'Option A' })
    const radioB = screen.getByRole('radio', { name: 'Option B' })
    expect(radioB).toBeChecked()
    expect(radioA).not.toBeChecked()
  })

  it('calls onChange when an option is selected', async () => {
    const onChange = jest.fn()
    render(<RadioGroup options={options} selected="b" onChange={onChange} />)
    const radioA = screen.getByRole('radio', { name: 'Option A' })
    fireEvent.click(radioA)
    expect(onChange).toHaveBeenCalledWith('a')
  })

  it('renders audio buttons for options with audio and plays audio on click', async () => {
    const playMock = jest.fn()
    // @ts-ignore
    global.Audio = jest.fn().mockImplementation(() => ({ play: playMock }))
    const onChange = jest.fn()
    render(<RadioGroup options={options} selected="b" onChange={onChange} />)
    const audioButtons = screen.getAllByRole('button', {
      name: 'Play option audio',
    })
    expect(audioButtons).toHaveLength(1)
    fireEvent.click(audioButtons[0])
    expect(global.Audio).toHaveBeenCalledWith('audioA.mp3')
    expect(playMock).toHaveBeenCalled()
  })
})
