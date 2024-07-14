import { workData } from "@/data/workData";

const WorkContent = ({ counter }) => {
  const project = workData[counter];

  return (
    <div className="work-wrapper__outer">
      <div className="work-wrapper__inner">
        <div className="work-header__wrapper">
          <div className="work-header__inner">
            <h1>{project.title}</h1>
            <div className="work-link__wrapper">
              <a href={project.link} target="_blank" rel="noopener noreferrer">
                <img src="/svg/link.svg" alt="Live Link Icon" />
              </a>
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src="/svg/github.svg" alt="Github Icon" />
                </a>
              )}
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
          <div className="filler-div"></div>
          <div className="work-body__right">
            <div className="work-tools__wrapper">
              {project.tools.map((tool, index) => (
                <div
                  key={index}
                  className={`work-tools__item ${
                    index == project.tools.length - 1 ? "no-border" : ""
                  }`}
                >
                  <p>{tool}</p>
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
                <div className="work-overview__item">
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
                      <div className="work-credits__inner">
                        {project.title == "Torotoro" ? (
                          ""
                        ) : (
                          <div className="credit-role">
                            <p key={key}>
                              {key.charAt(0).toUpperCase() + key.slice(1)}
                            </p>
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
