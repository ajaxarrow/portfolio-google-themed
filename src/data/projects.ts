import {SearchItem} from "../interfaces/link.interface.ts";
import nomcaarrd from "../assets/icons/nomcaarrd.png";
import idmdr from "../assets/images/idmdr.png"
import virtualclass from "../assets/icons/virtualclass.png"
import portfolio from "../assets/images/portfolio.png"
import mk from "../assets/images/mk.png"
import portfolioIcon from "../assets/logo.jpg"

export const projects: SearchItem[] = [
  {
    name: 'LINNKS',
    title: 'LINNKS',
    link: 'https://idmdr.netlify.app/',
    id: 'linnks',
    description: 'Discover LINNKS: a powerful data mapping and repository platform designed to streamline project management and organize data tagging across multiple locations effortlessly.',
    icon: nomcaarrd,
    image: idmdr
  },
  {
    name: 'Virtual Class',
    title: 'Virtual Class',
    link: 'https://mkvirtualclass.com/',
    id: 'virtual-class',
    description: "Contributed as a backend developer and data engineer, while also assisting in UI/UX design. Virtual Class is an interactive laboratory that complements the 'Vascular Plants in Mt. Pigngalngalan' workbook, offering a digital environment for studying plant taxonomy, morphology, and ecology. ",
    icon: virtualclass,
    image: mk
  },
  {
    name: 'Portfolio',
    title: 'Google Themed Portfolio',
    link: 'https://ajaxarrow.netlify.app/',
    id: 'portfolio',
    description: 'Explore Jiu Axl Tabilla’s Google-themed portfolio, showcasing his innovative projects, versatile skills, and professional journey in a sleek, modern design.',
    icon: portfolioIcon,
    image: portfolio
  },
]