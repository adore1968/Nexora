import { useCart } from "../context/cart/CartContext";
import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";

function ProductCartCard({ product }) {
  const { product: productData, quantity } = product;
  const { updateCartItem, removeFromCart } = useCart();

  const subtotal = productData.price * quantity;
  const maxStock = productData.stock;

  const handleRemove = async (productId) => {
    if (
      window.confirm(
        "Are you sure you want to remove this product from the cart?",
      )
    ) {
      await removeFromCart(productId);
    }
  };

  return (
    <div className="rounded-xl border border-zinc-700 bg-zinc-800 p-4 shadow-lg sm:p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">
        {/* Image */}
        <div className="mx-auto flex h-32 w-32 shrink-0 items-center justify-center rounded-lg bg-zinc-900 p-3 sm:mx-0">
          <img
            src={productData.image}
            alt={productData.name}
            className="h-full w-full object-contain"
          />
        </div>

        {/* Product information */}
        <div className="min-w-0 flex-1 text-center sm:text-left">
          <h2 className="break-words text-lg font-semibold text-white">
            {productData.name}
          </h2>

          <p className="mt-1 text-sm text-zinc-400">{productData.category}</p>

          <p className="mt-2 text-lg font-bold text-indigo-400">
            ${productData.price.toFixed(2)}
          </p>

          {/* Controls */}
          <div className="mt-4 flex flex-col items-center gap-3 sm:flex-row sm:items-center">
            {/* Quantity */}
            <div className="flex w-fit items-center overflow-hidden rounded-lg border border-zinc-600 bg-zinc-700">
              <button
                type="button"
                onClick={() => {
                  if (quantity === 1) {
                    removeFromCart(productData._id);
                  } else {
                    updateCartItem(productData._id, quantity - 1);
                  }
                }}
                className="flex h-10 w-10 cursor-pointer items-center justify-center text-zinc-300 transition hover:bg-zinc-600 hover:text-white"
                aria-label="Decrease quantity"
              >
                <FiMinus />
              </button>

              <span className="flex h-10 min-w-12 items-center justify-center px-3 font-semibold text-white">
                {quantity}
              </span>

              <button
                type="button"
                disabled={quantity >= maxStock}
                onClick={() => {
                  updateCartItem(productData._id, quantity + 1);
                }}
                className="flex h-10 w-10 cursor-pointer items-center justify-center text-zinc-300 transition hover:bg-zinc-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Increase quantity"
              >
                <FiPlus />
              </button>
            </div>

            {/* Remove */}
            <button
              type="button"
              onClick={() => handleRemove(productData._id)}
              className="flex w-fit cursor-pointer items-center gap-2 text-sm font-medium text-red-400 transition hover:text-red-300"
            >
              <FiTrash2 />
              Remove
            </button>
          </div>
        </div>

        {/* Subtotal */}
        <div className="border-t border-zinc-700 pt-4 text-center sm:border-l sm:border-t-0 sm:pl-5 sm:pt-0 sm:text-right">
          <p className="text-xs uppercase tracking-wide text-zinc-500">
            Subtotal
          </p>

          <p className="mt-1 text-xl font-bold text-white">
            ${subtotal.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProductCartCard;
