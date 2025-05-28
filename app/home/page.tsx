// ChatGPT was used to help create the footer and header in a single file. 
// Within mantine they use a file for the creation and a css file for the customization so i asked chatgpt to help integrate them into one file.
// helped create the animated buttons

'use client'

import Image from 'next/image'
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useRouter } from 'next/navigation'
import { Anchor, Container, Group } from '@mantine/core';
import { useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { useMantineTheme, useMantineColorScheme } from '@mantine/core';
import { FaDove, FaPaw, FaTree, FaWater } from 'react-icons/fa'
import { motion } from 'framer-motion';

//links to educational things within the footer
const footerLinks = [
  { link: 'https://www.youtube.com/watch?v=7ziMmDmCFbI', label: 'Videos' },
  { link: 'https://pacificwild.org/from-land-to-sea-great-bear-rainforest-story-map/', label: 'Learn' },
];

//links to each module within the header
const headerLinks = [
  { link: '/module1', label: 'Module 1', icon: FaPaw },
  { link: '/module2', label: 'Module 2', icon: FaWater },
  { link: '/module3', label: 'Module 3', icon: FaDove},
  { link: '/module4', label: 'Module 4', icon: FaTree },
];

export default function HomePage() {
  const router = useRouter()

  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(headerLinks[0].link);
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();

  const isDark = colorScheme === 'dark';

  const slides = [
      {
        image: '/Spirit bear.jpg',
        alt: 'Spirit Bear',
        desc: 'The rare Spirit Bear lives in the Great Bear Rainforest.',
      },
      {
        image: '/Douglas fir.jpg',
        alt: 'Douglas fir',
        desc: 'The Douglas Fir can tower up to 100ft tall!',
      },
      {
        image: '/Hummingbird.jpg',
        alt: 'Hummingbird',
        desc: 'The small hummingbird can flap its wings up to 80 times per second.',
      },
      {
        image: '/Tout in water.jpg',
        alt: 'Lake Trout',
        desc: 'The lake trout can go against the current and swim up stream .',
      },
    ];

  const headerStyle = {
    height: '56px',
    marginBottom: '40px',
    backgroundColor: 'transparent',
    zIndex: 1000,
  };

  const innerStyle = {
    height: '56px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 16px',
  };

  const linkBaseStyle = {
    display: 'inline-block',
    lineHeight: 1,
    padding: '8px 12px',
    textDecoration: 'none',
    color: 'white',
    fontSize: '18px',
    fontWeight: 500,
  };

  const linkHoverStyle = {
  };

  const linkActiveStyle = {
    backgroundColor: 'transparent',
  };

  const headerItems = headerLinks.map(({link, label, icon: Icon}) => (
    <motion.button
    key={label}
    onClick={(e) => {
      e.preventDefault();
      setActive(link);
      router.push(link);
    }}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    className={`flex items-center gap-2 px-4 py-2 rounded-full text-white text-lg font-bold transition-all duration-300 ${
      active === link ? 'bg-red-700 shadow-md' : 'bg-red-600'
    }`}
  >
    <Icon className="text-yellow-300" />
    {label}
  </motion.button>
  ));

  const items = footerLinks.map((link) => (
    <Anchor<'a'>
      c="dimmed"
      key={link.label}
      href={link.link}
      target="_blank"
      rel="noopener noreferrer"
      size="sm"
      style={{
      marginRight: link.label === 'Videos' ? '40px' : '0px', 
    }}
    >
      {link.label}
    </Anchor>
  ));

  const handleSignOut = () => {
    localStorage.removeItem('currentUser')
    router.push('/')
  }

  const handleContinue = () => {
    router.push('/module1')
  }

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-start text-center overflow-y-auto p-4" style={{paddingTop: '80px'}}>

        <header
      style={{
        height: '0px',
        backgroundColor: 'transparent',
        zIndex: 1000,
        width: '100%',
      }}
    >
      <div
        style={{
          ...innerStyle,
          justifyContent: 'space-between',
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 16px',
          textAlign: 'left',
        }}
      >
        <div style={{ fontSize: '36px', fontWeight: 'bold', color: 'white' }}>
          Welcome
        </div>

        <Group gap="sm" style={{ flexDirection: 'row', display: 'flex' }}>
          {headerItems}
        </Group>
      </div>
    </header>
      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/GBR home back.png"
          alt="Home Background"
          fill
          priority
          className="object-cover"
          style={{ objectPosition: 'center' }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6 w-full max-w-4xl px-4">
        <h1 className="text-5xl font-extrabold text-white drop-shadow-[3px_3px_0px_black] mt-25 mb-2">
        <FaPaw className="text-yellow-400" />
          Welcome to the Great Bear Rainforest Learning Hub!
        </h1>
        <h2 className="text-3xl font-semibold text-white drop-shadow-[2px_2px_0px_black] mb-2">
          Your number one source for learning about the Great Bear Rainforest!
        </h2></div>

      <div className="w-full max-w-3xl mx-auto mt-10 rounded-lg overflow-hidden shadow-lg bg-red-600 bg-opacity-70 p-4 z-30"> 
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        showIndicators={true}
        interval={5000}
        className="rounded"
      >
        {slides.map((slide, idx) => (
          <div key={idx} className="relative">
            <img
              src={slide.image}
              alt={slide.alt}
              className="h-80 w-full object-cover rounded-md"
              style={{
                width: '400px',
                height: '300px',
                objectFit: 'cover', 
                borderRadius: '12px'
              }}
            />
            <p className="text-white text-lg font-semibold absolute bottom-0 left-0 right-0 bg-green-700 bg-opacity-60 py-2 px-4">
              {slide.desc}
            </p>
          </div>
        ))}
      </Carousel>
    </div>

    <div className="relative z-10 flex flex-col items-center gap-6 w-full max-w-4xl px-4 py-9">
        <p className="text-xl font-semibold text-white drop-shadow-[2px_2px_0px_black] mb-2">
          Get ready to explore one of the coolest places on Earth! This website is made just for kids like you to learn all about the animals, trees, people, and secrets of the Great Bear Rainforest. 
          You’ll play fun games, take quizzes, earn badges, and unlock new levels as you learn. Start your adventure and see how much you can discover!
        </p>

        <button
          onClick={handleSignOut}
          className="fixed left-5 bottom-5 bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded shadow"
        >
          Sign Out
        </button>
        <button
          onClick={handleContinue}
          className="bg-red-700 hover:bg-red-600 hover:scale-105 transition-all duration-300 shadow-lg rounded px-6 py-3 text-white font-fun"
        >
          Continue
        </button>
      </div>
      
      <div
      style={{
        marginTop: 30,
        borderTop: '1px solid var(--mantine-color-gray-2)',
          }}
        >
      <Container
        style={{
          position: 'relative', 
          zIndex: 1000, 
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: 3,
          paddingBottom: 12,
          flexDirection: 'row',
          }}
        >
        <Group 
          style={{
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '12px',
            
          }}
        >
          {items}
        </Group>
      </Container>
    </div>

    
    </main>
  )
}