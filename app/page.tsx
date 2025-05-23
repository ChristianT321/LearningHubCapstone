// This page was made by referencing slides an examples given in web dev 2, while primarily basing it off of my final project in the same class. Copilot helped fill out some details.
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
          {isTeacher ? "Are you a student?" : "Are you a teacher?"}{' '}
          <button
            onClick={toggleUserType}
            className="underline font-bold"
          >
            {isTeacher ? "Student Login" : "Teacher Signup"}
          </button>
        </div>
      </div>
    </main>
  )
}