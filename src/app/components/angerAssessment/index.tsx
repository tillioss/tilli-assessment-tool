import { useState } from 'react'
import Progress from '@/app/components/progress'
import Button from '@/app/components/button'
import RadioGroup from '@/app/components/radioGroup'

const questions = [
  {
    question: 'When you were angry, did you wait before acting on your anger?',
    context: 'PA',
    emotion: 'angry',
  },
  {
    question: 'When you were angry, did you wait before acting on your anger?',
    context: 'PA',
    emotion: 'angry',
  },
  {
    question: 'When you were angry, did you wait before acting on your anger?',
    context: 'PA',
    emotion: 'angry',
  },
]

const answers = [
  { label: 'Hardly ever', value: '1' },
  { label: 'Sometimes', value: '2' },
  { label: 'Often', value: '3' },
  { label: 'I do not know', value: '999' },
]

export default function AngerAssessment() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [responses, setResponses] = useState({})

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      console.log('Submit responses', responses)
    }
  }

  const handleChange = (value: string) => {
    setResponses({
      ...responses,
      [currentQuestion]: value,
    })
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="mb-4">
        <Progress current={currentQuestion} total={questions.length} />
      </div>
      <div className="bg-white p-4 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <div className="text-3xl">
            <img src="/angry.png" width={50} height={500} alt="logo" />
          </div>
          <div className="text-sm text-gray-500">
            {questions[currentQuestion].context}
          </div>
        </div>
        <div className="text-lg font-medium mb-4">
          {questions[currentQuestion].question}
        </div>
        <RadioGroup
          options={answers}
          selected={responses[currentQuestion] || ''}
          onChange={handleChange}
        />
        <div className="mt-6 text-right">
          <Button
            handleClick={handleNext}
            disabled={!responses[currentQuestion]}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
