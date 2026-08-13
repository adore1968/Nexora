import { useForm } from "react-hook-form";
import { useAuth } from "../context/auth/AuthContext";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { isAuthenticated, errors: signupErrors, signup } = useAuth();

  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (values) => {
    await signup(values);
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/products");
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      <Helmet>
        <title>Create Account | Nexora</title>

        <meta
          name="description"
          content="Create your Nexora account and start shopping gaming, electronics, accessories and office products."
        />
      </Helmet>

      <div className="flex min-h-[calc(100vh-100px)] items-center justify-center px-4 py-10">
        <div className="w-full max-w-md rounded-2xl border border-zinc-700 bg-zinc-800 p-8 shadow-2xl sm:p-10">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-white">Create an account</h1>

            <p className="mt-2 text-sm text-zinc-400">
              Register to start shopping
            </p>
          </div>

          {Array.isArray(signupErrors) && signupErrors.length > 0 && (
            <div className="mb-5 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3">
              {signupErrors.map((error, index) => (
                <p key={index} className="text-sm text-red-400">
                  {error.error}
                </p>
              ))}
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-5">
            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="mb-2 block text-sm font-medium text-zinc-200"
              >
                Username
              </label>

              <input
                id="username"
                type="text"
                autoComplete="username"
                placeholder="Your username"
                {...register("username", {
                  required: "Username is required",
                })}
                className={`w-full rounded-lg border bg-zinc-700 px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:ring-2 ${
                  errors.username
                    ? "border-red-500 focus:ring-red-500/30"
                    : "border-zinc-600 focus:border-indigo-500 focus:ring-indigo-500/30"
                }`}
              />

              {errors.username && (
                <p className="mt-1.5 text-sm text-red-400">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-zinc-200"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                {...register("email", {
                  required: "Email is required",
                })}
                className={`w-full rounded-lg border bg-zinc-700 px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:ring-2 ${
                  errors.email
                    ? "border-red-500 focus:ring-red-500/30"
                    : "border-zinc-600 focus:border-indigo-500 focus:ring-indigo-500/30"
                }`}
              />

              {errors.email && (
                <p className="mt-1.5 text-sm text-red-400">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-zinc-200"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                autoComplete="new-password"
                placeholder="••••••••"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters long",
                  },
                })}
                className={`w-full rounded-lg border bg-zinc-700 px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:ring-2 ${
                  errors.password
                    ? "border-red-500 focus:ring-red-500/30"
                    : "border-zinc-600 focus:border-indigo-500 focus:ring-indigo-500/30"
                }`}
              />

              {errors.password && (
                <p className="mt-1.5 text-sm text-red-400">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full rounded-lg bg-indigo-600 px-4 py-3 font-semibold text-white transition hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 cursor-pointer"
            >
              Create account
            </button>
          </form>

          {/* Login */}
          <p className="mt-6 text-center text-sm text-zinc-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-indigo-400 transition hover:text-indigo-300"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default RegisterPage;
