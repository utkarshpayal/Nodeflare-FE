import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect } from "react";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const Choose = () => {
  const pear = useRef(null);

  useLayoutEffect(() => {
    gsap.to(pear.current, {
      scrollTrigger: {
        trigger: pear.current,
        start: "top -30%",
        end: "bottom bottom",
      },
      top: "100%",
      duration: 2, // Animation duration in seconds (adjust as needed)
    });
  }, []);

  return (
    <div className="md:w-screen flex flex-col items-center justify-center relative mb-[20vh] mt-[40vh]">
      <img
        ref={pear}
        className="w-[100px] rotate-[15deg] hidden md:block absolute right-20 top-0"
        src="./pear.png"
        alt="icon"></img>
      <div className="w-[400px] h-[400px] bg-[#f05c4230] blur-[100px] absolute left-0"></div>
      <div className="w-[400px] h-[400px] bg-[#ea42f034] blur-[100px] absolute right-0 bottom-[50px]"></div>
      <p className="text-[#8cf042] uppercase text-[12px]">
        POWERFUL CLIENT API
      </p>
      <h1 className="text-[2rem] text-center capitalize max-w-[90%]">
        Find The Perfect GPU For Your AI/ML Need.
      </h1>
      <button className="py-[10px] px-8 linear--button text-[#000] text-[13px] font-bold rounded-lg my-4">
        Check out the CLI docs
      </button>
      <div className="flex flex-wrap justify-center items-center w-full mt-5 gap-10">
        <div className="w-[90%] md:w-[40%] p-10 ring-[1px] ring-[#8df04288] rounded-[20px] flex flex-col items-center gap-4">
          <span className="flex items-center gap-3">
            <img className="w-[30px]" src="./decentralised.png"></img>
            <h1 className="font-bold text-[22px]">Decentralised</h1>
          </span>
          <p className="text-[14px] text-center">
            Hyperrcompute is decentralised, No third party or a single person
            controls Hyperrcompute. This protocol is carried on entirely by peers.
          </p>
        </div>
        <div className="w-[90%] md:w-[40%] p-10 ring-[1px] ring-[#8df04288] rounded-[20px] flex flex-col items-center gap-4">
          <span className="flex items-center gap-3">
            <img className="w-[22px]" src="./couple.png"></img>
            <h1 className="font-bold text-[22px]">True Peer-to-Peer</h1>
          </span>
          <p className="text-[14px] text-center">
            Hyperrcompute is truly peer to peer, there are no centralised or third
            party servers involved. Peers build and control the protocol.
          </p>
        </div>
        <div className="w-[90%] md:w-[40%] p-10 ring-[1px] ring-[#8df04288] rounded-[20px] flex flex-col items-center gap-4">
          <span className="flex items-center gap-3">
            <img className="w-[24px]" src="./flashGreen.png"></img>
            <h1 className="font-bold text-[22px]">Self Custodial</h1>
          </span>
          <p className="text-[14px] text-center">
            Hyperrcompute uses Lightning Bitcoin for Payment. You can use a node
            from thousands of providers or run one of your own, this gives you
            full control over your transactions.
          </p>
        </div>
        <div className="w-[90%] md:w-[40%] p-10 ring-[1px] ring-[#8df04288] rounded-[20px] flex flex-col items-center gap-4">
          <span className="flex items-center gap-3">
            <img className="w-[24px]" src="./dollar.png"></img>
            <h1 className="font-bold text-[22px]">Lowest Prices</h1>
          </span>
          <p className="text-[14px] text-center">
            No platform fees, no middleman charges, and no hosting fees. This
            ensures the lowest GPU cost in the market. Peers receive hundred
            percent of what you pay.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Choose;
