import { Link } from "react-router-dom";
import { useProducts } from "../context/products/ProductsContext";
import { useAuth } from "../context/auth/AuthContext";
import { useCart } from "../context/cart/CartContext";

function ProductCard({ product }) {
  const { deleteProduct } = useProducts();
  const { user, isAuthenticated } = useAuth();
  const { addToCart } = useCart();

  const isAdmin = user?.role === "admin";
  const isUser = isAuthenticated && user?.role === "user";
  const isOutOfStock = product.stock <= 0;

  const handleDelete = async (productId) => {
    if (window.confirm(`Are you sure you want to remove ${product.name}?`)) {
      await deleteProduct(productId);
    }
  };

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-zinc-700 hover:shadow-xl">
      {/* Image */}
      <Link
        to={`/products/${product._id}`}
        className="relative block overflow-hidden bg-zinc-950"
      >
        <img
          src={product.image}
          alt={product.name}
          className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Stock badge */}
        <span
          className={`absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-medium backdrop-blur-sm ${
            isOutOfStock
              ? "bg-red-500/90 text-white"
              : "bg-black/60 text-zinc-200"
          }`}
        >
          {isOutOfStock ? "Out of stock" : `${product.stock} in stock`}
        </span>
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        {/* Category */}
        <span className="mb-3 text-xs font-medium uppercase tracking-wider text-indigo-400">
          {product.category}
        </span>

        {/* Name */}
        <h2 className="line-clamp-1 text-lg font-semibold text-white">
          {product.name}
        </h2>

        {/* Description */}
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-6 text-zinc-500">
          {product.description}
        </p>

        {/* Price + Stock */}
        <div className="mt-5 flex items-center justify-between">
          <span className="text-2xl font-bold text-white">
            ${product.price.toFixed(2)}
          </span>

          <span className="text-sm text-zinc-500">
            Stock:{" "}
            <span
              className={isOutOfStock ? "text-red-400" : "text-emerald-400"}
            >
              {product.stock}
            </span>
          </span>
        </div>

        {/* Admin actions */}
        {isAdmin && (
          <div className="mt-5 flex gap-2">
            <Link
              to={`/products/edit/${product._id}`}
              className="flex-1 rounded-lg border border-zinc-700 px-4 py-2.5 text-center text-sm font-medium text-zinc-300 transition hover:border-amber-500/50 hover:bg-amber-500/10 hover:text-amber-400"
            >
              Edit
            </Link>

            <button
              type="button"
              onClick={() => handleDelete(product._id)}
              className="flex-1 cursor-pointer rounded-lg border border-zinc-700 px-4 py-2.5 text-sm font-medium text-zinc-300 transition hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-400"
            >
              Delete
            </button>
          </div>
        )}

        {/* User actions */}
        {isUser && (
          <button
            type="button"
            disabled={isOutOfStock}
            onClick={() => addToCart(product._id, product.name)}
            className="mt-5 w-full cursor-pointer rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isOutOfStock ? "Out of stock" : "Add to cart"}
          </button>
        )}
      </div>
    </article>
  );
}

export default ProductCard;
