import { useState, useEffect, useRef } from 'react'
import { Box } from '@mui/system'
import { Button } from '@mui/material'

export default function PhotoUpload({ photo, setPhoto }) {
  const cloudinaryRef = useRef()
  const widgetRef = useRef()

  const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME
  const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET

  console.log('Cloud Name:', cloudName)
  console.log('Upload Preset:', uploadPreset)

  const [image, setImage] = useState(photo)

  useEffect(() => {
    let isMounted = true;
  
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName,
        uploadPreset,
      },
      function (error, result) {
        if (isMounted) {
          if (!error) {
            if (result && result.info.secure_url) {
              setImage(result.info.secure_url);
              setPhoto((prevPhoto) =>
                prevPhoto === result.info.secure_url ? prevPhoto : result.info.secure_url
              );
              widgetRef.current.close();
            }
          } else {
            console.error('Error uploading image:', error);
          }
        }
      }
    );
  
    return () => {
      isMounted = false;
    };
  }, [setPhoto]);

  const ImageStyle = {
    height: '300px',
    objectFit: 'cover',
  }

  if (image) {
    return (
      <Box
        sx={{
          width: 300,
          height: 350,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          marginTop: 2,
          position: 'relative',
        }}
      >
        <Button
          sx={{
            color: '#42e268',
            border: '1px solid #42e268',
            backgroundColor: '#303030',
            position: 'absolute',
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
            color: '#42e268',
            border: '1px solid #42e268',
            backgroundColor: '#303030',
          }}
          onClick={() => widgetRef.current.open()}
        >
          Cambiar imagen
        </Button>
      </Box>
    )
  }

  return (
    <Button
      sx={{
        color: '#42e268',
        border: '1px solid #42e268',
        width: 300,
        height: 350,
        marginTop: 3,
        backgroundColor: '#303030',
      }}
      onClick={() => widgetRef.current.open()}
    >
      Subir imagen
    </Button>
  )
}
