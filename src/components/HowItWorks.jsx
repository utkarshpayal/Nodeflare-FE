const HowItWorks = () => {
  return (
    <div className="mt-[4vh] flex flex-col items-center relative overflow-x-hidden work--scrollbar pt-8">
      <div className="w-[800px] h-[400px] bg-[#ff0ceb23] blur-[40px] rounded-full absolute z-[-1] left-16"></div>
      <div className="w-[400px] h-[400px] bg-[#85ff0c29] blur-[40px] rounded-full absolute top-[40%] right-10 z-[-1]"></div>

      <h1 className="gradient-text leading-[6vh] text-[3rem] uppercase font-bold text-center">
        How It Works
      </h1>
      <div className="my-10 flex flex-wrap justify-center gap-10">
        {setup.map((setup, i) => {
          return (
            <div
              key={i}
              className="p-4 flex w-[90vw] md:w-[30vw] flex-col ring-1 ring-[#86ef4462] rounded-lg z-[900] bg-[#ffffff15]">
              <span className="flex items-center gap-2 px-1 w-fit py-1 rounded-full bg-[#111]">
                <img className="w-[16px]" src={setup.icon}></img>
                <h1 className="text-[12px] text-[#ddd]">{setup.title}</h1>
              </span>
              <h1 className="uppercase font-bold mt-2">{setup.heading}</h1>
              <p className="text-[12px] text-[#bbb] mt-3">
                {setup.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const setup = [
  {
    title: "docker",
    heading: "Setup Docker",
    icon: "./docker.png",
    description:
      "Install Docker on your system to enable containerized execution of compute tasks.",
  },
  {
    title: "hyperrcompute",
    heading: "Install hyperrcompute",
    icon: "./docker.png",
    description:
      "Download and configure the hyperrcompute CLI to manage and access GPU resources.",
  },
  {
    title: "payment",
    heading: "Enter Payment Info",
    icon: "./card.png",
    description:
      "Provide your payment details securely to enable billing and resource allocation.",
  },
  {
    title: "docker",
    heading: "All Set",
    icon: "./check.png",
    description:
      "Your environment is successfully configured. You are now ready to start.",
  },
  {
    title: "search",
    heading: "User Searches GPU",
    icon: "./search.png",
    description:
      "Users can search and select available GPU resources based on performance and pricing.",
  },
  {
    title: "invoice",
    heading: "Generate an Invoice for given minutes",
    icon: "./couple.png",
    description:
      "The system calculates and generates an invoice based on GPU usage duration.",
  },
  {
    title: "payment",
    heading: "Receive Payment",
    icon: "./card.png",
    description:
      "Vendors receive payment automatically after successful resource usage and verification.",
  },
  {
    title: "Done",
    heading: "Done",
    icon: "./check.png",
    description:
      "Process completed successfully. You can now access reports or continue operations.",
  },
];


export default HowItWorks;
