import { useParams } from "react-router-dom";
import { useProducts } from "../context/products/ProductsContext";
import { useEffect, useState } from "react";
import { useAuth } from "../context/auth/AuthContext";
import { useCart } from "../context/cart/CartContext";
import { Helmet } from "react-helmet-async";

function ProductPage() {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const { id } = useParams();
  const { getProduct } = useProducts();
  const { isAuthenticated, user } = useAuth();
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      const product = await getProduct(id);
      setProduct(product);
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (!product) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-zinc-400">Loading...</p>
      </div>
    );
  }

  const isOutOfStock = product.stock === 0;

  const handleAddToCart = async () => {
    await addToCart(product._id, quantity);
  };

  return (
    <>
      <Helmet>
        <title>
          {product?.name ? `${product.name} | Nexora` : "Product | Nexora"}
        </title>

        <meta
          name="description"
          content={product?.description || "Discover this product at Nexora."}
        />
      </Helmet>

      <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
        <div className="grid overflow-hidden rounded-2xl border border-zinc-700 bg-zinc-800 shadow-2xl md:grid-cols-2">
          {/* Product image */}
          <div className="flex min-h-[280px] items-center justify-center bg-zinc-900 p-6 sm:min-h-[350px] sm:p-8 md:min-h-[500px] md:p-12">
            <img
              src={product.image}
              alt={product.name}
              className="h-auto max-h-[280px] w-full max-w-xs object-contain transition duration-300 hover:scale-105 sm:max-h-[350px] sm:max-w-md md:max-h-[450px]"
            />
          </div>

          {/* Product information */}
          <div className="flex min-w-0 flex-col p-6 sm:p-8 md:p-12">
            {/* Category */}
            <span className="mb-4 w-fit max-w-full truncate rounded-full bg-indigo-500/10 px-3 py-1 text-sm font-medium text-indigo-400">
              {product.category}
            </span>

            {/* Name */}
            <h1 className="break-words text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
              {product.name}
            </h1>

            {/* Price */}
            <p className="mt-4 text-2xl font-bold text-indigo-400 sm:mt-5 sm:text-3xl">
              ${product.price.toFixed(2)}
            </p>

            {/* Description */}
            <div className="mt-5 border-t border-zinc-700 pt-5 sm:mt-6 sm:pt-6">
              <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-zinc-400">
                Description
              </h2>

              <p className="break-words leading-7 text-zinc-300">
                {product.description}
              </p>
            </div>

            {/* Stock */}
            <div className="mt-5 sm:mt-6">
              {isOutOfStock ? (
                <p className="font-medium text-red-400">Out of stock</p>
              ) : (
                <p className="text-sm text-zinc-400">
                  <span className="font-medium text-emerald-400">In stock</span>{" "}
                  · {product.stock} units available
                </p>
              )}
            </div>

            {/* Cart controls */}
            {isAuthenticated && user?.role === "user" && (
              <div className="mt-6 border-t border-zinc-700 pt-6 sm:mt-8">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                  {/* Quantity */}
                  <div className="flex w-full items-center justify-between overflow-hidden rounded-lg border border-zinc-600 bg-zinc-700 sm:w-auto sm:justify-start">
                    <button
                      type="button"
                      disabled={quantity <= 1 || isOutOfStock}
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="cursor-pointer px-5 py-2 text-lg text-zinc-300 transition hover:bg-zinc-600 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      −
                    </button>

                    <span className="min-w-12 px-3 text-center font-semibold text-white">
                      {quantity}
                    </span>

                    <button
                      type="button"
                      disabled={quantity >= product.stock || isOutOfStock}
                      onClick={() =>
                        setQuantity((q) => Math.min(product.stock, q + 1))
                      }
                      className="cursor-pointer px-5 py-2 text-lg text-zinc-300 transition hover:bg-zinc-600 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      +
                    </button>
                  </div>

                  {/* Add to cart */}
                  <button
                    type="button"
                    disabled={isOutOfStock}
                    onClick={handleAddToCart}
                    className="w-full cursor-pointer rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:bg-zinc-600 disabled:text-zinc-400 sm:flex-1"
                  >
                    {isOutOfStock ? "Out of stock" : "Add to cart"}
                  </button>
                </div>
              </div>
            )}

            {/* Guest message */}
            {!isAuthenticated && (
              <p className="mt-6 rounded-lg bg-zinc-900 p-4 text-sm text-zinc-400 sm:mt-8">
                Sign in to add this product to your cart.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductPage;
