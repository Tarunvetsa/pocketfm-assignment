import { useRef, useState } from 'react';
import VideoPlayer from '../Video/Videoplayer.jsx'; // Import VideoPlayer component
import { tracks } from '../../data/tracks.jsx'; // Import tracks data

// import components
import DisplayTrack from './DisplayTrack';
import Controls from './Controls';
import ProgressBar from './ProgressBar';

const AudioPlayer = () => {
  // states
  const [trackIndex, setTrackIndex] = useState(0);
  const [currentTrack, setCurrentTrack] = useState(tracks[trackIndex]);
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  // reference
  const audioRef = useRef();
  const progressBarRef = useRef();

  const handleNext = () => {
    if (trackIndex >= tracks.length - 1) {
      setTrackIndex(0);
      setCurrentTrack(tracks[0]);
    } else {
      setTrackIndex((prev) => prev + 1);
      setCurrentTrack(tracks[trackIndex + 1]);
    }
  };

  // Check if the source is a video link
  const isVideo = currentTrack.src.includes('youtube.com/watch');

  return (
    <>
      {isVideo ? (
        // Pass the video URL and track index props to the VideoPlayer component
        <VideoPlayer videoUrl={currentTrack.src} trackIndex={trackIndex} setTrackIndex={setTrackIndex} />
      ) : (
        <div className="audio-player">
          <div className="inner">
            <DisplayTrack
              {...{
                currentTrack,
                audioRef,
                setDuration,
                progressBarRef,
                handleNext,
              }}
            />
            <Controls
              {...{
                audioRef,
                progressBarRef,
                duration,
                setTimeProgress,
                tracks,
                trackIndex,
                setTrackIndex,
                setCurrentTrack,
                handleNext,
              }}
            />
            <ProgressBar
              {...{ progressBarRef, audioRef, timeProgress, duration }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default AudioPlayer;
