import AboutData from "./aboutData";
import SkillsData from "./skillsData";
import ProjectData from "./projectsData";
import EducationData from "./educationData";
import ExperienceData from "./experienceData";
import CertificatesData from "./certificatesData";
import PublicationsData from "./publicationsData";
import NavbarData from "./navbarData";
import {
    horizontalParallaxLayers,
    verticalParallaxLayers,
} from './parallaxLayers'

interface PortfolioDataType {
    [fieldName: string]: Array<object>;
}

const PortfolioData: PortfolioDataType = {
    navBar: [
        ...NavbarData
    ],
    about: [
        ...AboutData,
    ],
    skills: [
        ...SkillsData,
    ],
    projects: [
        ...ProjectData,
    ],
    education: [
        ...EducationData,
    ],
    experience: [
        ...ExperienceData,
    ],
    certificates: [
        ...CertificatesData,
    ],
    publications: [
        ...PublicationsData,
    ],
    horizontalParallaxLayers: [ 
        ...horizontalParallaxLayers,
    ],
    verticalParallaxLayers: [
        ...verticalParallaxLayers,
    ],
};

export default PortfolioData;