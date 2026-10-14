import { render, screen } from '@testing-library/react';
import Index from '@/pages/Index';
import {
  PROFILE,
  PROJECTS,
  SKILL_CATEGORIES,
  HERO_TAGS,
} from '@/data/constants';

// The calendar fetches remote data and needs CSS.supports, which jsdom lacks
vi.mock('@/components/GithubGraph', () => ({ default: () => null }));

beforeAll(() => {
  // jsdom lacks IntersectionObserver (SectionBlock)
  globalThis.IntersectionObserver = class {
    observe() {}
    disconnect() {}
    unobserve() {}
    takeRecords() {
      return [];
    }
  } as unknown as typeof IntersectionObserver;
  HTMLCanvasElement.prototype.getContext = () => null;
});

describe('portfolio content consistency', () => {
  it('contains no data from the original template author', () => {
    const { container } = render(<Index />);
    const html = container.innerHTML;
    expect(html).not.toMatch(/vara|prasad|\+91|9550533315/i);
  });

  it('hero project count matches the projects list', () => {
    render(<Index />);
    expect(
      screen.getByText(`const projects = ${PROJECTS.length};`),
    ).toBeInTheDocument();
    const workLinks = screen.queryAllByRole('link', { name: 'Work' });
    if (PROJECTS.length === 0) {
      expect(document.getElementById('projects')).toBeNull();
      expect(workLinks).toHaveLength(0);
    } else {
      expect(document.getElementById('projects')).not.toBeNull();
    }
  });

  it('shows the same availability text everywhere', () => {
    render(<Index />);
    // Contact card + Finale badge (avatar shows a short badge with it as title)
    expect(screen.getAllByText(PROFILE.availability)).toHaveLength(2);
    expect(screen.getByTitle(PROFILE.availability)).toBeInTheDocument();
  });

  it('only advertises hero tech that appears in the skills list', () => {
    const skills = SKILL_CATEGORIES.flatMap((c) => c.skills) as string[];
    for (const tag of HERO_TAGS) expect(skills).toContain(tag);
  });
});
