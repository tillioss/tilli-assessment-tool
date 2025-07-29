'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ensureAnonymousSession, createStudent } from '@/services/appwrite'

export default function Page() {
  const [formData, setFormData] = useState({
    studentName: '',
    school: '',
    grade: '',
    section: '',
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
      const student = await createStudent(formData)
      router.push(`/parent-questionnaire?studentId=${student.$id}`)
    } catch (err) {
      console.error(err)
      setError('Failed to login. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const schools = [
    'ABC Public School',
    'XYZ International School',
    'Sunshine Elementary',
    'Bright Future Academy',
    'Learning Tree School',
  ]

  const grades = [
    'Grade 1',
    'Grade 2',
    'Grade 3',
    'Grade 4',
    'Grade 5',
    'Grade 6',
    'Grade 7',
    'Grade 8',
  ]

  const sections = ['A', 'B', 'C', 'D', 'E']

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
          className="rounded-xl p-4 md:w-1/2 mt-4 space-y-6"
        >
          <p className="text-center text-base font-semibold text-gray-700">
            Please enter your details to start the assessment
          </p>

          {/* Student Name */}
          <div className="bg-white rounded-2xl p-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Student Name
            </label>
            <input
              type="text"
              name="studentName"
              value={formData.studentName}
              onChange={handleChange}
              placeholder="Enter student name"
              className="block w-full rounded-full bg-gray-200 p-2 px-4 text-gray-700 placeholder-gray-400 font-medium"
              required
            />
          </div>

          {/* School Dropdown */}
          <div className="bg-white rounded-2xl p-4">
            <label className="block text-gray-700 font-semibold mb-2">
              School
            </label>
            <select
              name="school"
              value={formData.school}
              onChange={handleChange}
              className="block w-full rounded-full bg-gray-200 p-2 px-4 text-gray-700 font-medium"
              required
            >
              <option value="">Select School</option>
              {schools.map((school) => (
                <option key={school} value={school}>
                  {school}
                </option>
              ))}
            </select>
          </div>

          {/* Grade Dropdown */}
          <div className="bg-white rounded-2xl p-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Grade
            </label>
            <select
              name="grade"
              value={formData.grade}
              onChange={handleChange}
              className="block w-full rounded-full bg-gray-200 p-2 px-4 text-gray-700 font-medium"
              required
            >
              <option value="">Select Grade</option>
              {grades.map((grade) => (
                <option key={grade} value={grade}>
                  {grade}
                </option>
              ))}
            </select>
          </div>

          {/* Section Dropdown */}
          <div className="bg-white rounded-2xl p-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Section
            </label>
            <select
              name="section"
              value={formData.section}
              onChange={handleChange}
              className="block w-full rounded-full bg-gray-200 p-2 px-4 text-gray-700 font-medium"
              required
            >
              <option value="">Select Section</option>
              {sections.map((section) => (
                <option key={section} value={section}>
                  {section}
                </option>
              ))}
            </select>
          </div>

          {/* Submit */}
          <div className="text-center mt-6">
            <button
              type="submit"
              disabled={
                !formData.studentName ||
                !formData.school ||
                !formData.grade ||
                !formData.section ||
                isLoading
              }
              className="rounded-2xl bg-primary-700 px-6 py-2 font-medium text-white hover:bg-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-800"
            >
              {isLoading ? 'Logging in...' : 'Start Assessment'}
            </button>
            {error && <p className="text-red-600 mt-2">{error}</p>}
          </div>
        </form>
      </div>
    </section>
  )
}
