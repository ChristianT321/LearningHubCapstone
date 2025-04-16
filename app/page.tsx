'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface Teacher {
  email: string
  classCode: string
  isTeacher: boolean
}

interface Student {
  firstName: string
  lastName: string
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

  useEffect(() => {
    if (!localStorage.getItem('teachers')) localStorage.setItem('teachers', JSON.stringify([]))
    if (!localStorage.getItem('students')) localStorage.setItem('students', JSON.stringify([]))
  }, [])

  const handleSubmit = () => {
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

      const teachers: Teacher[] = JSON.parse(localStorage.getItem('teachers') || '[]')
      if (teachers.some(t => t.classCode === classCode)) {
        setError('Class code already exists')
        return
      }

      const newTeacher: Teacher = { email, classCode, isTeacher: true }
      localStorage.setItem('teachers', JSON.stringify([...teachers, newTeacher]))
      localStorage.setItem('currentUser', JSON.stringify(newTeacher))
      router.push('/add-student')
    } else {
      if (!firstName || !lastName) {
        setError('Please enter both your first and last name')
        return
      }

      const teachers: Teacher[] = JSON.parse(localStorage.getItem('teachers') || '[]')
      const students: Student[] = JSON.parse(localStorage.getItem('students') || '[]')

      const matchingClass = teachers.find(t => t.classCode === classCode)
      const matchingStudent = students.find(
        s => s.firstName === firstName && s.lastName === lastName && s.classCode === classCode
      )

      if (!matchingClass) {
        setError('Invalid class code')
        return
      }

      if (!matchingStudent) {
        setError('Name not recognized, please try again')
        return
      }

      localStorage.setItem('currentUser', JSON.stringify(matchingStudent))
      router.push('/home')
    }
  }

  return (
    <main className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background image container - DO NOT MODIFY */}
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

      {/* Content */}
      <div className="relative z-10 w-full max-w-xl px-6 text-center">
        <h1 className="text-4xl font-extrabold text-white drop-shadow-[3px_3px_0px_black] leading-tight">
          Welcome to the <br />
          The Great Bear Rainforest Learning Hub!
        </h1>

        <p className="text-white text-xl mt-6 drop-shadow-[2px_2px_0px_black]">
          Please enter your name to get started
        </p>

        {error && (
          <p className="text-red-600 text-xl font-semibold mt-6">
            {error}
          </p>
        )}

        <div className="mt-6 flex flex-col gap-4 items-center">
          {isTeacher ? (
            <>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full max-w-md px-4 py-2 rounded text-lg border border-gray-300"
              />
              <input
                type="text"
                placeholder="Create a Class Code"
                value={classCode}
                onChange={(e) => setClassCode(e.target.value)}
                className="w-full max-w-md px-4 py-2 rounded text-lg border border-gray-300"
              />
            </>
          ) : (
            <>
              <input
                type="text"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full max-w-md px-4 py-2 rounded text-lg border border-gray-300"
              />
              <input
                type="text"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full max-w-md px-4 py-2 rounded text-lg border border-gray-300"
              />
              <input
                type="text"
                placeholder="Class Code"
                value={classCode}
                onChange={(e) => setClassCode(e.target.value)}
                className="w-full max-w-md px-4 py-2 rounded text-lg border border-gray-300"
              />
            </>
          )}

          <button
            onClick={handleSubmit}
            className="bg-red-600 hover:bg-red-700 text-white text-xl font-semibold px-8 py-2 rounded mt-4"
          >
            Submit
          </button>
        </div>

        <div className="mt-6 text-white text-lg">
          {isTeacher ? "Are you a student?" : "Are you a teacher?"}{' '}
          <button
            onClick={() => setIsTeacher(!isTeacher)}
            className="underline font-semibold"
          >
            {isTeacher ? "Student Login" : "Teacher Signup"}
          </button>
        </div>
      </div>
    </main>
  )
}