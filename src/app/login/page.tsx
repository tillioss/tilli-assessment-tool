'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ensureAnonymousSession, createParticipant } from '@/services/appwrite'

export default function Page() {
  const [formData, setFormData] = useState({
    childName: '',
    parentName: '',
    childSex: '',
    childDob: '',
    repeatedGrade: '',
    hearingDifficulty: '',
    rememberingDifficulty: '',
    communicationDifficulty: '',
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
      await ensureAnonymousSession()
      const participant = await createParticipant(formData)
      router.push(`/instructions?participantId=${participant.$id}`)
    } catch (err) {
      console.error(err)
      setError('Failed to submit. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section>
      <title>Tilli Assessment | Sign Up</title>
      <div className="bg-primary-400 w-full px-4">
        <div className="flex justify-center w-full">
          <Link href="/">
            <p className="text-md md:text-xl text-white font-semibold p-3">
              Parent Details
            </p>
          </Link>
        </div>
      </div>
      <div className="mx-auto flex flex-col items-center justify-center px-6 md:py-8 lg:py-0 text-gray-500 overflow-auto">
        <form
          onSubmit={handleSubmit}
          className="rounded-xl p-4 md:w-1/2 mt-4 space-y-4"
        >
          <p className="text-center text-base font-semibold text-gray-700">
            ONLY parents / guardians are supposed to fill this.
          </p>

          {/* Input Groups */}
          {[
            { label: 'What is your child’s name?', name: 'childName' },
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

          {/* Submit */}
          <div className="text-center mt-6">
            <button
              type="submit"
              disabled={
                !formData.childName || !formData.parentName || isLoading
              }
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
