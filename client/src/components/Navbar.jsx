import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/auth/AuthContext";
import {
  FiMenu,
  FiX,
  FiShoppingBag,
  FiShoppingCart,
  FiSettings,
  FiLogIn,
  FiUserPlus,
  FiLogOut,
} from "react-icons/fi";

function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeMenu();
  };

  return (
    <nav className="sticky top-0 z-50 mb-8 w-full border-b border-zinc-700/70 bg-zinc-900/95 px-4 py-4 backdrop-blur-md sm:px-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to={isAuthenticated ? "/products" : "/"}
            onClick={closeMenu}
            className="flex items-center gap-2 text-2xl font-bold tracking-tight text-white transition hover:text-indigo-400"
          >
            <FiShoppingBag className="text-indigo-500" />
            Products<span className="text-indigo-500">.</span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden items-center gap-2 text-sm font-medium md:flex">
            <li>
              <Link
                to="/products"
                className="flex items-center gap-2 rounded-lg px-4 py-2 text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
              >
                <FiShoppingBag />
                Products
              </Link>
            </li>

            {isAuthenticated && user?.role === "admin" && (
              <li>
                <Link
                  to="/admin"
                  className="flex items-center gap-2 rounded-lg px-4 py-2 text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
                >
                  <FiSettings />
                  Admin Panel
                </Link>
              </li>
            )}

            {isAuthenticated && user?.role === "user" && (
              <li>
                <Link
                  to="/cart"
                  className="flex items-center gap-2 rounded-lg px-4 py-2 text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
                >
                  <FiShoppingCart />
                  Cart
                </Link>
              </li>
            )}

            {isAuthenticated ? (
              <li>
                <button
                  type="button"
                  onClick={logout}
                  className="ml-2 flex cursor-pointer items-center gap-2 rounded-lg bg-red-500/10 px-4 py-2 text-red-400 transition hover:bg-red-500 hover:text-white"
                >
                  <FiLogOut />
                  Logout
                </button>
              </li>
            ) : (
              <>
                <li>
                  <Link
                    to="/login"
                    className="flex items-center gap-2 rounded-lg border border-zinc-600 px-4 py-2 text-zinc-300 transition hover:border-zinc-500 hover:bg-zinc-800 hover:text-white"
                  >
                    <FiLogIn />
                    Login
                  </Link>
                </li>

                <li>
                  <Link
                    to="/register"
                    className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-white transition hover:bg-indigo-500"
                  >
                    <FiUserPlus />
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="cursor-pointer rounded-lg border border-zinc-700 p-2 text-zinc-300 transition hover:bg-zinc-800 hover:text-white md:hidden"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? (
              <FiX className="h-6 w-6" />
            ) : (
              <FiMenu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <ul className="mt-4 flex flex-col gap-2 border-t border-zinc-800 pt-4 text-sm font-medium md:hidden">
            <li>
              <Link
                to="/products"
                onClick={closeMenu}
                className="flex items-center gap-3 rounded-lg px-4 py-3 text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
              >
                <FiShoppingBag />
                Products
              </Link>
            </li>

            {isAuthenticated && user?.role === "admin" && (
              <li>
                <Link
                  to="/admin"
                  onClick={closeMenu}
                  className="flex items-center gap-3 rounded-lg px-4 py-3 text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
                >
                  <FiSettings />
                  Admin Panel
                </Link>
              </li>
            )}

            {isAuthenticated && user?.role === "user" && (
              <li>
                <Link
                  to="/cart"
                  onClick={closeMenu}
                  className="flex items-center gap-3 rounded-lg px-4 py-3 text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
                >
                  <FiShoppingCart />
                  Cart
                </Link>
              </li>
            )}

            {isAuthenticated ? (
              <li>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full cursor-pointer items-center gap-3 rounded-lg bg-red-500/10 px-4 py-3 text-left text-red-400 transition hover:bg-red-500 hover:text-white"
                >
                  <FiLogOut />
                  Logout
                </button>
              </li>
            ) : (
              <>
                <li>
                  <Link
                    to="/login"
                    onClick={closeMenu}
                    className="flex items-center gap-3 rounded-lg border border-zinc-600 px-4 py-3 text-zinc-300 transition hover:border-zinc-500 hover:bg-zinc-800 hover:text-white"
                  >
                    <FiLogIn />
                    Login
                  </Link>
                </li>

                <li>
                  <Link
                    to="/register"
                    onClick={closeMenu}
                    className="flex items-center gap-3 rounded-lg bg-indigo-600 px-4 py-3 text-white transition hover:bg-indigo-500"
                  >
                    <FiUserPlus />
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
