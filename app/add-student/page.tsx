'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { parse } from 'papaparse'
import * as XLSX from 'xlsx'

type Student = { 
  id?: number
  firstName: string
  lastName: string
  classCode: string
}

type SpreadsheetStudentRow = {
  [key: string]: unknown
}

export default function AddStudentPage() {
  const router = useRouter()
  const [students, setStudents] = useState<Student[]>([])
  const [classCode, setClassCode] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)
  const [newStudentsCount, setNewStudentsCount] = useState(0)
  const [recentlySaved, setRecentlySaved] = useState<number[]>([])
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    const loadStudents = async () => {
      try {
        const teacherRaw = localStorage.getItem('currentUser')
        if (!teacherRaw) {
          router.push('/')
          return
        }
        const teacher = JSON.parse(teacherRaw)
        
        const code = teacher.classCode || teacher.class_code
        
        if (!teacher?.isTeacher || !code) {
          router.push('/')
          return
        }
        setClassCode(code)

        const response = await fetch(`http://localhost:3001/students/${code}`)
        if (!response.ok) {
          throw new Error('Failed to fetch students')
        }
        const studentsFromBackend = await response.json()
        setStudents(studentsFromBackend)
      } catch (err) {
        console.error('Error loading students:', err)
        router.push('/')
      } finally {
        setIsLoading(false)
      }
    }

    loadStudents()
  }, [router])

  const showSaveFeedback = (index: number) => {
    setRecentlySaved(prev => [...prev, index])
    setTimeout(() => {
      setRecentlySaved(prev => prev.filter(i => i !== index))
    }, 2000)
  }

  const handleAddStudent = () => {
    setStudents(prev => [...prev, { firstName: '', lastName: '', classCode }])
  }

  const handleSaveStudent = async (index: number, firstName: string, lastName: string) => {
    const studentData = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      classCode,
    }

    try {
      let updatedStudent
      if (students[index].id) {
        const response = await fetch(`http://localhost:3001/student/${students[index].id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(studentData),
        })
        if (!response.ok) throw new Error('Failed to update student')
        updatedStudent = await response.json()
      } else {
        const response = await fetch('http://localhost:3001/student', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(studentData),
        })
        if (!response.ok) throw new Error('Failed to create student')
        updatedStudent = await response.json()
      }

      const updatedStudents = [...students]
      updatedStudents[index] = updatedStudent
      setStudents(updatedStudents)
      showSaveFeedback(index)
    } catch (err) {
      console.error('Error saving student:', err)
      alert('Failed to save student')
    }
  }

  const handleSaveAll = async () => {
    if (students.length === 0) {
      alert('No students to save')
      return
    }

    try {
      const studentsToSave = students.map(student => ({
        firstName: student.firstName.trim(),
        lastName: student.lastName.trim(),
        classCode: student.classCode,
        id: student.id
      }));

      const response = await fetch('http://localhost:3001/students/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ students: studentsToSave }),
      });
      
      if (!response.ok) throw new Error('Bulk save failed');
      
      const savedStudents = await response.json();
      setStudents(savedStudents);
      setNewStudentsCount(savedStudents.length);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);

      savedStudents.forEach((student: Student, index: number) => {
        showSaveFeedback(index);
      });
    } catch (err) {
      console.error('Error saving all students:', err);
      alert('Failed to save all students');
    }
  };

  const handleDeleteStudent = async (index: number) => {
    const student = students[index]
    try {
      if (student.id) {
        const response = await fetch(`http://localhost:3001/student/${student.id}`, {
          method: 'DELETE',
        })
        if (!response.ok) throw new Error('Failed to delete student')
      }
      
      const updatedStudents = students.filter((student: Student, i: number) => i !== index)
      setStudents(updatedStudents)
    } catch (err) {
      console.error('Error deleting student:', err)
      alert('Failed to delete student')
    }
  }

  const handleBackToLogin = () => {
    localStorage.removeItem('currentUser')
    router.push('/')
  }

  const normalizeName = (row: SpreadsheetStudentRow, keys: string[]) => {
    for (const key of keys) {
      const value = row[key]
      if (typeof value === 'string' && value.trim()) return value.trim()
    }
    return ''
  }

  const processStudentData = async (data: SpreadsheetStudentRow[]) => {
    const firstNameKeys = [
      'firstName', 'First Name', 'first name', 'FIRST NAME',
      'First', 'first', 'Given Name', 'given name', 'GIVEN NAME',
      'FName', 'fname',
    ]

    const lastNameKeys = [
      'lastName', 'Last Name', 'last name', 'LAST NAME',
      'Last', 'last', 'Surname', 'surname', 'SURNAME',
      'Family Name', 'family name', 'LName', 'lname',
    ]

    const newStudents = data
      .map(row => {
        const firstName = normalizeName(row, firstNameKeys)
        const lastName = normalizeName(row, lastNameKeys)
        return { firstName, lastName, classCode }
      })
      .filter(s => s.firstName || s.lastName)

    if (newStudents.length > 0) {
      const existingKeys = new Set(
        students.map(s => `${s.firstName.toLowerCase()}|${s.lastName.toLowerCase()}`)
      )
      const filteredNewStudents = newStudents.filter(s => {
        const key = `${s.firstName.toLowerCase()}|${s.lastName.toLowerCase()}`
        return !existingKeys.has(key)
      })

      if (filteredNewStudents.length === 0) {
        alert('All students in the file are already added.')
        return
      }

      try {
        const response = await fetch('http://localhost:3001/students/bulk', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ students: filteredNewStudents }),
        })
        
        if (!response.ok) throw new Error('Bulk upload failed')
        
        const insertedStudents = await response.json()
        setStudents(prev => [...prev, ...insertedStudents])
        setNewStudentsCount(insertedStudents.length)
        setShowSuccess(true)
        setTimeout(() => setShowSuccess(false), 3000)
      } catch (err) {
        console.error('Bulk upload error:', err)
        alert('Failed to upload students')
      }
    } else {
      alert('No valid student data found in file.')
    }
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
        const data = await file.arrayBuffer()
        const workbook = XLSX.read(data)
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]]
        const jsonData: SpreadsheetStudentRow[] = XLSX.utils.sheet_to_json(firstSheet)
        await processStudentData(jsonData)
      } else if (file.name.endsWith('.csv')) {
        parse<SpreadsheetStudentRow>(file, {
          header: true,
          complete: async results => {
            if (results.data && results.data.length > 0) {
              await processStudentData(results.data)
            } else {
              alert('No data found in CSV file.')
            }
          },
          error: err => {
            console.error('CSV parsing error:', err)
            alert(`Error parsing CSV: ${err.message}`)
          },
        })
      } else {
        alert('Please upload a .csv, .xlsx, or .xls file.')
      }
    } catch (error) {
      console.error('File processing error:', error)
      alert('Error processing file. Please check the file format and try again.')
    } finally {
      e.target.value = ''
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <div className="text-white text-2xl">Loading students...</div>
      </div>
    )
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

      {showSuccess && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-8 py-4 rounded-lg shadow-xl z-50 animate-fade-in">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <span className="text-xl font-bold">
              Upload Successful! Added {newStudentsCount} student
              {newStudentsCount > 1 ? 's' : ''}
            </span>
          </div>
        </div>
      )}

      <div className="relative z-10 text-center">
        <h1 className="text-5xl font-extrabold text-white drop-shadow-[3px_3px_0px_black] mb-4">
          Instructor Portal
        </h1>
        <p className="text-white text-xl drop-shadow-[2px_2px_0px_black] mb-6">
          Class Code: <span className="font-bold">{classCode}</span>
        </p>
      </div>

      <div className="relative z-10 flex flex-col sm:flex-row gap-4 mb-8">
        <label
          htmlFor="file-upload"
          className="bg-blue-600 hover:bg-blue-800 text-white px-6 py-3 rounded text-xl transition cursor-pointer flex items-center justify-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="17 8 12 3 7 8"></polyline>
            <line x1="12" y1="3" x2="12" y2="15"></line>
          </svg>
          Upload CSV/Excel
        </label>
        <input
          id="file-upload"
          type="file"
          accept=".csv,.xlsx,.xls"
          onChange={handleFileUpload}
          className="hidden"
        />

        <button
          onClick={handleAddStudent}
          className="bg-neutral-700 hover:bg-neutral-900 text-white px-8 py-3 rounded text-xl transition flex items-center justify-center gap-2"
          aria-label="Add Student"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Add Student
        </button>
      </div>

      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-screen-xl w-full pb-20">
        {students.map((student, i) => (
          <div
            key={`student-${student.id || i}`}
            className="bg-green-950 bg-opacity-80 border-4 border-black text-white text-center p-6 rounded shadow-xl relative"
          >
            {recentlySaved.includes(i) && (
              <div className="absolute -top-3 -right-3 bg-green-500 text-white rounded-full w-10 h-10 flex items-center justify-center animate-pop">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
            )}

            <h2 className="text-2xl font-semibold mb-4">Student {i + 1}</h2>

            <input
              type="text"
              placeholder="First name"
              value={student.firstName}
              onChange={e => {
                const updated = [...students]
                updated[i] = { ...updated[i], firstName: e.target.value }
                setStudents(updated)
              }}
              className="w-full mb-3 p-2 rounded text-black bg-white focus:outline-none focus:ring-2 focus:ring-green-600"
            />

            <input
              type="text"
              placeholder="Last name"
              value={student.lastName}
              onChange={e => {
                const updated = [...students]
                updated[i] = { ...updated[i], lastName: e.target.value }
                setStudents(updated)
              }}
              className="w-full mb-4 p-2 rounded text-black bg-white focus:outline-none focus:ring-2 focus:ring-green-600"
            />

            <div className="flex justify-center gap-4">
              <button
                onClick={() =>
                  handleSaveStudent(i, student.firstName, student.lastName)
                }
                className="bg-green-700 hover:bg-green-900 text-white px-4 py-2 rounded transition flex items-center gap-1"
                aria-label={`Save Student ${i + 1}`}
              >
                Save
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                  <polyline points="17 21 17 13 7 13 7 21" />
                  <polyline points="7 3 7 8 15 8" />
                </svg>
              </button>

              <button
                onClick={() => handleDeleteStudent(i)}
                className="bg-red-600 hover:bg-red-800 text-white px-4 py-2 rounded transition"
                aria-label={`Delete Student ${i + 1}`}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="fixed bottom-6 left-6 flex gap-4 z-20">
        <button
          onClick={handleBackToLogin}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded transition"
        >
          Back to Login
        </button>

        <button
          onClick={handleSaveAll}
          className={`bg-green-600 hover:bg-green-800 text-white px-4 py-2 rounded transition flex items-center gap-1 ${
            students.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          aria-label="Save All Students"
          disabled={students.length === 0}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
            <polyline points="17 21 17 13 7 13 7 21" />
            <polyline points="7 3 7 8 15 8" />
          </svg>
          Save All
        </button>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes pop {
          0% {
            transform: scale(0.5);
            opacity: 0;
          }
          50% {
            transform: scale(1.2);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out forwards;
        }
        .animate-pop {
          animation: pop 0.3s ease-out forwards;
        }
      `}</style>
    </main>
  )
}