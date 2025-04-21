'use client'
import { Fredoka } from 'next/font/google'
import './globals.css'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import React from 'react'

const fredoka = Fredoka({ subsets: ['latin-ext'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${fredoka.className} bg-primary-100 tracking-wide`}
        tabIndex={-1}
      >
        <title>Tilli</title>
        <main className="md:h-screen">
          <section
            style={{ backgroundImage: `url('/bg.png')`, backgroundSize: '80%' }}
          >
            {children}
          </section>
        </main>
      </body>
    </html>
  )
}
