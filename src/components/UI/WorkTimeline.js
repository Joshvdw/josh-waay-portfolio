import { workData } from "@/data/workData";

const WorkTimeline = ({ counter }) => {
  return (
    <div className="timeline-wrapper">
      {workData.map((item, index) => (
        <div
          key={index}
          className={`timeline-item ${
            index === counter ? "active-project" : ""
          }`}
        ></div>
      ))}
    </div>
  );
};

export default WorkTimeline;
