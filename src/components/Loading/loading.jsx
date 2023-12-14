import { Box } from "@mui/material/";

export default function Loading({ loading }) {
  const image =
    "https://firebasestorage.googleapis.com/v0/b/gymspace-d93d8.appspot.com/o/loading.gif?alt=media&token=9b285b61-c22f-4f7f-a3ca-154db8d99d73";

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 6,
      }}
    >
      {loading ? (
        <>
          <img src={image} />
        </>
      ) : null}
    </Box>
  );
}
