import axios from "axios";

interface CloudinaryResponse {
  secure_url: string;
  public_id: string;
  asset_id: string;
  width: number;
  height: number;
  format: string;
}

const uploadImage = async (
  file: File,
): Promise<CloudinaryResponse | undefined> => {
  const formData = new FormData();

  formData.append("file", file);
  formData.append(
    "upload_preset",
    import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
  );

  try {
    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
      formData,
    );
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data);
    }
  }
};

export default uploadImage;
