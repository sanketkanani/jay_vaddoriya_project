import React, { useRef, useEffect } from "react";

function AnimationData() {
  const roadmapRef = useRef(null);
  const numberDivRefs = useRef([]);
  const waveRef = useRef(null);

  useEffect(() => {
    const roadmap = roadmapRef.current;
    const numberDivs = numberDivRefs.current;
    const wave = waveRef.current.querySelector("#wavePath");
    const animatedGradient = wave
      .closest("svg")
      .querySelector("#animatedGradient");
    const stops = animatedGradient.querySelectorAll("stop");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            resetAnimations();
            animateStepsAndWave();
            roadmap.classList.add("active");
          } else {
            roadmap.classList.remove("active");
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(roadmap);

    function resetAnimations() {
      numberDivs.forEach((numberDiv) => {
        numberDiv.classList.remove("active", "highlight");
        numberDiv.classList.remove("activeText", "highlight");
        numberDiv.classList.remove("activeNumber", "highlight");
      });

      stops.forEach((stop) => {
        // Remove existing animations
        const existingAnimations = stop.querySelectorAll("animate");
        existingAnimations.forEach((anim) => anim.remove());
        // Create new animation element
        const animateElement = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "animate"
        );
        animateElement.setAttribute("attributeName", "offset");
        animateElement.setAttribute("values", "0;1");
        animateElement.setAttribute("dur", "3s");
        animateElement.setAttribute("repeatCount", "1");
        stop.appendChild(animateElement);
      });
    }

    function animateStepsAndWave() {
      animateSteps(() => {
        animateWave();
      });
    }

    function animateSteps(callback) {
      let delay = 0;
      numberDivs.forEach((numberDiv, index) => {
        setTimeout(() => {
          numberDiv.classList.add("active");
          updateWavePosition();

          setTimeout(() => {
            numberDiv.classList.add("activeNumber");
            if (
              index === numberDivs.length - 1 &&
              typeof callback === "function"
            ) {
              callback();
            }
          }, 750);

          setTimeout(() => {
            numberDiv.classList.add("activeText");
            if (
              index === numberDivs.length - 1 &&
              typeof callback === "function"
            ) {
              callback();
            }
          }, 850);
        }, delay);

        delay += 600;
      });
    }

    function animateWave() {
      const stops = animatedGradient.querySelectorAll("stop");
      stops.forEach((stop) => {
        const animateElement = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "animate"
        );
        animateElement.setAttribute("attributeName", "offset");
        animateElement.setAttribute("values", "0;1");
        animateElement.setAttribute("dur", "3s");
        animateElement.setAttribute("repeatCount", "1");
        stop.appendChild(animateElement);
      });
    }

    function updateWavePosition() {
      const waveLength = wave.getTotalLength();
      const svg = wave.closest("svg");
      const point = svg.createSVGPoint();

      numberDivs.forEach((item, index) => {
        const pointAtOffset = wave.getPointAtLength(
          waveLength * (index / (numberDivs.length - 1))
        );
        point.x = pointAtOffset.x;
        point.y = pointAtOffset.y;

        const screenCTM = svg.getScreenCTM();
        const transformedPoint = point.matrixTransform(screenCTM);

        const elementRect = item.getBoundingClientRect();
        const isTouching =
          transformedPoint.x >= elementRect.left &&
          transformedPoint.x <= elementRect.right &&
          transformedPoint.y >= elementRect.top &&
          transformedPoint.y <= elementRect.bottom;

        if (isTouching) {
          item.classList.add("highlight");
        } else {
          item.classList.remove("highlight");
        }
      });
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div id="roadmap" className="relative" ref={roadmapRef}>
        <div className="number_roadmap_main relative">
          <div
            id="number1"
            className="number_div flex items-end z-10 absolute left-32 bottom-3"
            ref={(el) => (numberDivRefs.current[0] = el)}
          >
            <span className="text block pb-3">
              Language C++,
              <br /> Java, Python
            </span>
            <span className="number_count">1</span>
          </div>
          <div
            id="number2"
            className="number_div flex items-end absolute bottom-32 z-10"
            ref={(el) => (numberDivRefs.current[1] = el)}
          >
            <span className="text block pb-3">
              Data Structures
              <br />& Algorithms <em>(30+ Coding Patterns) </em>
            </span>
            <span className="number_count block pb-5">2</span>
          </div>
          <div
            id="number3"
            className="number_div flex items-end absolute bottom-64 z-10"
            ref={(el) => (numberDivRefs.current[2] = el)}
          >
            <span className="text block pb-3">
              DBMS, OS,
              <br /> Networking <em>(Theoretical Concepts) </em>
            </span>
            <span className="number_count block pb-10">3</span>
          </div>
          <div
            id="number4"
            className="number_div flex items-end absolute bottom-72 right-0 z-10"
            ref={(el) => (numberDivRefs.current[3] = el)}
          >
            <span className="text block pb-3">
              System Design{" "}
              <em>
                (Understanding of <br />
                Applications){" "}
              </em>
            </span>
            <span className="number_count">4</span>
          </div>
          <span className="svg_roadmap absolute left-0" ref={waveRef}>
            <svg
              width="100%"
              height="460"
              viewBox="0 0 1331 460"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                id="wavePath"
                d="M55 325.727C71.2855 374.568 131.188 468.95 240.514 455.748C287.529 448.146 359 377.501 392.748 347.73C434 315.001 515.952 257.016 683.056 314.225C748.5 336.63 820.482 372.001 882.5 372.001C1075.88 372.001 1054.45 173.353 1156.04 82.688C1180.9 60.5105 1243.5 55.1836 1275 55.1836"
                stroke="url(#animatedGradient)"
                strokeWidth="6"
                strokeLinecap="round"
              />
              <g filter="url(#filter0_d)">
                <circle cx="1276" cy="55" r="5" fill="#A6D8DF" />
              </g>
              <g filter="url(#filter1_d)">
                <circle cx="55" cy="326" r="5" fill="#2FB3C4" />
              </g>
              <defs>
                <filter
                  id="filter0_d"
                  x="1221"
                  y="0"
                  width="110"
                  height="110"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset />
                  <feGaussianBlur stdDeviation="25" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow"
                    result="shape"
                  />
                </filter>
                <filter
                  id="filter1_d"
                  x="0"
                  y="271"
                  width="110"
                  height="110"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset />
                  <feGaussianBlur stdDeviation="25" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow"
                    result="shape"
                  />
                </filter>
                <linearGradient
                  id="animatedGradient"
                  x1="55"
                  y1="334.501"
                  x2="1289"
                  y2="55"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0%" stopColor="#2DB2C4" />
                  <stop offset="100%" stopColor="#D3EEF1" />
                </linearGradient>
              </defs>
            </svg>
          </span>
        </div>
      </div>
    </>
  );
}

export default AnimationData;
