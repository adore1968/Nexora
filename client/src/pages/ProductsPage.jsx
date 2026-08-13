import { useProducts } from "../context/products/ProductsContext";
import ProductCard from "../components/ProductCard";
import Spinner from "../components/Spinner";
import { useEffect, useState } from "react";
import SearchProduct from "../components/SearchProduct";
import Pagination from "../components/Pagination";
import { Helmet } from "react-helmet-async";

function ProductsPage() {
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

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage,
  );

  return (
    <>
      <Helmet>
        <title>Products | Nexora</title>

        <meta
          name="description"
          content="Explore our collection of gaming, electronics, accessories and office products."
        />
      </Helmet>

      <section className="py-8">
        {/* Header */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-medium uppercase tracking-wider text-indigo-400">
            Store
          </p>

          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <h1 className="text-3xl font-bold text-white md:text-4xl">
                Products
              </h1>

              <p className="mt-2 text-zinc-400">
                Explore our collection of products.
              </p>
            </div>

            <span className="text-sm text-zinc-500">
              {filteredProducts.length}{" "}
              {filteredProducts.length === 1 ? "product" : "products"}
            </span>
          </div>
        </div>

        {/* Search */}
        <SearchProduct search={search} setSearch={setSearch} />

        {/* Products */}
        {filteredProducts.length === 0 ? (
          <div className="rounded-xl border border-zinc-700 bg-zinc-800/50 px-6 py-16 text-center">
            <h2 className="text-xl font-semibold text-white">
              No products found
            </h2>

            <p className="mt-2 text-zinc-400">
              {search
                ? "No products match your search."
                : "There are currently no products available."}
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {currentProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
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
      </section>
    </>
  );
}

export default ProductsPage;
