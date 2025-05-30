import { Link } from "react-router-dom";

const Hosting = () => {
  return (
    <div className="w-full px-4 py-[10vh] flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background image */}
      <img
        className="fixed top-0 left-0 w-full h-full z-[-1] blur-md opacity-40 object-cover"
        src="https://i.pinimg.com/originals/00/bc/d2/00bcd28e698c4702e27f1f0f0c0974e5.jpg"
        alt="background"
      />

      {/* Main Heading */}
      <h1 className="text-[1.5rem] sm:text-[2rem] font-semibold text-white mb-2">Hosting</h1>
      <h1 className="text-[2rem] sm:text-[3rem] font-bold uppercase gradient-text text-center">
        Full Employment for GPU
      </h1>

      {/* Description */}
      <p className="text-center text-sm sm:text-base max-w-[90%] sm:max-w-[70%] md:max-w-[40%] mt-4">
        We connect you with customers and provide simple tools to streamline hosting. Set your own prices and schedules. We handle the marketing and get clients so you can focus on the hardware.
      </p>

      {/* CTA Button */}
      <Link
        className="py-2 px-6 mt-6 bg-[#8BF141] text-black font-semibold rounded-md hover:opacity-90 transition-all"
        to="/hyperrcompute/pricing"
      >
        Get Started Today
      </Link>

      {/* Application Section */}
      <div className="flex flex-col items-center justify-center mt-[10vh] p-6 sm:p-10 bg-[#ffffff0a] rounded-3xl ring-1 ring-[#8af14179] relative overflow-hidden max-w-[95%] sm:max-w-[600px]">
        {/* Decorative Blurs */}
        <div className="w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] bg-[#8af14165] rounded-full blur-[50px] absolute right-[-80px] top-[-100px]"></div>
        <div className="w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] bg-[#d441f13a] rounded-full blur-[50px] absolute left-[-80px] bottom-[-100px]"></div>

        <h1 className="text-[1.5rem] sm:text-[2rem] font-bold uppercase text-center">Apply</h1>

        <p className="text-center text-sm sm:text-base mt-2">
          If your GPUs are in a qualified datacenter, apply by sending us an email to{" "}
          <a
            className="text-[#8BF141] underline"
            href="mailto:official@hypercompute.com"
          >
            official@hypercompute.com
          </a>{" "}
          with the number of GPUs, hardware specs and location of the datacenter.
        </p>

        <a
          href="mailto:official@hypercompute.com"
          className="py-2 px-6 mt-6 bg-[#8BF141] text-black font-semibold rounded-md hover:opacity-90 transition-all"
        >
          Contact Us
        </a>
      </div>
    </div>
  );
};

export default Hosting;
