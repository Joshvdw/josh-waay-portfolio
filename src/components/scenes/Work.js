import ProgressBar from "../UI/ProgressBar"
import WorkControls from "../UI/WorkControls"
import WorkTimeline from "../UI/WorkTimeline"
import WorkContent from "./WorkContent"

const Work = () => {
  return (
    <div>Work
      <WorkContent />
      <WorkControls />
      <ProgressBar />
      <WorkTimeline />
    </div>
  )
}

export default Work