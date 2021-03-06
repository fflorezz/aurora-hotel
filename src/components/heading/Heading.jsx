import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

import { useGlobalStateContext } from "../../context/global-context/GlobaContext";

import { useOnScreen } from "../../hooks/useOnScreen";

import styles from "./heading.module.scss";
import { headingAnimation, headingAnimationOut } from "./heading.motion";

const Heading = ({ text }) => {
  const [headingRef, visible] = useOnScreen(0.1);
  const { homeAnimations } = useGlobalStateContext();

  const ref = {
    line1: useRef(null),
    line2: useRef(null),
    text: useRef(),
  };

  useEffect(() => {
    if (homeAnimations) {
      visible ? headingAnimation(ref) : headingAnimationOut(ref);
    }
  }, [visible, ref, homeAnimations]);

  return (
    <div ref={headingRef} className={styles.heading}>
      <h1 className={styles.headingTitle}>
        <div className={styles.titleLineContainer}>
          <span ref={ref.line1} className={styles.titleLine}>
            {text.title1}
          </span>
        </div>
        {text.title2 ? (
          <div className={styles.titleLineContainer}>
            <span ref={ref.line2} className={styles.titleLine}>
              {text.title2}
            </span>
          </div>
        ) : (
          ""
        )}
      </h1>
      <p ref={ref.text} className={styles.headingText}>
        {text.paragraph}
      </p>
    </div>
  );
};

Heading.propTypes = {
  text: PropTypes.shape({
    title1: PropTypes.string.isRequired,
    title2: PropTypes.string,
  }),
};

export default Heading;
