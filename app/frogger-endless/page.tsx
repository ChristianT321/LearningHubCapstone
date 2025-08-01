'use client';

import { useEffect } from 'react';

export default function FroggerEndlessPage() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '/frogger-endless/frogger-endless.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <iframe
        src="/frogger-endless/index.html"
        width="640"
        height="720"
        style={{ border: 'none' }}
        title="Endless Frogger Game"
      />
    </div>
  );
}
