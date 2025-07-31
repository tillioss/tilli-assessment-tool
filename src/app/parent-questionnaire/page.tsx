'use client'
import Link from 'next/link'
import React, { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { addParentQuestionnaire } from '@/services/appwrite'

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ParentQuestionnaire />
    </Suspense>
  )
}

function ParentQuestionnaire() {
  const searchParams = useSearchParams()
  const studentId = searchParams.get('studentId')

  const [formData, setFormData] = useState({
    // Section 1: Demographic details
    parentName: '',
    childSex: '',
    childDob: '',
    repeatedGrade: '',
    hearingDifficulty: '',
    rememberingDifficulty: '',
    communicationDifficulty: '',
    // Section 2: Understanding your child
    q1_feelings: '',
    q2_preferences: '',
    q3_persistence: '',
    q4_help_seeking: '',
    q5_empathy: '',
    q6_comforting: '',
    q7_problem_solving: '',
    q8_self_regulation: '',
    q9_impulse_control: '',
    q10_self_awareness: '',
    q11_learning_goals: '',
  })

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    try {
      await addParentQuestionnaire(formData, studentId!)
      router.push(`/instructions?studentId=${studentId}`)
    } catch (err) {
      console.error(err)
      setError('Failed to submit. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const understandingQuestions = [
    {
      key: 'q1_feelings',
      question:
        'Does your child tell you how they or others feel using words? (e.g., Says "I\'m scared," "I feel happy," or " you look angry")',
    },
    {
      key: 'q2_preferences',
      question:
        'Does your child say what they like or don\'t like in a clear way? (e.g., "I want to rest," "I don\'t like loud noise")',
    },
    {
      key: 'q3_persistence',
      question:
        "Does your child keep trying and finish tasks, even when they're hard? (e.g., Finishes a puzzle or keeps working after making a mistake)",
    },
    {
      key: 'q4_help_seeking',
      question:
        'Does your child ask an adult or friend for help when they are stuck or upset? (e.g., Says "Can you help me?" or "I need help")',
    },
    {
      key: 'q5_empathy',
      question:
        'Does your child notice when someone is upset and respond in a kind way? (e.g., Asks "Are you okay?" or gives a hug)',
    },
    {
      key: 'q6_comforting',
      question:
        'Does your child try to make someone feel better when they are sad or hurt? (e.g., Offers a hug, talks to them, or sits beside them)',
    },
    {
      key: 'q7_problem_solving',
      question:
        'Can your child fix problems with other children without needing an adult? (e.g., Takes turns, shares, or talks it out)',
    },
    {
      key: 'q8_self_regulation',
      question:
        'Does your child calm themselves down when they are upset or angry? (e.g., Takes deep breaths, walks away, or asks for help)',
    },
    {
      key: 'q9_impulse_control',
      question:
        'Does your child stop and think before acting when upset or excited? (e.g., Waits instead of yelling or grabbing something)',
    },
    {
      key: 'q10_self_awareness',
      question:
        'Does your child talk about things they\'re good at or want to improve? (e.g., "I\'m good at drawing," "I want to get better at reading")',
    },
    {
      key: 'q11_learning_goals',
      question:
        'Does your child talk about things they want to learn or get better at? (e.g., "I want to learn harder words")',
    },
  ]

  const answerOptions = [
    'Never',
    'Sometimes',
    'Most of the time',
    'Almost always',
  ]

  return (
    <section>
      <title>Tilli Assessment | Parent Questionnaire</title>
      <div className="bg-primary-400 w-full px-4">
        <div className="flex justify-center w-full">
          <Link href="/">
            <p className="text-md md:text-xl text-white font-semibold p-3">
              Parent Questionnaire
            </p>
          </Link>
        </div>
      </div>
      <div className="mx-auto flex flex-col items-center justify-center px-4 md:px-6 py-4 md:py-8 text-gray-500 overflow-auto min-h-screen">
        <form
          onSubmit={handleSubmit}
          className="rounded-xl p-4 w-full max-w-md md:max-w-lg mt-4 space-y-4 md:space-y-6"
        >
          <p className="text-center text-base font-semibold text-gray-700">
            ONLY parents / guardians are supposed to fill this.
          </p>

          {/* Section 1: Demographic Details */}
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow-sm flex items-center">
              <div className="w-4 h-12 bg-primary-400 rounded-l-lg mr-2"></div>
              <h2 className="text-md font-semibold text-gray-700">
                SECTION 1: FILL DEMOGRAPHIC DETAILS OF YOUR CHILD
              </h2>
            </div>

            {/* Input Groups */}
            {[
              { label: "What is your child's name?", name: 'childName' },
              { label: 'What is your name?', name: 'parentName' },
            ].map(({ label, name }) => (
              <div className="bg-white rounded-2xl p-4" key={name}>
                <label className="block text-gray-700 font-semibold mb-2">
                  {label}
                </label>
                <input
                  type="text"
                  name={name}
                  value={formData[name as keyof typeof formData]}
                  onChange={handleChange}
                  placeholder="Your Answer"
                  className="block w-full rounded-full bg-gray-200 p-2 px-4 text-gray-700 placeholder-gray-400 font-medium"
                />
              </div>
            ))}

            {/* Select for Sex */}
            <div className="bg-white rounded-2xl p-4">
              <label className="block text-gray-700 font-semibold mb-2">
                What is the sex of your child?
              </label>
              <select
                name="childSex"
                value={formData.childSex}
                onChange={handleChange}
                className="block w-full rounded-full bg-gray-200 p-2 px-4 text-gray-700 font-medium"
              >
                <option value="">Choose</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Date of Birth */}
            <div className="bg-white rounded-2xl p-4">
              <label className="block text-gray-700 font-semibold mb-2">
                What is the date of birth of your child?
              </label>
              <input
                type="date"
                name="childDob"
                value={formData.childDob}
                onChange={handleChange}
                className="block w-full rounded-full bg-gray-200 p-2 px-4 text-gray-700 font-medium"
              />
            </div>

            {/* Radio Groups */}
            {[
              {
                key: 'repeatedGrade',
                label: 'Has your child ever repeated a grade?',
              },
              {
                key: 'hearingDifficulty',
                label: 'Does your child have HEARING DIFFICULTY?',
              },
              {
                key: 'rememberingDifficulty',
                label: 'Does your child have REMEMBERING DIFFICULTY?',
              },
              {
                key: 'communicationDifficulty',
                label: 'Does your child have COMMUNICATION DIFFICULTY?',
              },
            ].map(({ key, label }) => (
              <div className="bg-white rounded-2xl p-4" key={key}>
                <p className="text-gray-700 font-semibold mb-2">{label}</p>
                <div className="flex gap-6">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name={key}
                      value="Yes"
                      checked={formData[key as keyof typeof formData] === 'Yes'}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    Yes
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name={key}
                      value="No"
                      checked={formData[key as keyof typeof formData] === 'No'}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    No
                  </label>
                </div>
              </div>
            ))}
          </div>

          {/* Section 2: Understanding your child */}
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow-sm flex items-center">
              <div className="w-4 h-12 bg-primary-400 rounded-l-lg mr-2"></div>
              <h2 className="text-md font-semibold text-gray-700">
                SECTION 2: UNDERSTANDING YOUR CHILD
              </h2>
            </div>

            {understandingQuestions.map(({ key, question }) => (
              <div className="bg-white rounded-2xl p-4" key={key}>
                <p className="text-gray-700 font-semibold mb-3">{question}</p>
                <div className="space-y-2">
                  {answerOptions.map((option) => (
                    <label key={option} className="flex items-center">
                      <input
                        type="radio"
                        name={key}
                        value={option}
                        checked={
                          formData[key as keyof typeof formData] === option
                        }
                        onChange={handleChange}
                        className="mr-2"
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Submit */}
          <div className="text-center mt-6">
            <button
              type="submit"
              disabled={!formData.parentName || isLoading}
              className="rounded-2xl bg-primary-700 px-6 py-2 font-medium text-white hover:bg-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-800"
            >
              {isLoading ? 'Submitting...' : 'Submit'}
            </button>
            {error && <p className="text-red-600 mt-2">{error}</p>}
          </div>
        </form>
      </div>
    </section>
  )
}
