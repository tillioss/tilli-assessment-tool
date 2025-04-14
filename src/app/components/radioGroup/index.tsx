interface RadioGroupProps {
  options: { label: string; value: string }[]
  selected: string
  onChange: (value: string) => void
}

export default function RadioGroup({
  options,
  selected,
  onChange,
}: RadioGroupProps) {
  return (
    <div className="space-y-3">
      {options.map((option) => (
        <label
          key={option.value}
          className={`flex items-center space-x-2 cursor-pointer ${
            selected === option.value ? 'font-semibold text-blue-700' : ''
          }`}
        >
          <input
            type="radio"
            name="mcq"
            value={option.value}
            checked={selected === option.value}
            onChange={() => onChange(option.value)}
            className="accent-blue-600"
          />
          <span>{option.label}</span>
        </label>
      ))}
    </div>
  )
}
