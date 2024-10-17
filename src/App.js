import React, { useState, useEffect, useRef } from "react";
import "./App.css";

// Icon components
const Droplet = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
  </svg>
);

const Power = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
    <line x1="12" y1="2" x2="12" y2="12" />
  </svg>
);

const Smile = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
    <line x1="9" y1="9" x2="9.01" y2="9" />
    <line x1="15" y1="9" x2="15.01" y2="9" />
  </svg>
);

const Frown = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M16 16s-1.5-2-4-2-4 2-4 2" />
    <line x1="9" y1="9" x2="9.01" y2="9" />
    <line x1="15" y1="9" x2="15.01" y2="9" />
  </svg>
);

const Meh = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="8" y1="15" x2="16" y2="15" />
    <line x1="9" y1="9" x2="9.01" y2="9" />
    <line x1="15" y1="9" x2="15.01" y2="9" />
  </svg>
);

const Camera = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
    <circle cx="12" cy="13" r="4" />
  </svg>
);

const RefreshCw = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M23 4v6h-6" />
    <path d="M1 20v-6h6" />
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
  </svg>
);

export default function AdminDashboard() {
  const [isDeviceOn, setIsDeviceOn] = useState(false);
  const [currentMood, setCurrentMood] = useState("보통");
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [lastDetectedMood, setLastDetectedMood] = useState("");
  const videoRef = useRef(null);

  const toggleDevice = () => {
    setIsDeviceOn(!isDeviceOn);
  };

  const toggleCamera = async () => {
    if (!isCameraOn) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setIsCameraOn(true);
      } catch (err) {
        console.error("Error accessing the camera:", err);
      }
    } else {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
      setIsCameraOn(false);
    }
  };

  const dispenseFragrance = (fragrance) => {
    console.log(`Dispensing ${fragrance} fragrance`);
    // Here you would typically call an API to trigger the fragrance dispenser
  };

  const detectMood = () => {
    const moods = ["행복", "슬픔", "보통", "상쾌"];
    const randomMood = moods[Math.floor(Math.random() * moods.length)];
    setLastDetectedMood(randomMood);
    setCurrentMood(randomMood);
  };

  useEffect(() => {
    let interval = null;
    if (isCameraOn) {
      interval = setInterval(detectMood, 5000); // Detect mood every 5 seconds
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isCameraOn]);

  useEffect(() => {
    if (isDeviceOn && lastDetectedMood) {
      const fragranceMap = {
        행복: "보라색",
        슬픔: "파란색",
        보통: "노란색",
        상쾌: "초록색",
      };
      dispenseFragrance(fragranceMap[lastDetectedMood]);
    }
  }, [lastDetectedMood, isDeviceOn]);

  return (
    <div className="container">
      <header className="header">
        <div className="header-content">
          <h1 className="header-title">
            <Droplet className="icon" />
            무드 향기 관리자
          </h1>
        </div>
      </header>

      <main className="main-content">
        <div className="grid">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">장치 상태</h3>
            </div>
            <div className="card-contents">
              <div className="flex-between">
                <span
                  className={`status ${
                    isDeviceOn ? "status-on" : "status-off"
                  }`}
                >
                  <span className="pretext">
                    {isDeviceOn ? "작동 중" : "꺼짐"}
                  </span>
                </span>
                <button
                  className={`button ${
                    isDeviceOn ? "button-active" : "button-default"
                  }`}
                  onClick={toggleDevice}
                >
                  <Power className="button-icon" />

                  {isDeviceOn ? "끄기" : "켜기"}
                </button>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3 className="card-title">카메라 상태</h3>
            </div>
            <div className="card-contents">
              <div className="flex-between">
                <span
                  className={`status ${
                    isCameraOn ? "status-on" : "status-off"
                  }`}
                >
                  <span className="pretext">
                    {isCameraOn ? "작동 중" : "꺼짐"}
                  </span>
                </span>
                <button
                  className={`button ${
                    isCameraOn ? "button-active" : "button-default"
                  }`}
                  onClick={toggleCamera}
                >
                  <Camera className="button-icon" />
                  {isCameraOn ? "끄기" : "켜기"}
                </button>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3 className="card-title">현재 감지된 감정</h3>
            </div>
            <div className="card-content">
              <div className="current-mood">{currentMood}</div>
              {currentMood === "행복" && <Smile className="mood-icon-happy" />}
              {currentMood === "슬픔" && <Frown className="mood-icon-sad" />}
              {currentMood === "보통" && <Meh className="mood-icon-neutral" />}
              {currentMood === "상쾌" && (
                <RefreshCw className="mood-icon-refreshed" />
              )}
            </div>
          </div>
        </div>

        <div className="card mt-6">
          <div className="card-header">
            <h3 className="card-title">카메라 뷰</h3>
          </div>
          <div className="card-content">
            <div className="camera-view">
              <video
                ref={videoRef}
                className="camera-feed"
                autoPlay
                playsInline
                muted
              />
            </div>
          </div>
        </div>

        <div className="card mt-6">
          <div className="card-header">
            <h3 className="card-title">감정-향기 매핑</h3>
          </div>
          <div className="card-content">
            <div className="mood-fragrance-grid">
              <div className="mood-fragrance-item happy">
                <div className="mood-icon-wrapper">
                  <Smile className="mood-icon" />
                  <span>행복</span>
                </div>
                <span>보라색</span>
              </div>
              <div className="mood-fragrance-item sad">
                <div className="mood-icon-wrapper">
                  <Frown className="mood-icon" />
                  <span>슬픔</span>
                </div>
                <span>파란색</span>
              </div>
              <div className="mood-fragrance-item neutral">
                <div className="mood-icon-wrapper">
                  <Meh className="mood-icon" />
                  <span>보통</span>
                </div>
                <span>노란색</span>
              </div>
              <div className="mood-fragrance-item refreshed">
                <div className="mood-icon-wrapper">
                  <RefreshCw className="mood-icon" />
                  <span>상쾌</span>
                </div>
                <span>초록색</span>
              </div>
            </div>
          </div>
        </div>

        <div className="card mt-6">
          <div className="card-header">
            <h3 className="card-title">수동 향기 분사</h3>
          </div>
          <div className="card-content">
            <div className="fragrance-buttons">
              <button
                className="button button-purple"
                onClick={() => dispenseFragrance("보라색")}
              >
                <Droplet className="icon" />
                보라색
              </button>
              <button
                className="button button-blue"
                onClick={() => dispenseFragrance("파란색")}
              >
                <Droplet className="icon" />
                파란색
              </button>
              <button
                className="button button-yellow"
                onClick={() => dispenseFragrance("노란색")}
              >
                <Droplet className="icon" />
                노란색
              </button>
              <button
                className="button button-green"
                onClick={() => dispenseFragrance("초록색")}
              >
                <Droplet className="icon" />
                초록색
              </button>
            </div>
          </div>
        </div>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <p>© 2024 무드 향기 시스템. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
