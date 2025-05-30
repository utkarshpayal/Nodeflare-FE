import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-[#8eff4830] bg-black text-[#bbb] px-6 md:px-20 py-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12 md:gap-20">

        {/* Products */}
        <div className="flex flex-col gap-4">
          <h4 className="text-white font-bold text-lg">Products</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/hyperrcompute/pricing" className="hover:text-white transition">GPU Compute</Link>
            </li>
            <li>
              <Link to="/hyperrcompute/serverless" className="hover:text-white transition">Serverless</Link>
            </li>
            <li>
              <Link to="/hyperrcompute/hosting" className="hover:text-white transition">Hosting</Link>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div className="flex flex-col gap-4">
          <h4 className="text-white font-bold text-lg">Resources</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/hyperrcompute/docs" className="hover:text-white transition">Docs</Link>
            </li>
            <li>
              <Link to="/hyperrcompute/faqs" className="hover:text-white transition">FAQ</Link>
            </li>
            <li>
              <Link to="/hyperrcompute/blogs" className="hover:text-white transition">Blogs</Link>
            </li>
            <li>
              <Link to="/hyperrcompute/hosting" className="hover:text-white transition">Become a Host</Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div className="flex flex-col gap-4">
          <h4 className="text-white font-bold text-lg">Contact</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/hyperrcompute/contact" className="hover:text-white transition">Contact Us</Link>
            </li>
            <li>
              <a href="https://github.com/hyperrcompute" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                GitHub
              </a>
            </li>
            <li>
              <a href="mailto:official@hyperrcompute.io" className="hover:text-white transition">
                official@hyperrcompute.io
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer bottom */}
      <div className="border-t border-[#222] mt-12 pt-6 text-center text-sm text-[#999]">
        <p className="font-semibold tracking-wide">Powered by <span className="text-[#9aff4d]">Hypercompute</span></p>
      </div>
    </footer>
  );
};

export default Footer;
