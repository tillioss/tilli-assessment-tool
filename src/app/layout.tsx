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
        <main className="min-h-screen">
          <section
            className="min-h-screen relative"
            style={{
              backgroundImage: `url('/bg.png')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          >
            {children}
          </section>
        </main>
      </body>
    </html>
  )
}
