import { useNavigate } from "react-router-dom";

const HomeSection = () => {
  const navigate = useNavigate();
  return (
    <>
  <div className="h-[80vh] md:h-[90vh] md:w-screen flex flex-col items-center justify-center relative px-4 sm:px-6 lg:px-12">
  {/* Background circles */}
  <div className="w-48 h-48 sm:w-80 sm:h-80 absolute bg-[#9aff4d] rounded-full blur-3xl opacity-25 right-4 bottom-4 sm:right-10 sm:bottom-10 z-[-4]"></div>
  <div className="w-64 h-64 md:w-[800px] md:h-[800px] absolute ring-[5px] ring-[#9aff4d62] rounded-full left-[-80px] md:left-[-300px] top-[-150px] md:top-[-400px] z-[-4]"></div>

  {/* Heading */}
  <h1 className="uppercase font-bold text-white text-4xl sm:text-5xl md:text-7xl leading-tight md:leading-[15vh] w-full md:w-4/5 text-center">
    World's first P2P GPU Market
  </h1>

  {/* Description */}
  <p className="text-center w-full max-w-3xl text-base sm:text-lg md:text-xl my-12 px-2 sm:px-0">
    Hyperrcompute is the world's first truly peer-to-peer GPU rental service.
    Use one simple client app to pay, provision and rent GPU globally.
  </p>

  {/* Buttons */}
  <span className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-md">
    <button
      className="py-3 w-full sm:w-[200px] text-sm sm:text-base font-bold bg-[#9aff4d] text-black rounded-md"
      onClick={() => navigate("/hyperrcompute/pricing")}
    >
      On-demand Pricing
    </button>
    <button className="py-3 w-full sm:w-[200px] text-sm sm:text-base font-bold bg-[#9aff4d] text-black rounded-md">
      Interruptible Pricing
    </button>
  </span>

  {/* GPU Image */}
  <img
    className="image w-[80vw] max-w-md md:w-[50vw] gpu-animation absolute pointer-events-none z-[-1] opacity-70 bottom-0 md:top-[55%] left-[20%] md:left-[60%] -translate-x-full -translate-y-[10%]"
    src="https://static.vecteezy.com/system/resources/previews/036/499/158/original/ai-generated-graphics-card-on-transparent-background-ai-png.png"
    alt="gpu--img"
  />
</div>

    </>
  );
};

export default HomeSection;
