import Button from '@/app/components/button'
import Progress from '@/app/components/progress'
import RadioGroup from '@/app/components/radioGroup'
// Import question audios
import q1Audio from '@/assets/audios/1. Student Survey_Question 1.mp3'
// Question 3 options
import q3opt1Audio from '@/assets/audios/10. Student Survey_Question 3_Option 1.mp3'
import q3opt2Audio from '@/assets/audios/11. Student Survey_Question 3_Option 2.mp3'
import q3opt3Audio from '@/assets/audios/12. Student Survey_Question 3_Option 3.mp3'
import q4Audio from '@/assets/audios/13. Student Survey_Question 4.mp3'
// Question 4 options
import q4opt1Audio from '@/assets/audios/14. Student Survey_Question 4_Option 1.mp3'
import q4opt2Audio from '@/assets/audios/15. Student Survey_Question 4_Option 2.mp3'
import q4opt3Audio from '@/assets/audios/16. Student Survey_Question 4_Option 3.mp3'
import q5Audio from '@/assets/audios/17. Student Survey_Question 5.mp3'
// Question 5 options
import q5opt1Audio from '@/assets/audios/18. Student Survey_Question 5_Option 1.mp3'
import q5opt2Audio from '@/assets/audios/19. Student Survey_Question 5_Option 2.mp3'
// Import answer option audios for each question
// Question 1 options
import q1opt1Audio from '@/assets/audios/2. Student Survey_Question 1_Option 1.mp3'
import q5opt3Audio from '@/assets/audios/20. Student Survey_Question 5_Option 3.mp3'
import q6Audio from '@/assets/audios/21. Student Survey_Question 6.mp3'
// Question 6 options
import q6opt1Audio from '@/assets/audios/22. Student Survey_Question 6_Option 1.mp3'
import q6opt2Audio from '@/assets/audios/23. Student Survey_Question 6_Option 2.mp3'
import q6opt3Audio from '@/assets/audios/24. Student Survey_Question 6_Option 3.mp3'
import q7Audio from '@/assets/audios/25. Student Survey_Question 7.mp3'
// Question 7 options
import q7opt1Audio from '@/assets/audios/26. Student Survey_Question 7_Option 1.mp3'
import q7opt2Audio from '@/assets/audios/27. Student Survey_Question 7_Option 2.mp3'
import q7opt3Audio from '@/assets/audios/28. Student Survey_Question 7_Option 3.mp3'
import q8Audio from '@/assets/audios/29. Student Survey_Question 8.mp3'
import q1opt2Audio from '@/assets/audios/3. Student Survey_Question 1_Option 2.mp3'
// Question 8 options
import q8opt1Audio from '@/assets/audios/30. Student Survey_Question 8_Option 1.mp3'
import q8opt2Audio from '@/assets/audios/31. Student Survey_Question 8_Option 2.mp3'
import q8opt3Audio from '@/assets/audios/32. Student Survey_Question 8_Option 3.mp3'
import q9Audio from '@/assets/audios/33. Student Survey_Question 9.mp3'
// Question 9 options
import q9opt1Audio from '@/assets/audios/34. Student Survey_Question 9_Option 1.mp3'
import q9opt2Audio from '@/assets/audios/35. Student Survey_Question 9_Option 2.mp3'
import q9opt3Audio from '@/assets/audios/36. Student Survey_Question 9_Option 3.mp3'
import q10Audio from '@/assets/audios/37. Student Survey_Question 10.mp3'
// Question 10 options
import q10opt1Audio from '@/assets/audios/38. Student Survey_Question 10_Option 1.mp3'
import q10opt2Audio from '@/assets/audios/39. Student Survey_Question 10_Option 2.mp3'
import q1opt3Audio from '@/assets/audios/4. Student Survey_Question 1_Option 3.mp3'
import q10opt3Audio from '@/assets/audios/40. Student Survey_Question 10_Option 3.mp3'
import q11Audio from '@/assets/audios/41. Student Survey_Question 11.mp3'
// Question 11 options (has 5 options)
import q11opt1Audio from '@/assets/audios/42. Student Survey_Question 11_Option 1.mp3'
import q11opt2Audio from '@/assets/audios/43. Student Survey_Question 11_Option 2.mp3'
import q11opt3Audio from '@/assets/audios/44. Student Survey_Question 11_Option 3.mp3'
import q11opt4Audio from '@/assets/audios/45. Student Survey_Question 11_Option 4.mp3'
import q11opt5Audio from '@/assets/audios/46. Student Survey_Question 11_Option 5.mp3'
import q12Audio from '@/assets/audios/47. Student Survey_Question 12.mp3'
// Question 12 options (has 5 options)
import q12opt1Audio from '@/assets/audios/48. Student Survey_Question 12_Option 1.mp3'
import q12opt2Audio from '@/assets/audios/49. Student Survey_Question 12_Option 2.mp3'
import q2Audio from '@/assets/audios/5. Student Survey_Question 2.mp3'
import q12opt3Audio from '@/assets/audios/50. Student Survey_Question 12_Option 3.mp3'
import q12opt4Audio from '@/assets/audios/51. Student Survey_Question 12_Option 4.mp3'
import q12opt5Audio from '@/assets/audios/52. Student Survey_Question 12_Option 5.mp3'
// Common "I do not know" audio
import dontKnowAudio from '@/assets/audios/53. Student Survey_I Do Not Know.mp3'
// Question 2 options
import q2opt1Audio from '@/assets/audios/6. Student Survey_Question 2_Option 1.mp3'
import q2opt2Audio from '@/assets/audios/7. Student Survey_Question 2_Option 2.mp3'
import q2opt3Audio from '@/assets/audios/8. Student Survey_Question 2_Option 3.mp3'
import q3Audio from '@/assets/audios/9. Student Survey_Question 3.mp3'
import AudioIcon from '@/assets/svg/AudioIcon'
import { createAssessment } from '@/services/appwrite'
import { useSearchParams } from 'next/navigation'
import React, { Suspense, useState } from 'react'

const questions = [
  {
    question: 'How do you think this child feels?',
    questionAudio: q1Audio,
    answerAudio: [q1opt1Audio, q1opt2Audio, q1opt3Audio, dontKnowAudio],
    answerOptions: [
      { label: 'Happy', value: '1' },
      { label: 'Sad', value: '2' },
      { label: 'Angry', value: '3' },
      { label: 'I do not know', value: '999' },
    ],
    image: '1.png',
  },
  {
    question: 'Which would you choose?',
    questionAudio: q2Audio,
    answerAudio: [q2opt1Audio, q2opt2Audio, q2opt3Audio, dontKnowAudio],
    answerOptions: [
      { label: 'Apple', value: '1' },
      { label: 'Cookie', value: '2' },
      { label: 'I do not like either', value: '3' },
      { label: 'I do not know', value: '999' },
    ],
    image: '2.png',
  },
  {
    question: 'If the tower falls, what should they do?',
    questionAudio: q3Audio,
    answerAudio: [q3opt1Audio, q3opt2Audio, q3opt3Audio, dontKnowAudio],
    answerOptions: [
      { label: 'Try Again', value: '1' },
      { label: 'Cry and stop', value: '2' },
      { label: 'Walk away', value: '3' },
      { label: 'I do not know', value: '999' },
    ],
    image: '3.png',
  },
  {
    question: 'What can they say to get help?',
    questionAudio: q4Audio,
    answerAudio: [q4opt1Audio, q4opt2Audio, q4opt3Audio, dontKnowAudio],
    answerOptions: [
      { label: 'Can you help me?', value: '1' },
      { label: 'Stay quiet', value: '2' },
      { label: 'I give up', value: '3' },
      { label: 'I do not know', value: '999' },
    ],
    image: '3.png',
  },
  {
    question: 'What would you do?',
    questionAudio: q5Audio,
    answerAudio: [q5opt1Audio, q5opt2Audio, q5opt3Audio, dontKnowAudio],
    answerOptions: [
      { label: 'Help her up', value: '1' },
      { label: 'Give her a hug', value: '2' },
      { label: 'Walk away', value: '3' },
      { label: 'I do not know', value: '999' },
    ],
    image: '4.png',
  },
  {
    question: 'How do you think she feels?',
    questionAudio: q6Audio,
    answerAudio: [q6opt1Audio, q6opt2Audio, q6opt3Audio, dontKnowAudio],
    answerOptions: [
      { label: 'Sad', value: '1' },
      { label: 'Happy', value: '2' },
      { label: 'Mad', value: '3' },
      { label: 'I do not know', value: '999' },
    ],
    image: '4.png',
  },
  {
    question: 'What can you say to help?',
    questionAudio: q7Audio,
    answerAudio: [q7opt1Audio, q7opt2Audio, q7opt3Audio, dontKnowAudio],
    answerOptions: [
      { label: 'Are you okay?', value: '1' },
      { label: 'Stop crying', value: '2' },
      { label: 'Nothing', value: '3' },
      { label: 'I do not know', value: '999' },
    ],
    image: '4.png',
  },
  {
    question: 'What should you do?',
    questionAudio: q8Audio,
    answerAudio: [q8opt1Audio, q8opt2Audio, q8opt3Audio, dontKnowAudio],
    answerOptions: [
      { label: 'Take turns', value: '1' },
      { label: 'Tell a teacher', value: '2' },
      { label: 'Grab it back', value: '3' },
      { label: 'I do not know', value: '999' },
    ],
    image: '5.png',
  },
  {
    question: 'What can help them feel better?',
    questionAudio: q9Audio,
    answerAudio: [q9opt1Audio, q9opt2Audio, q9opt3Audio, dontKnowAudio],
    answerOptions: [
      { label: 'Take deep breaths', value: '1' },
      { label: 'Hit something', value: '2' },
      { label: 'Scream', value: '3' },
      { label: 'I do not know', value: '999' },
    ],
    image: '6.png',
  },
  {
    question: 'What should they do?',
    questionAudio: q10Audio,
    answerAudio: [q10opt1Audio, q10opt2Audio, q10opt3Audio, dontKnowAudio],
    answerOptions: [
      { label: 'Wait their turn', value: '1' },
      { label: 'Push to the front', value: '2' },
      { label: 'Leave', value: '3' },
      { label: 'I do not know', value: '999' },
    ],
    image: '7.png',
  },
  {
    question: 'What are you good at?',
    questionAudio: q11Audio,
    answerAudio: [
      q11opt1Audio,
      q11opt2Audio,
      q11opt3Audio,
      q11opt4Audio,
      dontKnowAudio,
    ],
    answerOptions: [
      { label: 'Drawing or art', value: '1' },
      { label: 'Sports or games', value: '2' },
      { label: 'Helping others', value: '3' },
      { label: 'Reading or writing', value: '4' },
      { label: 'I am not sure yet', value: '999' },
    ],
    image: '8.png',
  },
  {
    question: 'What would you like to get better at?',
    questionAudio: q12Audio,
    answerAudio: [
      q12opt1Audio,
      q12opt2Audio,
      q12opt3Audio,
      q12opt4Audio,
      dontKnowAudio,
    ],
    answerOptions: [
      { label: 'Reading or writing', value: '1' },
      { label: 'Talking to others', value: '2' },
      { label: 'Controlling my feelings', value: '3' },
      { label: 'Drawing or art', value: '4' },
      { label: 'I do not know yet', value: '999' },
    ],
    image: '8.png',
  },
]

export default function Assessment() {
  return (
    <Suspense fallback={null}>
      <ChildAssessment />
    </Suspense>
  )
}

function ChildAssessment() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [responses, setResponses] = useState<Record<number, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState(false)

  const searchParams = useSearchParams()
  const studentId = searchParams.get('studentId')

  const handleNext = async () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      if (!studentId) {
        console.error('Missing studentId')
        return
      }
      setIsSubmitting(true)
      try {
        await createAssessment(responses, studentId)
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
        <div className="flex-1 flex flex-col justify-center items-center px-4">
          <p className="text-2xl md:text-4xl text-center font-medium mb-8 md:mb-12">
            Yay you are done!
          </p>
          <img
            src="/checkIcon.png"
            alt="done icon"
            className="w-2/3 md:w-1/2"
          />
        </div>

        <div className="relative">
          <img
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 md:w-auto"
            src="/confetti.png"
            alt="confetti"
          />
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="py-4 bg-primary-500">
        <Progress current={currentQuestion} total={questions.length} />
      </div>
      <div className="w-full max-w-md mx-auto p-2 md:p-4">
        <div className="bg-white p-3 md:p-4 rounded-lg">
          <div className="relative">
            <img
              src={`images/${questions[currentQuestion].image}`}
              width={450}
              height={400}
              alt="image"
              className="w-full h-auto max-w-full"
            />
            <div className="absolute bottom-2 left-2">
              <button
                type="button"
                onClick={() =>
                  new Audio(questions[currentQuestion].questionAudio).play()
                }
                aria-label="Play question audio"
              >
                <AudioIcon />
              </button>
            </div>
          </div>
          <div className="text-lg md:text-2xl font-medium my-4 text-gray-500 px-2">
            {questions[currentQuestion].question}
          </div>
          <RadioGroup
            options={questions[currentQuestion].answerOptions.map(
              (opt, idx) => ({
                ...opt,
                audio: questions[currentQuestion].answerAudio[idx],
              }),
            )}
            selected={responses[currentQuestion] || ''}
            onChange={handleChange}
          />
        </div>
        <div className="mt-3 text-right px-2">
          <Button onClick={handleNext} disabled={!responses[currentQuestion]}>
            {currentQuestion < questions.length - 1 ? 'Next' : 'Submit'}
          </Button>
        </div>
      </div>
    </div>
  )
}
