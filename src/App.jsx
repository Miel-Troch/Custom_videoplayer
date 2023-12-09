import { useState, useRef } from 'react'
import ReactPlayer from 'react-player/youtube'
import Container from '@mui/material/Container'
import ControlIcons from './Components/ControlIcons'
import './App.css'
import Grid from '@mui/material/Grid'
import IngredientProgressBar from './Components/IngredientProgressBar'
import UtensilProgressBar from './Components/UtensilProgressBar'

function App() {
  const [playerState, setPlayerState] = useState({
    playing: false,
    muted: true,
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

  return (
    <>
      <Container className='main__container'>
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
      </Container>
    </>
  )
}

export default App
