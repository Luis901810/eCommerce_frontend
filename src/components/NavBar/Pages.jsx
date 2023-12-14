import { Menu, Box, Typography } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useSelector, useDispatch } from "react-redux";
import { filter } from "../../redux/actions";
export default function Pages() {
  const pages = ["Mujeres", "Hombres", "Niños", "Nuevo"];
  const genders = [
    'Todos',
    'Botines',
    'Zapatos',
    'Sandalias',
    'Pantuflas',
    'Zapatillas',
    'Especiales',
    'Nuevo',
    'Oferta',
    'Mas Gustado'
  ]

  const [anchorEl, setAnchorEl] = useState(null);
  const [filters, setFilters] = useLocalStorage("filters",{})
  const [selectedPage, setSelectedPage] = useState("")

  const dispatch = useDispatch();

  const handleMenuOpen = (event, page) => {
    setAnchorEl(event.currentTarget);
    setSelectedPage(page)
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const selectFilers = (gender) => {
    console.log(selectedPage, gender)
    setFilters({gender:selectedPage,category:gender})
    dispatch(filter({gender:selectedPage,category:gender}))
    console.log(filters)
  }
  return (
    <Box sx={{display: 'flex', flexDirection: 'row'}} >
      {pages.map((page, i) => (
        <Box key={i} >
          <MenuItem onClick={(event)=>handleMenuOpen(event,page)}>
            {page}
          </MenuItem>
          <Menu
            id={`menuPage-${i}`}
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >{genders.map((gender, j)=><MenuItem key={j} onClick={()=>selectFilers(gender)}>{gender}</MenuItem>)}
          </Menu>
        </Box>
      ))}
    </Box>
  );
}
