import { Typography } from '@mui/material'
import PropTypes from 'prop-types'
import Grid from '@mui/material/Grid'
import CustomSlider from './CustomSlider'

const IngredientProgressBar = ({ played, onSeek, onSeekMouseUp }) => {
  function parseDuration(durationString) {
    const [minute, second] = durationString.split(':')
    const totalSeconds = parseInt(minute) * 60 + parseInt(second)
    return totalSeconds
  }

  return (
    <Grid container direction='row' alignItems='center' className='duration__container'>
      <Grid item container justifyContent='space-evenly' xs={2} sm={2} style={{ padding: 0 }}>
        <Grid item>
          <Typography color={'#0077b6'}>Ingredient</Typography>
        </Grid>
      </Grid>
      <CustomSlider
        className='duration__bar'
        isIngredient
        played={played}
        onSeek={onSeek}
        onSeekMouseUp={onSeekMouseUp}
        marks={[
          { id: 1, value: parseDuration('0:20')-2.5 },
          { id: 2, value: parseDuration('0:30')-2.5 },
          { id: 3, value: parseDuration('0:45')-2.5 },
        ]}
      />
    </Grid>
  )
}
IngredientProgressBar.propTypes = {
  played: PropTypes.number.isRequired,
  onSeek: PropTypes.func.isRequired,
  onSeekMouseUp: PropTypes.func.isRequired,
  marks: PropTypes.array.isRequired,
}
export default IngredientProgressBar
