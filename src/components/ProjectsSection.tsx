import { ExternalLink } from 'lucide-react';
import SectionBlock from './SectionBlock';
import { Badge } from './ui/badge';
import { SOCIAL_ICONS } from './socialIcons';
import { playHover, playClick } from '@/hooks/useSoundEffects';
import { PROJECTS, getSocialLink } from '@/data/constants';

const GithubIcon = SOCIAL_ICONS.github;

const ProjectsSection = () =>
  PROJECTS.length === 0 ? null : (
    <SectionBlock id="projects" title="Projects">
      <div className="flex md:grid md:grid-cols-2 lg:grid-cols-2 gap-8 overflow-x-auto md:overflow-x-visible pt-6 pb-12 md:py-0 snap-x snap-mandatory scrollbar-hide px-4 md:px-0 -mx-4 md:mx-0">
        {PROJECTS.map((project) => (
          <div
            key={project.title}
            onMouseEnter={playHover}
            className="group relative border-4 border-black p-8 flex flex-col justify-between hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-1 hover:-translate-y-1 transition-all duration-300 bg-white min-w-[300px] w-full md:w-auto snap-start rounded-none"
          >
            {project.isNew && (
              <div className="absolute -top-3 -right-3 bg-black text-white px-3 py-1 text-[10px] font-black uppercase tracking-tighter border-4 border-black z-10 rotate-12 group-hover:rotate-6 transition-transform rounded-none">
                LATEST WORK
              </div>
            )}
            <div>
              <h3 className="text-xl font-black text-foreground group-hover:underline decoration-4 underline-offset-4">
                {project.title}
              </h3>
              <p className="body-text mt-4 text-sm font-normal leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {project.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="font-mono text-[10px] font-bold border border-black/10 px-1.5 py-0"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-8 pt-6 border-t border-black/10">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={playClick}
                  className="flex items-center justify-center gap-2 px-4 py-2 border-2 border-black bg-white text-[10px] font-black uppercase tracking-wider transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-black hover:text-white rounded-none"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  Source
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={playClick}
                  className="flex items-center justify-center gap-2 px-4 py-2 border-2 border-black bg-white text-[10px] font-black uppercase tracking-wider transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-black hover:text-white rounded-none"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Live Demo
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 flex justify-center md:justify-start">
        <a
          href={getSocialLink('github').href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={playClick}
          className="group flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] border-b-2 border-black pb-1 hover:gap-4 transition-all"
        >
          <GithubIcon className="w-4 h-4" />
          View All Projects
        </a>
      </div>
    </SectionBlock>
  );

export default ProjectsSection;
