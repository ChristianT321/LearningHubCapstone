'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { parse } from 'papaparse'
import * as XLSX from 'xlsx'

type Student = {
  firstName: string
  lastName: string
  classCode: string
}

type SpreadsheetStudentRow = {
  firstName?: string
  'First Name'?: string
  'first name'?: string
  'FIRST NAME'?: string
  'First'?: string
  'first'?: string
  'Given Name'?: string
  'given name'?: string
  'GIVEN NAME'?: string
  'FName'?: string
  'fname'?: string
  lastName?: string
  'Last Name'?: string
  'last name'?: string
  'LAST NAME'?: string
  'Last'?: string
  'last'?: string
  'Surname'?: string
  'surname'?: string
  'SURNAME'?: string
  'Family Name'?: string
  'family name'?: string
  'LName'?: string
  'lname'?: string
  [key: string]: unknown
}

export default function AddStudentPage() {
  const router = useRouter()
  const [students, setStudents] = useState<Student[]>([])
  const [classCode, setClassCode] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)
  const [newStudentsCount, setNewStudentsCount] = useState(0)
  const [recentlySaved, setRecentlySaved] = useState<number[]>([])

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
    const updatedStudents = [...students]
    updatedStudents[index] = { firstName, lastName, classCode }
    setStudents(updatedStudents)
    localStorage.setItem('students', JSON.stringify(updatedStudents))
    showSaveFeedback(index)

    try {
      const response = await fetch('http://localhost:3001/student', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          classCode,
        }),
      })

      if (!response.ok) {
        console.error('Failed to save student:', await response.text())
        alert('Failed to save student to backend')
      }
    } catch (error) {
      console.error('Error saving student:', error)
      alert('Error saving student to backend')
    }
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

  const processStudentData = (data: SpreadsheetStudentRow[]) => {
    const newStudents = data
      .map(row => {
        const firstName = 
          row.firstName || row['First Name'] || row['first name'] || 
          row['FIRST NAME'] || row['First'] || row['first'] ||
          row['Given Name'] || row['given name'] || row['GIVEN NAME'] ||
          row['FName'] || row['fname'] || ''

        const lastName = 
          row.lastName || row['Last Name'] || row['last name'] || 
          row['LAST NAME'] || row['Last'] || row['last'] ||
          row['Surname'] || row['surname'] || row['SURNAME'] ||
          row['Family Name'] || row['family name'] ||
          row['LName'] || row['lname'] || ''

        return {
          firstName: firstName.toString().trim(),
          lastName: lastName.toString().trim(),
          classCode
        }
      })
      .filter(s => s.firstName || s.lastName)

    if (newStudents.length > 0) {
      const updatedStudents = [...students, ...newStudents]
      setStudents(updatedStudents)
      setNewStudentsCount(newStudents.length)
      localStorage.setItem('students', JSON.stringify(updatedStudents))
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)
    } else {
      alert('No valid student data found in file')
    }
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      if (file.name.endsWith('.xlsx')) {
        const data = await file.arrayBuffer()
        const workbook = XLSX.read(data)
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]]
        const jsonData: SpreadsheetStudentRow[] = XLSX.utils.sheet_to_json(firstSheet)
        processStudentData(jsonData)
      } 
      else if (file.name.endsWith('.csv')) {
        parse<SpreadsheetStudentRow>(file, {
          header: true,
          complete: (results) => {
            if (results.data) {
              processStudentData(results.data)
            }
          },
          error: (err) => {
            console.error('CSV parsing error:', err)
            alert(`Error parsing CSV: ${err.message}`)
          }
        })
      } else {
        alert('Please upload either a .csv or .xlsx file')
      }
    } catch (error) {
      console.error('File processing error:', error)
      alert('Error processing file. Please check the format and try again.')
    }

    const fileInput = e.target as HTMLInputElement
    fileInput.value = ''
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
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <span className="text-xl font-bold">
              Upload Successful! Added {newStudentsCount} student(s)
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
        <label className="bg-blue-600 hover:bg-blue-800 text-white px-6 py-3 rounded text-xl transition cursor-pointer flex items-center justify-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="17 8 12 3 7 8"></polyline>
            <line x1="12" y1="3" x2="12" y2="15"></line>
          </svg>
          Upload Students
          <input
            type="file"
            accept=".csv,.xlsx"
            onChange={handleFileUpload}
            className="hidden"
            data-testid="file-input"
          />
        </label>

        <button
          onClick={handleAddStudent}
          className="bg-green-600 hover:bg-green-800 text-white px-6 py-3 rounded text-xl"
        >
          Add Student
        </button>

        <button
          onClick={handleBackToLogin}
          className="bg-red-600 hover:bg-red-800 text-white px-6 py-3 rounded text-xl"
        >
          Log Out
        </button>
      </div>

      <div className="relative z-10 w-full max-w-4xl">
        {students.length === 0 ? (
          <p className="text-white text-center text-xl">No students added yet.</p>
        ) : (
          <table className="w-full text-white border-collapse border border-white">
            <thead>
              <tr>
                <th className="border border-white px-4 py-2">First Name</th>
                <th className="border border-white px-4 py-2">Last Name</th>
                <th className="border border-white px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => {
                const isSavedRecently = recentlySaved.includes(index)
                return (
                  <tr key={index} className={isSavedRecently ? 'bg-green-700' : ''}>
                    <td className="border border-white px-2 py-1">
                      <input
                        type="text"
                        value={student.firstName}
                        onChange={e => {
                          const updated = [...students]
                          updated[index].firstName = e.target.value
                          setStudents(updated)
                        }}
                        className="w-full bg-transparent border-b border-white text-white focus:outline-none"
                        placeholder="First Name"
                      />
                    </td>
                    <td className="border border-white px-2 py-1">
                      <input
                        type="text"
                        value={student.lastName}
                        onChange={e => {
                          const updated = [...students]
                          updated[index].lastName = e.target.value
                          setStudents(updated)
                        }}
                        className="w-full bg-transparent border-b border-white text-white focus:outline-none"
                        placeholder="Last Name"
                      />
                    </td>
                    <td className="border border-white px-2 py-1 text-center">
                      <button
                        onClick={() => handleSaveStudent(index, student.firstName, student.lastName)}
                        className="bg-blue-600 hover:bg-blue-800 px-3 py-1 rounded text-white mr-2"
                        data-testid={`save-button-${index}`}
                      >
                        Save
                      </button>
                      <button
                        onClick={() => handleDeleteStudent(index)}
                        className="bg-red-600 hover:bg-red-800 px-3 py-1 rounded text-white"
                        data-testid={`delete-button-${index}`}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>
    </main>
  )
}
