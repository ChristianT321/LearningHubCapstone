'use client';

export default function FroggerEndlessPage() {
  return (
    <div style={{ display:'flex', justifyContent:'center', alignItems:'center', height:'100vh' }}>
      <iframe
        src="/frogger-endless/index.html"
        width="640"
        height="720"
        style={{ border:'none' }}
        title="Endless Frogger Game"
      />
    </div>
  );
}
