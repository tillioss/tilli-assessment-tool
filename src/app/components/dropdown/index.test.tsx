import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Dropdown from './index'
import { Option } from '@/types'

describe('Dropdown component', () => {
  const options: Option[] = [
    { label: 'One', value: '1' },
    { label: 'Two', value: '2' },
  ]
  const onSelect = jest.fn()

  it('renders current option', () => {
    render(
      <Dropdown
        options={options}
        currentOption={options[0]}
        onSelect={onSelect}
      />,
    )
    expect(screen.getByRole('button', { name: /One/ })).toBeInTheDocument()
  })

  it('opens menu and selects an option', async () => {
    render(
      <Dropdown
        options={options}
        currentOption={options[0]}
        onSelect={onSelect}
      />,
    )
    const toggleButton = screen.getByRole('button', { name: /One/ })
    fireEvent.click(toggleButton)
    expect(screen.getByText('Two')).toBeInTheDocument()
    fireEvent.click(screen.getByText('Two'))
    expect(onSelect).toHaveBeenCalledWith(options[1])
  })

  it('uses default and custom arrow color', () => {
    const { container: defaultContainer } = render(
      <Dropdown
        options={options}
        currentOption={options[0]}
        onSelect={onSelect}
      />,
    )
    const pathDefault = defaultContainer.querySelector('svg path')
    expect(pathDefault).toHaveAttribute('fill', '#DD3B96')

    const { container: customContainer } = render(
      <Dropdown
        options={options}
        currentOption={options[0]}
        onSelect={onSelect}
        color="red"
      />,
    )
    const pathCustom = customContainer.querySelector('svg path')
    expect(pathCustom).toHaveAttribute('fill', 'red')
  })
})
