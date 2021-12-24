import React, { useState } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import authApi from "../../api/authApi";
import "./styles.css";

function ImageCropper(props) {
  const { imageToCrop, onImageCropped } = props;
  const { setBlobImage } = props;

  const [cropConfig, setCropConfig] = useState(
    // default crop config
    {
      unit: "px",
      width: 150,
      maxWidth: 150,
      aspect: 1 / 1,
    }
  );

  const [imageRef, setImageRef] = useState();

  async function cropImage(crop) {
    if (imageRef && crop.width && crop.height) {
      const croppedImage = await getCroppedImage(
        imageRef,
        crop,
        "croppedImage.jpeg" // destination filename
      );
      // calling the props function to expose
      // croppedImage to the parent component
      onImageCropped(croppedImage);
    }
  }

  function getCroppedImage(sourceImage, cropConfig, fileName) {
    // creating the cropped image from the source image
    const canvas = document.createElement("canvas");
    const scaleX = sourceImage.naturalWidth / sourceImage.width;
    const scaleY = sourceImage.naturalHeight / sourceImage.height;
    canvas.width = cropConfig.width;
    canvas.height = cropConfig.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      sourceImage,
      cropConfig.x * scaleX,
      cropConfig.y * scaleY,
      cropConfig.width * scaleX,
      cropConfig.height * scaleY,
      0,
      0,
      cropConfig.width,
      cropConfig.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        // returning an error
        if (!blob) {
          reject(new Error("Canvas is empty"));
          return;
        }
        blob.name = fileName;
        setBlobImage(blob);
        // creating a Object URL representing the Blob object given
        const croppedImageUrl = window.URL.createObjectURL(blob);

        resolve(croppedImageUrl);
      }, "image/jpeg");
    });
  }

  return (
    <ReactCrop
      src={imageToCrop}
      crop={cropConfig}
      ruleOfThirds
      onImageLoaded={(imageRef) => setImageRef(imageRef)}
      onComplete={(cropConfig) => cropImage(cropConfig)}
      onChange={(cropConfig) => setCropConfig(cropConfig)}
      crossorigin="anonymous" // to avoid CORS-related problems
    />
  );
}

ImageCropper.defaultProps = {
  onImageCropped: () => {},
};

export default function ImageCropperForm() {
  const [imageToCrop, setImageToCrop] = useState(undefined);
  const [croppedImage, setCroppedImage] = useState(undefined);

  const onUploadFile = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();

      reader.addEventListener("load", () => {
        const image = reader.result;

        setImageToCrop(image);
      });

      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const [edit, setEdit] = useState(false);
  const [message, setMessage] = useState("");
  const [blob, setBlobImage] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      async function createFile() {
        var file = new File([blob], blob?.name, { type: blob?.type });
        if (file.size < 20000) {
          const response = await authApi.updateAvatar({ avatar: [file] });
          setEdit(false);
          if (response.success) {
            setMessage("Cập nhật ảnh đại diện thành công.");
          } else {
            setMessage("Cập nhật ảnh đại diện thất bại.");
          }
        } else {
          setEdit(false);
          setMessage("Kích thước ảnh tối đa là 20 KB.");
        }
      }
      createFile();
    } catch (error) {
      setEdit(false);
      setMessage("Cập nhật ảnh đại diện thất bại.");
    }
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="">
          <div className="d-flex align-items-center justify-content-between mb-2">
            <div className="">Ảnh đại diện</div>
            <button
              type="button"
              className="btn btn-link shadow-none text-decoration-none "
              onClick={() => {
                setEdit(!edit);
                setMessage("");
              }}
            >
              {edit ? "Hủy" : "Cập nhật"}
            </button>
          </div>
          <div className={` ${edit ? "" : "hidden"}`}>
            <div className="mb-2">
              <div className="app">
                <input
                  type="file"
                  accept="image/*"
                  onChange={onUploadFile}
                  className="form-control mb-2"
                />
                <div>
                  <ImageCropper
                    imageToCrop={imageToCrop}
                    onImageCropped={(croppedImage) =>
                      setCroppedImage(croppedImage)
                    }
                    setBlobImage={setBlobImage}
                  />
                </div>
                {croppedImage && (
                  <div className="preview">
                    <img
                      className="border border-1"
                      alt="Cropped Img"
                      src={croppedImage}
                    />
                  </div>
                )}
              </div>
            </div>
            <button type="submit" className="btn btn-primary ms-auto">
              Lưu
            </button>
          </div>
          <div className="mb-3">{message}</div>
          <hr />
        </div>
      </form>
    </div>
  );
}
