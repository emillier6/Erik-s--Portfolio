import { useSyncExternalStore } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import {
  isMuted as getMuted,
  setMuted,
  subscribeMuted,
  playClick,
  playHover,
} from '@/hooks/useSoundEffects';

const SoundToggle = () => {
  // Shared store keeps the desktop and mobile toggles in sync
  const isMuted = useSyncExternalStore(subscribeMuted, getMuted);

  const toggleSound = () => {
    const newMuted = !isMuted;
    setMuted(newMuted);
    if (!newMuted) {
      // Small feedback sound when unmuting
      setTimeout(() => playClick(), 50);
    }
  };

  return (
    <button
      onClick={toggleSound}
      onMouseEnter={playHover}
      className="p-2 border-2 border-black bg-white hover:bg-black hover:text-white transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] active:scale-95 rounded-none"
      aria-label={isMuted ? 'Unmute sound' : 'Mute sound'}
    >
      {isMuted ? (
        <VolumeX className="w-4 h-4" />
      ) : (
        <Volume2 className="w-4 h-4" />
      )}
    </button>
  );
};

export default SoundToggle;
