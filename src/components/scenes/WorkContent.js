import { workData } from "@/data/workData";
import { useScramble } from "use-scramble";
import {
  useColourShift,
  useLinkSlide,
  useOpacityShift,
  useWorkTextTransition,
} from "@/hooks/useSpring";
import React, { useEffect, useState, useRef, lazy, Suspense } from "react";
import { animated } from "@react-spring/web";
import WorkControls from "../UI/WorkControls";
import LinkSVG from "../UI/svgs/LinkSVG";
import GithubSVG from "../UI/svgs/GithubSVG";
import {
  useIsSmallScreen,
  useClickPrevention,
  useDebouncedScrollClickSimulate,
  useShowScrollIndicator,
} from "@/hooks/utilityHooks";
import { playSound } from "@/utils/sound";
import { mobileSwitchSize } from "@/data/globalVariables";
import SwipeDown from "../UI/lotties/SwipeDown";

// Lazy load BlackMobileOverlay
const BlackMobileOverlay = lazy(() => import("../UI/BlackMobileOverlay"));

const WorkContent = ({
  pauseProjects,
  resumeProjects,
  handleNavigation,
  counter,
}) => {
  const workHeaderRef = useRef(null);
  const desktopPositionRef = useRef(null);
  const mobilePositionRef = useRef(null);
  const intervalRef = useRef(null);
  const laptopSpacerRef = useRef(null);

  const [moveH1, setMoveh1] = useState(false);
  const [isMobile, setIsMobile] = useState(
    window.innerWidth < mobileSwitchSize
  );
  const [linkHovered, setLinkHovered] = useState(false);
  const [hasHoveredOut, setHasHoveredOut] = useState(true);
  const [githubHovered, setGithubHovered] = useState(false);
  const [currentProject, setCurrentProject] = useState(workData[counter]);

  const [isDisabled, handleClick] = useClickPrevention(750);
  const isSmallScreen = useIsSmallScreen();
  const { showIndicator, shouldRender } = useShowScrollIndicator();

  const handleResize = () => {
    setIsMobile(window.innerWidth < mobileSwitchSize);
  };

  // Move header to mobilePosition and vice versa based on screen size
  useEffect(() => {
    const workHeader = workHeaderRef.current;
    const desktopPosition = desktopPositionRef.current;
    const mobilePosition = mobilePositionRef.current;

    if (isMobile) {
      if (
        workHeader &&
        mobilePosition &&
        !mobilePosition.contains(workHeader)
      ) {
        mobilePosition.insertBefore(workHeader, mobilePosition.firstChild);
      }
    } else {
      if (workHeader && desktopPosition) {
        desktopPosition.insertBefore(workHeader, desktopPosition.firstChild);
      }
    }
  }, [isMobile]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const colourShifterLink = useColourShift(
    linkHovered,
    "rgb(248, 247, 246)",
    "rgb(239, 208, 168)"
  );

  const colourShifterGithub = useColourShift(
    githubHovered,
    "rgb(248, 247, 246)",
    "rgb(239, 208, 168)"
  );

  const opacityShifter = useOpacityShift(linkHovered, "gentle", 0, 1);
  const opacityShifter2 = useOpacityShift(githubHovered, "gentle", 0, 1);
  const headerSlider = useLinkSlide(linkHovered, 7, false);
  const linkSlider = useLinkSlide(linkHovered, 30, true);
  const linkSlider2 = useLinkSlide(githubHovered, 30, true);
  const textTransition = useWorkTextTransition(
    workData[counter],
    setCurrentProject,
    counter
  );

  const project = workData[counter];

  // text scrambler
  const { ref, replay } = useScramble({
    text: project.title,
    speed: 0.5,
    seed: 5,
    overdrive: false,
    playOnMount: false,
  });

  // show "visit website" every few seconds
  useEffect(() => {
    startInterval();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const startInterval = () => {
    if (!isSmallScreen) {
      intervalRef.current = setInterval(() => {
        setLinkHovered(true);
        if (hasHoveredOut) playSound("hoverSound2");
        setTimeout(() => {
          setLinkHovered(false);
          playSound("hoverOutSound");
        }, 1500);
      }, 10000);
    }
  };

  const handleMouseEnter = () => {
    if (hasHoveredOut) playSound("hoverSound");
    setMoveh1(true);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setLinkHovered(true);
    setHasHoveredOut(false);
  };

  const handleMouseLeave = () => {
    playSound("hoverOutSound");
    setLinkHovered(false);
    setHasHoveredOut(true);
    setTimeout(() => {
      if (!linkHovered) setMoveh1(false);
    }, 500);
    startInterval();
  };

  const debouncedHandleScroll = useDebouncedScrollClickSimulate((direction) => {
    if (isDisabled) return;
    if (direction === "down") {
      handleClick(() => handleNavigation("Next"));
    } else if (direction === "up") {
      handleClick(() => handleNavigation("Previous"));
    }
  });

  const fadeOut = useOpacityShift(!showIndicator, "gentle", 1, 0);

  return (
    <div
      className="work-wrapper__outer"
      onTouchMove={debouncedHandleScroll}
      onWheel={debouncedHandleScroll}
    >
      <div className="work-wrapper__inner" ref={desktopPositionRef}>
        <div className="work-header__wrapper" ref={workHeaderRef}>
          <div className="work-header__inner">
            <animated.a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={() => playSound("clickSound2")}
              style={moveH1 ? colourShifterLink : null}
              className="project-title"
            >
              <animated.h1 ref={ref} style={moveH1 ? headerSlider : null}>
                {project.title}
              </animated.h1>
            </animated.a>
            <div className="work-link__wrapper">
              <div className="flex">
                <animated.a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => playSound("clickSound2")}
                  style={linkSlider}
                >
                  <LinkSVG colourShifterLink={colourShifterLink} />
                </animated.a>
                <animated.div
                  className="tooltip-wrapper"
                  style={opacityShifter}
                >
                  <animated.p className="hover-tooltip" style={linkSlider}>
                    View Website
                  </animated.p>
                </animated.div>
              </div>
              <div className="flex">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => {
                      setGithubHovered(true);
                      playSound("hoverSound");
                    }}
                    onMouseLeave={() => setGithubHovered(false)}
                    onClick={() => playSound("clickSound2")}
                  >
                    <GithubSVG colourShifterGithub={colourShifterGithub} />
                  </a>
                )}

                <animated.div
                  className="tooltip-wrapper github-tooltip"
                  style={opacityShifter2}
                >
                  <animated.p className="hover-tooltip" style={linkSlider2}>
                    View Github
                  </animated.p>
                </animated.div>
              </div>
            </div>
          </div>
          <div className="work-underline__wrapper">
            <img
              className="work-underline"
              src="/images/project-title_underline.png"
              alt="Decorative Underline"
            />
          </div>
        </div>
        {isSmallScreen && (
          <Suspense fallback={null}>
            <BlackMobileOverlay
              laptopSpacerRef={laptopSpacerRef}
              scrollContainerRef={mobilePositionRef}
            />
          </Suspense>
        )}
        <div className="laptop-spacer hide" ref={laptopSpacerRef}></div>
        <div className="work-body__wrapper">
          <WorkControls
            pauseProjects={pauseProjects}
            resumeProjects={resumeProjects}
            handleNavigation={handleNavigation}
            counter={counter}
            handleClick={handleClick}
            interval={intervalRef.current}
          />
          <animated.div
            className="work-body__right"
            style={textTransition}
            ref={mobilePositionRef}
          >
            <div className="body-right__inner">
              <div>
                <div className="work-tools__wrapper">
                  {currentProject.tools.map((tool, index) => (
                    <div key={tool} className="work-tools__item">
                      <p>{tool}</p>
                      <div
                        className={`tool-spacer__line ${
                          index == currentProject.tools.length - 1
                            ? "no-border"
                            : "" // remove last line
                        }`}
                      ></div>
                    </div>
                  ))}
                </div>
                <p className="work-description">
                  {currentProject.description // for strings of elysium description include link in text
                    .split("this link")
                    .map((text, index, array) => (
                      <React.Fragment key={index}>
                        {text}
                        {index < array.length - 1 && (
                          <a
                            href="https://www.psychoactive.co.nz/content-hub/integrating-unity-into-psychoactive-tm-s-web-development-pipeline"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              textDecoration: "underline",
                              textUnderlineOffset: "4px",
                            }}
                          >
                            this link
                          </a>
                        )}
                      </React.Fragment>
                    ))}
                </p>
              </div>
              <div className="work-info__wrapper">
                <div className="work-overview__wrapper">
                  <div className="work-overview__item">
                    <p className="work-overview__title">Role</p>
                    <p className="creme-text">{currentProject.role}</p>
                  </div>
                  <div className="work-overview__item client-item">
                    <p className="work-overview__title">Client</p>
                    <p className="creme-text">{currentProject.client}</p>
                  </div>
                  <div className="work-overview__item">
                    <p className="work-overview__title">Year</p>
                    <p className="creme-text">{currentProject.year}</p>
                  </div>
                </div>
                <div>
                  {currentProject.credits == "N/A" ? (
                    <></> // don't render credits if not applicable
                  ) : (
                    <>
                      <p className="work-overview__title">Credits</p>
                    </>
                  )}
                  {currentProject.credits == "N/A" ? (
                    <></> // don't render credits if not applicable
                  ) : (
                    <>
                      <div
                        className={`work-credits__wrapper ${
                          currentProject.title == "Torotoro"
                            ? "credits-wrap"
                            : "" // make torotoro credits wrap after 3 items
                        }`}
                      >
                        {Object.entries(currentProject.credits).map(
                          ([key, value]) => (
                            <div key={key} className="work-credits__inner">
                              {currentProject.title == "Torotoro" ? (
                                "" // remove credit role field on torotoro currentProject
                              ) : (
                                <div className="credit-role">
                                  <p>
                                    {key.charAt(0).toUpperCase() + key.slice(1)}
                                  </p>
                                </div>
                              )}
                              <div className="credit-name">
                                {value === "Psychoactive Studios" ? ( // make psychoactive credit a link to their site
                                  <a
                                    href="https://www.psychoactive.co.nz/"
                                    target="_blank"
                                    className="hover-underline"
                                  >
                                    <p>{value}</p>
                                  </a>
                                ) : (
                                  <p>{value}</p>
                                )}
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="mobile-link__wrapper hide">
                {project.removeLiveLinkFromMobile ? (
                  <></>
                ) : (
                  <a
                    className="mobile-link__inner"
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <p>View Website</p>
                    <LinkSVG />
                  </a>
                )}
                {project.github && (
                  <a
                    className="mobile-link__inner"
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <p>View Github</p>
                    <GithubSVG />
                  </a>
                )}
              </div>
            </div>
          </animated.div>
        </div>
      </div>
      {shouldRender && (
        <animated.div className="scroll-indicator" style={fadeOut}>
          <SwipeDown />
        </animated.div>
      )}
    </div>
  );
};
export default WorkContent;
