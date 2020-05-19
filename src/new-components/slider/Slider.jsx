import React, { useRef, useState, useEffect } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { gsap } from "gsap";

import { useOnScreen } from "./../../hooks/useOnScreen";
import { images } from "./../../images/bar/imagesBar";

import { sliderIn, sliderOut } from "./slider.motion";
import styles from "./slider.module.scss";

const Slider = () => {
  const [maskRef, visible] = useOnScreen(0.1);
  const sliderRef = useRef(null);

  useEffect(() => {
    visible ? sliderIn(sliderRef) : sliderOut(sliderRef);
  }, [visible, maskRef]);

  const [current, setCurrent] = useState(0);
  const [background, setBackground] = useState(0);
  const [background2, setBackground2] = useState(0);
  const [isAnimated, setIsAnimated] = useState(false);

  const prev = current === 0 ? images.length - 1 : current - 1;
  const post = current === images.length - 1 ? 0 : current + 1;

  const divCurrentRef = useRef(null);
  const divCurrentRef2 = useRef(null);
  const imgCurrentRef = useRef(null);
  const imgCurrentRef2 = useRef(null);
  const backgroundRef = useRef(null);
  const backgroundRef2 = useRef(null);

  function onClickHandler(isNext) {
    if (isAnimated) {
      return;
    } else {
      setIsAnimated(true);
      setBackground(current);
      setBackground2(post);
      setCurrent(isNext ? post : prev);

      gsap.to([backgroundRef.current, backgroundRef2.current], {
        left: isNext ? "-100%" : "100%",
        duration: 1,
        ease: "power1.in",
      });
      gsap.from([divCurrentRef.current, divCurrentRef2.current], {
        scale: 1,
        left: isNext ? "100%" : "-100%",
        duration: 1,
        ease: "power1.in",
      });
      gsap.from([imgCurrentRef.current, imgCurrentRef2.current], {
        scale: 1.6,
        duration: 1,
        ease: "power1.in",
      });
      gsap.to([backgroundRef.current, backgroundRef2.current], {
        left: 0,
        delay: 1,
        duration: 0,
        onComplete: () => setIsAnimated(false),
      });
    }
  }
  return (
    <div ref={maskRef} className={styles.mask}>
      <div ref={sliderRef} className={styles.slider}>
        <div
          className={styles.sliderPrev}
          onClick={() => onClickHandler(false)}
        >
          <div className={styles.prevArrow}>
            <MdKeyboardArrowLeft />
          </div>
        </div>
        <div className={styles.sliderNext} onClick={() => onClickHandler(true)}>
          <div className={styles.nextArrow}>
            <MdKeyboardArrowRight />
          </div>
        </div>
        <div className={styles.sliderContainer}>
          <div className={styles.sliderLarge}>
            {/* image container large */}
            <div className={styles.imageContainer}>
              <div ref={backgroundRef} className={styles.imageBackground}>
                <img src={images[background].img} alt="" />
              </div>
              <div ref={divCurrentRef} className={styles.imageCurrent}>
                <img ref={imgCurrentRef} src={images[current].img} alt="" />
              </div>
            </div>
            {/*  end image container large */}
          </div>
          <div className={styles.sliderSmall}>
            {/* image container small */}
            <div className={styles.imageContainer}>
              <div ref={backgroundRef2} className={styles.imageBackground}>
                <img src={images[background2].img} alt="" />
              </div>
              <div ref={divCurrentRef2} className={styles.imageCurrent}>
                <img ref={imgCurrentRef2} src={images[post].img} alt="" />
              </div>
            </div>
            {/* end image container small */}
          </div>
        </div>
        <div className={styles.sliderCount}>
          <div className={styles.countLarge}>{current + 1}</div>
          <div className={styles.countSmall}>{images.length}</div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
