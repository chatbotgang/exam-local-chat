import catAnime from "@exam/app/src/assets/cat.json";
import type { LottieRefCurrentProps } from "lottie-react";
import Lottie from "lottie-react";
import { useEffect, useRef } from "react";

const Total = 600; // total frames is get from `catRef.current.animationItem?.totalFrames`

function Cat({
  progress,
  className,
}: {
  progress: number;
  className?: string;
}) {
  const catRef = useRef<LottieRefCurrentProps>(null);

  useEffect(() => {
    if (catRef.current) {
      // frame index start from 1
      const index = (1 + progress) % Total;
      catRef.current.goToAndStop(index, true);
    }
  }, [progress]);

  return (
    <Lottie
      className={`absolute ${className}`}
      lottieRef={catRef}
      animationData={catAnime}
      autoplay={false}
      loop={false}
    />
  );
}

export default Cat;
