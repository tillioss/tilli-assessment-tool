'use client'
import React from 'react'
import AngerAssessment from '@/app/components/angerAssessment'

export default function Page() {
  const isLoading = false
  return (
    <>
      <title>Tilli | Assessment</title>

      <>
        {isLoading ? (
          <div className="h-screen flex items-center justify-center text-2xl w-full">
            Loading...
          </div>
        ) : (
          <AngerAssessment />
        )}
      </>
    </>
  )
}
