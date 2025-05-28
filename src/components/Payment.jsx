import { useNavigate } from "react-router-dom";

const Payment = () => {
  const navigate = useNavigate();

  return (
    <div className="md:w-screen flex flex-col items-center relative overflow-x-hidden pt-8">
      <div className="w-[140vw] h-[200px] absolute z-[-1] blur-[100px] bg-[#a600ff51] rotate-[-9deg] top-[20%]"></div>
      <img
        data-scroll
        data-scroll-speed="0.4"
        className="absolute right-10 w-[80px] top-1/4"
        src="./flash.png"
      ></img>
      <img
        data-scroll
        data-scroll-speed="-0.4"
        className="absolute left-20 w-[80px] top-1/2"
        src="./bitcoin.png"
      ></img>
      <p className="uppercase text-[#ffe700] text-[12px]">
        embrace soverign payments
      </p>
      <h1 className="text-[2rem] capitalize">You can pay in Satoshi</h1>
      <p className="font-bold text-[18px] mt-10">1 Satoshi = 0.00000001 BTC</p>
      <div className="flex flex-col items-center gap-6 w-[90%] md:w-[40%] my-[50px] px-10 py-6 ring-[0.5px] ring-[#a600ff] rounded-2xl backdrop-blur-md bg-[#00000010]">
        <h1 className="text-[1.5rem] leading-[4vh] font-bold">
          Spin Up and Pay with Lightning Network Payment.
        </h1>
        <p className="text-justify">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima eos,
          possimus error architecto rem repellendus dignissimos quidem accusamus
          quis culpa
        </p>
        <button
          className="py-2 w-full bg-[#bf48ff] font-bold rounded-lg"
          onClick={() => navigate("/signup")}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Payment;
