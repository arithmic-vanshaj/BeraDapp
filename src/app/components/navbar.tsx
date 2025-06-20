"use client";
import Link from "next/link";

const Navbar = () => {
  // const [menuOpen, setMenuOpen] = useState(false);

    return (
      <nav className="flex justify-between items-center py-4 px-6 w-full">
        <div className="h-10">
          {/* // <Link href="/">
          //   <img src="/api/placeholder/50/50" alt="BeraFolio Logo"  />
          // </Link> */}
        </div>
        <div className="flex gap-4">
          <Link href="/dapp">
            <button className="bg-orange-400 cursor-pointer 
            hover:bg-orange-500 text-black font-bold py-2 px-6 
            rounded-lg">
              Launch app
            </button>
          </Link>
        </div>
      </nav>
    );
};

export default Navbar;
