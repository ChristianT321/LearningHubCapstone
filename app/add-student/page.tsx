'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AddStudentPage() {
  const router = useRouter()
  const [students, setStudents] = useState<{ firstName: string; lastName: string; classCode: string }[]>([])
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [classCode, setClassCode] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const teacher = JSON.parse(localStorage.getItem('currentUser') || 'null')
    if (!teacher || !teacher.isTeacher || !teacher.classCode) {
      router.push('/')
    } else {
      setClassCode(teacher.classCode)
    }

    const storedStudents = JSON.parse(localStorage.getItem('students') || '[]')
    setStudents(storedStudents)
  }, [router])

  const handleAddStudent = () => {
    setError('')
    if (!firstName || !lastName) {
      setError('Please fill in both first and last names.')
      return
    }

    const newStudent = { firstName, lastName, classCode }
    const updatedStudents = [...students, newStudent]
    setStudents(updatedStudents)
    localStorage.setItem('students', JSON.stringify(updatedStudents))

    setFirstName('')
    setLastName('')
  }

  const handleBackToLogin = () => {
    localStorage.removeItem('currentUser')
    router.push('/')
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4">Add Student to Class</h1>
        <p className="text-center text-gray-500 mb-6">Class Code: <strong>{classCode}</strong></p>

        <input
          type="text"
          placeholder="Student First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full mb-3 p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="Student Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="w-full mb-4 p-2 border border-gray-300 rounded"
        />

        <button
          onClick={handleAddStudent}
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 transition"
        >
          Add Student
        </button>

        {error && <p className="text-red-600 text-center mt-4">{error}</p>}

        {students.length > 0 && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Students in Class:</h2>
            <ul className="list-disc ml-6 text-gray-700">
              {students.filter(s => s.classCode === classCode).map((s, i) => (
                <li key={i}>{s.firstName} {s.lastName}</li>
              ))}
            </ul>
          </div>
        )}

        <button
          onClick={handleBackToLogin}
          className="w-full mt-6 bg-gray-300 text-gray-800 p-2 rounded hover:bg-gray-400 transition"
        >
          Back to Login
        </button>
      </div>
    </main>
  )
}
