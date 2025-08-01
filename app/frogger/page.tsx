'use client';

import React from 'react';

export default function FroggerPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <iframe
        src="/frogger/index.html"
        title="Frogger Game"
        width="624"
        height="720"
        style={{
          border: 'none',
          maxWidth: '100%',
        }}
      />
    </div>
  );
}
