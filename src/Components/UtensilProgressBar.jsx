import PropTypes from 'prop-types'
import { Typography } from '@mui/material'
import Grid from '@mui/material/Grid'
import CustomSlider from './CustomSlider'

const UtensilProgressBar = ({ played, onSeek, onSeekMouseUp }) => {
  function parseDuration(durationString) {
    const [minute, second] = durationString.split(':')
    const totalSeconds = parseInt(minute) * 60 + parseInt(second)
    return totalSeconds
  }

  return (
    <Grid container direction='row' alignItems='center' className='duration__container'>
      <Grid item container justifyContent='space-evenly' xs={2} sm={2} style={{ padding: 0 }}>
        <Grid item>
          <Typography color={'#00b649'}>Utensils</Typography>
        </Grid>
      </Grid>
      <CustomSlider
        className='duration__bar'
        isIngredient={false}
        played={played}
        onSeek={onSeek}
        onSeekMouseUp={onSeekMouseUp}
        marks={[{ id: 4, value: parseDuration('1:00')-2.5 }]}
      />
    </Grid>
  )
}
UtensilProgressBar.propTypes = {
  played: PropTypes.number.isRequired,
  onSeek: PropTypes.func.isRequired,
  onSeekMouseUp: PropTypes.func.isRequired,
}
export default UtensilProgressBar
