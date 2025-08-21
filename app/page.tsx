'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Teacher {
  id?: number
  email: string
  classCode: string
  isTeacher: boolean
}

interface Student {
  id?: number
  firstName: string
  lastName: string
  email?: string
  classCode: string
}

export default function LoginPage() {
  const router = useRouter()
  const [isTeacher, setIsTeacher] = useState(false)
  const [email, setEmail] = useState('')
  const [classCode, setClassCode] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    setError('')

    if (!classCode) {
      setError('Please enter a class code')
      return
    }

    if (isTeacher) {
      if (!email) {
        setError('Please enter your email')
        return
      }

      try {
        const response = await fetch('http://localhost:3001/teacher', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, classCode }),
        })

        if (response.ok) {
          const backendTeacher = await response.json()
          const frontendTeacher: Teacher = {
            id: backendTeacher.id,
            email: backendTeacher.email,
            classCode: backendTeacher.class_code || backendTeacher.classCode,
            isTeacher: true
          }
          localStorage.setItem('currentUser', JSON.stringify(frontendTeacher))
          router.push('/add-student')
        } else {
          const errData = await response.json()
          setError(errData.error || 'Failed to create teacher')
        }
      } catch (err) {
        console.error(err)
        setError('Failed to connect to server')
      }
    } else {
      if (!firstName || !lastName) {
        setError('Please enter both your first and last name')
        return
      }

      try {
        const response = await fetch('http://localhost:3001/student/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ firstName, lastName, classCode }),
        })

        if (!response.ok) {
          const errData = await response.json()
          setError(errData.error || 'Name not recognized or invalid class code')
          return
        }

        const backendStudent = await response.json()
        const frontendStudent: Student = {
          id: backendStudent.id,
          firstName: backendStudent.first_name || backendStudent.firstName,
          lastName: backendStudent.last_name || backendStudent.lastName,
          classCode: backendStudent.class_code || backendStudent.classCode
        }
        localStorage.setItem('currentUser', JSON.stringify(frontendStudent))
        router.push('/home')
      } catch (err) {
        console.error(err)
        setError('Failed to connect to server')
      }
    }
  }

  const toggleUserType = () => {
    setIsTeacher(!isTeacher)
    setError('')
  }

  return (
    <main className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <div className="fixed inset-0 z-0">
        <Image
          src="/woods.png"
          alt="Background"
          fill
          priority
          className="object-cover"
          style={{ objectPosition: 'center' }}
        />
      </div>

      <div className="relative z-10 w-full max-w-xl px-6 text-center">
        <h1 className="text-4xl font-extrabold text-white drop-shadow-[3px_3px_0px_black] leading-tight mb-2">
          Welcome to <br />
          The Great Bear Rainforest Learning Hub!
        </h1>

        {error ? (
          <p className="text-red-600 text-xl font-bold mt-4 mb-2 drop-shadow-[1px_1px_0px_black]">
            {error}
          </p>
        ) : (
          <p className="text-white text-xl mt-4 mb-2 drop-shadow-[2px_2px_0px_black]">
            Please enter your information to get started!
          </p>
        )}

        <div className="mt-4 flex flex-col gap-4 items-center">
          {isTeacher ? (
            <>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full max-w-md px-4 py-3 text-xl rounded border border-gray-300 bg-white text-black shadow"
              />
              <input
                type="text"
                placeholder="Create a Class Code"
                value={classCode}
                onChange={(e) => setClassCode(e.target.value)}
                className="w-full max-w-md px-4 py-3 text-xl rounded border border-gray-300 bg-white text-black shadow"
              />
            </>
          ) : (
            <>
              <input
                type="text"
                placeholder="Class Code"
                value={classCode}
                onChange={(e) => setClassCode(e.target.value)}
                className="w-full max-w-md px-4 py-3 text-xl rounded border border-gray-300 bg-white text-black shadow"
              />
              <input
                type="text"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full max-w-md px-4 py-3 text-xl rounded border border-gray-300 bg-white text-black shadow"
              />
              <input
                type="text"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full max-w-md px-4 py-3 text-xl rounded border border-gray-300 bg-white text-black shadow"
              />
            </>
          )}

          <button
            onClick={handleSubmit}
            className="bg-red-600 hover:bg-red-700 text-white text-2xl font-bold px-12 py-3 rounded shadow mt-2"
          >
            Submit
          </button>
        </div>

         <div className="mt-6 text-white text-lg font-medium">
          {isTeacher ? "Are you a student?" : "Are you a new teacher?"}{' '}
          <button onClick={toggleUserType} className="underline font-bold">
            {isTeacher ? "Student Login" : "Teacher Signup"}
          </button>
        </div>

        {isTeacher && (
          <div className="mt-8 text-white text-lg font-medium">
            Returning Teacher?{' '}
            <Link
              href="/teacher-portal"
              className="underline font-bold"
            >
              View Class & Scores
            </Link>
          </div>
        )}
      </div>
    </main>
  )
}