import { Menu, Box, Typography } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";

export default function Pages() {
  const pages = ["Mujeres", "Hombres", "Niños", "Nuevo"];

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{display: 'flex', flexDirection: 'row'}} >
      {pages.map((page, i) => (
        <Box key={i} >
          <MenuItem onClick={handleMenuOpen}>
            {page}
          </MenuItem>
          <Menu
            id={`menuPage-${i}`}
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem>Todos</MenuItem>
            <MenuItem>Botines</MenuItem>
            <MenuItem>Zapatos</MenuItem>
            <MenuItem>Sandalias</MenuItem>
            <MenuItem>Pantuflas</MenuItem>
            <MenuItem>Zapatillas</MenuItem>
            <MenuItem>Especiales</MenuItem>
            <MenuItem>Nuevo</MenuItem>
            <MenuItem>Oferta</MenuItem>
            <MenuItem>Mas Gustado</MenuItem>
          </Menu>
        </Box>
      ))}
    </Box>
  );
}
