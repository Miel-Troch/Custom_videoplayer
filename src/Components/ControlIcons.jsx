import Grid from "@mui/material/Grid";
import PropTypes from "prop-types";
import IconButton from "@mui/material/IconButton";
import Slider from '@mui/material/Slider';
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import { styled, useTheme } from "@mui/material/styles";

import "./ControlIcons.css";

const ControlIcons = ({
  handlePlay,
  handlePause,
  played,
  onSeek,
  onSeekMouseUp,
}) => {
  const theme = useTheme();

  const PrettoSlider  = styled(Slider)({
    color: "#00b4d8",
    borderRadius: 100,
    opacity: 1,
    "& .MuiSlider-thumb": {
      width: 25,
      height: 25,
      backgroundColor: "#0077b6",
      border: "4px solid white",
      boxShadow: " -4px 0px 15px 5px rgb(0,0,0,0.4)",

      transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
      "&:before": { boxShadow: "0 4px 12px 0 rgba(0,0,0,0.4)" },
      "&:hover, &.Mui-focusVisible": {
        boxShadow: `0px 0px 0px 8px ${
          theme.palette.mode === "light"
            ? "rgb(255 255 255 / 16%)"
            : "rgb(0 0 0 / 16%)"
        }`,
      },
      "&.Mui-active": { width: 30, height: 30 },
    },
    "& .MuiSlider-track": {
      backgroundColor: "#0077b6",
      padding: 6,
      paddingLeft: 0,
      paddingRight: 0,
      border: "5px solid white",
      marginLeft: "-5px", // Adjust this value as needed
    },
    "& .MuiSlider-rail": {
      backgroundColor: "rgba(222, 226, 230,0.9)",
      opacity: 1,
      padding: 6,
      paddingLeft: 0,
      paddingRight: 0,
      border: "6px solid white",
      marginLeft: "-10px", // Adjust this value as needed
    },
    "& .MuiSlider-mark": {
      width: 10,
      height: 10,
      backgroundColor: "#0077b6",
      borderRadius: 100,
      border: "4px solid white",
      boxShadow: " -4px 0px 15px 5px rgb(0,0,0,0.4)",
      transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
      "&:before": { boxShadow: "0 4px 12px 0 rgba(0,0,0,0.4)" },
      "&:hover, &.Mui-focusVisible": {
        boxShadow: `0px 0px 0px 8px ${
          theme.palette.mode === "light"
            ? "rgb(255 255 255 / 16%)"
            : "rgb(0 0 0 / 16%)"
        }`,
      },
    },
    "& .MuiSlider-markLabel": {
    color: "white",
    },
  });
  function formatDuration( value) {
    const minute = Math.floor(value / 60);
    const secondLeft = Math.floor(value - minute * 60);
    return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
  }

  function parseDuration(durationString) {
    const [minute, second] = durationString.split(":");
    const totalSeconds = parseInt(minute) * 60 + parseInt(second);
    return totalSeconds;
  }
  const marks = [
    {
      value: parseDuration("1:00"),
    },
    {
      value: parseDuration("0:30"),
    },
    {
      value: parseDuration("0:45"),
    },
    {
      value: parseDuration("0:20"),
    },
  ];
  return (
    <div className="controls__div">
      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="start"
        style={{ padding: 0 }}
      >
        <Grid
          item
          container
          direction="row"
          alignItems="center"
          justifyContent="space-evenly"
          xs={2}
          sm={2}
          style={{ padding: 0 }}
        >
          <Grid item>
            <IconButton
              className="controls__icons"
              aria-label="play"
              onClick={handlePlay}
            >
              <PlayArrowRoundedIcon
                fontSize="large"
                style={{ color: "white" }}
              />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton
              className="controls__icons"
              aria-label="pause"
              onClick={handlePause}
            >
              <PauseRoundedIcon fontSize="large" style={{ color: "white" }} />
            </IconButton>
          </Grid>
        </Grid>
        <Grid
          item
          xs={8}
          sm={9}
          container
          direction="row"
          justifyContent="start"
          alignItems="flexStart"
        >
          <PrettoSlider 
            valueLabelDisplay="auto"
            marks={marks}
            min={0}
            max={100}
            value={isNaN(played) ? 0 : played}
            onChange={onSeek}
            onChangeCommitted={onSeekMouseUp}
            valueLabelFormat={formatDuration(played)}
          />
        </Grid>
       
      </Grid>
   
    </div>
  );
};
ControlIcons.propTypes = {
  handlePlay: PropTypes.func.isRequired,
  handlePause: PropTypes.func.isRequired,
  played: PropTypes.number.isRequired,
  onSeek: PropTypes.func.isRequired,
  onSeekMouseUp: PropTypes.func.isRequired,
};
export default ControlIcons;
