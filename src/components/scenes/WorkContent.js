import { workData } from "@/data/workData";
// import { svgData } from "@/data/svgData";
import {
  useColourShift,
  useLinkSlide,
  useOpacityShift,
} from "@/hooks/useSpring";
import { useState } from "react";
import { animated } from "@react-spring/web";

const WorkContent = ({ counter }) => {
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
                  <svg
                    className="work-link__icon"
                    width="29"
                    height="29"
                    viewBox="0 0 29 29"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <animated.path
                      d="M8.50905 0H5.83632V5.34755H8.50905H19.8793L1.89321 23.3294L2.84447e-05 25.2233L3.7864 29L5.67958 27.1061L23.6545 9.12425V20.4989V23.1727H29V20.4989V2.67377V0H26.3273H8.50905Z"
                      fill="rgb(248, 247, 246)"
                      style={colourShifterLink}
                    />
                  </svg>
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
                    <svg
                      className="github-link__icon"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <animated.path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M12.0217 0.09375C5.40745 0.09375 0.0439453 5.5477 0.0439453 12.276C0.0439453 17.6586 3.47594 22.2251 8.23509 23.8359C8.8337 23.9487 9.05347 23.5717 9.05347 23.2499C9.05347 22.9594 9.04236 21.9997 9.0372 20.9818C5.70497 21.7187 5.00183 19.5444 5.00183 19.5444C4.45697 18.1363 3.67191 17.7619 3.67191 17.7619C2.58517 17.0057 3.75383 17.0213 3.75383 17.0213C4.95661 17.107 5.58993 18.2767 5.58993 18.2767C6.65823 20.1391 8.39198 19.6007 9.07548 19.2894C9.18299 18.5022 9.4934 17.9644 9.83595 17.6604C7.17552 17.3523 4.37882 16.3077 4.37882 11.6397C4.37882 10.3097 4.84672 9.22294 5.61294 8.3698C5.48857 8.06275 5.07859 6.82389 5.72897 5.14584C5.72897 5.14584 6.73479 4.81842 9.02371 6.39459C9.97915 6.12467 11.0038 5.9893 12.0217 5.98466C13.0396 5.9893 14.0651 6.12467 15.0223 6.39459C17.3085 4.81842 18.3129 5.14584 18.3129 5.14584C18.9649 6.82389 18.5547 8.06275 18.4303 8.3698C19.1983 9.22294 19.6631 10.3097 19.6631 11.6397C19.6631 16.3188 16.861 17.3491 14.1938 17.6507C14.6234 18.0287 15.0063 18.7701 15.0063 19.9067C15.0063 21.5365 14.9924 22.8484 14.9924 23.2499C14.9924 23.5741 15.208 23.954 15.8151 23.8343C20.5717 22.2216 23.9993 17.6567 23.9993 12.276C23.9993 5.5477 18.6366 0.09375 12.0217 0.09375Z"
                        fill="rgb(248, 247, 246)"
                        style={colourShifterGithub}
                      />
                      <animated.path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M4.58054 17.5849C4.55416 17.6457 4.46054 17.6636 4.37525 17.622C4.28837 17.5823 4.23958 17.4998 4.26775 17.4391C4.29353 17.3767 4.38735 17.3596 4.47403 17.4009C4.5611 17.4409 4.61069 17.5242 4.58054 17.5849Z"
                        fill="rgb(248, 247, 246)"
                        style={colourShifterGithub}
                      />
                      <animated.path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M5.0657 18.1353C5.00857 18.1891 4.8969 18.1641 4.82114 18.079C4.74279 17.9941 4.72811 17.8805 4.78603 17.8258C4.84494 17.7719 4.95323 17.7972 5.03178 17.8821C5.11013 17.968 5.1254 18.0808 5.0657 18.1353Z"
                        fill="rgb(248, 247, 246)"
                        style={colourShifterGithub}
                      />
                      <animated.path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M5.53796 18.8369C5.46457 18.8888 5.34457 18.8401 5.27039 18.7318C5.197 18.6235 5.197 18.4935 5.27198 18.4415C5.34636 18.3895 5.46457 18.4363 5.53975 18.5438C5.61294 18.6537 5.61294 18.7838 5.53796 18.8369Z"
                        fill="rgb(248, 247, 246)"
                        style={colourShifterGithub}
                      />
                      <animated.path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M6.18497 19.5147C6.11932 19.5884 5.97948 19.5686 5.87714 19.4681C5.77241 19.3699 5.74325 19.2305 5.8091 19.1569C5.87555 19.083 6.01618 19.1038 6.11932 19.2035C6.22325 19.3015 6.25499 19.4419 6.18497 19.5147Z"
                        fill="rgb(248, 247, 246)"
                        style={colourShifterGithub}
                      />
                      <animated.path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M7.07753 19.9083C7.04857 20.0038 6.9139 20.0471 6.77823 20.0066C6.64276 19.9648 6.55409 19.8531 6.58147 19.7566C6.60963 19.6606 6.7449 19.6154 6.88157 19.6588C7.01684 19.7003 7.1057 19.8113 7.07753 19.9083Z"
                        fill="rgb(248, 247, 246)"
                        style={colourShifterGithub}
                      />
                      <animated.path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M8.05776 19.9814C8.06114 20.0818 7.94609 20.1651 7.80368 20.1668C7.66047 20.1702 7.54464 20.0889 7.54305 19.99C7.54305 19.8886 7.65552 19.806 7.79872 19.8036C7.94114 19.8008 8.05776 19.8815 8.05776 19.9814Z"
                        fill="rgb(248, 247, 246)"
                        style={colourShifterGithub}
                      />
                      <animated.path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M8.96996 19.8234C8.98702 19.9214 8.88804 20.0221 8.74662 20.0487C8.60758 20.0748 8.47885 20.0142 8.4612 19.917C8.44395 19.8165 8.54471 19.7159 8.68355 19.6898C8.82517 19.6648 8.95191 19.7237 8.96996 19.8234Z"
                        fill="rgb(248, 247, 246)"
                        style={colourShifterGithub}
                      />
                    </svg>
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
          <div className="filler-div">
            <div className="filler-inner"> </div>
            <div className="arrow-btn prev-btn">
              <div className="btn-bg"></div>
              <img src="/svg/chevron.svg" alt="" />
              <p>Previous</p>
            </div>
            <div className="arrow-btn pause-btn">
              <div className="btn-bg"></div>
              <img src="/svg/pause-thin.svg" alt="" />
              <p>Pause</p>
            </div>
            <div className="arrow-btn next-btn">
              <div className="btn-bg"></div>
              <img src="/svg/chevron.svg" alt="" />
              <p>Next</p>
            </div>
          </div>

          <div className="work-body__right">
            <div className="work-tools__wrapper">
              {project.tools.map((tool, index) => (
                <div key={index} className="work-tools__item">
                  <p>{tool}</p>
                  <div
                    className={`tool-spacer__line ${
                      index == project.tools.length - 1 ? "no-border" : ""
                    }`}
                  ></div>
                </div>
              ))}
            </div>
            <p className="work-description">{project.description}</p>
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
              <div className="work-credits__wrapper">
                {project.credits == "N/A" ? (
                  <></> // don't render credits if not applicable
                ) : (
                  <>
                    <p className="work-overview__title">Credits</p>
                    {Object.entries(project.credits).map(([key, value]) => (
                      <div key={key} className="work-credits__inner">
                        {project.title == "Torotoro" ? (
                          ""
                        ) : (
                          <div className="credit-role">
                            <p>{key.charAt(0).toUpperCase() + key.slice(1)}</p>
                          </div>
                        )}
                        <div className="credit-name">
                          <p>{value}</p>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default WorkContent;
