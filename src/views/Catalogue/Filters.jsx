import { Box } from "@mui/system";
import { Menu, MenuItem } from "@mui/material";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import {
  List,
  ListSubheader,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useEffect, useState } from "react";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import ListItemIcon from "@mui/material/ListItemIcon";
import StarBorder from "@mui/icons-material/StarBorder";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useDispatch, useSelector } from "react-redux";
import { getAtributes } from "../../redux/actions";

export default function Filters() {
  const [filters, setFilters] = useLocalStorage("filters", {});

  const dispatch = useDispatch()

  const brands = useSelector((state) => state.brands);
  const categories = useSelector((state) => state.categories);
  const colors = useSelector((state) => state.colors);
  const genders = useSelector((state) => state.genders);
  const materials = useSelector((state) => state.materials);
  const sizes = useSelector((state) => state.sizes);

  const [open, setOpen] = useState({
    brands: false,
    categories: false,
    colors: false,
    genders: false,
    materials: false,
    sizes: false,
    range: false,
    reviews: false,
  });

  const handleClick = (name) => {
    console.log("boolean: ", open[name]);
    setOpen((prevData) => ({ ...prevData, [name]: !prevData[name] }));
  };

  useEffect(() => {
    dispatch(getAtributes())
  }, [])

  return (
    <List
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "300px",
        backgroundColor: "#414141",
      }}
      component="nav"
      subheader={
        <ListSubheader sx={{ backgroundColor: "#303030", color: "white" }}>
          Filtrar por:
        </ListSubheader>
      }
    >
      <ListItemButton onClick={() => handleClick("brands")}>
        <ListItemText primary="Marcas" />
        {open.brands ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open.brands} timeout="auto" unmountOnExit>
        <FormGroup>
          {/* {brands.map((brand, i) => 
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label={brand}
            />
          )} */}
        </FormGroup>
      </Collapse>
      <ListItemButton onClick={() => handleClick("categories")}>
        <ListItemText primary="Categorías" />
        {open.categories ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open.categories} timeout="auto" unmountOnExit>
        <List component="div" disablePadding></List>
      </Collapse>
      <ListItemButton onClick={() => handleClick("sizes")}>
        <ListItemText primary="Tallas" />
        {open.sizes ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open.sizes} timeout="auto" unmountOnExit>
        <List component="div" disablePadding></List>
      </Collapse>
      <ListItemButton onClick={() => handleClick("range")}>
        <ListItemText primary="Rango de precio" />
        {open.range ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open.range} timeout="auto" unmountOnExit>
        <List component="div" disablePadding></List>
      </Collapse>
      <ListItemButton onClick={() => handleClick("genders")}>
        <ListItemText primary="Géneros" />
        {open.genders ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open.genders} timeout="auto" unmountOnExit>
        <List component="div" disablePadding></List>
      </Collapse>
    </List>
  );
}
