import {PhCode, PhFigmaLogo, PhInstagramLogo, PhTextIndent, PhUserRectangle} from "@phosphor-icons/vue";
import {Link} from "../interfaces/link.interface.ts";


export const links: Link[] = [
  {
    name: 'All',
    link: '/all',
    color: '#006180',
    icon: PhTextIndent
  },
  {
    name: 'About Me',
    link: '/about',
    color: '#4D1683',
    icon: PhUserRectangle
  },
  {
    name: 'Projects',
    link: '/projects',
    color: '#3744B3',
    icon: PhCode
  },
  {
    name: 'Designs',
    link: '/designs',
    color: '#AC207D',
    icon: PhFigmaLogo
  },
  {
    name: 'Socials',
    link: '/socials',
    color: '#819D12',
    icon: PhInstagramLogo
  },
]