import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import InputBase from "@mui/material/InputBase";
import { Box } from "@mui/system";

export default function Search() {
  return (
    <Box
      sx={{
        height: "35px",
        border: "2px solid #42e268",
        borderRadius: 2,
        paddingLeft: 2,
        paddingRight: 2,
      }}
    >
      <InputBase placeholder="Buscar producto" sx={{color: 'white'}} >
      </InputBase>
      <SearchOutlinedIcon/>
    </Box>
  );
}
