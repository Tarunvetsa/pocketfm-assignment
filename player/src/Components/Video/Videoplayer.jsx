/* eslint-disable no-unused-vars */
import { useRef, useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { tracks } from '../../data/tracks'; // Importing tracks from data
import './Control.css';

const CustomVideoPlayer = () => {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [muted, setMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [progressInterval, setProgressInterval] = useState(1000);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0); // Track index state
  const playerRef = useRef();

  useEffect(() => {
    if (playerRef.current) {
      setDuration(playerRef.current.getDuration());
    }
  }, [playerRef.current]);

  // Function to play the next track
  const playNextTrack = () => {
    const nextTrackIndex = (currentTrackIndex + 1) % tracks.length; // Get next track index
    setCurrentTrackIndex(nextTrackIndex); // Update current track index
  };

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

  return (
    <div className="custom-video-player">
      <ReactPlayer
        ref={playerRef}
        url={tracks[currentTrackIndex].src} // Set URL from current track
        playing={playing}
        volume={volume}
        muted={muted}
        playbackRate={playbackRate}
        progressInterval={progressInterval}
        width="100%"
        height="97vh"
        onProgress={handleProgress}
        onDuration={setDuration}
        onEnded={playNextTrack} // Play next track when current track ends
      />
      <div className="controls">
        <button onClick={handlePlayPause}>{playing ? '❚❚' : '▶'}</button>
        <button onClick={handleStop}>↺</button>
        <button onClick={() => setCurrentTime(currentTime - 10)}>◄◄</button>
        <button onClick={() => setCurrentTime(currentTime + 10)}>►►</button>
        <button onClick={playNextTrack}>▶|</button> {/* Next button */}
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
            <option value={1}>1x</option>
            <option value={1.5}>1.5x</option>
            <option value={2}>2x</option>
          </select>
        </div>
      </div>
      <div className="progress-bar-container">
        <progress
          className="progress-bar"
          value={currentTime}
          max={duration}
        />
        <div className="time-progress">
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>
      </div>
    </div>
  );
};

const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

export default CustomVideoPlayer;
