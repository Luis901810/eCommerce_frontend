import { Menu, Box } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { useSelector, useDispatch } from 'react-redux';
import { filter } from '../../redux/actions';
import { useNavigate } from 'react-router';
import {Typography} from '@mui/material';
import CardTravelIcon from '@mui/icons-material/CardTravel';

export default function Pages() {
  const genders = useSelector((state) => state.genders);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let storedFilters = localStorage.getItem('filters');
  let filters = {};

  try {
    if (storedFilters) {
      const parsedFilters = JSON.parse(storedFilters);
      if (parsedFilters && Array.isArray(parsedFilters.genders)) {
        filters = parsedFilters;
      }
    }
  } catch (error) {
    console.error('Error parsing filters from local storage:', error);
  }

  const handleClick = () => {
    // const genderId = gender.id;

    // localStorage.setItem(
    //   'filters',
    //   JSON.stringify({ ...filters, genders: [...(filters.genders || []), genderId.toString()] })
    // );
    // dispatch(filter({ gender: genderId }));
    dispatch(filter())
    navigate('/Catalogue')
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
      <MenuItem onClick={() => handleClick()} >
      <CardTravelIcon sx={{ color: '#42e268' }}></CardTravelIcon>
      <Typography variant='h5' color={'white'} >Catalogo</Typography>
      </MenuItem>
      {/* {genders.map((page, i) => (
        <Box key={i}>
          <MenuItem onClick={() => handleClick(page)}>
            {page.gender}
          </MenuItem>
        </Box>
      ))} */}
    </Box>
  );
}
