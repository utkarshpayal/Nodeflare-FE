import { useNavigate } from "react-router-dom";

const HomeSection = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="h-[80vh] md:h-[90vh] md:w-screen flex flex-col items-center justify-center relative">
        <div className="w-[400px] h-[400px] absolute bg-[#9aff4d] rounded-full blur-3xl opacity-25 right-10 bottom-10 z-[-4]"></div>
        <div className="w-[500px] h-[500px] md:w-[800px] md:h-[800px] absolute ring-[5px] ring-[#9aff4d62] rounded-full left-[-100px] md:left-[-300px] top-[-200px] md:top-[-400px] z-[-4]"></div>
        <h1 className="uppercase font-bold text-[#fff] text-[4rem] leading-[7vh] w-full md:text-[7rem] md:w-[70%] md:leading-[15vh] text-center">
          World's first P2P GPU Market
        </h1>
        <p className="text-center w-[90%] md:w-[60%] text-[18px] my-[50px]">
          Hyperrcompute is the world's first truly peer-to-peer GPU rental service.
          Use one simple client app to pay, provision and rent GPU globally.
        </p>
        <span className="flex gap-4">
          <button className="py-3 w-[160px] sm:w-[200px] text-[12px] sm:text-[16px] font-bold bg-[#9aff4d] text-[#000] rounded-md" onClick={() => navigate("/hyperrcompute/pricing")}>
            On-demand Pricing
          </button>
          <button className="py-3 w-[160px] sm:w-[200px] text-[12px] sm:text-[16px] font-bold bg-[#9aff4d] text-[#000] rounded-md">
            Interruptible Pricing
          </button>
        </span>
        <img
          className="image w-[80vw] md:w-[50vw] gpu-animation absolute pointer-events-none z-[-1] opacity-70 bottom-0 md:top-[55%] left-[20%] md:left-[60%] translate-x-[-100%] translate-y-[-10%]"
          src="https://static.vecteezy.com/system/resources/previews/036/499/158/original/ai-generated-graphics-card-on-transparent-background-ai-png.png"
          alt="gpu--img"
        />
      </div>
    </>
  );
};

export default HomeSection;
