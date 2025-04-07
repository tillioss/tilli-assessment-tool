'use client'
import React from 'react'
import Login from '@/app/components/Login'

export default function Page() {
  const isLoading = false
  return (
    <>
      <title>Tilli | Login</title>

      <>
        {isLoading ? (
          <div className="h-screen flex items-center justify-center text-2xl w-full">
            Loading...
          </div>
        ) : (
          <Login />
        )}
      </>
    </>
  )
}
