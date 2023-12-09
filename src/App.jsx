import { useState, useRef } from 'react'
import ReactPlayer from 'react-player/youtube'
import ControlIcons from './Components/ControlIcons'
import './App.css'
import IngredientProgressBar from './Components/IngredientProgressBar'
import UtensilProgressBar from './Components/UtensilProgressBar'
import { Box, IconButton, Grid, Card, Typography, Button, Icon } from '@mui/material'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'

function App() {
  const [playerState, setPlayerState] = useState({
    playing: false,
    muted: false,
    volume: 0.5,
    playbackRate: 1.0,
    played: 0,
    seeking: false,
  })
  const playerRef = useRef(null)

  const handlePlay = () => setPlayerState({ ...playerState, playing: true })
  const handlePause = () => setPlayerState({ ...playerState, playing: false })
  const handlePlayerSeek = (e, newValue) => {
    setPlayerState({
      ...playerState,
      seeking: true,
      played: parseFloat(newValue / 100),
    })
    playerRef.current.seekTo(parseFloat(newValue / 100))
  }

  const handlePlayerMouseSeekUp = (e, newValue) => {
    setPlayerState({ ...playerState, seeking: true })
    playerRef.current.seekTo(parseFloat(newValue / 100), 'fraction')
  }

  const handlePlayerProgress = (state) => {
    if (!playerState.seeking) {
      setPlayerState({ ...playerState, ...state })
    }
  }

  const items = [
    { value: 20, name: 'pasta', imgUrl: 'src\\assets\\pastaM.jpg' },
    { value: 30, name: 'ui', imgUrl: 'src\\assets\\uiM.jpg' },
    { value: 45, name: 'paprika', imgUrl: 'src\\assets\\paprikaM.jpg' },
    { value: 60, name: 'lepel', imgUrl: 'src\\assets\\lepelM.jpg' },
  ]

  return (
    <Grid className='main__container'>
      <Grid
        item
        className='player__container'
        xs={12}
        sm={10}
        direction='row'
        justifyContent='start'
        alignItems='center'
      >
        <div className='playerDiv'>
          <ReactPlayer
            className='rounded-player'
            controls={false}
            ref={playerRef}
            url='https://www.youtube.com/watch?v=HfP7jS5HN34'
            playing={playerState.playing}
            volume={playerState.volume}
            playbackRate={playerState.playbackRate}
            onProgress={handlePlayerProgress}
            muted={playerState.muted}
            config={{
              youtube: { playerVars: { modestbranding: 1, controls: 0 } },
            }}
          />
          <ControlIcons
            handlePlay={handlePlay}
            handlePause={handlePause}
            played={playerState.played * 100}
            onSeek={handlePlayerSeek}
            onSeekMouseUp={handlePlayerMouseSeekUp}
          />
        </div>
        <Grid container direction='row' justifyContent='center' alignItems='center'>
          <IngredientProgressBar
            played={playerState.played * 100}
            onSeek={handlePlayerSeek}
            onSeekMouseUp={handlePlayerMouseSeekUp}
          />
        </Grid>
        <Grid container direction='row' justifyContent='center' alignItems='center'>
          <UtensilProgressBar
            played={playerState.played * 100}
            onSeek={handlePlayerSeek}
            onSeekMouseUp={handlePlayerMouseSeekUp}
          />
        </Grid>
      </Grid>
      <Grid item className='product__container'>
        <Grid container className='cart__buttons__container' justifyContent='center' alignItems='center'>
          <Card sx={{ borderRadius: '30px', m: 3 }}>
            <IconButton aria-label='list' size='large'>
              <FormatListBulletedIcon fontSize='large' />
            </IconButton>
          </Card>
          <Card sx={{ borderRadius: '30px', m: 3 }}>
            <IconButton aria-label='list' size='large'>
              <ShoppingCartIcon fontSize='large' />
            </IconButton>
          </Card>
        </Grid>
        <Grid
          container
          className='product__detail__container'
          direction='collumn'
          justifyContent='center'
          alignItems='center'
        >
          <Box
            component='img'
            alt={
              playerState.played > 0.6
                ? items[3].name
                : playerState.played > 0.45
                ? items[2].name
                : playerState.played > 0.3
                ? items[1].name
                : playerState.played > 0.2
                ? items[0].name
                : ''
            }
            src={
              playerState.played > 0.6
                ? items[3].imgUrl
                : playerState.played > 0.45
                ? items[2].imgUrl
                : playerState.played > 0.3
                ? items[1].imgUrl
                : playerState.played > 0.2
                ? items[0].imgUrl
                : ''
            }
          />
          <Typography variant='h4' color='black'>
            {playerState.played > 0.6
              ? items[3].name
              : playerState.played > 0.45
              ? items[2].name
              : playerState.played > 0.3
              ? items[1].name
              : playerState.played > 0.2
              ? items[0].name
              : ''}
          </Typography>
        </Grid>
        <Grid container className='add__cart__buttons__container' justifyContent='center' alignItems='center'>
          <Button
            variant='contained'
            sx={{ borderRadius: '30px', p: 1, backgroundColor: 'orange', ':hover': { backgroundColor: 'orange' } }}
          >
            <FormatListBulletedIcon fontSize='large' sx={{ mr: 2 }} />
            <Typography>add to shopping cart</Typography>
          </Button>
          <Button
            variant='contained'
            sx={{ borderRadius: '30px', p: 1, backgroundColor: '#0077b6', ':hover': { backgroundColor: '#0077b6' } }}
          >
            <ShoppingCartIcon fontSize='large' sx={{ mr: 2 }} />
            <Typography>add to shopping cart</Typography>
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default App
