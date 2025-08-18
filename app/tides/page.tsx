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
    // Assumes input is "16:26" or "1626"
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
        />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6 w-full max-w-6xl px-4">
        {/* Header */}
        <div className="flex items-center justify-between w-full mb-6">
          <motion.button
            onClick={() => router.back()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 text-white rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 shadow"
          >
            <FaArrowLeft /> Back
          </motion.button>
          <h1 className="text-4xl font-extrabold text-white drop-shadow-lg">
            TIDE PREDICTIONS
          </h1>
          <motion.button
            onClick={handleRefresh}
            whileHover={{ rotate: 360 }}
            whileTap={{ scale: 0.9 }}
            disabled={loading}
            className={`p-2 text-white rounded-full bg-black bg-opacity-40 border border-white ${
              loading ? 'animate-spin' : ''
            }`}
          >
            <FaSyncAlt />
          </motion.button>
        </div>

        {/* Station & Date */}
        <div className="flex flex-col md:flex-row gap-4 w-full max-w-3xl items-center justify-center">
          <div className="px-4 py-2 rounded-lg bg-blue-900 bg-opacity-80 text-white border border-blue-700">
            Hartley Bay (Station #09130)
          </div>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            max={new Date().toISOString().split('T')[0]}
            className="px-4 py-2 rounded-lg bg-blue-900 bg-opacity-80 text-white border border-blue-700"
          />
        </div>

        {/* Content */}
        <div className="w-full max-w-4xl bg-blue-900 bg-opacity-70 rounded-xl p-6 border border-blue-700 shadow-lg">
          {loading ? (
            <div className="flex flex-col items-center py-12 animate-pulse">
              <FaWater className="text-5xl text-blue-300 mb-4" />
              <p className="text-white text-lg">Loading tide data...</p>
            </div>
          ) : error ? (
            <div className="bg-red-900 bg-opacity-70 rounded-lg p-4 text-white">
              <div className="flex items-center gap-2 mb-2">
                <FaExclamationTriangle className="text-xl" />
                <p className="font-bold">Error loading tide data</p>
              </div>
              <p className="mb-4">{error}</p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={fetchTideData}
                  className="px-4 py-2 bg-yellow-400 text-blue-900 rounded font-bold flex items-center gap-2"
                >
                  <FaSyncAlt /> Try Again
                </button>
                <button
                  onClick={() =>
                    setDate(new Date().toISOString().split('T')[0])
                  }
                  className="px-4 py-2 bg-blue-400 text-white rounded font-bold"
                >
                  Use Today
                </button>
              </div>
            </div>
          ) : tideData ? (
            <>
              {/* High/Low Extremes summary */}
              <div className="flex items-center justify-center gap-2 mb-6">
                <FaWater className="text-3xl text-blue-300" />
                <h2 className="text-2xl font-bold text-white">
                  Tide Predictions for{' '}
                  {new Date(date).toLocaleDateString('en-CA', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </h2>
              </div>
              {tideData.predictions.length === 0 ? (
                <p className="text-white mb-4">
                  No High or Low tide extremes detected for this day.
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  {tideData.predictions.map((p, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className={`p-4 rounded-lg ${
                        p.type === 'H' ? 'bg-blue-800' : 'bg-blue-700'
                      } border ${
                        p.type === 'H' ? 'border-blue-500' : 'border-blue-400'
                      }`}
                    >
                      <div className="flex flex-col items-center">
                        <div className="text-2xl font-bold text-white mb-1">
                          {formatTime(p.t)}
                        </div>
                        <div
                          className={`text-lg font-semibold ${
                            p.type === 'H'
                              ? 'text-yellow-300'
                              : 'text-blue-200'
                          }`}
                        >
                          {p.type === 'H' ? 'HIGH' : 'LOW'} Tide
                        </div>
                        <div className="text-xl font-bold text-white mt-2">
                          {p.v} m
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Placeholder for each tide chart */}
              <div className="mt-8 bg-blue-950 bg-opacity-80 rounded-lg p-4">
  <h3 className="text-xl font-bold text-yellow-300 mb-2 flex items-center justify-center gap-2">
    <FaChartLine /> Tide Chart
  </h3>
  <div className="h-64 bg-blue-900 rounded flex items-center justify-center text-white">
    {tideData?.allPoints && tideData.allPoints.length > 0 ? (
      <ResponsiveContainer width="100%" height="100%">
  <LineChart
    data={tideData.allPoints.map(pt => ({
      time: pt.time, // use raw ISO string for X axis
      value: pt.value
    }))}
    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
  >
    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
    <XAxis
      dataKey="time"
      tickFormatter={s => new Date(s).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      tick={{ fill: "#fff" }}
      minTickGap={20}
    />
    <YAxis domain={['auto', 'auto']} tick={{ fill: "#fff" }} />
    <Tooltip
      labelFormatter={s => new Date(s).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
    />
    <Line type="monotone" dataKey="value" stroke="#facc15" strokeWidth={2} dot={false} />
  </LineChart>
</ResponsiveContainer>
    ) : (
      <p>Tide height visualization coming soon</p>
    )}
  </div>
</div>
            </>
          ) : null}
        </div>

        {/* Quiz Button */}
        <motion.div
          className="mt-8 w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Link href="/test2" passHref>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full px-6 py-4 text-white text-xl font-bold rounded-xl shadow-lg bg-gradient-to-r from-green-500 to-green-700"
            >
              Take the Aquatic Animal Quiz
            </motion.button>
          </Link>
        </motion.div>

        {/* Footer */}
        <div className="text-blue-200 text-sm mt-6">
          <p>Tide data provided by Fisheries and Oceans Canada</p>
          <p className="text-xs mt-1">
            Data from Integrated Water Level System (IWLS)
          </p>
        </div>
      </div>
    </main>
  );
}
