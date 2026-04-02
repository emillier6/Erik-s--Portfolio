// ──────────────────────────────────────
// Single source of truth for all profile data
// ──────────────────────────────────────

export const PROFILE = {
  name: 'Erik Millier Montolio',
  shortName: 'Erik Millier Montolio',
  alias: 'Erik',
  title: 'Full Stack Developer',
  email: 'erikmimo6@gmail.com',
  phone: '+919550533315',
  website: 'www.erik-s-portfolio.vercel.app',
} as const;

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
