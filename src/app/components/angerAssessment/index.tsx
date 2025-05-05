import React, { Suspense, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { createAssessment } from '@/services/appwrite'
import Progress from '@/app/components/progress'
import Button from '@/app/components/button'
import RadioGroup from '@/app/components/radioGroup'

import q1Audio from '@/assets/audios/2.Anger_Question_1.mp3'
import q2Audio from '@/assets/audios/3.Anger_Question_2.mp3'
import q3Audio from '@/assets/audios/4.Anger_Question_3.mp3'
import q4Audio from '@/assets/audios/5.Anger_Question_4.mp3'
import q5Audio from '@/assets/audios/6.Anger_Question_5.mp3'
import q6Audio from '@/assets/audios/7.Anger_Question_6.mp3'
import q7Audio from '@/assets/audios/8.Anger_Question_7.mp3'
import q8Audio from '@/assets/audios/9.Anger_Question_8.mp3'
import q9Audio from '@/assets/audios/10.Anger_Question_9.mp3'
import q10Audio from '@/assets/audios/11.Anger_Question_10.mp3'
import q11Audio from '@/assets/audios/12.Anger_Question_11.mp3'
import q12Audio from '@/assets/audios/13.Anger_Question_12.mp3'

import hardlyAudio from '@/assets/audios/14.Anger_Option_Hardly.mp3'
import sometimesAudio from '@/assets/audios/15.Anger_Option_Sometimes.mp3'
import oftenAudio from '@/assets/audios/16.Anger_Option_Often.mp3'
import dontKnowAudio from '@/assets/audios/17.Anger_Option_Don_t Know.mp3'
import AudioIcon from '@/assets/svg/AudioIcon'

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

const questionAudios = [
  q1Audio,
  q2Audio,
  q3Audio,
  q4Audio,
  q5Audio,
  q6Audio,
  q7Audio,
  q8Audio,
  q9Audio,
  q10Audio,
  q11Audio,
  q12Audio,
]
const answerAudios = [hardlyAudio, sometimesAudio, oftenAudio, dontKnowAudio]

export default function Assessment() {
  return (
    <Suspense fallback={null}>
      <AngerAssessment />
    </Suspense>
  )
}

function AngerAssessment() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [responses, setResponses] = useState<Record<number, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState(false)

  const searchParams = useSearchParams()
  const participantId = searchParams.get('participantId')

  const handleNext = async () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      if (!participantId) {
        console.error('Missing participantId')
        return
      }
      setIsSubmitting(true)
      try {
        await createAssessment({
          participantId,
          responses: JSON.stringify(responses),
          createdAt: new Date().toISOString(),
        })
        setHasSubmitted(true)
      } catch (error) {
        console.error('Error submitting assessment', error)
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  const handleChange = (value: string) => {
    setResponses({
      ...responses,
      [currentQuestion]: value,
    })
  }

  if (isSubmitting) {
    return (
      <div className="h-64 flex items-center justify-center text-lg">
        Submitting...
      </div>
    )
  }

  if (hasSubmitted) {
    return (
      <div className="relative min-h-screen flex flex-col">
        <div className="flex-1 flex flex-col justify-center items-center">
          <p className="text-4xl text-center font-medium mb-12">
            Yay you are done!
          </p>
          <img src="/checkIcon.png" alt="done icon" className="w-1/2" />
        </div>

        <div className="relative">
          <img
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
            src="/confetti.png"
            alt="confetti"
          />
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="py-4 bg-primary-500">
        <Progress current={currentQuestion} total={questions.length} />
      </div>
      <div className="max-w-md mx-auto p-4">
        <div className="bg-white p-4 rounded-lg">
          <div className="flex items-center justify-end mb-4">
            <div>
              <img src="/angry.png" width={50} height={500} alt="logo" />
            </div>
          </div>
          <img
            src={`anger/${questions[currentQuestion].image}`}
            width={450}
            height={400}
            alt="image"
          />
          <div className="my-2">
            <button
              type="button"
              onClick={() => new Audio(questionAudios[currentQuestion]).play()}
              aria-label="Play question audio"
            >
              <AudioIcon />
            </button>
          </div>
          <div className="text-2xl font-medium my-4 text-gray-500">
            {questions[currentQuestion].question}
          </div>
          <RadioGroup
            options={answers.map((opt, idx) => ({
              ...opt,
              audio: answerAudios[idx],
            }))}
            selected={responses[currentQuestion] || ''}
            onChange={handleChange}
          />
        </div>
        <div className="mt-3 text-right">
          <Button onClick={handleNext} disabled={!responses[currentQuestion]}>
            {currentQuestion < questions.length - 1 ? 'Next' : 'Submit'}
          </Button>
        </div>
      </div>
    </div>
  )
}
