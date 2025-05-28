import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const MouseFollower = () => {
  const mouse = useRef(null);

  useLayoutEffect(() => {
    gsap.set(mouse.current, { xPercent: -50, yPercent: -50 }); // Set initial position

    const updatePosition = (clientX, clientY) => {
      gsap.to(mouse.current, {
        duration: 0.6,
        ease: "power3",
        x: clientX,
        y: clientY,
      });
    };

    const handleMouseMove = (event) => {
      updatePosition(event.clientX, event.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Cleanup function to remove event listener on component unmount
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={mouse}
      className="fixed w-[10px] h-[10px] bg-[#8BF141] rounded-full pointer-events-none"></div>
  );
};

export default MouseFollower;
