import SocialSVG from "./svgs/SocialSVG";
import { socialLinks } from "@/data/personalData";

const Socials = () => {
  return (
    <div className="socials-wrapper">
      <SocialSVG icon="mail" link={socialLinks.mail} />
      <SocialSVG icon="linkedin" link={socialLinks.linkedin} />
      <SocialSVG icon="github" link={socialLinks.github} />
    </div>
  );
};

export default Socials;
