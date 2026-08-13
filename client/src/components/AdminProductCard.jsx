import { Link } from "react-router-dom";
import { useProducts } from "../context/products/ProductsContext";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

function AdminProductCard({ product }) {
  const { deleteProduct } = useProducts();

  const isOutOfStock = product.stock <= 0;

  const handleDelete = async (productId) => {
    if (window.confirm(`Are you sure you want to remove ${product.name}?`)) {
      await deleteProduct(productId);
    }
  };

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-700 bg-zinc-800 shadow-lg transition duration-300 hover:-translate-y-1 hover:border-zinc-600 hover:shadow-2xl">
      {/* Image */}
      <div className="relative overflow-hidden bg-zinc-900">
        <img
          src={product.image}
          alt={product.name}
          className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
        />

        {/* Stock badge */}
        <span
          className={`absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-semibold backdrop-blur-sm ${
            isOutOfStock
              ? "bg-red-500/90 text-white"
              : "bg-emerald-500/90 text-white"
          }`}
        >
          {isOutOfStock ? "Out of stock" : `${product.stock} in stock`}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        {/* Category */}
        <span className="mb-2 w-fit rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-400">
          {product.category}
        </span>

        {/* Name */}
        <h2 className="line-clamp-1 text-xl font-bold text-white">
          {product.name}
        </h2>

        {/* Description */}
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-6 text-zinc-400">
          {product.description}
        </p>

        {/* Price + stock */}
        <div className="mt-5 flex items-center justify-between">
          <span className="text-2xl font-bold text-white">
            ${product.price.toFixed(2)}
          </span>

          <span className="text-sm text-zinc-500">
            Stock:{" "}
            <span className="font-medium text-zinc-300">{product.stock}</span>
          </span>
        </div>

        {/* Admin actions */}
        <div className="mt-5 flex gap-2">
          <Link
            to={`/products/edit/${product._id}`}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500"
          >
            <FiEdit2 size={16} />
            Edit
          </Link>

          <button
            type="button"
            onClick={() => handleDelete(product._id)}
            className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border border-red-500/30 bg-red-500/5 px-4 py-2.5 text-sm font-semibold text-red-400 transition hover:bg-red-500 hover:text-white"
          >
            <FiTrash2 size={16} />
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}

export default AdminProductCard;
