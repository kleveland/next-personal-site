import { useState, useEffect } from 'react';

export default function useResize(mobileBreakpoint: number): { isMobile: boolean, width: number } {

    const [width, setWidth] = useState(0);
    const isMobile = width != 0 && width < mobileBreakpoint;

    useEffect(() => {
        setWidth(window.innerWidth);
        const handleWindowResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleWindowResize);
        // Return a function from the effect that removes the event listener
        return () => window.removeEventListener("resize", handleWindowResize);
      }, []);

    return { isMobile, width };
}