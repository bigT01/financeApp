import { useRef, useState } from 'react';

export default function CameraComponent() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [error, setError] = useState<string | null>(null);

  const startCamera = async () => {
    try {
      // Запрашиваем заднюю камеру (если есть)
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { exact: 'environment' } // ЗАДНЯЯ камера
        },
        audio: false,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);
      setError('Не удалось открыть камеру. Возможно, браузер не поддерживает доступ к задней камере.');
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <video
        ref={videoRef}
        style={{ width: '100%', maxWidth: 400, borderRadius: 12 }}
        playsInline
        autoPlay
        muted
      />
      <br />
      <button onClick={startCamera} style={{ marginTop: 10 }}>
        Включить заднюю камеру
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
