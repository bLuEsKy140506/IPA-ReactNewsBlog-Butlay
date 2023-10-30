import { useState, useRef } from "react";
import LoadingSpinner from "./LoadingSpinner";
import { uploadImage } from "../plugins/uploadImage";
import { FaRegWindowClose } from "react-icons/fa";

export const PostImage = ({ addImageSuccessful }) => {
  // This code sends an API to a 3rd party library that uploads and serves the image
  // Added a spinner for user-experience and this component returns an image {fileURL}
  // Do not touch any of the code

  const imageInput = useRef();
  const [image, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleImageUpload = async (e) => {
    try {
      const { fileUrl } = await uploadImage.uploadFile(e.target.files[0], {
        onProgress,
      });
      imageInput.current.value = "";
      setImage(fileUrl);
      addImageSuccessful(fileUrl);
    } catch (e) {
      console.warn(`Error: ${e}`);
      alert(`${e}`);
      setImage(
        "https://st3.depositphotos.com/23594922/31822/v/450/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg"
      );
      addImageSuccessful(
        "https://st3.depositphotos.com/23594922/31822/v/450/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg"
      );
    }
    setIsLoading(false);
  };
  const onProgress = ({ progress }) => {
    setIsLoading(true);
    console.log(`File uploading: ${progress}% complete.`);
  };

  return (
    <div>
      {image !== "" && (
        <FaRegWindowClose
          size={30}
          className="item-cross"
          onClick={() => {
            setImage("");
            addImageSuccessful("");
          }}
        />
      )}

      <div
        className="image-uploader"
        style={{
          zIndex: 0,
          backgroundImage: image === "" ? "#f8f9fc" : `url(${image})`,
          backgroundSize: "cover",
        }}
      >
        {isLoading ? <LoadingSpinner /> : ""}
        <label
          className="image-button"
          style={{
            display: image ? "none" : "block",
          }}
        >
          <input
            type="file"
            name="image_upload"
            onChange={handleImageUpload}
            ref={imageInput}
          />
          + Upload Image
        </label>
      </div>
    </div>
  );
};
