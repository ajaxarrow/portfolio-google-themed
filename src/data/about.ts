import { SearchItem } from "../interfaces/link.interface.ts";
import webpage from "../assets/icons/globe.png";
import buzzerboy from "../assets/icons/buzzerboy.png";

export const about: SearchItem[] = [
  {
    name: 'Overview',
    title: 'About the Developer',
    link: 'https://ajaxarrow.netlify.app/about#summary',
    id: 'overview',
    description: 'My name is Jiu Axl R. Tabilla. I am a dedicated developer with expertise in crafting interactive, user-focused designs that elevate digital experiences. Known for being adaptable and resourceful, I excel at keeping pace with evolving industry trends.',
    icon: webpage,
  },
  {
    name: 'Experience (Current)',
    title: 'Product UI Developer - Buzzerboy Inc',
    link: 'https://buzzerboy.com/',
    id: 'buzzerboy',
    description: "Currently employed remotely at Buzzerboy Inc, a Canadian software solutions company. My role primarily involves designing UI screens using existing components, as well as performing quality assurance tasks by testing applications and logging issues.",
    icon: buzzerboy,
  },
  {
    name: 'Experience (June 2024 - December 2024)',
    title: 'Flutter Developer - Freelance',
    link: 'https://ajaxarrow.netlify.app/about#flutter-developer',
    id: 'flutter-developer',
    description: "Gained freelance experience as a Flutter developer, working on projects such as a cross-platform consultation app and an ice detection application integrated with a machine learning model. In the latter project, I collaborated with a team of three but did not work directly on the model.",
    icon: webpage,
  },
  {
    name: 'Experience (January 2024 - May 2024)',
    title: 'Full Stack Developer - Freelance',
    link: 'https://ajaxarrow.netlify.app/about#fullstack-developer',
    id: 'fullstack-developer',
    description: "Worked as a Full Stack developer in a team to create an interactive laboratory website. Responsibilities included frontend development using React, backend development, and engineering database designs to support application functionality.",
    icon: webpage,
  },
  {
    name: 'Awards and Recognitions',
    title: 'Innova Hackathon - Champion',
    link: 'https://web.facebook.com/cmucisc/posts/pfbid02zTvbKGfgGyYJ9H8bbPkmJ9RSd4mCtSHShcugg7JXLNmRS1GxjApvVa1FY5XYmsVQl',
    id: 'hackathon-champion',
    description: "Participated in the Innova Hackathon, where our team won first place for developing 'Farmaid,' a farm-to-table mobile app that eliminates intermediaries. I contributed as a project manager and worked on the application's user interface design.",
    icon: webpage,
  },
];
