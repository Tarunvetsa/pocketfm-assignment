import { useState } from 'react';
import AudioPlayer from './Components/audio/Audioplayer.jsx';
import VideoPlayer from './Components/Video/Videoplayer.jsx';

function App() {
  const [url, setUrl] = useState('');
  const [mediaType, setMediaType] = useState(null); // Track media type

  const handleInputChange = (event) => {
    setUrl(event.target.value);
  };

  const handleDetectMediaType = () => {
    if (!url) {
      return; // Handle empty input gracefully
    }

    const extension = url.split('.').pop().toLowerCase();

    switch (extension) {
      case 'mp3':
      case 'wav':
        setMediaType('audio');
        break;
      case 'mp4':
      case 'webm':
        // case 'ogg': // Handle ogg format for video as well
        setMediaType('video');
        break;
      default:
        setMediaType(null); // Reset if type not recognized
        break;
    }
  };

  return (
    <div>
      <input type="text" value={url} onChange={handleInputChange} placeholder="Enter URL" />
      <button onClick={handleDetectMediaType}>Detect Media Type</button>
      {mediaType === 'audio' && <AudioPlayer url={url} />}
      {mediaType === 'video' && <VideoPlayer url={url} />}
    </div>
  );
}

export default App;
