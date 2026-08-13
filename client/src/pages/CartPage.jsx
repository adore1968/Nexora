import { Helmet } from "react-helmet-async";
import CartSummary from "../components/CartSummary";
import ProductCartCard from "../components/ProductCartCard";
import Spinner from "../components/Spinner";
import { useCart } from "../context/cart/CartContext";

function CartPage() {
  const { loading, cart } = useCart();

  if (loading) {
    return <Spinner />;
  }

  if (cart.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-zinc-800 text-4xl">
          🛒
        </div>

        <h2 className="text-2xl font-bold text-white">Your cart is empty</h2>

        <p className="mt-2 max-w-md text-zinc-400">
          Add some products to your cart and they will appear here.
        </p>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Shopping Cart | Nexora</title>

        <meta
          name="description"
          content="Review and manage the products in your Nexora shopping cart."
        />
      </Helmet>
      <div className="mx-auto w-full max-w-6xl px-0 py-6 sm:px-2 sm:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl font-bold text-white sm:text-3xl">
            Shopping Cart
          </h1>

          <p className="mt-1 text-sm text-zinc-400 sm:text-base">
            {cart.length} {cart.length === 1 ? "product" : "products"} in your
            cart
          </p>
        </div>

        {/* Cart */}
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_350px] lg:gap-8">
          {/* Products */}
          <div className="min-w-0 space-y-4">
            {cart.map((item) => (
              <ProductCartCard key={item._id} product={item} />
            ))}
          </div>

          {/* Summary */}
          <div className="min-w-0 lg:sticky lg:top-6 lg:h-fit">
            <CartSummary cart={cart} />
          </div>
        </div>
      </div>
    </>
  );
}

export default CartPage;
