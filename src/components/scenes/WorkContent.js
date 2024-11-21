import { workData } from "@/data/workData";
import {
  useColourShift,
  useLinkSlide,
  useOpacityShift,
} from "@/hooks/useSpring";
import { useState } from "react";
import { animated } from "@react-spring/web";
import WorkControls from "../UI/WorkControls";
import LinkSVG from "../UI/svgs/LinkSVG";
import GithubSVG from "../UI/svgs/GithubSVG";

const WorkContent = ({
  pauseProjects,
  resumeProjects,
  handleNavigation,
  counter,
}) => {
  const [linkHovered, setLinkHovered] = useState(false);
  const [githubHovered, setGithubHovered] = useState(false);

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

  const project = workData[counter];

  return (
    <div className="work-wrapper__outer">
      <div className="work-wrapper__inner">
        <div className="work-header__wrapper">
          <div className="work-header__inner">
            <animated.a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setLinkHovered(true)}
              onMouseLeave={() => setLinkHovered(false)}
              style={colourShifterLink}
            >
              <animated.h1 style={headerSlider}>{project.title}</animated.h1>
            </animated.a>
            <div className="work-link__wrapper">
              <div className="flex">
                <animated.a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setLinkHovered(true)}
                  onMouseLeave={() => setLinkHovered(false)}
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
                    onMouseEnter={() => setGithubHovered(true)}
                    onMouseLeave={() => setGithubHovered(false)}
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
        <div className="work-body__wrapper">
          <WorkControls
            pauseProjects={pauseProjects}
            resumeProjects={resumeProjects}
            handleNavigation={handleNavigation}
            counter={counter}
          />
          <div className="work-body__right">
            <div>
              <div className="work-tools__wrapper">
                {project.tools.map((tool, index) => (
                  <div key={index} className="work-tools__item">
                    <p>{tool}</p>
                    <div
                      className={`tool-spacer__line ${
                        index == project.tools.length - 1 ? "no-border" : "" // remove last line
                      }`}
                    ></div>
                  </div>
                ))}
              </div>
              <p className="work-description">
                {project.description // for strings of elysium description include link in text
                  .split("this link")
                  .map((text, index, array) => (
                    <>
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
                    </>
                  ))}
              </p>
            </div>
            <div className="work-info__wrapper">
              <div className="work-overview__wrapper">
                <div className="work-overview__item">
                  <p className="work-overview__title">Role</p>
                  <p className="creme-text">{project.role}</p>
                </div>
                <div className="work-overview__item client-item">
                  <p className="work-overview__title">Client</p>
                  <p className="creme-text">{project.client}</p>
                </div>
                <div className="work-overview__item">
                  <p className="work-overview__title">Year</p>
                  <p className="creme-text">{project.year}</p>
                </div>
              </div>
              {project.credits == "N/A" ? (
                <></> // don't render credits if not applicable
              ) : (
                <>
                  <p className="work-overview__title">Credits</p>
                </>
              )}
              {project.credits == "N/A" ? (
                <></> // don't render credits if not applicable
              ) : (
                <>
                  <div
                    className={`work-credits__wrapper ${
                      project.title == "Torotoro" ? "credits-wrap" : "" // make torotoro credits wrap after 3 items
                    }`}
                  >
                    {Object.entries(project.credits).map(([key, value]) => (
                      <div key={key} className="work-credits__inner">
                        {project.title == "Torotoro" ? (
                          "" // remove credit role field on torotoro project
                        ) : (
                          <div className="credit-role">
                            <p>{key.charAt(0).toUpperCase() + key.slice(1)}</p>
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
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default WorkContent;
