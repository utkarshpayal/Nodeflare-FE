import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [menuOpen, setMenuOpen] = useState(false);
  //   const [isOpen, setIsOpen] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const navigate = useNavigate();
  const handleMenuLinkClick = () => {
    setMenuOpen(false);
  };
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div
        className={`menu fixed bg-[#000] z-[999] duration-1000 ease-in-out w-screen  ${menuOpen ? `h-screen` : `h-0 overflow-hidden pointer-events-none`
          }`}
      >
        <div
          className={`w-[200px] h-[200px] md:w-[400px] md:h-[400px] duration-500 delay-500 absolute bg-[#0c51ff59] rounded-full right-0 top-[20%] pointer-events-none blur-[40px] ${menuOpen ? `opacity-1` : `opacity-0`
            }`}
        ></div>
        <div
          className={`w-[200px] h-[200px] md:w-[400px] md:h-[400px] duration-500 delay-500 absolute bg-[#ff0c0c59] rounded-full right-40 top-[30%] pointer-events-none blur-[40px] ${menuOpen ? `opacity-1` : `opacity-0`
            }`}
        ></div>
        <div
          className={`w-[200px] h-[200px] md:w-[400px] md:h-[400px] duration-500 delay-500 absolute bg-[#0cff1859] rounded-full right-20 top-[50%] pointer-events-none blur-[40px] ${menuOpen ? `opacity-1` : `opacity-0`
            }`}
        ></div>
        <h1>Menu</h1>
        <div className="h-[100%] flex flex-col justify-start pt-20 gap-2 px-10 text-[3rem] sm:text-[4rem] md:text-[5rem] uppercase">
          <span className="h-[2.5rem] sm:h-[3.5rem] md:h-[4.5rem] flex items-center relative overflow-hidden">
            <Link
              to="/hyperrcompute/pricing"
              onClick={handleMenuLinkClick}
              className={`delay-500 ease-in-out duration-1000 ${menuOpen ? `translate-y-0 opacity-100` : `translate-y-10 opacity-0`
                }`}
            >
              GPUs
            </Link>

          </span>
          <span className="h-[2.5rem] sm:h-[3.5rem] md:h-[4.5rem] flex items-center relative overflow-hidden">
            <Link
              to="/hyperrcompute/serverless"
              onClick={handleMenuLinkClick}
              className={`delay-500 ease-in-out duration-1000 ${menuOpen ? `translate-y-0 opacity-100` : `translate-y-10 opacity-0`
                }`}
            >
              Serverless
            </Link>

          </span>
          <span className="h-[2.5rem] sm:h-[3.5rem] md:h-[4.5rem] flex items-center relative overflow-hidden">
            <Link
              to="/hyperrcompute/terminal"
              onClick={handleMenuLinkClick}
              className={`delay-500 ease-in-out duration-1000 ${menuOpen ? `translate-y-0 opacity-100` : `translate-y-10 opacity-0`
                }`}
            >
              Terminal
            </Link>
          </span>
          <span className="h-[2.5rem] sm:h-[3.5rem] md:h-[4.5rem] flex items-center relative overflow-hidden">
            <Link
              to="/hyperrcompute/hosting"
              onClick={handleMenuLinkClick}
              className={`delay-500 ease-in-out duration-1000 ${menuOpen ? `translate-y-0 opacity-100` : `translate-y-10 opacity-0`
                }`}
            >
              Hosting
            </Link>
          </span>
          <span className="h-[2.5rem] sm:h-[3.5rem] md:h-[4.5rem] flex items-center relative overflow-hidden">
            <Link
              to="/hyperrcompute/blogs"
              onClick={handleMenuLinkClick}
              className={`delay-500 ease-in-out duration-1000 ${menuOpen ? `translate-y-0 opacity-100` : `translate-y-10 opacity-0`
                }`}
            >
              Blog
            </Link>
          </span>
          <span className="h-[2.5rem] sm:h-[3.5rem] md:h-[4.5rem] flex items-center relative overflow-hidden">
            <Link
              to="/hyperrcompute/docs"
              onClick={handleMenuLinkClick}
              className={`delay-500 ease-in-out duration-1000 ${menuOpen ? `translate-y-0 opacity-100` : `translate-y-10 opacity-0`
                }`}
            >
              Docs
            </Link>
          </span>
          <button
            className={`linear--button text-[2rem] text-[#000] w-fit px-4 py-2 mt-10 uppercase rounded-lg transition-opacity duration-1000 ease-in-out
    ${menuOpen ? 'translate-y-0 opacity-100 delay-[1100ms]' : ' opacity-0 '}
  `}
            onClick={() => {
              setMenuOpen(false);
              setTimeout(() => {
                navigate("/");
              }, 500);
            }}
          >
            Get Started
          </button>


        </div>
      </div>
      <div className="sticky top-0 backdrop-blur-lg z-[1000]">
        <nav className="flex justify-between items-center text-[14px] p-3 bg-[#00000089]">
          <Link to="/" className="w-[200px] text-lg">
            HYPERRCOMPUTE
          </Link>
          {windowWidth > 900 ? (
            <span className="flex gap-12">
              <Link
                className="hover:text-[#9aff4d]"
                to="/hyperrcompute/pricing"
              >
                GPUs
              </Link>

              <Link
                className="hover:text-[#9aff4d]"
                to="/hyperrcompute/serverless"
              >
                Serverless
              </Link>
              <Link
                className="hover:text-[#9aff4d]"
                to="/hyperrcompute/terminal"
              >
                Terminal
              </Link>
              <Link
                className="hover:text-[#9aff4d]"
                to="/hyperrcompute/hosting"
              >
                Hosting
              </Link>
              <Link className="hover:text-[#9aff4d]" to="/hyperrcompute/blogs">
                Blogs
              </Link>
            </span>
          ) : (
            ``
          )}
          <span className="flex gap-4">
            {windowWidth > 900 && <div className="flex gap-4">
              <button
                className="py-2 w-[120px] linear--button text-[#000] rounded-lg"
                onClick={() => navigate("/")}
              >
                Get Started
              </button>
              <button
                className="py-2 px-4 ring-1 text-[#9aff4d] ring-[#9aff4d] rounded-lg"
                onClick={() => navigate("/hyperrcompute/docs")}
              >
                Docs
              </button></div>}

            {/* <div className="relative">
      <button
        className="px-4 py-2 bg-[#333] text-white rounded-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        Account ▾
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-[160px] bg-white border border-gray-200 rounded-lg shadow-lg z-10 flex flex-col">
         { !isLoggedIn ? <div>
          <button
            className="px-4 py-2 text-left text-black hover:bg-gray-100"
            onClick={() => {
              setIsOpen(false);
              setIsLoggedIn(true);
              navigate("/signin");
            }}
          >
            Sign In
          </button>
          <button
            className="px-4 py-2 text-black text-left hover:bg-gray-100"
            onClick={() => {
              setIsOpen(false);
              navigate("/signup");
            }}
          >
            Sign Up
          </button>
            </div> :
          <button
            className="px-4 py-2 text-left text-red-600 hover:bg-gray-100"
            onClick={() => {
              setIsOpen(false);
              setIsLoggedIn(false); 
              navigate("/");
            }}
          >
            Logout
          </button>
}
        </div>
      )}
    </div> */}
            {windowWidth <= 900 && (
              <button
                className="px-4 py-1 bg-[#333] rounded-full"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <img className="w-[20px]" src="/menu.png" alt="menu icon" />
              </button>
            )}
          </span>
        </nav>
        <div
          className={`notification-bar overflow-hidden transition-all duration-500 ease-in-out text-[10px] sm:text-[14px] text-[#CBCCD1] flex items-center justify-center gap-4 w-full bg-purple-100 py-2 ring-[0.5px] ring-[#444] ${menuOpen
            ? "max-h-0 opacity-0 pointer-events-none"
            : "max-h-[100px] opacity-100"
            }`}
        >
          <img
            className="w-[25px] p-2 rounded-full bg-[#444]"
            src="/heart.png"
            alt="Heart"
          />

          <p>Lightning Payment: More Power, less cost!</p>
          <p className="font-thin">|</p>
          <a
            className="font-bold cursor-pointer"
            href="https://lightning.network/"
          >
            Learn more
          </a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
