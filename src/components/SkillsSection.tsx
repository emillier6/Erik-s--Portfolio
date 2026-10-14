import { Code2, Server, Wrench, Box } from 'lucide-react';
import SectionBlock from './SectionBlock';
import GithubGraph from './GithubGraph';
import { SKILL_CATEGORIES } from '@/data/constants';

const CATEGORY_ICONS: Record<
  (typeof SKILL_CATEGORIES)[number]['id'],
  React.ComponentType<{ className?: string }>
> = {
  frontend: Code2,
  backend: Server,
  tools: Wrench,
};

const SkillsSection = () => {
  return (
    <SectionBlock id="skills" title="Technical Stack">
      <div className="flex flex-col gap-16">
        {/* Skill Modules */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILL_CATEGORIES.map((category, idx) => {
            const Icon = CATEGORY_ICONS[category.id];
            return (
              <div
                key={category.title}
                className="group border-2 border-black p-6 bg-white hover:-translate-y-1 transition-all duration-300 relative rounded-none"
                style={{
                  animationDelay: `${idx * 100}ms`,
                }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 border-2 border-black bg-black text-white group-hover:bg-white group-hover:text-black transition-colors rounded-none">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-mono text-sm font-bold uppercase tracking-wide">
                    {category.title}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-1 border border-black/10 text-[11px] font-mono hover:border-black hover:bg-black/5 transition-all cursor-default rounded-none"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}

          {/* Final "Load" Card */}
          <div className="border-2 border-black p-6 bg-black/5 flex flex-col items-center justify-center text-center opacity-60 hover:opacity-100 transition-opacity rounded-none">
            <Box className="w-8 h-8 mb-4 opacity-20" />
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] font-medium">
              // Always Learning...
            </p>
          </div>
        </div>

        {/* Activity Section */}
        <div className="w-full pt-12 border-t-4 border-black border-dashed">
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-4">
              <h3 className="text-sm font-mono font-bold uppercase tracking-[0.2em] flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-none animate-pulse" />
                Live Pulse
              </h3>
              <div className="h-[2px] flex-1 bg-black/10"></div>
            </div>
            <GithubGraph />
          </div>
        </div>
      </div>
    </SectionBlock>
  );
};

export default SkillsSection;
