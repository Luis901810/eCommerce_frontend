import { Menu, Box } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import { useState } from 'react'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { useSelector, useDispatch } from 'react-redux'
import { filter } from '../../redux/actions'
export default function Pages () {
  const genders = useSelector((state) => state.genders)
  const categories = useSelector((state) => state.categories)

  const [anchorEl, setAnchorEl] = useState(null)
  const [filters, setFilters] = useLocalStorage('filters', {})
  const [selectedPage, setSelectedPage] = useState('')

  const dispatch = useDispatch()

  const handleMenuOpen = (event, page) => {
    setAnchorEl(event.currentTarget)
    console.log(page.id)
    setSelectedPage(page.id)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const selectFilers = (category) => {
    console.log(selectedPage, category)
    setFilters({ gender: selectedPage, category: category.category })
    dispatch(filter({ gender: selectedPage, category: category.category }))
    console.log(filters)
  }
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row' }} >
      {genders.map((page, i) => (
        <Box key={i} >
          <MenuItem onClick={(event) => handleMenuOpen(event, page)}>
            {page.gender}
          </MenuItem>
          <Menu
            id={`menuPage-${i}`}
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >{categories.map((category, j) => <MenuItem key={j} onClick={() => selectFilers(category)}>{category.category}</MenuItem>)}
          </Menu>
        </Box>
      ))}
    </Box>
  )
}
