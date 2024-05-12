/* eslint-disable no-unused-vars */
import { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';
import AudioPlayer from '../audio/Audioplayer';
import tracks from '../../data/tracks'; // Import tracks data
import {
  IoPlayBackSharp,
  IoPlayForwardSharp,
  IoPlaySkipBackSharp,
  IoPlaySkipForwardSharp,
  IoPlaySharp,
  IoPauseSharp,
} from 'react-icons/io5';
import './Control.css';

const VideoPlayer = ({ trackIndex, setTrackIndex }) => {
  const playerRef = useRef();
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [muted, setMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (playerRef.current) {
      setDuration(playerRef.current.getDuration());
    }
  }, [playerRef.current]);

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  const handleStop = () => {
    setPlaying(false);
    playerRef.current.seekTo(0);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setMuted(newVolume === 0);
  };

  const handlePlaybackRateChange = (e) => {
    const newPlaybackRate = parseFloat(e.target.value);
    setPlaybackRate(newPlaybackRate);
  };

  const handleProgress = (state) => {
    setCurrentTime(state.playedSeconds);
  };

  const handleSeekForward = () => {
    playerRef.current.seekTo(currentTime + 10);
  };

  const handleSeekBackward = () => {
    playerRef.current.seekTo(currentTime - 10);
  };

  const handleNextTrack = () => {
    if (trackIndex + 1 < tracks.length) {
      setTrackIndex(trackIndex + 1);
    } else {
      setTrackIndex(0);
    }
  };

  const currentTrack = tracks[trackIndex];
  const isVideo = currentTrack.src.includes('youtube.com/watch');

  return (
    <div className="video-player">
      {isVideo ? (
        <ReactPlayer
          ref={playerRef}
          url={currentTrack.src}
          playing={playing}
          volume={volume}
          muted={muted}
          playbackRate={playbackRate}
          width="100%"
          height="100vh"
          onProgress={handleProgress}
          onDuration={setDuration}
          onEnded={handleNextTrack}
        />
      ) : (
        <AudioPlayer />
      )}

      <div className="controls">
        {isVideo ? (
          <>
            <button onClick={handlePlayPause}>{playing ? <IoPauseSharp /> : <IoPlaySharp />}</button>
            <button onClick={handleStop}><IoPlayBackSharp /></button>
            <button onClick={handleSeekBackward}><IoPlaySkipBackSharp /></button>
            <button onClick={handleSeekForward}><IoPlayForwardSharp /></button>
            <button onClick={handleNextTrack}><IoPlaySkipForwardSharp /></button>
            <div className="volume-control">
              <button onClick={() => setMuted(!muted)}>{muted ? '🔇' : '🔊'}</button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={handleVolumeChange}
              />
              <select value={playbackRate} onChange={handlePlaybackRateChange}>
                <option value={0.5}>0.5x</option>
                <option value={0.75}>0.75x</option>
                <option value={1}>1x (Normal)</option>
                <option value={1.25}>1.25x</option>
                <option value={1.5}>1.5x</option>
                <option value={2}>2x</option>
                <option value={3}>3x</option>
                <option value={4}>4x</option>
              </select>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

// Prop types validation
VideoPlayer.propTypes = {
  trackIndex: PropTypes.number.isRequired,
  setTrackIndex: PropTypes.func.isRequired,
};

export default VideoPlayer;
