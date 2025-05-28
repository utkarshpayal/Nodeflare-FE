import { Link } from "react-router-dom";
const Hosting = () => {
  return (
    <div className="w-screen my-[20vh] flex flex-col items-center justify-center">
      <img
        className="fixed top-[50%] translate-y-[-40%] w-screen h-screen z-[-1] blur-lg opacity-50"
        src="https://i.pinimg.com/originals/00/bc/d2/00bcd28e698c4702e27f1f0f0c0974e5.jpg"></img>
      <h1 className="text-[]">Hosting</h1>
      <h1 className="text-[3rem] font-bold uppercase gradient-text">
        Full Employment for GPU
      </h1>
      <p className="text-center w-[40%]">
        We connect you with customers and provide simple tools to streamline
        hosting. Set your own prices and schedules. We handle the marketing and
        get clients so you can focus on the hardware.
      </p>
      <Link className="py-2 px-4 linear--button text-[#000] font-bold mt-10 rounded-lg" to="/hyperrcompute/pricing">
        Get Started Today
      </Link>
      <div className="flex flex-col items-center justify-center p-10 mt-[10vh] bg-[#ffffff0a] rounded-[40px] ring-1 ring-[#8af14179] relative overflow-hidden">
        <div className="w-[400px] h-[400px] bg-[#8af14165] rounded-full blur-[40px] absolute right-[-50px] top-[-140px]"></div>
        <div className="w-[400px] h-[400px] bg-[#d441f13a] rounded-full blur-[40px] absolute left-[-50px] bottom-[-140px]"></div>
        <h1 className="text-[2rem] font-bold uppercase">Apply</h1>
        <p className="w-[40%] text-center">
          If your GPUs are in a qualified datacenter, apply by sending us an
          email to{" "}
          <a
            className="text-[#8BF141] underline"
            href="mailto:official@hypercompute.com">
            official@hypercompute.com
          </a>{" "}
          with the number of GPUs, hardware specs and location of the
          datacenter.
        </p>
        <a
          href="mailto:official@hypercompute.com"
          className="py-2 px-4 linear--button text-[#000] font-bold mt-10 rounded-lg">
          Contact Us
        </a>
      </div>
    </div>
  );
};

export default Hosting;
