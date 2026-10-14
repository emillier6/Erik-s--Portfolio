import type { ComponentType } from 'react';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa6';
import { Mail } from 'lucide-react';
import type { SocialLinkId } from '@/data/constants';

// Brand icons come from react-icons — lucide deprecated (and removed in v1) its brand icons
export const SOCIAL_ICONS: Record<
  SocialLinkId,
  ComponentType<{ className?: string }>
> = {
  github: FaGithub,
  linkedin: FaLinkedin,
  instagram: FaInstagram,
  email: Mail,
};
