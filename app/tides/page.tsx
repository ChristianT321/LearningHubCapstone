'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { FaWater, FaChartLine, FaArrowLeft, FaSyncAlt } from 'react-icons/fa'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function TidePage() {
  const router = useRouter()
  const [tideData, setTideData] = useState<unknown>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [station, setStation] = useState('7795') // Prince Rupert station ID
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])

  // Station options near Great Bear Rainforest
  const stations = [
    { id: '7795', name: 'Prince Rupert' },
    { id: '8073', name: 'Bella Bella' },
    { id: '8525', name: 'Hartley Bay' },
    { id: '8275', name: 'Klemtu' }
  ]

  const fetchTideData = async () => {
    setLoading(true)
    setError(null)
    try {
      // Using a proxy to avoid CORS issues
      const response = await fetch(`https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?product=predictions&application=NOS.COOPS.TAC.WL&begin_date=${date.replace(/-/g, '')}&end_date=${date.replace(/-/g, '')}&station=${station}&time_zone=lst_ldt&units=metric&interval=hilo&format=json`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch tide data')
      }
      
      const data = await response.json()
      if (data.error) {
        throw new Error(data.error.message)
      }
      
      setTideData(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred')
      console.error('Error fetching tide data:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTideData()
  }, [station, date])

  const handleRefresh = () => {
    fetchTideData()
  }

  const formatTime = (timeString: string) => {
    const time = timeString.slice(0, 2) + ':' + timeString.slice(2, 4)
    return new Date(`${date}T${time}:00`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-start text-center overflow-y-auto p-4" style={{ paddingTop: '80px' }}>

      {/* Background Image - Same as Module 2 */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/FIsh background.png"
          alt="Home Background"
          fill
          priority
          className="object-cover"
          style={{ objectPosition: 'center' }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6 w-full max-w-6xl px-4">
        {/* Header with back button */}
        <div className="flex items-center justify-between w-full mb-6">
          <motion.button
            onClick={() => router.back()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 text-white"
            style={{
              borderRadius: '12px',
              border: '2px solid transparent',
              backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), linear-gradient(to right, #3b82f6, #1d4ed8, #1e40af)',
              backgroundOrigin: 'border-box',
              backgroundClip: 'padding-box, border-box',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}
          >
            <FaArrowLeft /> Back to Module
          </motion.button>
          
          <h1 className="text-4xl font-extrabold text-white drop-shadow-[3px_3px_0px_black]">
            TIDE PREDICTIONS
          </h1>
          
          <motion.button
            onClick={handleRefresh}
            whileHover={{ rotate: 360 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 text-white"
            disabled={loading}
            style={{
              borderRadius: '50%',
              background: 'rgba(0, 0, 0, 0.4)',
              border: '2px solid rgba(255, 255, 255, 0.2)'
            }}
          >
            <FaSyncAlt className={`text-xl ${loading ? 'animate-spin' : ''}`} />
          </motion.button>
        </div>

        {/* Station and Date Selectors */}
        <div className="flex flex-col md:flex-row gap-4 w-full max-w-3xl">
          <select
            value={station}
            onChange={(e) => setStation(e.target.value)}
            className="px-4 py-2 rounded-lg bg-blue-900 bg-opacity-80 text-white border border-blue-700"
          >
            {stations.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
          
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="px-4 py-2 rounded-lg bg-blue-900 bg-opacity-80 text-white border border-blue-700"
          />
        </div>

        {/* Main Content */}
        <div className="w-full max-w-4xl bg-blue-900 bg-opacity-70 rounded-xl p-6 border border-blue-700 shadow-lg">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="animate-pulse flex flex-col items-center">
                <FaWater className="text-5xl text-blue-300 mb-4" />
                <p className="text-white text-lg">Loading tide data...</p>
              </div>
            </div>
          ) : error ? (
            <div className="bg-red-900 bg-opacity-70 rounded-lg p-4 text-white">
              <p className="font-bold">Error loading tide data:</p>
              <p>{error}</p>
              <button 
                onClick={fetchTideData}
                className="mt-2 px-4 py-2 bg-yellow-400 text-blue-900 rounded font-bold"
              >
                Try Again
              </button>
            </div>
          ) : tideData?.predictions ? (
            <div>
              <div className="flex items-center justify-center gap-2 mb-6">
                <FaWater className="text-3xl text-blue-300" />
                <h2 className="text-2xl font-bold text-white">
                  Tide Predictions for {stations.find(s => s.id === station)?.name}
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {tideData.predictions.map((prediction: unknown, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 rounded-lg ${prediction.type === 'H' ? 'bg-blue-800' : 'bg-blue-700'} border ${prediction.type === 'H' ? 'border-blue-500' : 'border-blue-400'}`}
                  >
                    <div className="flex flex-col items-center">
                      <div className="text-2xl font-bold text-white mb-1">
                        {formatTime(prediction.t)}
                      </div>
                      <div className={`text-lg font-semibold ${prediction.type === 'H' ? 'text-yellow-300' : 'text-blue-200'}`}>
                        {prediction.type === 'H' ? 'HIGH' : 'LOW'} Tide
                      </div>
                      <div className="text-xl font-bold text-white mt-2">
                        {prediction.v} m
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-8 bg-blue-950 bg-opacity-80 rounded-lg p-4">
                <h3 className="text-xl font-bold text-yellow-300 mb-2 flex items-center justify-center gap-2">
                  <FaChartLine /> Tide Chart
                </h3>
                <div className="h-64 bg-blue-900 rounded flex items-center justify-center text-white">
                  {/* Placeholder for tide chart - would integrate with a charting library */}
                  <p>Tide height chart visualization would appear here</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-white text-center py-8">
              <p>No tide data available for this date and station.</p>
            </div>
          )}
        </div>

        {/* Footer Note */}
        <div className="text-blue-200 text-sm mt-6">
          <p>Tide data provided by Fisheries and Oceans Canada</p>
        </div>
      </div>
    </main>
  )
}