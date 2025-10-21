import React, { useEffect, useState } from "react";

interface RoomTimeoutProps {
  duration: number; // in seconds
  onTimeout: () => void;
}

export default function RoomTimeout({ duration, onTimeout }: RoomTimeoutProps) {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeout();
      return;
    }

    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  return (
    <div className="text-center mt-4 text-gray-600">
      ⏳ Otomatis keluar dalam <strong>{timeLeft}</strong> detik
    </div>
  );
}
