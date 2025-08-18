'use client';

import Link from 'next/link';
import { useState } from 'react';

type StudentRow = {
  id: number;
  firstName: string;
  lastName: string;
  classCode: string;
};

type TestResultsRow = {
  student_id: number;
  test1_score?: number | null;
  test2_score?: number | null;
  test3_score?: number | null;
  test4_score?: number | null;
};

type RosterRow = {
  id: number;
  first_name: string;
  last_name: string;
  class_code: string;
  test1_score?: number | null;
  test2_score?: number | null;
  test3_score?: number | null;
  test4_score?: number | null;
  test5_score?: number | null;
};

export default function TeacherPortalPage() {
  const [email, setEmail] = useState('');
  const [classCode, setClassCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [roster, setRoster] = useState<RosterRow[] | null>(null);

  const apiBase = 'http://localhost:3001';

  const fetchJSON = async (url: string, init?: RequestInit) => {
    const resp = await fetch(url, init);
    if (!resp.ok) {
      let msg = `Request failed: ${resp.status}`;
      try {
        const j = await resp.json();
        if (j?.error) msg = j.error;
      } catch {}
      throw new Error(msg);
    }
    return resp.json();
  };

    const fetchRosterFallback = async (cc: string): Promise<RosterRow[]> => {
    // Matches your backend: GET /students/:classCode -> { id, firstName, lastName, classCode }
    const students: StudentRow[] = await fetchJSON(`${apiBase}/students/${encodeURIComponent(cc)}`);

    const rows: RosterRow[] = [];
    for (const s of students) {
        let scores: TestResultsRow | null = null;
        try {
        // Matches your backend: GET /test_results/:studentId -> snake_case fields
        scores = await fetchJSON(`${apiBase}/test_results/${s.id}`);
        } catch {
        // okay, leave scores as nulls
        }

        rows.push({
        id: s.id,
        first_name: s.firstName,
        last_name: s.lastName,
        class_code: s.classCode,
        test1_score: scores?.test1_score ?? null,
        test2_score: scores?.test2_score ?? null,
        test3_score: scores?.test3_score ?? null,
        test4_score: scores?.test4_score ?? null,
        });
    }
    return rows;
    };


  const handleLoginAndLoad = async () => {
    setError(null);
    setRoster(null);

    if (!email || !classCode) {
      setError('Please enter both email and class code.');
      return;
    }

    setLoading(true);
    try {
      await fetchJSON(`${apiBase}/teacher/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, classCode }),
      });

      try {
        const joined: RosterRow[] = await fetchJSON(
          `${apiBase}/teacher/class/${encodeURIComponent(classCode)}/roster`
        );
        setRoster(joined);
      } catch {
        const built = await fetchRosterFallback(classCode);
        setRoster(built);
      }
    } catch (e: any) {
      setError(e?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const total = (r: RosterRow) => {
    const vals = [r.test1_score, r.test2_score, r.test3_score, r.test4_score].filter(
      (v): v is number => typeof v === 'number'
    );
    return vals.reduce((a, b) => a + b, 0);
  };

  const average = (r: RosterRow) => {
    const vals = [r.test1_score, r.test2_score, r.test3_score, r.test4_score].filter(
      (v): v is number => typeof v === 'number'
    );
    if (vals.length === 0) return '—';
    return (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(1);
  };

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-start p-6 bg-[url('/woods.png')] bg-cover bg-center">
      <div className="w-full max-w-4xl bg-white/90 rounded-xl shadow-lg p-6 mt-8">
        <h1 className="text-4xl text-gray-700 font-extrabold text-center mb-2">Teacher Portal</h1>
        <p className="text-lg text-gray-700 text-center mb-6">
        View your students' quiz scores and progress
        </p>
        <p className="text-gray-700 mb-4">
          Log in with the <strong>same email</strong> and <strong>class code</strong> you used when signing up.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
          <input
            type="email"
            placeholder="Teacher Email"
            className="w-full px-4 py-3 rounded border-2 border-gray-400 focus:border-red-600 focus:ring-2 focus:ring-red-500 placeholder-gray-500 bg-white text-black shadow"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />

            <input
            type="text"
            placeholder="Class Code"
            className="w-full px-4 py-3 rounded border-2 border-gray-400 focus:border-red-600 focus:ring-2 focus:ring-red-500 placeholder-gray-500 bg-white text-black shadow"
            value={classCode}
            onChange={(e) => setClassCode(e.target.value)}
            />
          <button
            onClick={handleLoginAndLoad}
            disabled={loading}
            className="bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white font-bold rounded px-4 py-3"
          >
            {loading ? 'Loading…' : 'Log In & View Roster'}
          </button>
        </div>

        {error && <div className="mb-4 text-red-700 font-semibold">{error}</div>}

        {roster && (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-black text-base">
                <thead className="bg-gray-800 text-white text-lg">
                <tr>
                    <th className="px-4 py-3 border border-black">Student</th>
                    <th className="px-4 py-3 border border-black">Test 1</th>
                    <th className="px-4 py-3 border border-black">Test 2</th>
                    <th className="px-4 py-3 border border-black">Test 3</th>
                    <th className="px-4 py-3 border border-black">Test 4</th>
                    <th className="px-4 py-3 border border-black">Test 5</th>
                    <th className="px-4 py-3 border border-black">Average</th>
                </tr>
                </thead>
                <tbody>
                {roster.map((r) => (
                    <tr key={r.id} className="odd:bg-white even:bg-gray-100 text-black font-medium">
                    <td className="px-4 py-2 border border-black">
                        {r.first_name} {r.last_name}
                    </td>
                    <td className="px-4 py-2 border border-black text-center">{r.test1_score ?? '—'}</td>
                    <td className="px-4 py-2 border border-black text-center">{r.test2_score ?? '—'}</td>
                    <td className="px-4 py-2 border border-black text-center">{r.test3_score ?? '—'}</td>
                    <td className="px-4 py-2 border border-black text-center">{r.test4_score ?? '—'}</td>
                    <td className="px-4 py-2 border border-black text-center">{r.test5_score ?? '—'}</td>
                    <td className="px-4 py-2 border border-black text-center">{average(r)}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        )}
        
      </div>
      <div className="mt-4">
        <Link
            href="/"
            className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded shadow ">
            ← Back to Home
        </Link>
        </div>
    </main>
  );
}
