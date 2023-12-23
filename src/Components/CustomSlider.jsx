import Grid from '@mui/material/Grid'
import PropTypes from 'prop-types'
import Slider from '@mui/material/Slider'
import { styled, useTheme } from '@mui/material/styles'

import './ControlIcons.css'

const CustomSlider = ({ isIngredient, played, onSeek, onSeekMouseUp, marks }) => {
  const theme = useTheme()

  const PrettoSlider = styled(Slider)({
    color: '#00b4d8',
    borderRadius: 100,
    opacity: 1,
    '& .MuiSlider-thumb': {
      display: 'none',
    },
    '& .MuiSlider-track': {
      backgroundColor: 'rgba(222, 226, 230,0.9)',
      padding: 6,
      paddingLeft: 0,
      paddingRight: 0,
      border: '0',
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
      width: 40,
      height: 40,
      borderRadius: 100,
      border:  isIngredient ? '4px solid #0077b6' : '4px solid #00b649',
      boxShadow: ' -4px 0px 15px 5px rgb(0,0,0,0.4)',
      transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
      '&:before': { boxShadow: '0 4px 12px 0 rgba(0,0,0,0.4)' },
      '&:hover, &.Mui-focusVisible': {
        boxShadow: `0px 0px 0px 8px ${theme.palette.mode === 'light' ? 'rgb(255 255 255 / 16%)' : 'rgb(0 0 0 / 16%)'}`,
      },
    },
    '& .MuiSlider-mark[data-index="0"]': {
      backgroundImage: isIngredient ? 'url(/src/assets/pastaS.jpg)' : 'url(/src/assets/lepelS.jpg)',
    },
    '& .MuiSlider-mark[data-index="1"]': {
      backgroundImage: isIngredient ? 'url(/src/assets/uiS.jpg)' : null,
    },
    '& .MuiSlider-mark[data-index="2"]': {
      backgroundImage: isIngredient ? 'url(/src/assets/paprikaS.jpg)' : null,
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
          style={{}}
        />
      </Grid>
    </>
  )
}
CustomSlider.propTypes = {
  isIngredient: PropTypes.bool,
  played: PropTypes.number.isRequired,
  onSeek: PropTypes.func.isRequired,
  onSeekMouseUp: PropTypes.func.isRequired,
  marks: PropTypes.array.isRequired,
}
export default CustomSlider
