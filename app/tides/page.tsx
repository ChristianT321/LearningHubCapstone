'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  FaWater,
  FaChartLine,
  FaArrowLeft,
  FaSyncAlt,
  FaExclamationTriangle,
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
} from 'recharts';

interface TidePrediction {
  t: string; // HHMM
  v: string; // formatted meters
  type: 'H' | 'L';
}

interface TideApiPoint {
  time: string;
  value: number;
}

interface TideData {
  predictions: TidePrediction[];
  allPoints: TideApiPoint[];
}

interface ApiSuccess {
  success: true;
  data: TideApiPoint[];
}

interface ApiError {
  success: false;
  error: string;
}

type ApiResponse = ApiSuccess | ApiError;

export default function TidePage() {
  const router = useRouter();
  const [tideData, setTideData] = useState<TideData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [date, setDate] = useState('2025-08-19');
  const stationId = '09130';

  function processMaxMinTides(points: TideApiPoint[]): TidePrediction[] {
    if (!points || points.length === 0) return [];

    let minValue = points[0].value;
    let maxValue = points[0].value;
    for (const pt of points) {
      if (pt.value < minValue) minValue = pt.value;
      if (pt.value > maxValue) maxValue = pt.value;
    }
    // All lows, all highs
    const minPoints = points.filter(pt => pt.value === minValue);
    const maxPoints = points.filter(pt => pt.value === maxValue);

    // Earliest low, latest high
    const minTide = minPoints.reduce((earliest, pt) =>
      !earliest || pt.time < earliest.time ? pt : earliest, null as TideApiPoint | null
    )!;
    const maxTide = maxPoints.reduce((latest, pt) =>
      !latest || pt.time > latest.time ? pt : latest, null as TideApiPoint | null
    )!;

    const results: TidePrediction[] = [];
    if (minTide) {
      results.push({
        t: new Date(minTide.time).toISOString().substr(11, 5).replace(':', ''),
        v: minTide.value.toFixed(2),
        type: 'L'
      });
    }
    if (maxTide && maxTide.time !== minTide.time) {
      results.push({
        t: new Date(maxTide.time).toISOString().substr(11, 5).replace(':', ''),
        v: maxTide.value.toFixed(2),
        type: 'H'
      });
    }
    return results;
  }

  const fetchTideData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/facts/tides/${stationId}?date=${date}`);
      if (!res.ok) {
        throw new Error(`Network response was not ok (${res.status})`);
      }
      const result = (await res.json()) as ApiResponse;
      if (!result.success) {
        throw new Error(result.error);
      }
      const pts = result.data;
      if (!Array.isArray(pts) || pts.length === 0) {
        throw new Error('No tide data available for this date');
      }
      const preds = processMaxMinTides(pts);
      setTideData({ predictions: preds, allPoints: pts });
    } catch (err: unknown) {
      console.error(err);
      const message =
        err instanceof Error
          ? err.message
          : 'An unexpected error occurred';
      setError(message);
      setTideData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTideData();
    // eslint-disable-next-line
  }, [date]);

  const handleRefresh = () => {
    fetchTideData();
  };

  const formatTime = (hhmm: string) => {
    if (hhmm.includes(':')) return hhmm;
    return hhmm.slice(0, 2) + ':' + hhmm.slice(2);
  };

  return (
    <main
      className="relative min-h-screen w-full flex flex-col items-center justify-start text-center overflow-y-auto p-4"
      style={{ paddingTop: '80px' }}
    >
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/Fish background.png"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6 w-full max-w-6xl px-4">
        {/* Header */}
        <div className="flex items-center justify-center w-full mb-6 relative">
          <motion.button
            onClick={() => router.push('/gofish')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center gap-2 px-6 py-3 text-white rounded-xl bg-gradient-to-r from-blue-500/70 to-blue-700/70 shadow-lg hover:shadow-xl transition-all backdrop-blur-sm absolute left-0"
          >
            <FaArrowLeft className="text-lg" /> 
            <span className="font-semibold">Back</span>
          </motion.button>
          
          <h1 className="text-4xl font-extrabold text-white drop-shadow-lg bg-blue-900/40 px-8 py-3 rounded-xl border border-blue-600/60 mx-auto backdrop-blur-sm">
            DAILY TIDE PREDICTIONS & HISTORY
          </h1>
          
          <motion.button
            onClick={handleRefresh}
            whileHover={{ rotate: 360, scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            disabled={loading}
            className={`p-3 text-white rounded-full bg-black/30 border-2 border-blue-400/60 shadow-md ${
              loading ? 'animate-spin' : ''
            } backdrop-blur-sm absolute right-0`}
          >
            <FaSyncAlt className="text-xl" />
          </motion.button>
        </div>

        {/* Station & Date */}
        <div className="flex flex-col md:flex-row gap-4 w-full max-w-3xl items-center justify-center">
          <div className="px-6 py-3 rounded-xl bg-blue-900/40 text-white border-2 border-blue-600/60 font-medium shadow-md backdrop-blur-sm">
            Hartley Bay (Station #09130)
          </div>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            max={new Date().toISOString().split('T')[0]}
            className="px-6 py-3 rounded-xl bg-blue-900/40 text-white border-2 border-blue-600/60 font-medium shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-400/60 backdrop-blur-sm"
          />
        </div>

        {/* Content */}
        <div className="w-full max-w-4xl bg-blue-900/40 rounded-2xl p-6 border-2 border-blue-600/60 shadow-xl backdrop-blur-sm">
          {loading ? (
            <div className="flex flex-col items-center py-12 animate-pulse">
              <FaWater className="text-5xl text-blue-300 mb-4" />
              <p className="text-white text-lg font-medium">Loading tide data...</p>
            </div>
          ) : error ? (
            <div className="bg-red-900/40 rounded-xl p-6 text-white border-2 border-red-600/60 backdrop-blur-sm">
              <div className="flex items-center justify-center gap-3 mb-3">
                <FaExclamationTriangle className="text-2xl" />
                <p className="font-bold text-xl">Error loading tide data</p>
              </div>
              <p className="mb-5 text-lg">{error}</p>
              <div className="flex justify-center gap-6">
                <motion.button
                  onClick={fetchTideData}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-yellow-400/80 text-blue-900 rounded-xl font-bold flex items-center gap-2 shadow-md backdrop-blur-sm"
                >
                  <FaSyncAlt /> Try Again
                </motion.button>
                <motion.button
                  onClick={() => setDate(new Date().toISOString().split('T')[0])}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-blue-500/80 text-white rounded-xl font-bold shadow-md backdrop-blur-sm"
                >
                  Use Today
                </motion.button>
              </div>
            </div>
          ) : tideData ? (
            <>
              {/* High/Low Extremes summary */}
              <div className="flex flex-col items-center justify-center mb-8">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <FaWater className="text-4xl text-blue-300" />
                  <h2 className="text-3xl font-bold text-white">
                    Tides For
                  </h2>
                </div>
                <p className="text-blue-200 text-lg mb-2">
                  {new Date(date).toLocaleDateString('en-CA', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
              
              {tideData.predictions.length === 0 ? (
                <p className="text-white mb-6 text-lg">
                  No High or Low tide extremes detected for this day.
                </p>
              ) : (
                <div className="flex flex-wrap justify-center gap-5 mb-10">
                  {tideData.predictions.map((p, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className={`p-5 rounded-xl backdrop-blur-sm ${
                        p.type === 'H' ? 'bg-blue-800/40' : 'bg-blue-700/40'
                      } border-2 ${
                        p.type === 'H' ? 'border-blue-500/60' : 'border-blue-400/60'
                      } shadow-md hover:shadow-lg transition-shadow`}
                    >
                      <div className="flex flex-col items-center">
                        <div className="text-3xl font-bold text-white mb-2">
                          {formatTime(p.t)}
                        </div>
                        <div
                          className={`text-xl font-semibold ${
                            p.type === 'H'
                              ? 'text-yellow-300'
                              : 'text-blue-200'
                          } mb-1`}
                        >
                          {p.type === 'H' ? 'HIGH' : 'LOW'} Tide
                        </div>
                        <div className="text-2xl font-bold text-white mt-3">
                          {p.v} <span className="text-lg">meters</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Tide Chart */}
              <div className="mt-10 bg-blue-950/40 rounded-xl p-5 border-2 border-blue-700/60 backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-yellow-300 mb-4 flex items-center justify-center gap-3">
                  <FaChartLine /> Tide Chart
                </h3>
                <div className="h-80 bg-blue-900/40 rounded-lg flex items-center justify-center text-white border border-blue-700/60 backdrop-blur-sm">
                  {tideData?.allPoints && tideData.allPoints.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={tideData.allPoints.map(pt => ({
                          time: pt.time,
                          value: pt.value
                        }))}
                        margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                        <XAxis
                          dataKey="time"
                          tickFormatter={s => new Date(s).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          tick={{ fill: "#fff" }}
                          minTickGap={20}
                        />
                        <YAxis 
                          domain={['auto', 'auto']} 
                          tick={{ fill: "#fff" }} 
                          label={{ value: 'Meters', angle: -90, position: 'insideLeft', fill: '#fff' }}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#1e3a8a',
                            borderColor: '#3b82f6',
                            borderRadius: '0.5rem',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                          }}
                          labelFormatter={s => new Date(s).toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit',
                            hour12: true 
                          })}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="value" 
                          stroke="#facc15" 
                          strokeWidth={3} 
                          dot={false} 
                          activeDot={{ r: 6, stroke: '#fff', strokeWidth: 2 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  ) : (
                    <p className="text-lg">Tide height visualization coming soon</p>
                  )}
                </div>
              </div>
            </>
          ) : null}
        </div>

        {/* Quiz Button */}
        <motion.div
          className="mt-10 w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Link href="/test2" passHref>
            <motion.button
              whileHover={{ scale: 1.03, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)" }}
              whileTap={{ scale: 0.97 }}
              className="w-full px-8 py-4 text-white text-xl font-bold rounded-xl shadow-xl bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 transition-all"
            >
              Take the Aquatic Animal Quiz
            </motion.button>
          </Link>
        </motion.div>

        {/* Footer */}
        <div className="text-blue-200 text-sm mt-8 bg-blue-900/40 px-6 py-3 rounded-xl border border-blue-700/60 backdrop-blur-sm">
          <p className="font-medium">Tide data provided by Fisheries and Oceans Canada</p>
          <p className="text-xs mt-1 opacity-80">
            Data from Integrated Water Level System (IWLS)
          </p>
        </div>
      </div>
    </main>
  );
}