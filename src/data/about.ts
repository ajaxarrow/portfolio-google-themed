import { SearchItem } from "../interfaces/link.interface.ts";
import webpage from "../assets/icons/globe.png";
import buzzerboy from "../assets/icons/buzzerboy.png";
import education from "../assets/icons/education.png";

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
    name: 'Magna Cum Laude, BSIT',
    title: 'Education',
    link: 'https://ajaxarrow.netlify.app/about#education',
    id: 'education',
    description: "I earned my Bachelor of Science in Information Technology, major in Software Development, from Central Mindanao University, graduating with the distinction of Magna Cum Laude.",
    icon: education,
  },
  {
    name: 'Experience (July 2024 - July 2025)',
    title: 'Product Engineer Developer - Buzzerboy Inc',
    link: 'https://buzzerboy.com/',
    id: 'buzzerboy',
    description: "Have experience working remotely at Buzzerboy Inc, a Canadian software solutions company. My role mainly focuses on designing UI screens with existing components, conducting quality assurance by testing applications and logging issues, while also contributing as a full-stack developer and handling data engineering tasks.",
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
    title: '2nd Place - HABI Workshop (Agriculture Sector)',
    link: 'https://web.facebook.com/100083342739076/posts/pfbid0A7L3hdJ3s6JFZgXjcE2HTKDhSJp1NPXSxCmPYbX4BnC9yXwUSgk6cM9eDyvFcjdal',
    id: 'habi-workshop-2nd-place',
    description: "Secured 2nd place during the 2025 National Innovation Day, themed 'FLIP: Forging Leaders of Innovation in the Philippines.' This recognition was part of the three-day HABI (Huddle. Analyze. Build. Innovate) Workshop held at Novotel Araneta, Quezon City, where our team showcased dedication, creativity, and teamwork in the Agriculture Sector challenge.",
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
  {
    name: 'Research and Collaborations',
    title: 'Collaborator - Design of KahibawHub: A Blockchain-Integrated Mobile Platform for Trusted Educational Content Sharing',
    link: 'https://ajaxarrow.netlify.app/about#researcg',
    id: 'kahibawhub-research',
    description: "Served as the mobile developer for the research project 'KahibawHub: A Blockchain-Integrated Mobile Platform for Trusted Educational Content Sharing.' This paper has been accepted as a regular paper and will be presented at CyberSciTech 2025.",
    icon: webpage,
  }
];
