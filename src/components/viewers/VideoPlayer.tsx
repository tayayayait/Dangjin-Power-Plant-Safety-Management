import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Maximize, RotateCcw } from 'lucide-react';

interface VideoPlayerProps {
  url: string;
  title: string;
}

export function VideoPlayer({ url, title }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);

  // Hide controls after 3 seconds of inactivity
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    if (isPlaying) {
      timeout = setTimeout(() => setShowControls(false), 3000);
    } else {
      setShowControls(true);
    }
    return () => clearTimeout(timeout);
  }, [isPlaying, progress]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setProgress(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setProgress(time);
    }
  };
  
  const handleFullscreen = () => {
      if (containerRef.current) {
          if (document.fullscreenElement) {
              document.exitFullscreen();
          } else {
              containerRef.current.requestFullscreen();
          }
      }
  };

  const handleRestart = () => {
      if (videoRef.current) {
          videoRef.current.currentTime = 0;
          setProgress(0);
          videoRef.current.play();
          setIsPlaying(true);
      }
  }

  const formatTime = (timeInSeconds: number) => {
    const m = Math.floor(timeInSeconds / 60).toString().padStart(2, '0');
    const s = Math.floor(timeInSeconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div 
        ref={containerRef}
        className="relative w-full h-full bg-black flex items-center justify-center rounded-lg overflow-hidden group"
        onMouseMove={() => setShowControls(true)}
        onTouchStart={() => setShowControls(true)}
        onClick={() => setShowControls(true)}
    >
      <video
        ref={videoRef}
        src={url}
        className="w-full h-full object-contain cursor-pointer"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
        onClick={togglePlay}
        title={title}
        playsInline // Disable auto fullscreen on iOS
      />

      {/* Central big play button when paused */}
      {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-24 h-24 bg-primary/80 backdrop-blur border-4 border-white text-white rounded-full flex items-center justify-center pl-2 shadow-2xl transition-transform hover:scale-105">
                  <Play className="w-12 h-12" />
              </div>
          </div>
      )}

      {/* Control Bar */}
      <div 
        className={`absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-300 ${
            showControls ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Progress Bar */}
        <div className="flex items-center gap-4 mb-4">
            <span className="text-white text-body-sm tabular-nums w-12 text-right">{formatTime(progress)}</span>
            <input
                type="range"
                min="0"
                max={duration || 100}
                value={progress}
                onChange={handleSeek}
                className="flex-1 h-2 bg-gray-500 rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <span className="text-white text-body-sm tabular-nums w-12">{formatTime(duration)}</span>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
                <button onClick={togglePlay} className="text-white hover:text-primary transition-colors">
                    {isPlaying ? <Pause className="w-10 h-10" /> : <Play className="w-10 h-10" />}
                </button>
                <button onClick={handleRestart} className="text-white hover:text-primary transition-colors">
                    <RotateCcw className="w-8 h-8" />
                </button>
            </div>
            
            <button onClick={handleFullscreen} className="text-white hover:text-primary transition-colors">
                <Maximize className="w-8 h-8" />
            </button>
        </div>
      </div>
    </div>
  );
}
