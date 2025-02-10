import React, { useState, useEffect } from "react";

const AnimatedEllipsis: React.FC = () => {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500); // Adjust the speed (in ms) as needed

    return () => clearInterval(interval);
  }, []);

  return <span>{dots}</span>;
};

export default AnimatedEllipsis;
