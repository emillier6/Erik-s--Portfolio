import { useState, useEffect } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('button') ||
        target.closest('a') ||
        target.getAttribute('role') === 'button'
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isVisible]);

  if (typeof window === 'undefined') return null;

  return (
    <div
      className={`fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      } ${
        // Inverts the white outline so it stays visible on light and dark targets
        isHovering ? 'mix-blend-difference' : ''
      }`}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
      }}
    >
      {/* Outer Square — becomes a transparent outline over clickables */}
      <div
        className={`absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ease-out rounded-none ${
          isHovering
            ? 'w-10 h-10 rotate-45 border-2 border-white bg-transparent'
            : 'w-6 h-6 rotate-0 border-2 border-black bg-white'
        } ${isClicking ? 'scale-75' : 'scale-100'}`}
        style={{
          boxShadow: isHovering ? 'none' : '4px 4px 0px 0px rgba(0,0,0,1)',
        }}
      />

      {/* Inner Dot/X */}
      <div
        className={`absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ${
          isHovering ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div className="w-1 h-1 bg-black rounded-none" />
      </div>
    </div>
  );
};

export default CustomCursor;
