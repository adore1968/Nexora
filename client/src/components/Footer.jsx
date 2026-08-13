import { Link } from "react-router-dom";
import { FiGithub, FiLinkedin } from "react-icons/fi";

function Footer() {
  return (
    <footer className="mt-16 w-full border-t border-zinc-800 bg-zinc-900">
      <div className="mx-auto w-full px-6 py-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          {/* Brand */}
          <div>
            <Link
              to="/"
              className="text-xl font-bold text-white transition hover:text-indigo-400"
            >
              Products<span className="text-indigo-500">.</span>
            </Link>

            <p className="mt-2 max-w-sm text-sm leading-6 text-zinc-400">
              A simple e-commerce platform built with React, Node.js and
              MongoDB.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white">
              Navigation
            </h3>

            <div className="flex flex-col gap-2 text-sm">
              <Link
                to="/products"
                className="text-zinc-400 transition hover:text-white"
              >
                Products
              </Link>

              <Link
                to="/login"
                className="text-zinc-400 transition hover:text-white"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="text-zinc-400 transition hover:text-white"
              >
                Register
              </Link>
            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white">
              Connect
            </h3>

            <div className="flex gap-3">
              <a
                href="https://github.com/adore1968"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="rounded-lg border border-zinc-700 p-2.5 text-zinc-400 transition hover:border-zinc-600 hover:bg-zinc-800 hover:text-white"
              >
                <FiGithub size={19} />
              </a>

              <a
                href="https://www.linkedin.com/in/germán-gómez-8a6067246/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="rounded-lg border border-zinc-700 p-2.5 text-zinc-400 transition hover:border-indigo-500/50 hover:bg-indigo-500/10 hover:text-indigo-400"
              >
                <FiLinkedin size={19} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 border-t border-zinc-800 pt-6 text-center text-sm text-zinc-500">
          © {new Date().getFullYear()} Products. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
