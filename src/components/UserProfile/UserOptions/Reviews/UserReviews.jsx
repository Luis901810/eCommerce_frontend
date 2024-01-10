import { Box } from '@mui/system'
import { Button, Typography, Rating } from '@mui/material'
import UserOptions from '../UserOptions'
import { useEffect, useState } from 'react'

export default function UserReviews() {



  return (
    <Box
      sx={{
        mt: 10,
        display: 'flex',
        justifyContent: 'Center',
        padding: 10,
        alignItems: 'center',
      }}
    >
      <UserOptions />
      <Box
        sx={{
          backgroundColor: '#303030',
          padding: 10,
          border: '1px solid #42e268',
          borderRadius: 5,
        }}
      >
        <Rating max={10}></Rating>
      </Box>
    </Box>
  )
}
