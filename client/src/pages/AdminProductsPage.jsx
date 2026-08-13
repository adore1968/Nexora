import { Link } from "react-router-dom";
import {
  FiPackage,
  FiPlus,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";
import { useProducts } from "../context/products/ProductsContext";
import AdminProductCard from "../components/AdminProductCard";
import Spinner from "../components/Spinner";
import SearchProduct from "../components/SearchProduct";
import Pagination from "../components/Pagination";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

function AdminProductsPage() {
  const { loading, products } = useProducts();

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 8;

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  if (loading) {
    return <Spinner />;
  }

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()),
  );

  const totalProducts = products.length;
  const inStock = products.filter((product) => product.stock > 0).length;
  const outOfStock = products.filter((product) => product.stock === 0).length;

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const startIndex = (currentPage - 1) * productsPerPage;

  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage,
  );

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | Nexora</title>

        <meta
          name="description"
          content="Manage products, inventory, and your Nexora store."
        />
      </Helmet>
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-medium uppercase tracking-wider text-indigo-400">
              Administration
            </p>

            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Product Management
            </h1>

            <p className="mt-2 text-zinc-400">
              Manage your store products and inventory.
            </p>
          </div>

          <Link
            to="/products/add-product"
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-500 sm:w-auto"
          >
            <FiPlus size={18} />
            Add Product
          </Link>
        </div>

        {/* Search */}
        <SearchProduct search={search} setSearch={setSearch} />

        {/* Stats */}
        <div className="mb-10 grid gap-4 sm:grid-cols-3">
          {/* Total */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5 transition hover:border-zinc-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-zinc-400">
                  Total Products
                </p>

                <p className="mt-2 text-3xl font-bold text-white">
                  {totalProducts}
                </p>
              </div>

              <div className="rounded-lg bg-indigo-500/10 p-3 text-indigo-400">
                <FiPackage size={22} />
              </div>
            </div>
          </div>

          {/* In stock */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5 transition hover:border-zinc-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-zinc-400">In Stock</p>

                <p className="mt-2 text-3xl font-bold text-emerald-400">
                  {inStock}
                </p>
              </div>

              <div className="rounded-lg bg-emerald-500/10 p-3 text-emerald-400">
                <FiCheckCircle size={22} />
              </div>
            </div>
          </div>

          {/* Out of stock */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5 transition hover:border-zinc-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-zinc-400">
                  Out of Stock
                </p>

                <p className="mt-2 text-3xl font-bold text-red-400">
                  {outOfStock}
                </p>
              </div>

              <div className="rounded-lg bg-red-500/10 p-3 text-red-400">
                <FiAlertCircle size={22} />
              </div>
            </div>
          </div>
        </div>

        {/* Section title */}
        {filteredProducts.length > 0 && (
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white">Products</h2>

              <p className="mt-1 text-sm text-zinc-500">
                {filteredProducts.length}{" "}
                {filteredProducts.length === 1 ? "product" : "products"}{" "}
                available
              </p>
            </div>
          </div>
        )}

        {/* Products */}
        {filteredProducts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-zinc-700 bg-zinc-900/50 px-6 py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-zinc-800 text-zinc-500">
              <FiPackage size={25} />
            </div>

            <h2 className="mt-5 text-xl font-semibold text-white">
              No products found
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm text-zinc-400">
              {search
                ? "No products match your search."
                : "Your store doesn't have any products yet. Start by creating your first product."}
            </p>

            {!search && (
              <Link
                to="/products/add-product"
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 font-medium text-white transition hover:bg-indigo-500"
              >
                <FiPlus size={17} />
                Add Product
              </Link>
            )}
          </div>
        ) : (
          <>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {currentProducts.map((product) => (
                <AdminProductCard key={product._id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
            />
          </>
        )}
      </div>
    </>
  );
}

export default AdminProductsPage;
