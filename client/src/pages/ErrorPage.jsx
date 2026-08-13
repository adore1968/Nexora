import { Link } from "react-router-dom";
import { FiAlertTriangle, FiHome, FiArrowLeft } from "react-icons/fi";
import { Helmet } from "react-helmet-async";

function ErrorPage() {
  return (
    <>
      <Helmet>
        <title>Page Not Found | Nexora</title>

        <meta
          name="description"
          content="The page you're looking for could not be found on Nexora."
        />
      </Helmet>
      <section className="flex min-h-[70vh] items-center justify-center px-4">
        <div className="w-full max-w-lg text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-indigo-500/10 text-indigo-400">
            <FiAlertTriangle size={38} />
          </div>

          <p className="mt-6 text-sm font-medium uppercase tracking-wider text-indigo-400">
            Error 404
          </p>

          <h1 className="mt-2 text-4xl font-bold text-white md:text-5xl">
            Page not found
          </h1>

          <p className="mx-auto mt-4 max-w-md text-zinc-400">
            Sorry, the page you're looking for doesn't exist or may have been
            moved.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <button
              onClick={() => window.history.back()}
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-zinc-700 bg-zinc-800 px-5 py-3 font-medium text-white transition hover:bg-zinc-700"
            >
              <FiArrowLeft size={18} />
              Go Back
            </button>

            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 font-medium text-white transition hover:bg-indigo-500"
            >
              <FiHome size={18} />
              Go Home
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default ErrorPage;
