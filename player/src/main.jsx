import React from 'react'
import ReactDOM from 'react-dom/client'
import AudioPlayer from './Components/Audioplayer'
import './styles/index.css'
import './styles/customize-progress-bar.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AudioPlayer />
  </React.StrictMode>,
)
