// This page was made by referencing slides and examples given in web dev 2, while primarily basing it off of my final project in the same class. Copilot helped fill out some details.
// The database fetching was completed with the help of ChatGPT which took a lot of brainpower and reworking, as many of the solutions that were given did not work as advised. 
// 'use client'

// import { useEffect, useState } from 'react'
// import Image from 'next/image'
// import { useRouter } from 'next/navigation'
// import { Button, Menu } from '@mantine/core'

// interface Fact {
//   ID: number
//   FACT: string
// }

// export default function HomePage() {
//   const [facts, setFacts] = useState<Fact[]>([])
//   const [loading, setLoading] = useState(true)
//   const router = useRouter()

//   useEffect(() => {
//     fetch('http://localhost:3001/api/facts')
//       .then((res) => res.json())
//       .then((data) => {
//         setFacts(data)
//         setLoading(false)
//       })
//       .catch((err) => {
//         console.error('Failed to load facts:', err)
//         setLoading(false)
//       })
//   }, [])

//   const handleSignOut = () => {
//     localStorage.removeItem('currentUser')
//     router.push('/')
//   }

//   const handleContinue = () => {
//     router.push('/matching1')
//   }

//   return (
//     <main className="relative min-h-screen w-full flex flex-col items-center justify-start text-center overflow-y-auto p-4">

//       <div className="fixed inset-0 z-0">
//         <Image
//           src="/homeback.png"
//           alt="Home Background"
//           fill
//           priority
//           className="object-cover"
//           style={{ objectPosition: 'center' }}
//         />
//       </div>

//             <div className="absolute top-4 right-4 z-20">
//             <Menu
//                 shadow="md"
//                 width={200}
//                 openDelay={100}
//                 closeDelay={150}
//                 withinPortal={false}
//                 styles={{
//                   item: {
//                     color: 'black', 
//                 },
//                 }}
//               >          
//                 <Menu.Target>
//                   <Button variant="filled" className="text-black">Menu</Button>
//                 </Menu.Target>
      
//                 <Menu.Dropdown style={{ display: 'flex', flexDirection: 'column', zIndex: 50 }}>
//                   <Menu.Item onClick={() => router.push('/home')}>Home</Menu.Item>
//                   <Menu.Item onClick={() => router.push('/module1')}>Module 1</Menu.Item>
//                   <Menu.Item onClick={() => router.push('/module2')}>Module 2</Menu.Item>
//                   <Menu.Item onClick={() => router.push('/module3')}>Module 3</Menu.Item>
//                   <Menu.Item onClick={() => router.push('/module4')}>Module 4</Menu.Item>
//                   <Menu.Divider />
//                 </Menu.Dropdown>
//               </Menu>
//             </div>

//       <div className="relative z-10 flex flex-col items-center gap-6 w-full max-w-6xl px-4">
//         <h1 className="text-4xl font-extrabold text-white drop-shadow-[3px_3px_0px_black] mt-25 mb-2">
//           MODULE 1:
//         </h1>
//         <h2 className="text-4xl font-extrabold text-white drop-shadow-[3px_3px_0px_black] mb-2">
//           GROUND ANIMALS
//         </h2>
//         <p className="text-xl font-semibold text-white drop-shadow-[2px_2px_0px_black] mb-2">
//           Today we will be learning about how:
//         </p>

//         {loading ? (
//           <p className="text-white text-lg drop-shadow">Loading facts...</p>
//         ) : (
//         <ul className="space-y-8">
//           {facts.map((fact) => (
//             <li
//               key={fact.ID}
//               className="inline-flex items-start gap-3 bg-white/10 backdrop-blur-sm px-4 py-3 rounded-md shadow text-left"
//             >
//               <span className="text-green-300 text-2xl drop-shadow">🌿</span>
//               <span className="text-white text-base sm:text-lg font-semibold drop-shadow-[2px_2px_0px_black]">
//                 {fact.FACT}
//               </span>
//             </li>
//           ))}
//         </ul>
//         )}

//         <button
//             onClick={handleSignOut}
//             className="fixed left-5 bottom-5 bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded shadow"
//         >
//             Sign Out
//         </button>
                
//         <button
//           onClick={handleContinue}
//           className="bg-amber-800 hover:bg-amber-900 text-white font-bold px-6 py-3 rounded shadow mt-5"
//         >
//           Continue
//         </button>
//       </div>
//     </main>
//   )
// }
