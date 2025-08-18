'use client';

import { useState } from 'react';

type RosterRow = {
  id: number;
  first_name: string;
  last_name: string;
  class_code: string;
  test1_score?: number | null;
  test2_score?: number | null;
  test3_score?: number | null;
  test4_score?: number | null;
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
    const students: Array<Omit<RosterRow, 'test1_score'|'test2_score'|'test3_score'|'test4_score'>> =
      await fetchJSON(`${apiBase}/students?classCode=${encodeURIComponent(cc)}`);

    const out: RosterRow[] = [];
    for (const s of students) {
      let scores: Partial<RosterRow> | null = null;
      try {
        scores = await fetchJSON(`${apiBase}/test_results/${s.id}`);
      } catch {}
      out.push({
        id: s.id,
        first_name: s.first_name,
        last_name: s.last_name,
        class_code: s.class_code,
        test1_score: (scores as any)?.test1_score ?? null,
        test2_score: (scores as any)?.test2_score ?? null,
        test3_score: (scores as any)?.test3_score ?? null,
        test4_score: (scores as any)?.test4_score ?? null,
      });
    }
    return out;
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
        <h1 className="text-3xl font-extrabold mb-2">Teacher Portal</h1>
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
            <table className="min-w-full text-sm border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-3 py-2 border">Student</th>
                  <th className="px-3 py-2 border">Test 1</th>
                  <th className="px-3 py-2 border">Test 2</th>
                  <th className="px-3 py-2 border">Test 3</th>
                  <th className="px-3 py-2 border">Test 4</th>
                  <th className="px-3 py-2 border">Total</th>
                  <th className="px-3 py-2 border">Average</th>
                </tr>
              </thead>
              <tbody>
                {roster.map((r) => (
                  <tr key={r.id} className="odd:bg-white even:bg-gray-50">
                    <td className="px-3 py-2 border font-medium">
                      {r.first_name} {r.last_name}
                    </td>
                    <td className="px-3 py-2 border text-center">{r.test1_score ?? '—'}</td>
                    <td className="px-3 py-2 border text-center">{r.test2_score ?? '—'}</td>
                    <td className="px-3 py-2 border text-center">{r.test3_score ?? '—'}</td>
                    <td className="px-3 py-2 border text-center">{r.test4_score ?? '—'}</td>
                    <td className="px-3 py-2 border text-center">{total(r)}</td>
                    <td className="px-3 py-2 border text-center">{average(r)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-xs text-gray-500 mt-2">— means no score saved yet.</p>
          </div>
        )}
      </div>
    </main>
  );
}
