import { Link } from "react-router-dom";
import { useProducts } from "../context/products/ProductsContext";
import { Helmet } from "react-helmet-async";

function HomePage() {
  const { products, loading } = useProducts();

  const featuredProducts = products?.slice(0, 4) || [];

  return (
    <>
      <Helmet>
        <title>Nexora | Home</title>

        <meta
          name="description"
          content="Discover gaming, electronics, accessories and office products at NovaCart."
        />
      </Helmet>

      <div className="min-h-screen text-white">
        {/* Hero */}
        <section className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900 via-zinc-900 to-indigo-950 px-6 py-20 sm:px-10 lg:px-16">
          <div className="relative z-10 max-w-3xl">
            <span className="inline-block rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1 text-sm font-medium text-indigo-400">
              Welcome to Products
            </span>

            <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Everything you need.
              <span className="block text-indigo-500">All in one place.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg">
              Discover quality products at great prices. Browse our collection
              and find exactly what you're looking for.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/products"
                className="rounded-lg bg-indigo-600 px-6 py-3 text-center font-semibold text-white transition hover:bg-indigo-500"
              >
                Browse Products
              </Link>

              <Link
                to="/register"
                className="rounded-lg border border-zinc-700 bg-zinc-800/50 px-6 py-3 text-center font-semibold text-zinc-200 transition hover:bg-zinc-800"
              >
                Create Account
              </Link>
            </div>
          </div>

          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-indigo-600/20 blur-3xl" />
          <div className="absolute -bottom-32 right-20 h-80 w-80 rounded-full bg-indigo-500/10 blur-3xl" />
        </section>

        {/* Features */}
        <section className="grid grid-cols-1 gap-4 py-12 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-indigo-500/10 text-xl text-indigo-400">
              ✓
            </div>

            <h3 className="text-lg font-semibold">Quality Products</h3>

            <p className="mt-2 text-sm leading-6 text-zinc-400">
              Carefully selected products with quality and reliability in mind.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-indigo-500/10 text-xl text-indigo-400">
              ⚡
            </div>

            <h3 className="text-lg font-semibold">Simple Shopping</h3>

            <p className="mt-2 text-sm leading-6 text-zinc-400">
              Find your products, add them to your cart and manage your order
              easily.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-indigo-500/10 text-xl text-indigo-400">
              🔒
            </div>

            <h3 className="text-lg font-semibold">Secure Account</h3>

            <p className="mt-2 text-sm leading-6 text-zinc-400">
              Your account and shopping experience are protected with secure
              authentication.
            </p>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-8">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="text-sm font-medium text-indigo-400">
                Our collection
              </p>

              <h2 className="mt-1 text-3xl font-bold">Featured Products</h2>

              <p className="mt-2 text-zinc-400">
                Take a look at some of our products.
              </p>
            </div>

            <Link
              to="/products"
              className="hidden text-sm font-medium text-indigo-400 transition hover:text-indigo-300 sm:block"
            >
              View all →
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center py-16">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-700 border-t-indigo-500" />
            </div>
          ) : featuredProducts.length === 0 ? (
            <div className="rounded-xl border border-zinc-800 bg-zinc-900 py-12 text-center">
              <p className="text-zinc-400">No products available yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {featuredProducts.map((product) => (
                <Link
                  key={product._id}
                  to={`/products/${product._id}`}
                  className="group overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 transition hover:-translate-y-1 hover:border-indigo-500/50"
                >
                  <div className="aspect-square overflow-hidden bg-zinc-800">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-5">
                    <p className="text-xs font-medium uppercase tracking-wide text-indigo-400">
                      {product.category}
                    </p>

                    <h3 className="mt-2 truncate text-lg font-semibold text-white">
                      {product.name}
                    </h3>

                    <p className="mt-3 text-xl font-bold text-white">
                      ${product.price.toFixed(2)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div className="mt-6 text-center sm:hidden">
            <Link
              to="/products"
              className="text-sm font-medium text-indigo-400 hover:text-indigo-300"
            >
              View all products →
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="my-12 overflow-hidden rounded-2xl border border-indigo-500/20 bg-indigo-600/10 px-6 py-12 text-center sm:px-10">
          <h2 className="text-3xl font-bold">Ready to start shopping?</h2>

          <p className="mx-auto mt-3 max-w-xl text-zinc-400">
            Explore our complete collection and find your next favorite product.
          </p>

          <Link
            to="/products"
            className="mt-7 inline-block rounded-lg bg-indigo-600 px-7 py-3 font-semibold text-white transition hover:bg-indigo-500"
          >
            Explore Products
          </Link>
        </section>
      </div>
    </>
  );
}

export default HomePage;
