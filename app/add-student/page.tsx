'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { parse, ParseResult } from 'papaparse'

type Student = {
  firstName: string
  lastName: string
  classCode: string
}

type CSVStudentRow = {
  firstName?: string
  lastName?: string
  'First Name'?: string
  'Last Name'?: string
}

export default function AddStudentPage() {
  const router = useRouter()
  const [students, setStudents] = useState<Student[]>([])
  const [classCode, setClassCode] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)
  const [newStudentsCount, setNewStudentsCount] = useState(0)

  useEffect(() => {
    const teacher = JSON.parse(localStorage.getItem('currentUser') || 'null')
    if (!teacher?.isTeacher || !teacher?.classCode) {
      router.push('/')
    } else {
      setClassCode(teacher.classCode)
      const storedStudents: Student[] = JSON.parse(localStorage.getItem('students') || '[]')
      setStudents(storedStudents.filter(s => s.classCode === teacher.classCode))
    }
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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    parse<CSVStudentRow>(file, {
      header: true,
      complete: (results: ParseResult<CSVStudentRow>) => {
        const newStudents = results.data
          .map(row => ({
            firstName: row.firstName || row['First Name'] || '',
            lastName: row.lastName || row['Last Name'] || '',
            classCode
          }))
          .filter(s => s.firstName.trim() || s.lastName.trim())

        if (newStudents.length > 0) {
          const updatedStudents = [...students, ...newStudents]
          setStudents(updatedStudents)
          setNewStudentsCount(newStudents.length)
          localStorage.setItem('students', JSON.stringify(updatedStudents))
          setShowSuccess(true)
          setTimeout(() => setShowSuccess(false), 3000)
          
          // Reset file input
          const fileInput = e.target as HTMLInputElement
          fileInput.value = ''
        } else {
          alert('No valid student data found in CSV')
        }
      },
      error: (error) => {
        alert(`CSV Error: ${error.message}`)
      }
    })
  }

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center px-8 py-10 overflow-y-auto mt-25">
      {/* Background Image */}
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

      {/* Blue Success Pop-up Modal */}
      {showSuccess && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-8 py-4 rounded-lg shadow-xl z-50 animate-fade-in">
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <span className="text-xl font-bold">
              Upload Successful! Added {newStudentsCount} student(s)
            </span>
          </div>
        </div>
      )}

      {/* Header Section */}
      <div className="relative z-10 text-center">
        <h1 className="text-5xl font-extrabold text-white drop-shadow-[3px_3px_0px_black] mb-4">
          Instructor Portal
        </h1>
        <p className="text-white text-xl drop-shadow-[2px_2px_0px_black] mb-6">
          Class Code: <span className="font-bold">{classCode}</span>
        </p>
      </div>

      {/* Upload Controls Section */}
      <div className="relative z-10 flex flex-col sm:flex-row gap-4 mb-8">
        <label className="bg-blue-600 hover:bg-blue-800 text-white px-6 py-3 rounded text-xl transition cursor-pointer flex items-center justify-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="17 8 12 3 7 8"></polyline>
            <line x1="12" y1="3" x2="12" y2="15"></line>
          </svg>
          Upload CSV
          <input
            type="file"
            accept=".csv,.xlsx,.xls"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
        <button
          onClick={handleAddStudent}
          className="bg-neutral-700 hover:bg-neutral-900 text-white px-8 py-3 rounded text-xl transition flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Add Student
        </button>
      </div>

      {/* Student Grid Section */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-screen-xl w-full pb-20">
        {students.map((s, i) => (
          <div
            key={`student-${i}`}
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
              className="w-full mb-3 p-2 rounded text-black bg-white focus:outline-none focus:ring-2 focus:ring-green-600"
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
              className="w-full mb-4 p-2 rounded text-black bg-white focus:outline-none focus:ring-2 focus:ring-green-600"
            />

            <div className="flex justify-center gap-4">
              <button
                onClick={() => handleSaveStudent(i, s.firstName, s.lastName)}
                className="bg-green-700 hover:bg-green-900 text-white px-4 py-2 rounded transition"
              >
                Save
              </button>
              <button
                onClick={() => handleDeleteStudent(i)}
                className="bg-red-600 hover:bg-red-800 text-white px-4 py-2 rounded transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Back to Login Button */}
      <button
        onClick={handleBackToLogin}
        className="fixed bottom-6 left-6 bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded transition z-20"
      >
        Back to Login
      </button>

      {/* Add global styles for the fade-in animation */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </main>
  )
}
