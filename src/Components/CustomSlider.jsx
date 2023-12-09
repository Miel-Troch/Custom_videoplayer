/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import Grid from '@mui/material/Grid'
import PropTypes from 'prop-types'
import Slider from '@mui/material/Slider'
import { styled, useTheme } from '@mui/material/styles'

import './ControlIcons.css'

const CustomSlider = ({ played, onSeek, onSeekMouseUp, marks }) => {
  const theme = useTheme()
  
  const PrettoSlider = styled(Slider)({
    color: '#00b4d8',
    borderRadius: 100,
    opacity: 1,
    '& .MuiSlider-thumb': {
      display: 'none',
    },
    '& .MuiSlider-track': {
      backgroundColor: '#0077b6',
      padding: 6,
      paddingLeft: 0,
      paddingRight: 0,
      border: '5px solid white',
      marginLeft: '-5px', // Adjust this value as needed
    },
    '& .MuiSlider-rail': {
      backgroundColor: 'rgba(222, 226, 230,0.9)',
      opacity: 1,
      padding: 6,
      paddingLeft: 0,
      paddingRight: 0,
      border: '6px solid white',
      marginLeft: '-10px', // Adjust this value as needed
    },
    '& .MuiSlider-mark': {
      width: 10,
      height: 10,
      backgroundColor: '#0077b6',
      borderRadius: 100,
      border: '4px solid white',
      boxShadow: ' -4px 0px 15px 5px rgb(0,0,0,0.4)',

      transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
      '&:before': { boxShadow: '0 4px 12px 0 rgba(0,0,0,0.4)' },
      '&:hover, &.Mui-focusVisible': {
        boxShadow: `0px 0px 0px 8px ${theme.palette.mode === 'light' ? 'rgb(255 255 255 / 16%)' : 'rgb(0 0 0 / 16%)'}`,
      },
    },
    '& .MuiSlider-markLabel': {
      color: 'white',
    },
  })

  function formatDuration(value) {
    const minute = Math.floor(value / 60)
    const secondLeft = Math.floor(value - minute * 60)
    return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`
  }

  return (
    <>
      <Grid item xs={8} sm={9} container direction='row' justifyContent='center' alignItems='center'>
        <PrettoSlider
          valueLabelDisplay='auto'
          marks={marks}
          min={0}
          max={100}
          value={isNaN(played) ? 0 : played}
          onChange={onSeek}
          onChangeCommitted={onSeekMouseUp}
          valueLabelFormat={formatDuration(played)}
        />
      </Grid>
    </>
  )
}
CustomSlider.propTypes = {
  played: PropTypes.number.isRequired,
  onSeek: PropTypes.func.isRequired,
  onSeekMouseUp: PropTypes.func.isRequired,
  marks: PropTypes.array.isRequired,
}
export default CustomSlider
