import { Link } from "react-router-dom";
import Navbar from "./NavbarLayout";
import Footer from "./FooterLayouts";

function AuthLayouts(props:any) {
  const { children, title, type } = props;
  return (
    <>
    <Navbar/>
    <div className="flex justify-center items-center h-screen mb-0">
      <div className="relative w-full sm:my-0 mt-6 max-w-md bg-[hsl(var(--card))] p-6 rounded-sm sm:rounded-lg shadow-lg border z-10 border-[#CD242C]">
        <h1 className="text-3xl font-bold my-2 text-[#CD242C]">{title}</h1>
        <p className=" text-sm mb-5 text-[color:var(--tulisan-nonprimary)] font-bold">
          Login To Take Our Journey
        </p>
        {children}
        <p className="text-center mt-5">
          {type === 'login' ? "Don't have an account? " : "Already have account? "}
          {type === "login" && (<Link to="/register" className="font-bold text-center text-[#CD242C]">
            Register
          </Link>)}
          {type === "register" && (<Link to="/login" className="font-bold text-center text-[#CD242C]">
            Log in
          </Link>)}
        </p>
      </div>
    </div>
    <Footer/>
    </>
  );
}

export default AuthLayouts;
