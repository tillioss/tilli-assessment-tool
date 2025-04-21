import { useState } from 'react'
import Progress from '@/app/components/progress'
import Button from '@/app/components/button'
import RadioGroup from '@/app/components/radioGroup'

const questions = [
  {
    question: 'When you were angry, would you go off by yourself?',
    context: 'AW',
    emotion: 'angry',
    image: '1.png',
  },
  {
    question: 'When you were angry, would you go to your parent/caregiver?',
    context: 'EAC',
    emotion: 'angry',
    image: '2.png',
  },
  {
    question:
      'When you were angry, would you share your feelings with a friend?',
    context: 'EAF',
    emotion: 'angry',
    image: '3.png',
  },
  {
    question: 'When you were angry, would you be quiet and keep to yourself?',
    context: 'AW',
    emotion: 'angry',
    image: '4.png',
  },
  {
    question:
      'When you were angry, would you tell a friend about what made you feel angry?',
    context: 'EAF',
    emotion: 'angry',
    image: '5.png',
  },
  {
    question: 'When you were angry, would you go hang out with a friend?',
    context: 'EAF',
    emotion: 'angry',
    image: '6.png',
  },
  {
    question:
      'When you were angry, would you tell your parent/caregiver about what made you feel angry?',
    context: 'EAC',
    emotion: 'angry',
    image: '7.png',
  },
  {
    question: 'When you were angry, would you spend time alone?',
    context: 'AW',
    emotion: 'angry',
    image: '8.png',
  },
  {
    question:
      'When you were angry, would you take a few deep breaths before reacting?',
    context: 'PA',
    emotion: 'angry',
    image: '9.png',
  },
  {
    question:
      'When you were angry, would you share your feelings with your parent/caregiver?',
    context: 'EAC',
    emotion: 'angry',
    image: '10.png',
  },
  {
    question: 'When you were angry, would you calm yourself down?',
    context: 'PA',
    emotion: 'angry',
    image: '11.png',
  },
  {
    question: 'When you were angry, did you wait before acting on your anger?',
    context: 'PA',
    emotion: 'angry',
    image: '12.png',
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

  return (
    <div className="max-w-md mx-auto">
      <div className="py-4 bg-primary-500">
        <Progress current={currentQuestion} total={questions.length} />
      </div>
      <div className="max-w-md mx-auto p-4">
        <div className="bg-white p-4 rounded-lg">
          <div className="flex items-center justify-end mb-4">
            <div className=" ">
              <img src="/angry.png" width={50} height={500} alt="logo" />
            </div>
          </div>
          <img
            src={`anger/${questions[currentQuestion].image}`}
            width={450}
            height={400}
            alt="image"
          />
          <div className="text-2xl font-medium my-4 text-gray-500">
            {questions[currentQuestion].question}
          </div>
          <RadioGroup
            options={answers}
            selected={responses[currentQuestion] || ''}
            onChange={handleChange}
          />
        </div>
        <div className="mt-3 text-right">
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
