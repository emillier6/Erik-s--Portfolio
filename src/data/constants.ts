// ──────────────────────────────────────
// Single source of truth for all profile data
// ──────────────────────────────────────

export const SITE_VERSION = '1.0.0';

export const PROFILE = {
  name: 'Erik Millier Montolio',
  shortName: 'Erik Millier Montolio',
  alias: 'Erik',
  title: 'Full Stack Developer',
  email: 'erikmimo6@gmail.com',
  website: 'erik-s-portfolio.vercel.app',
  availability: 'Available for Job Opportunities',
} as const;

/**
 * Web3Forms access key used by the contact form (https://web3forms.com).
 * It is designed to be public, so it is safe to commit. Create one for
 * PROFILE.email and paste it here — until then the form reports an error.
 */
export const WEB3FORMS_ACCESS_KEY = 'cd71b2c7-d34f-4c53-bffa-2646bac56f1b';

/** Roles cycled by the hero typewriter */
export const ROLES = ['Full Stack Developer', 'React Engineer'] as const;

/** Highlighted tech shown as tags in the hero */
export const HERO_TAGS = [
  'React',
  'TypeScript',
  'Node.js',
  'PostgreSQL',
] as const;

export const SKILL_CATEGORIES = [
  {
    id: 'languages',
    title: 'Languages',
    skills: [
      'TypeScript',
      'JavaScript',
      'Python',
      'Java',
      'C++',
      'C',
      'HTML',
      'CSS',
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend Development',
    skills: [
      'React',
      'Next.js',
      'Astro',
      'Tailwind CSS',
      'Three.js',
      'Framer Motion',
      'Shadcn UI',
      'Vite',
    ],
  },
  {
    id: 'backend',
    title: 'Backend & Database',
    skills: [
      'Node.js',
      'Express.js',
      'REST APIs',
      'Socket.IO',
      'PostgreSQL',
      'MySQL',
      'SQLite',
      'Drizzle ORM',
      'Better Auth',
      'Stripe',
    ],
  },
  {
    id: 'embedded',
    title: 'Embedded & Systems',
    skills: ['ESP32', 'TinyML', 'Edge Impulse', 'OpenGL', 'PlatformIO'],
  },
  {
    id: 'tools',
    title: 'Tools & Workflow',
    skills: [
      'Git',
      'GitHub',
      'Docker',
      'Vitest',
      'Vercel',
      'Linux CLI',
      'Kanban',
    ],
  },
] as const;

export interface Project {
  title: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  isNew?: boolean;
}

/** Add projects here — the Projects section, navbar link, hero stats and terminal all read from this list */
export const PROJECTS: Project[] = [
  {
    title: 'Atelier Store',
    isNew: true,
    description:
      'Luxury brand storefront built on the Next.js App Router, with authentication and a serverless Postgres database.',
    tags: [
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'Better Auth',
      'Drizzle ORM',
      'PostgreSQL',
    ],
    githubUrl: 'https://github.com/emillier6/atelier-store',
  },
  {
    title: 'Vilahack — Hackathon Platform',
    description:
      'Built with another GameDEV-UPC member: 4 interconnected web apps (landing, registration, puzzle dashboard and admin panel) that supported 157 real users on event day. Coordinated the team through a self-hosted Kanban board.',
    tags: ['HTML', 'CSS', 'JavaScript', 'GameDEV-UPC'],
    liveUrl: 'https://vilahack.com',
  },
  {
    title: 'Battleship Web',
    description:
      'Real-time online multiplayer take on the classic Battleship board game, with a 3D board and drag-and-drop ship placement. pnpm monorepo sharing tested game logic between client and server.',
    tags: [
      'TypeScript',
      'React',
      'Astro',
      'Three.js',
      'Node.js',
      'Express.js',
      'Socket.IO',
    ],
    githubUrl: 'https://github.com/emillier6/battleship-boardgame',
  },
  {
    title: 'ColdTruck Anomaly Detector',
    description:
      'Embedded EdgeAI system for cold-chain logistics: a TinyML model running on an ESP32 detects truck accidents and rollovers in real time, with Wi-Fi telemetry, BLE app interaction and safety alerts.',
    tags: ['C', 'C++', 'ESP32', 'TinyML', 'Edge Impulse', 'PlatformIO'],
    githubUrl: 'https://github.com/emillier6/XASF-ColdTruck',
  },
  {
    title: 'Container Terminal Manager',
    description:
      'Automated management system for a cargo container terminal, built in C++ for the Data Structures course at UPC.',
    tags: ['C++', 'Data Structures', 'Algorithms'],
    githubUrl: 'https://github.com/emillier6/Container-Terminal---ESIN',
  },
  {
    title: 'Oust: The Game',
    description:
      'Java implementation of Oust, the abstract strategy board game, developed as a team project for the Programming Projects course at UPC.',
    tags: ['Java', 'OOP', 'Team Project'],
    githubUrl: 'https://github.com/emillier6/PROP-Projecte-25-26',
  },
  {
    title: 'Space Invaders Retro',
    description:
      'Clone of the classic Space Invaders arcade game in C++, rendering through an OpenGL 3.3 context with GLFW and GLEW as the only dependencies.',
    tags: ['C++', 'OpenGL', 'GLFW', 'GLEW'],
    githubUrl: 'https://github.com/emillier6/Space-Inviders-RETRO',
  },
];

export const SOCIAL_LINKS = [
  {
    id: 'github',
    label: 'GitHub',
    href: 'https://github.com/emillier6',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/erik-millier-montolio-ab46b7205/',
  },
  {
    id: 'email',
    label: 'Email',
    href: 'mailto:erikmimo6@gmail.com',
  },
] as const;

export type SocialLinkId = (typeof SOCIAL_LINKS)[number]['id'];

/** Helper to get a social link by id */
export const getSocialLink = (id: SocialLinkId) =>
  SOCIAL_LINKS.find((link) => link.id === id)!;
