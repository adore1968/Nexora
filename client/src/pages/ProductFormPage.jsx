import { useForm, useWatch } from "react-hook-form";
import { useProducts } from "../context/products/ProductsContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import uploadImage from "../services/cloudinary";

import {
  FiArrowLeft,
  FiCheck,
  FiImage,
  FiPackage,
  FiUpload,
} from "react-icons/fi";
import { Helmet } from "react-helmet-async";

function ProductFormPage() {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm();

  const { getProduct, updateProduct, createProduct } = useProducts();

  const navigate = useNavigate();
  const params = useParams();

  const [preview, setPreview] = useState("");
  const [currentImage, setCurrentImage] = useState("");
  const [loading, setLoading] = useState(false);

  const image = useWatch({
    control,
    name: "image",
  });

  useEffect(() => {
    if (!image?.length) {
      setPreview("");
      return;
    }

    const objectUrl = URL.createObjectURL(image[0]);

    setPreview(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [image]);

  useEffect(() => {
    const loadProduct = async () => {
      if (!params.id) return;

      const product = await getProduct(params.id);

      setValue("name", product.name);
      setValue("description", product.description);
      setValue("price", product.price);
      setValue("stock", product.stock);
      setValue("category", product.category);

      setCurrentImage(product.image);
    };

    loadProduct();
  }, [params.id]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setLoading(true);

      let imageUrl = currentImage;

      if (data.image?.length > 0) {
        const uploadedImage = await uploadImage(data.image[0]);
        imageUrl = uploadedImage.secure_url;
      }

      const product = {
        name: data.name,
        description: data.description,
        price: data.price,
        stock: data.stock,
        category: data.category,
        image: imageUrl,
      };

      if (params.id) {
        await updateProduct(params.id, product);
      } else {
        await createProduct(product);
      }

      navigate("/admin");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  });

  return (
    <>
      <Helmet>
        <title>
          {params.id ? "Edit Product | Nexora" : "Create Product | Nexora"}
        </title>

        <meta
          name="description"
          content={
            params.id
              ? "Edit an existing product in your Nexora store."
              : "Create a new product for your Nexora store."
          }
        />
      </Helmet>

      <div className="min-h-[calc(100vh-100px)] px-4 py-10">
        <div className="mx-auto w-full max-w-3xl">
          {/* Back */}
          <button
            type="button"
            onClick={() => navigate("/admin")}
            className="mb-6 inline-flex cursor-pointer items-center gap-2 text-sm text-zinc-400 transition hover:text-white"
          >
            <FiArrowLeft />
            Back to products
          </button>

          {/* Card */}
          <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 shadow-xl">
            {/* Header */}
            <div className="border-b border-zinc-800 px-6 py-6 sm:px-8">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
                  <FiPackage size={24} />
                </div>

                <div>
                  <h1 className="text-2xl font-bold text-white sm:text-3xl">
                    {params.id ? "Edit Product" : "Create Product"}
                  </h1>

                  <p className="mt-1 text-sm text-zinc-500">
                    {params.id
                      ? "Update the information of this product."
                      : "Add a new product to your store."}
                  </p>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={onSubmit} className="space-y-6 p-6 sm:p-8">
              {/* Product name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-zinc-300"
                >
                  Product Name
                </label>

                <input
                  type="text"
                  id="name"
                  placeholder="Gaming Mouse"
                  {...register("name", {
                    required: "Product name is required",
                  })}
                  className={`w-full rounded-lg border bg-zinc-950 px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:ring-2 ${
                    errors.name
                      ? "border-red-500 focus:ring-red-500/20"
                      : "border-zinc-800 focus:border-indigo-500 focus:ring-indigo-500/20"
                  }`}
                />

                {errors.name && (
                  <p className="mt-1.5 text-sm text-red-400">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="description"
                  className="mb-2 block text-sm font-medium text-zinc-300"
                >
                  Description
                </label>

                <textarea
                  rows="4"
                  id="description"
                  placeholder="Describe the product..."
                  {...register("description", {
                    required: "Description is required",
                    minLength: {
                      value: 10,
                      message:
                        "Description must be at least 10 characters long",
                    },
                  })}
                  className={`w-full resize-none rounded-lg border bg-zinc-950 px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:ring-2 ${
                    errors.description
                      ? "border-red-500 focus:ring-red-500/20"
                      : "border-zinc-800 focus:border-indigo-500 focus:ring-indigo-500/20"
                  }`}
                />

                {errors.description && (
                  <p className="mt-1.5 text-sm text-red-400">
                    {errors.description.message}
                  </p>
                )}
              </div>

              {/* Price / Stock */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="price"
                    className="mb-2 block text-sm font-medium text-zinc-300"
                  >
                    Price
                  </label>

                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">
                      $
                    </span>

                    <input
                      type="number"
                      id="price"
                      step="0.01"
                      placeholder="49.99"
                      {...register("price", {
                        required: "Price is required",
                        valueAsNumber: true,
                        min: {
                          value: 0.01,
                          message: "Price must be greater than 0",
                        },
                      })}
                      className={`w-full rounded-lg border bg-zinc-950 py-3 pl-9 pr-4 text-white outline-none transition placeholder:text-zinc-600 focus:ring-2 ${
                        errors.price
                          ? "border-red-500 focus:ring-red-500/20"
                          : "border-zinc-800 focus:border-indigo-500 focus:ring-indigo-500/20"
                      }`}
                    />
                  </div>

                  {errors.price && (
                    <p className="mt-1.5 text-sm text-red-400">
                      {errors.price.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="stock"
                    className="mb-2 block text-sm font-medium text-zinc-300"
                  >
                    Stock
                  </label>

                  <input
                    type="number"
                    id="stock"
                    placeholder="15"
                    {...register("stock", {
                      required: "Stock is required",
                      valueAsNumber: true,
                      min: {
                        value: 0,
                        message: "Stock must be greater than or equal to 0",
                      },
                    })}
                    className={`w-full rounded-lg border bg-zinc-950 px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:ring-2 ${
                      errors.stock
                        ? "border-red-500 focus:ring-red-500/20"
                        : "border-zinc-800 focus:border-indigo-500 focus:ring-indigo-500/20"
                    }`}
                  />

                  {errors.stock && (
                    <p className="mt-1.5 text-sm text-red-400">
                      {errors.stock.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Category */}
              <div>
                <label
                  htmlFor="category"
                  className="mb-2 block text-sm font-medium text-zinc-300"
                >
                  Category
                </label>

                <select
                  id="category"
                  {...register("category", {
                    required: "Category is required",
                  })}
                  className={`w-full cursor-pointer rounded-lg border bg-zinc-950 px-4 py-3 text-white outline-none transition focus:ring-2 ${
                    errors.category
                      ? "border-red-500 focus:ring-red-500/20"
                      : "border-zinc-800 focus:border-indigo-500 focus:ring-indigo-500/20"
                  }`}
                >
                  <option value="">Select a category</option>
                  <option value="Gaming">Gaming</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Office">Office</option>
                </select>

                {errors.category && (
                  <p className="mt-1.5 text-sm text-red-400">
                    {errors.category.message}
                  </p>
                )}
              </div>

              {/* Image */}
              <div>
                <label
                  htmlFor="image"
                  className="mb-2 block text-sm font-medium text-zinc-300"
                >
                  Product Image
                </label>

                <label
                  htmlFor="image"
                  className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-zinc-700 bg-zinc-950 px-6 py-8 text-center transition hover:border-indigo-500/50 hover:bg-zinc-900"
                >
                  <FiUpload size={28} className="mb-3 text-zinc-500" />

                  <span className="text-sm font-medium text-zinc-300">
                    Click to upload an image
                  </span>

                  <span className="mt-1 text-xs text-zinc-600">
                    PNG, JPG or WEBP
                  </span>

                  <input
                    type="file"
                    id="image"
                    accept="image/*"
                    {...register("image", {
                      required: !params.id && "Product image is required",
                    })}
                    className="hidden"
                  />
                </label>

                {errors.image && (
                  <p className="mt-1.5 text-sm text-red-400">
                    {errors.image.message}
                  </p>
                )}

                {/* Preview */}
                {(preview || currentImage) && (
                  <div className="mt-5">
                    <div className="mb-3 flex items-center gap-2 text-sm font-medium text-zinc-300">
                      <FiImage />
                      Image Preview
                    </div>

                    <div className="flex justify-center overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 p-4">
                      <img
                        src={preview || currentImage}
                        alt="Product preview"
                        className="h-64 w-full rounded-lg object-contain sm:h-72"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-col-reverse gap-3 border-t border-zinc-800 pt-6 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => navigate("/admin")}
                  className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-zinc-700 px-5 py-3 text-sm font-medium text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
                >
                  <FiArrowLeft />
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <FiCheck />

                  {loading
                    ? params.id
                      ? "Updating..."
                      : "Creating..."
                    : params.id
                      ? "Update Product"
                      : "Create Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductFormPage;
