import { useState, useEffect, useRef } from "react";
import { Box } from "@mui/system";
import { Button } from "@mui/material";

export default function PhotoUpload({ photo, setPhoto }) {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  const cloudName = process.env.REACT_APP_CLOUD_NAME;
  const uploadPreset = process.env.REACT_APP_UPLOAD_PRESET;

  console.log("Cloud Name:", process.env.REACT_APP_CLOUD_NAME);
  console.log("Upload Preset:", process.env.REACT_APP_UPLOAD_PRESET);

  const [image, setImage] = useState(null);

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: cloudName,
        uploadPreset: uploadPreset,
      },
      function (error, result) {
        if (result && result.info.secure_url) {
          setImage(result.info.secure_url);
          setPhoto(result.info.secure_url);
          widgetRef.current.close()
        }
      }
    );
  }, []);

  const ImageStyle = {
    height: "300px",
    objectFit: "cover",
  };

  if (image) {
    return (
      <Box
        sx={{
          width: 300,
          height: 350,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          marginTop: 2,
          position: "relative",
        }}
      >
        <Button
          sx={{
            color: "#42e268",
            border: "1px solid #42e268",
            backgroundColor: "#414141",
            position: "absolute",
            top: 2,
            right: 2,
          }}
          onClick={() => setImage(null)}
        >
          X
        </Button>
        <img style={ImageStyle} src={image}></img>
        <Button
          sx={{
            color: "#42e268",
            border: "1px solid #42e268",
            backgroundColor: "#414141",
          }}
          onClick={() => widgetRef.current.open()}
        >
          Cambiar imagen
        </Button>
      </Box>
    );
  }

  return (
    <Button
      sx={{
        color: "#42e268",
        border: "1px solid #42e268",
        width: 300,
        height: 350,
        marginTop: 3,
        backgroundColor: "#414141",
      }}
      onClick={() => widgetRef.current.open()}
    >
      Subir imagen
    </Button>
  );
}
