import {PhBriefcase, PhCode, PhFigmaLogo, PhImages, PhEnvelopeSimple, PhInstagramLogo, PhTextIndent, PhUserRectangle} from "@phosphor-icons/vue";
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
    name: 'Case Studies',
    link: '/case-studies',
    color: '#1A73E8',
    icon: PhBriefcase
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
  {
    name: 'Contact',
    link: '/contact',
    color: '#C5221F',
    icon: PhEnvelopeSimple
  },
  {
    name: 'Images',
    link: '/images',
    color: '#E8710A',
    icon: PhImages
  },
]