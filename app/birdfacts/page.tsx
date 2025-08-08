'use client';

import { useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';

type Bird = {
  name: string;
  slug: string;
  images: {
    main: { src: string; alt: string };
    feather: { src: string; alt: string };
    extra: { src: string; alt: string };
    food: { src: string; alt: string };
  };
  intro: string;
  featherInfo: string;
  nesting: {
    image: string;
    caption: string;
    fact: string;
  };
  food: {
    text: string;
    unique: string;
  };
  didYouKnow: string;
};

type BirdGroups = {
  [groupName: string]: Bird[];
};

const birdGroups: BirdGroups = {
  'Birds of Prey': [
    {
      name: '🦅 Bald Eagle',
      slug: 'bald-eagle',
      images: {
        main: { src: '/Bald eagle.jpg', alt: 'Bald Eagle' },
        feather: { src: '/Bald eagle feather.jpg', alt: 'Bald Eagle Feather' },
        extra: { src: '/Bald eagle nest.jpg', alt: 'Bald Eagle Nest' },
        food: { src: '/Bald eagle hunting.jpg', alt: 'Bald Eagle Hunting' },
      },
      intro: 'The bald eagle is a powerful bird of prey native to North America. It is known for its white head, yellow beak, and strong wingspan that allows it to soar high above lakes and rivers.',
      featherInfo: 'Bald eagle feathers are broad and stiff, ideal for gliding and soaring at high altitudes. These feathers are sacred in many Indigenous cultures.',
      nesting: {
        image: '/Bald eagle nest.jpg',
        caption: 'Bald eagles build enormous nests in tall trees, returning to them year after year.',
        fact: 'Some eagle nests can reach up to 2.5 meters in diameter and weigh over a ton!'
      },
      food: {
        text: 'Bald eagles primarily hunt fish, swooping down with incredible speed and precision. They also scavenge and sometimes steal food from other birds.',
        unique: 'They can spot prey from over 3 kilometers away, thanks to their incredible eyesight.'
      },
      didYouKnow: 'Bald eagles return to the same nest every year — sometimes for decades!'
    },
    {
      name: '🦉 Great Horned Owl',
      slug: 'great-horned-owl',
      images: {
        main: { src: '/great horned owl.webp', alt: 'Great Horned Owl' },
        feather: { src: '/great horned owl feather.jpg', alt: 'Great Horned Owl Feather' },
        extra: { src: '/Great horned owl nest.jpg', alt: 'Great Horned Owl Nest' },
        food: { src: '/Great horned owl hunting.jpg', alt: 'Great Horned Owl Hunting' },
      },
      intro: 'Great Horned Owls are powerful nocturnal hunters with tufted ears and piercing yellow eyes. They live in forests, deserts, and urban areas across the Americas.',
      featherInfo: 'Their soft-edged feathers allow for silent flight — perfect for sneaking up on prey in the dark.',
      nesting: {
        image: '/Great horned owl nest.jpg',
        caption: 'These owls often reuse nests built by other large birds or squirrels.',
        fact: 'They are one of the first birds to nest in the year, sometimes as early as January.'
      },
      food: {
        text: 'They hunt small to medium-sized animals like rabbits, mice, and even skunks.',
        unique: 'Their powerful grip can exert 500 psi — stronger than the bite of a large dog!'
      },
      didYouKnow: 'Their deep hoots can be heard from miles away on quiet nights.'
    },
    {
      name: '🪶 Northern Goshawk',
      slug: 'northern-goshawk',
      images: {
        main: { src: '/Norther goshawk.webp', alt: 'Northern Goshawk' },
        feather: { src: '/Northern goshawk feather.jpg', alt: 'Goshawk Feather' },
        extra: { src: '/northern goshawk nest.jpg', alt: 'Goshawk Nest' },
        food: { src: '/Northern goshwak hunting.webp', alt: 'Goshawk Hunting' },
      },
      intro: 'Northern Goshawks are powerful forest-dwelling raptors known for their speed and agility among trees.',
      featherInfo: 'Their feathers are designed for silent flight and quick maneuvers through dense forests.',
      nesting: {
        image: '/Northern goshawk nest.jpg',
        caption: 'They build large stick nests high in mature trees, often reusing them each year.',
        fact: 'Goshawks can aggressively defend their nests, even against humans!',
      },
      food: {
        text: 'They hunt birds and small mammals like squirrels with sudden bursts of speed.',
        unique: 'Their long tails and short wings help them twist through forest branches at high speed.',
      },
      didYouKnow: 'The name “goshawk” comes from the Old English for “goose hawk” due to their hunting strength.'
    },
    {
        name: '⚡ Peregrine Falcon',
        slug: 'peregrine-falcon',
        images: {
          main: { src: '/Peregrine falcon.webp', alt: 'Peregrine Falcon' },
          feather: { src: '/Peregrine falcon feather.jpg', alt: 'Falcon Feather' },
          extra: { src: '/Peregrine falcon nest.jpg', alt: 'Falcon Nest' },
          food: { src: '/Peregrine falcon hunting.jpg', alt: 'Falcon Hunting' },
        },
        intro: 'Peregrine Falcons are the fastest animals on Earth, capable of diving at over 300 km/h.',
        featherInfo: 'Their aerodynamic feathers reduce drag and allow for unmatched speed.',
        nesting: {
          image: '/Peregrine falcon nest.jpg',
          caption: 'They nest on high cliffs or skyscrapers in urban areas.',
          fact: 'Unlike many birds, peregrines don’t build nests but lay eggs on bare surfaces.',
        },
        food: {
          text: 'They feed almost exclusively on birds, catching them mid-flight with dramatic stoops.',
          unique: 'Their nostrils have special bony structures to help them breathe at high speeds.',
        },
        didYouKnow: 'Peregrine Falcons have adapted well to cities, using tall buildings like cliffs.'
      },
      {
        name: '🐟 Osprey',
        slug: 'osprey',
        images: {
          main: { src: '/Osprey.webp', alt: 'Osprey' },
          feather: { src: '/Osprey feather.webp', alt: 'Osprey Feather' },
          extra: { src: '/Osprey nest.jpg', alt: 'Osprey Nest' },
          food: { src: '/Osprey hunting.jpg', alt: 'Osprey Hunting' },
        },
        intro: 'Ospreys are large raptors found near water, known for their fish-catching talents.',
        featherInfo: 'Their feathers are oily and dense to keep them dry when diving.',
        nesting: {
          image: '/Osprey nest.jpg',
          caption: 'They often build large platform nests atop poles, trees, or cliffs.',
          fact: 'Ospreys return to the same nest year after year, adding new material each season.',
        },
        food: {
          text: 'Ospreys eat almost exclusively fish, diving feet-first into water to catch them.',
          unique: 'Their feet have backward-facing toes and barbed pads to grip slippery fish.',
        },
        didYouKnow: 'Ospreys have a unique reversible outer toe to better grasp their prey.'
      }
  ],
  'Water Birds': [
    {
      name: '🦆 Mallard Duck',
      slug: 'mallard-duck',
      images: {
        main: { src: '/Duck.webp', alt: 'Mallard Duck' },
        feather: { src: '/Duck feather.jpg', alt: 'Duck Feather' },
        extra: { src: '/Ducklings.jpg', alt: 'Ducklings' },
        food: { src: '/Duck feeding.jpg', alt: 'Duck Feeding' },
      },
      intro: 'Mallards are one of the most common ducks found in North America. They are known for their green heads and cheerful quacking.',
      featherInfo: 'Their feathers are waterproof thanks to oils from a special gland near the tail.',
      nesting: {
        image: '/Ducklings.jpg',
        caption: 'They nest on the ground near water and care closely for their ducklings.',
        fact: 'Ducklings can swim just hours after hatching!'
      },
      food: {
        text: 'They feed on aquatic vegetation, insects, and small fish using their flat bills.',
        unique: 'Some Mallards travel thousands of kilometers during seasonal migrations.'
      },
      didYouKnow: 'Mallards can sleep with one eye open to stay alert for predators.'
    },
    {
      name: '🐧 Marbled Murrelet',
      slug: 'marbled-murrelet',
      images: {
        main: { src: '/Marbled murrelet.webp', alt: 'Marbled Murrelet' },
        feather: { src: '/Marbled murrelet feather.webp', alt: 'Murrelet Feather' },
        extra: { src: '/Marbled murrelet nest.jpg', alt: 'Murrelet Nest' },
        food: { src: '/Marbled murrelet feeding.webp', alt: 'Murrelet Feeding' },
      },
      intro: 'Marbled Murrelets are small seabirds that live at sea but nest deep in old-growth forests — a rare combination!',
      featherInfo: 'Their feathers are waterproof and provide excellent insulation in cold ocean waters.',
      nesting: {
        image: '/Marbled murrelet nest.jpg',
        caption: 'Unlike most seabirds, they nest on mossy branches high in coastal forests.',
        fact: 'They fly up to 80 km inland to nest on a single tree branch!',
      },
      food: {
        text: 'They dive underwater to catch small fish and crustaceans.',
        unique: 'They use their wings to “fly” through the water while chasing prey.',
      },
      didYouKnow: 'Scientists didn’t know where they nested until the 1970s!'
    },
    {
      name: '🪶 Sandhill Crane',
      slug: 'sandhill-crane',
      images: {
        main: { src: '/Sandhill crane.jpg', alt: 'Sandhill Crane' },
        feather: { src: '/Sandhill crane feather.jpg', alt: 'Crane Feather' },
        extra: { src: '/Sandhill crane nest.jpg', alt: 'Crane Nest' },
        food: { src: '/Sandhill crane feeding.webp', alt: 'Crane Feeding' },
      },
      intro: 'Sandhill Cranes are tall, elegant birds known for their loud trumpeting calls and impressive migrations.',
      featherInfo: 'Their long, gray feathers are often stained with mud during preening.',
      nesting: {
        image: '/Sandhill crane nest.jpg',
        caption: 'They nest in wetlands, building mounds of vegetation above the waterline.',
        fact: 'Chicks are able to leave the nest and walk just a day after hatching!',
      },
      food: {
        text: 'Cranes eat a mix of grains, insects, frogs, and small mammals.',
        unique: 'They forage by probing the ground with their long bills.',
      },
      didYouKnow: 'Some populations migrate over 6,000 kilometers each year!'
    },
    {
      name: '🪻 Great Blue Heron',
      slug: 'great-blue-heron',
      images: {
        main: { src: '/Great blue heron.webp', alt: 'Great Blue Heron' },
        feather: { src: '/Great blue heron feathr.webp', alt: 'Heron Feather' },
        extra: { src: '/Great blue heron nest.jpg', alt: 'Heron Nest' },
        food: { src: '/Great blue heron feeding.jpg', alt: 'Heron Feeding' },
      },
      intro: 'The Great Blue Heron is a tall, graceful wading bird often seen stalking fish in shallow water.',
      featherInfo: 'They have long, elegant feathers that drape from their chest and back.',
      nesting: {
        image: '/Great blue heron nest.jpg',
        caption: 'Herons nest in colonies high up in trees, often near water.',
        fact: 'A single tree may hold dozens of large heron nests!',
      },
      food: {
        text: 'They hunt fish, frogs, and small animals by standing still and striking quickly.',
        unique: 'They can swallow prey whole — even large ones!',
      },
      didYouKnow: 'Herons have a wingspan of nearly 2 meters!'
    },
    {
      name: '🪿 American White Pelican',
      slug: 'american-white-pelican',
      images: {
        main: { src: '/American white pelican.jpg', alt: 'American White Pelican' },
        feather: { src: '/Pelican feather.jpg', alt: 'Pelican Feather' },
        extra: { src: '/Pelican nest.jpg', alt: 'Pelican Nest' },
        food: { src: '/Pelican feeding.jpg', alt: 'Pelican Feeding' },
      },
      intro: 'The American White Pelican is one of the largest birds in North America, with a giant wingspan and a pouch-like bill used for catching fish.',
      featherInfo: 'Their white feathers with black wingtips are striking in flight and provide buoyancy in water.',
      nesting: {
        image: '/Pelican nest.jpg',
        caption: 'They nest in large colonies on remote islands in freshwater lakes.',
        fact: 'Pelican chicks often form “nurseries” where they huddle together!',
      },
      food: {
        text: 'They scoop up fish with their large bill pouch while swimming cooperatively in groups.',
        unique: 'Unlike brown pelicans, they do not dive — they feed while floating.',
      },
      didYouKnow: 'Their bills can hold up to 11 liters of water — more than their belly!'
    },
    {
      name: '🦢 Trumpeter Swan',
      slug: 'trumpeter-swan',
      images: {
        main: { src: '/Trumpeter swan.jpg', alt: 'Trumpeter Swan' },
        feather: { src: '/Swan feather.webp', alt: 'Swan Feather' },
        extra: { src: '/Swan nest.jpg', alt: 'Swan Nest' },
        food: { src: '/Swan feeding.jpg', alt: 'Swan Feeding' },
      },
      intro: 'Trumpeter Swans are North America’s largest native waterfowl, famous for their trumpet-like calls and graceful appearance.',
      featherInfo: 'Their feathers are all white and extremely dense, providing insulation in icy waters.',
      nesting: {
        image: '/Swan nest.jpg',
        caption: 'They build massive nests near shallow wetlands and ponds.',
        fact: 'A swan nest can be over 2 meters wide and weigh 20 kilograms!',
      },
      food: {
        text: 'They feed on aquatic plants by dipping their long necks below the water’s surface.',
        unique: 'They can pull up vegetation from over a meter deep!',
      },
      didYouKnow: 'They mate for life and often return to the same nesting area year after year.'
    },
    {
      name: '🎨 Harlequin Duck',
      slug: 'harlequin-duck',
      images: {
        main: { src: '/Harlequin duck.jpg', alt: 'Harlequin Duck' },
        feather: { src: '/Harlequin duck feather.webp', alt: 'Harlequin Duck Feather' },
        extra: { src: '/Harlequin duck nest.jpg', alt: 'Harlequin Duck Nest' },
        food: { src: '/Harlequin duck feeding.jpg', alt: 'Harlequin Duck Feeding' },
      },
      intro: 'Harlequin Ducks are colorful and compact diving ducks that live along fast-moving mountain streams and coastal waters.',
      featherInfo: 'Their feathers are dense and waterproof to help them dive in cold, fast-moving water.',
      nesting: {
        image: '/Harlequin duck nest.jpg',
        caption: 'They nest near rushing streams, often in crevices, under logs, or hidden in vegetation.',
        fact: 'Harlequin Ducks are one of the only ducks that breed in turbulent river environments.',
      },
      food: {
        text: 'They feed on aquatic insects, mollusks, and crustaceans by diving and picking food from the bottom.',
        unique: 'They are excellent underwater swimmers and use their wings to steer while diving.',
      },
      didYouKnow: 'They get their name from their clown-like plumage patterns and colors.'
    },
    {
      name: '🖤 Common Loon',
      slug: 'common-loon',
      images: {
        main: { src: '/Common loon.jpg', alt: 'Common Loon' },
        feather: { src: '/Common loon feather.jpg', alt: 'Loon Feather' },
        extra: { src: '/Common loon nest.jpg', alt: 'Loon Nest' },
        food: { src: '/Common loon feeding.webp', alt: 'Loon Feeding' },
      },
      intro: 'Common Loons are iconic diving birds known for their haunting calls and checkered black-and-white plumage.',
      featherInfo: 'Their dense feathers trap air for insulation and buoyancy in cold northern lakes.',
      nesting: {
        image: '/Loon nest.jpg',
        caption: 'They build floating nests along the edges of quiet lakes.',
        fact: 'Loons have trouble walking on land due to their rear-set legs, so they nest close to the water.',
      },
      food: {
        text: 'Loons dive underwater to catch fish, frogs, and aquatic invertebrates.',
        unique: 'They can stay submerged for over a minute and dive more than 60 meters deep!',
      },
      didYouKnow: 'Their eerie calls echo across northern lakes and are used to mark territory and attract mates.'
    },
    {
      name: '🍁 Canada Goose',
      slug: 'canada-goose',
      images: {
        main: { src: '/Canada goose.webp', alt: 'Canada Goose' },
        feather: { src: '/Goose feather.jpg', alt: 'Goose Feather' },
        extra: { src: '/Goose nest.jpg', alt: 'Goose Nest' },
        food: { src: '/Goose feeding.jpg', alt: 'Goose Feeding' },
      },
      intro: 'Canada Geese are large, social birds recognized by their black heads, white cheeks, and loud honking.',
      featherInfo: 'Their feathers provide excellent insulation, especially for long-distance flights and cold-weather survival.',
      nesting: {
        image: '/Goose nest.jpg',
        caption: 'They build nests near water in grassy areas, often guarded fiercely by the parents.',
        fact: 'Both parents aggressively defend the nest and lead their goslings to water after hatching.',
      },
      food: {
        text: 'They graze on grasses, aquatic plants, grains, and occasionally insects.',
        unique: 'They migrate in a signature V-formation that helps conserve energy.',
      },
      didYouKnow: 'Canada Geese can fly over 1,500 km in a single day during migration!'
    },
    {
      name: '🎵 American Dipper',
      slug: 'american-dipper',
      images: {
        main: { src: '/American dipper.jpg', alt: 'American Dipper' },
        feather: { src: '/Dipper feather.webp', alt: 'Dipper Feather' },
        extra: { src: '/Dipper nest.jpg', alt: 'Dipper Nest' },
        food: { src: '/Dipper feeding.jpg', alt: 'Dipper Feeding' },
      },
      intro: 'The American Dipper is a plump, grey songbird that walks underwater in fast-moving mountain streams.',
      featherInfo: 'They have extra oil and a thick coat of feathers to stay dry and warm in cold water.',
      nesting: {
        image: '/Dipper nest.jpg',
        caption: 'They often nest in crevices near waterfalls or under bridges.',
        fact: 'Dippers sing even in winter — and even while standing in freezing streams!',
      },
      food: {
        text: 'They hunt insects, larvae, and small aquatic animals by dipping and swimming underwater.',
        unique: 'They can close their nostrils and have a nictitating membrane to see clearly underwater.',
      },
      didYouKnow: 'They are the only aquatic songbird in North America!'
    },
  ],
  'Forest Birds': [
    {
      name: '🧠 Common Raven',
      slug: 'raven',
      images: {
        main: { src: '/Raven.jpg', alt: 'Raven' },
        feather: { src: '/Raven feather.png', alt: 'Raven Feather' },
        extra: { src: '/Raven nest.jpg', alt: 'Raven Nest' },
        food: { src: '/Raven eating.jpg', alt: 'Raven Eating' },
      },
      intro: 'Ravens are highly intelligent birds known for problem-solving and mimicry. They can mimic sounds, including human speech.',
      featherInfo: 'Raven feathers are sleek, jet-black, and slightly iridescent, aiding in flight and warmth.',
      nesting: {
        image: '/Raven nest.jpg',
        caption: 'Ravens build large nests high in trees or cliffs using sticks and moss.',
        fact: 'They sometimes decorate nests with shiny objects!'
      },
      food: {
        text: 'Omnivores and scavengers — they eat small animals, berries, and even garbage.',
        unique: 'They use tools and can cooperate to solve problems!'
      },
      didYouKnow: 'Ravens remember faces and can hold grudges against humans who treat them badly.'
    },
    {
      name: '💙 Steller’s Jay',
      slug: 'stellers-jay',
      images: {
        main: { src: '/Stellers jay.jpg', alt: 'Steller’s Jay' },
        feather: { src: '/Stellers jay feather.jpg', alt: 'Steller’s Jay Feather' },
        extra: { src: '/Stellers jay nest.jpg', alt: 'Steller’s Jay Nest' },
        food: { src: '/Stellers jay feeding.jpg', alt: 'Steller’s Jay Feeding' },
      },
      intro: 'Steller’s Jays are striking blue and black birds with bold personalities. They are often seen in conifer forests, calling loudly and investigating campers.',
      featherInfo: 'Their feathers are deep blue with black crests, helping them blend into shady forest canopies.',
      nesting: {
        image: '/Stellers jay nest.jpg',
        caption: 'They build nests from twigs and mud, usually placed high in evergreen trees.',
        fact: 'They sometimes steal nesting material or food from other birds!',
      },
      food: {
        text: 'Omnivores, they eat seeds, insects, berries, and even small animals or eggs.',
        unique: 'They cache food like acorns and peanuts to eat later — and remember where they hid them.',
      },
      didYouKnow: 'Steller’s Jays can mimic the calls of hawks to scare off other birds!'
    },
    {
      name: '🧡 Varied Thrush',
      slug: 'varied-thrush',
      images: {
        main: { src: '/Varied thrush.jpg', alt: 'Varied Thrush' },
        feather: { src: '/Varied thrush feather.jpg', alt: 'Varied Thrush Feather' },
        extra: { src: '/Varied thrush nest.jpg', alt: 'Varied Thrush Nest' },
        food: { src: '/Varied thrush feeding.jpg', alt: 'Varied Thrush Feeding' },
      },
      intro: 'The Varied Thrush is a shy forest bird with bold orange and black patterns and a haunting, echoing song.',
      featherInfo: 'Their bright orange breast and black band help them hide among dappled light and leaf litter.',
      nesting: {
        image: '/Varied thrush nest.jpg',
        caption: 'They build cup-shaped nests in shrubs or low tree branches in dense forests.',
        fact: 'They line their nests with moss, bark, and soft grasses.',
      },
      food: {
        text: 'They feed on insects in summer and switch to berries and seeds in winter.',
        unique: 'They forage quietly on the forest floor, hopping and pausing between steps.',
      },
      didYouKnow: 'Their flutelike, single-note song sounds like a forest flute echoing through the trees.'
    },
    {
      name: '🪵 Pacific Wren',
      slug: 'pacific-wren',
      images: {
        main: { src: '/Pacific wren.jpg', alt: 'Pacific Wren' },
        feather: { src: '/Pacific wren feather.webp', alt: 'Pacific Wren Feather' },
        extra: { src: '/Pacific wren nest.jpg', alt: 'Pacific Wren Nest' },
        food: { src: '/Pacific wren feeding.jpg', alt: 'Pacific Wren Feeding' },
      },
      intro: 'Pacific Wrens are tiny brown birds with a huge voice. They live deep in mossy rainforests, flitting close to the ground.',
      featherInfo: 'Their brown and speckled feathers give them perfect camouflage in the underbrush.',
      nesting: {
        image: '/Pacific wren nest.jpg',
        caption: 'They build dome-shaped nests hidden in roots, logs, or mossy banks.',
        fact: 'Males build multiple dummy nests to impress females!',
      },
      food: {
        text: 'They eat insects, spiders, and other small invertebrates found in leaf litter and crevices.',
        unique: 'Despite their size, their song can be heard far through the forest and lasts over 5 seconds.',
      },
      didYouKnow: 'They sing more notes per second than almost any other songbird!'
    },
    {
      name: '🟤 Chestnut-backed Chickadee',
      slug: 'chestnut-backed-chickadee',
      images: {
        main: { src: '/Chestnut chickadee.jpg', alt: 'Chestnut-backed Chickadee' },
        feather: { src: '/Chickadee feather.jpg', alt: 'Chickadee Feather' },
        extra: { src: '/Chickadee nest.jpg', alt: 'Chickadee Nest' },
        food: { src: '/Chickadee feeding.webp', alt: 'Chickadee Feeding' },
      },
      intro: 'The Chestnut-backed Chickadee is a tiny forest bird with a black cap, white cheeks, and warm reddish-brown back.',
      featherInfo: 'Its soft feathers provide insulation for year-round forest life, especially in damp climates.',
      nesting: {
        image: '/Chickadee nest.jpg',
        caption: 'They nest in cavities — often in old woodpecker holes or decaying stumps.',
        fact: 'They line their nests with fur, moss, and plant down to keep chicks warm.',
      },
      food: {
        text: 'They eat insects, spiders, seeds, and berries — often hanging upside-down to forage.',
        unique: 'They store food in bark crevices and can remember hundreds of hiding spots!',
      },
      didYouKnow: 'Chickadees change their calls to warn of different predators — and other birds listen in!'
    }
  ],
  'Small Flyers': [
    {
      name: '🐦 Rufous Hummingbird',
      slug: 'hummingbird',
      images: {
        main: { src: '/Hummingbird.jpg', alt: 'Hummingbird' },
        feather: { src: '/Hummingbird feather.jpg', alt: 'Hummingbird Feather' },
        extra: { src: '/Hummingbird nest.jpg', alt: 'Hummingbird Nest' },
        food: { src: '/Hummingbird feeding.jpg', alt: 'Hummingbird Feeding' },
      },
      intro: 'Rufous Hummingbirds are tiny, fast, and brightly colored. They migrate farther than any other hummingbird species.',
      featherInfo: 'Their iridescent feathers shimmer in the light, helping them communicate and attract mates.',
      nesting: {
        image: '/Hummingbird nest.jpg',
        caption: 'They build cup-shaped nests from spider silk and moss.',
        fact: 'Their nests are smaller than a walnut!'
      },
      food: {
        text: 'They feed on nectar using long tongues and beaks, also eating small insects.',
        unique: 'They can hover, fly backwards, and even upside down!'
      },
      didYouKnow: 'They remember every flower they’ve visited and when it will bloom again!'
    },
    {
    name: '📸 Belted Kingfisher',
    slug: 'belted-kingfisher',
    images: {
      main: { src: '/Belted kingfisher.jpg', alt: 'Belted Kingfisher' },
      feather: { src: '/Belted kingfisher feather.webp', alt: 'Kingfisher Feather' },
      extra: { src: '/Belted kingfisher nest.jpg', alt: 'Kingfisher Nest' },
      food: { src: '/Belted kingfisher feeding.webp', alt: 'Kingfisher Feeding' },
    },
    intro: 'The Belted Kingfisher is a bold, blue-gray bird known for its rattling call and dramatic fishing dives.',
    featherInfo: 'Their feathers are sleek and slightly waterproof to help them recover quickly after diving.',
    nesting: {
      image: '/Belted kingfisher nest.jpg',
      caption: 'They nest in long tunnels dug into riverbanks or sandy cliffs.',
      fact: 'Their nesting tunnels can be over 2 meters long!',
    },
    food: {
      text: 'They dive headfirst into water to catch fish, holding their prey crosswise in their bills.',
      unique: 'They beat fish on a rock or branch to kill it before eating.',
    },
    didYouKnow: 'Unlike most birds, the female Belted Kingfisher is more colorful than the male!'
  },
  {
    name: '💛 American Goldfinch',
    slug: 'american-goldfinch',
    images: {
      main: { src: '/American goldfinch.jpg', alt: 'American Goldfinch' },
      feather: { src: '/Goldfinch feather.jpg', alt: 'Goldfinch Feather' },
      extra: { src: '/Goldfinch nest.jpg', alt: 'Goldfinch Nest' },
      food: { src: '/Goldfinch feeding.webp', alt: 'Goldfinch Feeding' },
    },
    intro: 'The American Goldfinch is a bright yellow songbird known for its bouncing flight and cheerful calls.',
    featherInfo: 'Males turn brilliant yellow in summer and molt to olive-brown for winter.',
    nesting: {
      image: '/Goldfinch nest.jpg',
      caption: 'They build tightly woven nests in shrubs or trees late in the summer.',
      fact: 'Their nests are so well-made they can hold water!',
    },
    food: {
      text: 'They feed almost entirely on seeds, especially thistle and sunflower.',
      unique: 'They are one of the latest nesting birds, timing their broods with peak seed availability.',
    },
    didYouKnow: 'They can cling to flower heads while feeding, even upside-down!'
  },
  {
    name: '🟢 Ruby-crowned Kinglet',
    slug: 'ruby-crowned-kinglet',
    images: {
      main: { src: '/Ruby-crowned kinglet.jpg', alt: 'Ruby-crowned Kinglet' },
      feather: { src: '/Kinglet feather.jpg', alt: 'Kinglet Feather' },
      extra: { src: '/Kinglet nest.jpg', alt: 'Kinglet Nest' },
      food: { src: '/Kinglet feeding.jpg', alt: 'Kinglet Feeding' },
    },
    intro: 'The Ruby-crowned Kinglet is a tiny olive bird that flits rapidly among branches, flashing its red crown when excited.',
    featherInfo: 'Their plumage blends into conifers, with a hidden crown patch that males display only when agitated.',
    nesting: {
      image: '/Kinglet nest.jpg',
      caption: 'They build hanging nests in dense conifer trees, hidden from sight.',
      fact: 'A single nest can contain 10+ eggs — more than almost any other small songbird!',
    },
    food: {
      text: 'They feed on berries, insects, and spiders from needles and bark with constant wing-flicking.',
      unique: 'Their body is tiny, but their voice is loud and complex.',
    },
    didYouKnow: 'Despite their size, they migrate long distances across North America every year.'
  }
  ]
};


export default function BirdNotebook() {
  const groupNames = Object.keys(birdGroups);
  const [selectedGroup, setSelectedGroup] = useState(groupNames[0]);
  const groupBirds = birdGroups[selectedGroup];
  const [activeIndex, setActiveIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const bird = groupBirds[activeIndex];
  const router = useRouter();
  const isWater = selectedGroup === 'Water Birds';

  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      <div className="fixed inset-0 z-0">
        <Image src="/sky background.png" alt="Sky Background" fill priority className="object-cover object-center" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-start min-h-screen w-full px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-extrabold text-white drop-shadow-[2px_2px_0px_black] mb-2">Welcome to the Bird Explorer’s Guide</h1>
          <p className="text-white text-lg drop-shadow-[1px_1px_0px_black]">Learn about these amazing birds before you play the matching game!</p>
        </div>

        <div className="mb-4 flex gap-4 justify-center">
          {groupNames.map((group) => (
            <button
              key={group}
              onClick={() => {
                setSelectedGroup(group);
                setActiveIndex(0);
                setCurrentPage(1);
              }}
              className={clsx(
                'px-4 py-2 rounded-full font-bold border-2',
                group === selectedGroup
                  ? 'bg-yellow-600 text-white border-yellow-700'
                  : 'bg-white text-gray-800 border-gray-400 hover:bg-yellow-100'
              )}
            >
              {group}
            </button>
          ))}
        </div>

        <div className="flex max-w-7xl w-full h-[700px] rounded-3xl shadow-2xl border-[6px] border-yellow-700 overflow-hidden relative bg-gradient-to-br from-[#fdf5e6] via-[#f5f0d6] to-[#f1e7c0]/90">
          <div className={clsx(
            'bg-green-800 py-6 px-3 overflow-y-auto',
            isWater ? 'w-36' : 'w-28'
          )}>
            <div className={clsx(
              'grid gap-x-4 gap-y-15 place-items-center',
              isWater ? 'grid-cols-2' : 'grid-cols-1'
            )}>
              {groupBirds.map((b, idx) => (
                <button
                  key={b.slug}
                  onClick={() => { setActiveIndex(idx); setCurrentPage(1); }}
                  className={clsx(
                    'rounded-full overflow-hidden border-4 transition-all',
                    isWater ? 'w-16 h-16' : 'w-20 h-20',
                    idx === activeIndex
                      ? 'border-yellow-400 scale-110 ring-4 ring-yellow-200'
                      : 'border-green-400 hover:scale-105',
                      isWater && idx % 2 === 1 ? 'translate-y-16' : ''
                  )}
                >
                  <Image
                    src={b.images.main.src}
                    alt={b.name}
                    width={isWater ? 64 : 80}
                    height={isWater ? 64 : 80}
                    className="object-cover w-full h-full"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="w-2 bg-yellow-900" />


          <div className="w-2 bg-yellow-900" />

          <div className="flex-1 grid grid-cols-2 gap-0 p-6 text-black relative h-full">
            <button onClick={() => setCurrentPage(currentPage === 1 ? 2 : 1)} className="absolute top-4 right-4 bg-yellow-800 text-white px-4 py-2 rounded-full z-20 shadow-lg hover:bg-yellow-900 transition">
              Flip Page →
            </button>

            {currentPage === 1 ? (
              <>
                <div className="pr-6 border-r-[3px] border-yellow-800 flex flex-col overflow-y-auto">
                  <h2 className="text-4xl font-bold mb-4 text-green-900">{bird.name}</h2>
                  <div className="relative w-full h-96 rounded-xl overflow-hidden border-4 border-yellow-700 shadow-md mb-4">
                    <Image src={bird.images.main.src} alt={bird.images.main.alt} fill className="object-contain p-2" />
                  </div>
                  <p className="text-lg text-gray-800">{bird.intro}</p>
                </div>
                <div className="pl-6 flex flex-col justify-between overflow-y-auto">
                  <div className="relative h-64 rounded-xl overflow-hidden border-4 border-green-700 shadow-md mb-4">
                    <Image src={bird.images.feather.src} alt={bird.images.feather.alt} fill className="object-contain p-2" />
                  </div>
                  <p className="text-lg text-gray-800 mb-4">{bird.featherInfo}</p>
                  <div className="bg-yellow-100 border-l-4 border-yellow-600 p-4 italic text-sm text-gray-700 mt-2 shadow-sm rounded-md">
                    🔍 <strong>Did you know?</strong> {bird.didYouKnow}
                  </div>
                  <div className="text-right text-sm italic text-gray-500 mt-4">Explorer’s Notebook • Page 1</div>
                </div>
              </>
            ) : (
              <>
                <div className="pr-6 border-r-[3px] border-yellow-800 flex flex-col">
                  <div className="relative w-full h-80 rounded-xl overflow-hidden border-4 border-yellow-700 shadow-md mb-18">
                    <Image src={bird.nesting.image} alt="Nesting" fill className="object-contain p-2" />
                  </div>
                  <p className="text-lg text-gray-800 mb-18">{bird.nesting.caption}</p>
                  <div className="bg-blue-100 border-l-4 border-blue-600 p-4 italic text-sm text-gray-700 shadow-sm rounded-md">
                    🪹 <strong>Fun Nest Fact:</strong> {bird.nesting.fact}
                  </div>
                </div>
                <div className="pl-6 flex flex-col justify-between">
                  <div className="relative h-64 rounded-xl overflow-hidden border-4 border-green-700 shadow-md mb-4">
                    <Image src={bird.images.food.src} alt={bird.images.food.alt} fill className="object-contain p-2" />
                  </div>
                  <p className="text-lg text-gray-800 mb-4">{bird.food.text}</p>
                  <div className="bg-green-100 border-l-4 border-green-600 p-4 italic text-sm text-gray-700 mt-2 shadow-sm rounded-md">
                    🍖 <strong>Unique Trait:</strong> {bird.food.unique}
                  </div>
                  <div className="text-right text-sm italic text-gray-500 mt-4">Explorer’s Notebook • Page 2</div>
                </div>
              </>
            )}
          </div>
        </div>

        <button onClick={() => router.push('/matching2')} className="mt-8 bg-green-700 hover:bg-green-900 text-white text-lg font-bold px-8 py-4 rounded-full shadow-lg transition">
          Start Matching Game →
        </button>
      </div>
    </main>
  );
}
