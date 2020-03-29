import { useState, useLayoutEffect } from 'react';
import mojs from 'mo-js';

const useClapAnimation = ({  clapEl, countEl, countTotalEl }) => {
  const [animationTimeline, setAnimationTimeline] = useState(
    () => new mojs.Timeline()
  );

  useLayoutEffect(() => {
    if (!clapEl || !countEl || !countTotalEl) {
        return;
      }
    const tlDuration = 300;
    const scaleButton = new mojs.Html({
      el: clapEl,
      duration: tlDuration,
      scale: { 1.3: 1 },
      easing: mojs.easing.ease.out
    });

    const countAnimation = new mojs.Html({
      el: countEl,
      opacity: { 0: 1 },
      duration: tlDuration,
      y: { 0: -30 }
    }).then({
      opacity: { 1: 0 },
      y: -80,
      delay: tlDuration / 2
    });

    const countTotalAnimation = new mojs.Html({
      el: countTotalEl,
      opacity: { 0: 1 },
      delay: (3 * tlDuration) / 2,
      duration: tlDuration,
      y: { 0: -3 }
    });

   
    clapEl.style.transform = 'scale(1,1)';

    const triangleBurst = new mojs.Burst({
      parent: clapEl,
      radius: { 50: 95 },
      count: 5,
      angle: 30,
      children: {
        shape: 'polygon',
        radius: { 6: 0 },
        stroke: 'rgba(211,54,0,0.5)',
        strokeWidth: 2,
        angle: 210,
        delay: 30,
        speed: 0.2,
        easing: mojs.easing.bezier(0.1, 1, 0.3, 1),
        duration: tlDuration
      }
    });

    const circleBurst = new mojs.Burst({
      parent: clapEl,
      radius: { 50: 75 },
      angle: 25,
      duration: tlDuration,
      children: {
        shape: 'circle',
        stroke: 'rgba(149,165,166,0.5)',
        delay: 30,
        speed: 0.2,
        radius: { 3: 0 },
        easing: mojs.easing.bezier(0.1, 1, 0.3, 1)
      }
    });

    const newAnimationTimeline = animationTimeline.add([
      scaleButton,
      countTotalAnimation,
      countAnimation,
      triangleBurst,
      circleBurst
    ]);

    setAnimationTimeline(newAnimationTimeline);
  }, [clapEl, animationTimeline]);

  return animationTimeline;
};

export default useClapAnimation;
