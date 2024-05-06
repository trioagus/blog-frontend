import { useEffect } from "react";
import { FaUserCircle, FaBars } from "react-icons/fa";
import { useAuth } from "@/store/authStore";
import { useNavbar } from "@/store/navbar.store";
import Link from "next/link";
import { Sidebar } from "./Sidebar";

export const Navbar: React.FC = () => {
  const { user, isLoggedIn, logout } = useAuth();
  const { isOpen, setIsOpen, isUserMenuOpen, setIsUserMenuOpen } = useNavbar();

  useEffect(() => {
    setIsOpen(false);
  }, [isLoggedIn]);

  return (
    <div className="fixed top-0 left-0 z-50 w-full bg-white border-b border-gray-200">
      <div className="flex items-center justify-between h-16 px-4 mx-auto max-w-7xl">
        <div className="flex items-center md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-gray-800 mr-4 focus:outline-none">
            <FaBars size={20} className="font-semibold"/>
          </button>
        </div>
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">Navbar</h1>
        </div>
        <div className="flex items-center gap-4">
          <ul className="hidden md:flex items-center gap-4">
            <li className="text-sm font-medium text-gray-900 hover:text-red-500">
              <Link href="/">Home</Link>
            </li>

            <li className="text-sm font-medium text-gray-900 hover:text-red-500">
              <Link href="/about">About</Link>
            </li>
          </ul>
        </div>

        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <div className="relative flex items-center gap-4">
              <FaUserCircle
                className="text-xl text-gray-900 cursor-pointer"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              />
              {user?.username && (
                <div
                  className={`w-[150px] absolute top-8 right-0 bg-white border border-gray-200 p-4 rounded-md shadow-md ${
                    isUserMenuOpen ? "block" : "hidden"
                  }`}>
                  <p className="text-sm font-medium mb-1">{user.username}</p>
                  {user.role === "admin" ? (
                    <Link
                      href="/admin"
                      className="text-sm font-medium  mb-2 text-gray-900 hover:text-red-500">
                      Dashboard
                    </Link>
                  ) : (
                    <Link
                      href="/user"
                      className="text-sm font-medium mb-2 text-gray-900 hover:text-red-500">
                      Dashboard
                    </Link>
                  )}
                  <div>
                    <button
                      className="text-sm font-medium text-red-500 hover:text-red-700"
                      onClick={logout}>
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="text-sm font-medium text-red-500 hover:text-red-700">
              Login
            </Link>
          )}
        </div>

        {isOpen && <Sidebar toggle={() => setIsOpen(false)} />}
      </div>
    </div>
  );
};
