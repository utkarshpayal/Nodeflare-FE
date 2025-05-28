const Docker = () => {
  return (
    <div className="md:w-screen flex flex-col items-center justify-center py-10 gap-4">
      <h1 className="text-[4rem] font-bold text-center leading-[7vh]">
        Docker Ecosystem
      </h1>
      <p className="text-[#bbb] text-center w-[90%] md:w-auto">
        Docker-based container and image deployment to get all the software you
        need up and running quickly.
      </p>
      <div className="flex flex-col flex-wrap sm:flex-row items-center justify-center gap-5 my-10">
        <img src="https://vast.ai/_next/image?url=%2Flogos%2Fubuntu-logo.png&w=384&q=75"></img>
        <img src="https://vast.ai/_next/image?url=%2Flogos%2Ftensor-flow-logo.png&w=384&q=75"></img>
        <img src="https://vast.ai/_next/image?url=%2Flogos%2Fpytorch-logo.png&w=384&q=75"></img>
        <img src="https://vast.ai/_next/image?url=%2Flogos%2Fjupyter-logo.png&w=384&q=75"></img>
        <img src="https://vast.ai/_next/image?url=%2Flogos%2Fnvidia-cuda-logo.png&w=256&q=75"></img>
      </div>
    </div>
  );
};
export default Docker;
