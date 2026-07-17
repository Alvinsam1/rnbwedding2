import { useEffect } from "react";
import confetti from "canvas-confetti";

export function PetalShower() {
  useEffect(() => {
    const colors = ["#6B2D6B", "#8B3A8B", "#C9A84C", "#D4B86A", "#7B2D7B", "#9C4E9C"];

    const petalShape = confetti.shapeFromPath({
      path: "M0,-10 C5,-5 10,0 5,8 C0,15 -5,8 0,-10Z",
    });

    let frame = 0;
    const totalFrames = 180;

    function launchPetals() {
      if (frame >= totalFrames) return;
      frame++;

      confetti({
        particleCount: 3,
        angle: 80 + Math.random() * 20,
        spread: 120,
        origin: { x: Math.random(), y: -0.1 },
        colors,
        shapes: [petalShape, "circle"],
        scalar: 1.2 + Math.random() * 0.8,
        drift: Math.random() * 2 - 1,
        gravity: 0.5,
        ticks: 250,
        startVelocity: 20 + Math.random() * 10,
      });

      requestAnimationFrame(launchPetals);
    }

    confetti({
      particleCount: 60,
      spread: 160,
      origin: { x: 0.5, y: 0.3 },
      colors,
      shapes: [petalShape, "circle"],
      scalar: 1.4,
      gravity: 0.6,
      ticks: 300,
      startVelocity: 35,
    });

    requestAnimationFrame(launchPetals);

    return () => {
      frame = totalFrames;
    };
  }, []);

  return null;
}
