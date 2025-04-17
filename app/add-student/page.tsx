'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function AddStudentPage() {
  const router = useRouter()
  const [students, setStudents] = useState<{ firstName: string; lastName: string; classCode: string }[]>([])
  const [classCode, setClassCode] = useState('')

  useEffect(() => {
    const teacher = JSON.parse(localStorage.getItem('currentUser') || 'null')
    if (!teacher || !teacher.isTeacher || !teacher.classCode) {
      router.push('/')
    } else {
      setClassCode(teacher.classCode)
    }

    const storedStudents = JSON.parse(localStorage.getItem('students') || '[]')
    setStudents(storedStudents.filter((s: { firstName: string; lastName: string; classCode: string }) => s.classCode === teacher.classCode))
  }, [router])

  const handleAddStudent = () => {
    setStudents(prev => [...prev, { firstName: '', lastName: '', classCode }])
  }

  const handleSaveStudent = (index: number, firstName: string, lastName: string) => {
    const updatedStudents = [...students]
    updatedStudents[index] = { firstName, lastName, classCode }
    setStudents(updatedStudents)
    localStorage.setItem('students', JSON.stringify(updatedStudents))
  }

  const handleDeleteStudent = (index: number) => {
    const updatedStudents = students.filter((_, i) => i !== index)
    setStudents(updatedStudents)
    localStorage.setItem('students', JSON.stringify(updatedStudents))
  }

  const handleBackToLogin = () => {
    localStorage.removeItem('currentUser')
    router.push('/')
  }

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center px-8 py-10 overflow-y-auto mt-25">
      <div className="fixed inset-0 z-0">
        <Image
          src="/teacherportal.png"
          alt="Background"
          fill
          priority
          className="object-cover"
          style={{ objectPosition: 'center' }}
        />
      </div>

      <div className="relative z-10 text-center">
        <h1 className="text-5xl font-extrabold text-white drop-shadow-[3px_3px_0px_black] mb-4">
          Instructor Portal
        </h1>

        <p className="text-white text-xl drop-shadow-[2px_2px_0px_black] mb-6">
          Class Code: <span className="font-bold">{classCode}</span>
        </p>

        <button
          onClick={handleAddStudent}
          className="bg-neutral-700 text-white px-8 py-3 rounded text-xl hover:bg-neutral-900 transition mb-10"
        >
          Add a student
        </button>

      </div>

      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-screen-xl w-full pb-20">
        {students.map((s, i) => (
          <div
            key={i}
            className="bg-green-950 bg-opacity-80 border-4 border-black text-white text-center p-6 rounded shadow-xl"
          >
            <h2 className="text-2xl font-semibold mb-4">Student {i + 1}</h2>
            <input
              type="text"
              placeholder="First name"
              value={s.firstName}
              onChange={(e) => {
              const updated = [...students]
              updated[i].firstName = e.target.value
              setStudents(updated)
              }}
              className="w-full mb-3 p-2 rounded text-black bg-white"
          />
          <input
            type="text"
            placeholder="Last name"
            value={s.lastName}
            onChange={(e) => {
              const updated = [...students]
              updated[i].lastName = e.target.value
              setStudents(updated)
              }}
              className="w-full mb-4 p-2 rounded text-black bg-white"
            />

            <div className="flex justify-center gap-4">
              <button
                onClick={() => handleSaveStudent(i, s.firstName, s.lastName)}
                className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-900 transition"
              >
                Save Student
              </button>
              <button
                onClick={() => handleDeleteStudent(i)}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-800 transition"
              >
                Delete Student
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handleBackToLogin}
        className="fixed bottom-6 left-6 bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition z-20"
      >
        Back to Login
      </button>
    </main>
  )
}
