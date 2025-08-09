'use client'
export default function FroggerEndlessPage() {
  return (
    <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh',background:'#000'}}>
      <iframe
        src="/frogger-endless/index.html"
        width="480"
        height="640"
        style={{ border:'none' }}
        title="Endless Frogger Game"
      />
    </div>
  )
}

