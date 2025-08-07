'use client'
import Link from 'next/link'
import React, { Suspense, useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Button from '../components/button'
import instruction1 from '@/assets/audios/instructions/instruction_1.mp3'
import instruction2 from '@/assets/audios/instructions/instruction_2.mp3'
import instruction3 from '@/assets/audios/instructions/instruction_3.mp3'
import instruction4 from '@/assets/audios/instructions/instruction_4.mp3'
import instruction5 from '@/assets/audios/instructions/instruction_5.mp3'
import instruction6 from '@/assets/audios/instructions/instruction_6.mp3'
import AudioIcon from '@/assets/svg/AudioIcon'

enum Step {
  PLAY,
  INSTRUCTIONS,
}

export default function Page() {
  return (
    <Suspense fallback={null}>
      <PageContent />
    </Suspense>
  )
}

const instructionAudios = [
  instruction1,
  instruction2,
  instruction3,
  instruction4,
  instruction5,
  instruction6,
]

function PageContent() {
  const [step, setStep] = useState(Step.PLAY)
  const router = useRouter()
  const searchParams = useSearchParams()
  const studentId = searchParams.get('studentId')

  useEffect(() => {
    if (!studentId) {
      router.replace('/login')
    }
  }, [studentId, router])

  function Instructions() {
    return (
      <>
        {/* Tilli image - hidden on mobile, visible on larger screens */}
        <div className="hidden md:block absolute left-2 bottom-0 w-32 xl:w-auto">
          <img src="/tilli.png" alt="" width={180} />
        </div>

        {/* Mobile-friendly Tilli image */}
        <div className="md:hidden absolute right-2 bottom-2 w-16">
          <img src="/tilli.png" alt="" width={80} />
        </div>

        <div className="justify-center items-center flex flex-col h-[90vh] px-4">
          <h2 className="text-xl font-semibold text-gray-700 text-center mb-10">
            Read the instructions carefully
          </h2>

          <div className="bg-white p-4 md:p-6 rounded-xl text-left relative w-full max-w-md">
            <div className="absolute top-4 right-4 text-gray-500 cursor-pointer hover:text-black">
              <button
                onClick={() => {
                  let currentIndex = 0

                  const playNextAudio = () => {
                    if (currentIndex < instructionAudios.length) {
                      const audio = new Audio(instructionAudios[currentIndex])
                      audio.onended = () => {
                        currentIndex++
                        playNextAudio()
                      }
                      audio.play()
                    }
                  }

                  playNextAudio()
                }}
                className="text-gray-500 hover:text-black transition-colors"
              >
                <AudioIcon width={32} height={32} />
              </button>
            </div>
            <h3 className="text-lg md:text-xl font-semibold mb-4 text-gray-700 leading-snug">
              Here are the instructions
              <br />
              to the assessment
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600 text-sm">
              <li>Read or listen to each question carefully.</li>
              <li>Read or listen to the options one by one.</li>
              <li>Take your time for each question, no need to rush.</li>
              <li>
                Tap on{' '}
                <span className="inline-block align-middle">
                  <AudioIcon width={20} height={20} />
                </span>{' '}
                to listen.
              </li>
              <li>
                Answer is only saved when you tap –
                <span className="ml-2 px-2 py-1 rounded-full bg-primary-700 text-white text-sm font-medium">
                  Next
                </span>
              </li>
            </ul>
          </div>

          <Button
            onClick={() => router.push(`/assessment?studentId=${studentId}`)}
          >
            Start
          </Button>
        </div>
      </>
    )
  }

  function Play() {
    return (
      <>
        {/* Tilli image - hidden on mobile, visible on larger screens */}
        <div className="hidden md:block absolute left-2 bottom-0 w-32 xl:w-auto">
          <img src="/tilli.png" alt="" width={180} />
        </div>

        {/* Mobile-friendly Tilli image */}
        <div className="md:hidden absolute right-2 bottom-2 w-16">
          <img src="/tilli.png" alt="" width={80} />
        </div>

        <div className="justify-center items-center flex flex-col h-[90vh] px-4">
          <p className="md:my-12 text-4xl md:text-6xl my-6 text-center font-medium">
            It is the kid&apos;s turn!
          </p>
          <Button onClick={() => setStep(Step.INSTRUCTIONS)}>PLAY</Button>
        </div>
      </>
    )
  }

  return (
    <>
      <div className="bg-primary-400 w-full px-4">
        <div className="flex justify-center w-full">
          <Link href="/">
            <div className="flex">
              <img
                src="/logo.png"
                width={40}
                height={300}
                alt="logo"
                className="self-center"
              />
              <p className="text-md md:text-xl text-white font-semibold p-3">
                Assessment
              </p>
            </div>
          </Link>
        </div>
      </div>
      {step === Step.PLAY && <Play />}
      {step === Step.INSTRUCTIONS && <Instructions />}
    </>
  )
}
