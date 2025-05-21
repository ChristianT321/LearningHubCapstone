'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Menu, Button } from '@mantine/core'
import { Anchor, Container, Group, Burger } from '@mantine/core';
import { useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { useMantineTheme, useMantineColorScheme } from '@mantine/core';

const footerLinks = [
  { link: 'https://www.youtube.com/watch?v=7ziMmDmCFbI', label: 'Videos' },
  { link: 'https://pacificwild.org/from-land-to-sea-great-bear-rainforest-story-map/', label: 'Learn' },
];

const headerLinks = [
  { link: '/module1', label: 'Module 1' },
  { link: '/module2', label: 'Module 2' },
  { link: '/module3', label: 'Module 3' },
  { link: '/module4', label: 'Module 4' },
];

export default function HomePage() {
  const router = useRouter()

  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(headerLinks[0].link);
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();

  const isDark = colorScheme === 'dark';


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

  const headerItems = headerLinks.map((link) => (
    <a
      key={link.label}
      href={link.link}
      style={{
        ...linkBaseStyle,
        ...(active === link.link ? linkActiveStyle : {}),
      }}
      onMouseEnter={(e) => {
        Object.assign(e.currentTarget.style, linkHoverStyle);
      }}
      onMouseLeave={(e) => {
        Object.assign(e.currentTarget.style, {
          color: active === link.link ? theme.white : linkBaseStyle.color,
        });
      }}
      onClick={(event) => {
        event.preventDefault();
        setActive(link.link);
        router.push(link.link);
      }}
    >
      {link.label}
    </a>
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

    <header style={{ height: '56px', backgroundColor: 'transparent', zIndex: 1000, width: '100%' }}>
      <div style={{ ...innerStyle, justifyContent: 'space-between', width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '0 16px', textAlign: 'left' }}>
        <div style={{ fontSize: '36px', fontWeight: 'bold', color: 'white' }}>
          Welcome
        </div>

        <Group gap="md" style={{ flexDirection: 'row' }}>
          {headerItems}
        </Group>

        <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
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

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center gap-6 w-full max-w-4xl px-4 py-9">
        <h1 className="text-5xl font-extrabold text-white drop-shadow-[3px_3px_0px_black] mt-25 mb-2">
          Welcome to the Great Bear Rainforest Learning Hub!
        </h1>
        <h2 className="text-3xl font-semibold text-white drop-shadow-[2px_2px_0px_black] mb-2">
          Your number one source for learning about the Great Bear Rainforest!
        </h2>

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
          className="bg-amber-800 hover:bg-amber-900 text-white font-bold px-6 py-3 rounded shadow mt-5"
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