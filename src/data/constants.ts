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
export const WEB3FORMS_ACCESS_KEY = '';

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
    id: 'frontend',
    title: 'Frontend Development',
    skills: [
      'React',
      'TypeScript',
      'JavaScript',
      'Tailwind CSS',
      'Framer Motion',
      'Shadcn UI',
      'Vite',
      'Next.js',
    ],
  },
  {
    id: 'backend',
    title: 'Backend & Database',
    skills: [
      'Node.js',
      'Express.js',
      'REST APIs',
      'PostgreSQL',
      'MySQL',
      'SQLite',
      'Socket.IO',
      'Stripe',
      'Better Auth',
    ],
  },
  {
    id: 'tools',
    title: 'Tools & Ecosystem',
    skills: ['Git', 'GitHub', 'Vitest', 'Vercel', 'Docker', 'Linux CLI'],
  },
] as const;

export interface Project {
  title: string;
  description: string;
  tags: string[];
  githubUrl: string;
  liveUrl?: string;
  isNew?: boolean;
}

/** Add projects here — the Projects section, navbar link, hero stats and terminal all read from this list */
export const PROJECTS: Project[] = [];

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
    id: 'instagram',
    label: 'Instagram',
    href: 'https://www.instagram.com/erik.mimo_6/',
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
