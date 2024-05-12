/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  IoPlayBackSharp,
  IoPlayForwardSharp,
  IoPlaySkipBackSharp,
  IoPlaySkipForwardSharp,
  IoPlaySharp,
  IoPauseSharp,
} from 'react-icons/io5';
import { IoMdVolumeHigh, IoMdVolumeOff, IoMdVolumeLow } from 'react-icons/io';

const Controls = ({
  audioRef,
  progressBarRef,
  duration,
  setTimeProgress,
  tracks,
  trackIndex,
  setTrackIndex,
  setCurrentTrack,
  handleNext,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(60);
  const [muteVolume, setMuteVolume] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1); // Initial playback rate

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const playAnimationRef = useRef();

  const repeat = useCallback(() => {
    const currentTime = audioRef.current.currentTime;
    setTimeProgress(currentTime);
    progressBarRef.current.value = currentTime;
    progressBarRef.current.style.setProperty(
      '--range-progress',
      `${(progressBarRef.current.value / duration) * 100}%`
    );
    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [audioRef, duration, progressBarRef, setTimeProgress]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [isPlaying, audioRef, repeat]);

  const skipForward = () => {
    audioRef.current.currentTime += 10;
  };

  const skipBackward = () => {
    audioRef.current.currentTime -= 10;
  };

  const handlePrevious = () => {
    let newIndex = trackIndex - 1;
    if (newIndex < 0) {
      newIndex = tracks.length - 1;
    }
    setTrackIndex(newIndex);
    setCurrentTrack(tracks[newIndex]);
  };

  const handlePlaybackRateChange = (event) => {
    const newRate = parseFloat(event.target.value);
    setPlaybackRate(newRate);
    audioRef.current.playbackRate = newRate;
  };

  useEffect(() => {
    if (audioRef) {
      audioRef.current.volume = volume / 100;
      audioRef.current.muted = muteVolume;
      audioRef.current.playbackRate = playbackRate; // Apply playback rate
    }
  }, [volume, audioRef, muteVolume, playbackRate]);

  return (
    <div className="controls-wrapper">
      <div className="controls">
        <button onClick={handlePrevious}>
          <IoPlaySkipBackSharp />
        </button>
        <button onClick={skipBackward}>
          <IoPlayBackSharp />
        </button>

        <button onClick={togglePlayPause}>
          {isPlaying ? <IoPauseSharp /> : <IoPlaySharp />}
        </button>
        <button onClick={skipForward}>
          <IoPlayForwardSharp />
        </button>
        <button onClick={handleNext}>
          <IoPlaySkipForwardSharp />
        </button>

        {/* Play Speed Control */}
        <div className="playback-speed">
          <label htmlFor="playback-rate">Speed:</label>
          <select
            id="playback-rate"
            value={playbackRate}
            onChange={handlePlaybackRateChange}
          >
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
      </div>
      <div className="volume">
        <button onClick={() => setMuteVolume((prev) => !prev)}>
          {muteVolume || volume < 5 ? (
            <IoMdVolumeOff />
          ) : volume < 40 ? (
            <IoMdVolumeLow />
          ) : (
            <IoMdVolumeHigh />
          )}
        </button>
        <input
          type="range"
          min={0}
          max={100}
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
          style={{
            background: `linear-gradient(to right, #f50 ${volume}%, #ccc ${volume}%)`,
          }}
        />
      </div>
    </div>
  );
};

Controls.propTypes = {
    audioRef: PropTypes.object.isRequired,
    progressBarRef: PropTypes.object.isRequired,
    duration: PropTypes.number.isRequired,
    setTimeProgress: PropTypes.func.isRequired,
    tracks: PropTypes.array.isRequired,
    trackIndex: PropTypes.number.isRequired,
    setTrackIndex: PropTypes.func.isRequired,
    setCurrentTrack: PropTypes.func.isRequired,
    handleNext: PropTypes.func.isRequired,
    };

export default Controls;

