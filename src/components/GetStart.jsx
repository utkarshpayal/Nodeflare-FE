import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect } from "react";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const GetStart = () => {
  const fan = useRef(null);

  useLayoutEffect(() => {
    gsap.to(fan.current, {
      scrollTrigger: {
        trigger: fan.current,
        start: "top 70%",
        end: "+=1200px bottom",
        // markers: true,
        scrub: 1,
      },
      scale: 2,
      transform: "rotate(90deg)",
      ease: "power2.inOut",
    });
  }, []);

  return (
    <div className="w-screen h-screen md:h-[200vh] mt-[4vh] md:mt-[0vh] flex flex-col items-center justify-center relative overflow-x-hidden md:overflow-auto">
      <div className="w-[40rem] h-[40rem] md:w-[70rem] absolute md:h-[70rem] rounded-[50%] ring-[2rem] ring-[#8eff48]"></div>
      <div className="w-[35rem] h-[35rem] md:w-[65rem] absolute md:h-[65rem] rounded-[50%] ring-[2rem] ring-[#8eff48a2]"></div>
      <div className="w-[30rem] h-[30rem] md:w-[60rem] absolute md:h-[60rem] rounded-[50%] ring-[2rem] ring-[#8eff484d]"></div>
      <div className="w-[25rem] h-[25rem] md:w-[55rem] absolute md:h-[55rem] rounded-[50%] ring-[2rem] ring-[#8eff4822]"></div>
      <div className="w-[20rem] h-[20rem] md:w-[50rem] absolute md:h-[50rem] rounded-[50%] ring-[2rem] ring-[#8eff4811]"></div>
      <img
        ref={fan}
        className="absolute z-[-1] w-[200px] md:w-auto"
        src="https://dlcdnwebimgs.asus.com/gain/703118E8-AABC-4ED7-9915-FD808DBAE266/w717/h525"></img>
    </div>
  );
};

export default GetStart;
