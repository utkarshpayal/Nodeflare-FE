const Footer = () => {
  return (
    <footer className="border-t-[1px] border-t-[#8eff4830] relative">
      <div className="flex justify-center my-10 gap-10 h-[30vh]">
        <div className="text-[#bbb] flex flex-col gap-4">
          <ul className="font-bold text-[#fff]">Products</ul>
          <span className="text-[14px]">
            <li>Secure Cloud</li>
            <li>Community Cloud</li>
            <li>Serverless</li>
          </span>
        </div>
        <div className="text-[#bbb] flex flex-col gap-4">
          <ul className="font-bold text-[#fff]">Resources</ul>
          <span className="text-[14px]">
            <li>Docs</li>
            <li>FAQ</li>
            <li>Blog</li>
            <li>Become a Host</li>
          </span>
        </div>
        <div className="text-[#bbb] flex flex-col gap-4">
          <ul className="font-bold text-[#fff]">Contact</ul>
          <span className="text-[14px]">
            <li>Contact Us</li>
            <li>GitHub</li>
            <li>official@hypercompute.io</li>
          </span>
        </div>
      </div>
      <div className="flex items-center justify-center border-t-[0.2px] border-t-[#222] py-4">
        <h1 className="aquire">Powered by Hypercompute</h1>
      </div>
    </footer>
  );
};

export default Footer;
