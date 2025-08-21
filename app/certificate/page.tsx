'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { FaPrint, FaFilePdf, FaCertificate } from 'react-icons/fa'
import { motion } from 'framer-motion'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import Link from 'next/link'

interface Student {
  firstName: string
  lastName: string
  classCode: string
}

export default function CertificatePage() {
  const [student, setStudent] = useState<Student | null>(null)
  const [isPrinting, setIsPrinting] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null')
    if (!currentUser || currentUser.isTeacher) {
      router.push('/')
    } else {
      setStudent(currentUser)
    }
  }, [router])

  const handlePrint = () => {
    setIsPrinting(true)
    setTimeout(() => {
      window.print()
      setIsPrinting(false)
    }, 100)
  }

  const handleDownloadPDF = async () => {
    const certificate = document.getElementById('certificate-content')
    if (!certificate) return

    // Create a clean clone with simplified styles
    const clone = certificate.cloneNode(true) as HTMLElement
    clone.style.position = 'absolute'
    clone.style.left = '-9999px'
    clone.style.width = certificate.offsetWidth + 'px'
    
    // Remove problematic classes and inline styles
    const elements = clone.querySelectorAll('*')
    elements.forEach(el => {
      // Remove all class attributes
      el.removeAttribute('class')
      // Remove inline styles that might contain problematic values
      el.removeAttribute('style')
    })

    // Apply simplified PDF-safe styles
    clone.style.backgroundColor = '#ffffff'
    clone.style.padding = '40px'
    clone.style.border = '4px solid #047857'
    clone.style.borderRadius = '12px'
    
    // Add the clone to the body
    document.body.appendChild(clone)

    try {
      const canvas = await html2canvas(clone, {
        scale: 2,
        useCORS: true,
        logging: true,
        backgroundColor: '#ffffff',
        removeContainer: true,
        ignoreElements: (element) => {
          // Ignore any buttons or interactive elements
          return element.tagName === 'BUTTON'
        }
      })
      
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('landscape', 'pt', [canvas.width, canvas.height])
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height)
      pdf.save(`${student?.firstName}_${student?.lastName}_Certificate.pdf`)
    } catch (error) {
      console.error('Error generating PDF:', error)
    } finally {
      document.body.removeChild(clone)
    }
  }

  if (!student) {
    return null
  }

  return (
    <main className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/Certification background.png"
          alt="Certificate Background"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Certificate Content - Using minimal classes for PDF generation */}
      <div className="relative z-10 w-full max-w-6xl p-4">
        <div 
          id="certificate-content"
          className={`bg-white rounded-xl shadow-xl px-12 py-10 text-center ${isPrinting ? 'print-optimized' : ''}`}
          style={{
            border: '4px solid #047857',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
          }}
        >
          {/* Certificate Header */}
          <div className="flex justify-center mb-6">
            <FaCertificate className="text-5xl text-green-700" />
          </div>
          
          <h1 className="text-5xl font-extrabold text-green-900 mb-6">
            Certificate of Completion
          </h1>
          
          <p className="text-xl text-gray-600 mb-10">
            This certificate is proudly presented to
          </p>
          
          {/* Student Name */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8 p-4"
            style={{
              backgroundColor: 'rgba(5, 150, 105, 0.1)',
              borderRadius: '8px',
              borderLeft: '4px solid #059669',
              borderRight: '4px solid #065f46'
            }}
          >
            <p className="text-4xl font-bold text-black">
              {student.firstName} <span style={{ color: '#065f46' }}>{student.lastName}</span>
            </p>
          </motion.div>
          
          <p className="text-xl text-gray-700 mb-2">
            for successfully completing the learning program
          </p>
          
          <p className="text-xl text-gray-700 mb-8">
            Class Code: <span className="font-bold" style={{ color: '#065f46' }}>{student.classCode}</span>
          </p>
          
          <p className="text-2xl text-black font-medium mb-10 leading-relaxed">
            The Rainforest Alliance thanks you for your dedication to learning about our precious habitat 
            and your commitment to environmental conservation.
          </p>
          
          {/* Signature Line */}
          <div className="mt-12 mb-6 flex justify-center">
            <div style={{ width: '256px', borderTop: '2px solid #047857', paddingTop: '8px' }}>
              <p className="text-lg font-semibold" style={{ color: '#047857' }}>Rainforest Alliance</p>
              <p className="text-sm" style={{ color: '#6b7280' }}>Date: {new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        {!isPrinting && (
          <motion.div 
            className="flex justify-center gap-6 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <motion.button
              onClick={handlePrint}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                color: 'white',
                fontWeight: 'bold',
                borderRadius: '12px',
                background: 'linear-gradient(to right, #f59e0b, #d97706)',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <FaPrint /> Print Certificate
            </motion.button>
            
            <motion.button
              onClick={handleDownloadPDF}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                color: 'white',
                fontWeight: 'bold',
                borderRadius: '12px',
                background: 'linear-gradient(to right, #059669, #047857)',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <FaFilePdf /> Download PDF
            </motion.button>
            <Link
              href="/frogger-endless"
              className="inline-block px-6 py-3 font-bold rounded-lg text-white shadow-lg bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900"
            >
              Play Frogger?
            </Link>
          </motion.div>
          
        )}
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #certificate-content,
          #certificate-content * {
            visibility: visible;
          }
          #certificate-content {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: white !important;
            opacity: 1 !important;
            padding: 2cm !important;
          }
        }
        .print-optimized {
          background-color: white !important;
        }
      `}</style>
    </main>
  )
}