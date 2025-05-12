'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

interface Student {
  firstName: string
  lastName: string
  classCode: string
}

export default function CertificatePage() {
  const [student, setStudent] = useState<Student | null>(null)
  const router = useRouter()

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null')
    if (!currentUser || currentUser.isTeacher) {
      router.push('/')
    } else {
      setStudent(currentUser)
    }
  }, [router])

  if (!student) {
    return null
  }

  return (
    <main className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      <div className="fixed inset-0 z-0">
        <Image
          src="/Certification background.png"
          alt="Certificate Background"
          fill
          priority
          className="object-cover"
        />
      </div>

      <div className="relative z-10 bg-white bg-opacity-90 rounded-xl shadow-xl px-10 py-8 text-center max-w-4xl">
        <h1 className="text-4xl font-bold text-green-900 mb-4">Congratulations!</h1>
        <p className="text-2xl text-black font-semibold mb-2">
          {student.firstName} {student.lastName}
        </p>
        <p className="text-xl text-gray-700 mb-6">
          Class Code: <span className="font-mono font-bold">{student.classCode}</span>
        </p>
        <p className="text-xl text-black font-medium">
          You have successfully completed your learning journey and earned your certificate! <br />
          The rain forest aliance thanks you for learning about our precious habitat.
        </p>
      </div>
    </main>
  )
}
