import {SearchItem} from "../interfaces/link.interface.ts";
import facebook from "../assets/icons/facebook.png";
import github from "../assets/icons/github.png";
import linkedin from "../assets/icons/linkedin.png";
import mail from "../assets/icons/gmail.png";
import webpage from "../assets/icons/globe.png";

export const socialItems: SearchItem[] = [
  {
    name: 'LinkedIn',
    title: 'LinkedIn Profile - Jiu Axl R. Tabilla',
    link: 'https://www.linkedin.com/in/jiu-axl-tabilla-9bb659303/',
    id: 'linkedin',
    description: 'Connect with me on LinkedIn.',
    tags: ['contact', 'hire', 'message'],
    icon: linkedin
  },
  {
    name: 'GitHub',
    title: 'GitHub: ajaxarrow',
    link: 'https://github.com/ajaxarrow',
    id: 'github',
    description: 'Code and repositories.',
    tags: ['code', 'source', 'repos'],
    icon: github
  },
  {
    name: 'Gmail',
    title: 'Email - axldamnaxl@gmail.com',
    link: 'mailto:axldamnaxl@gmail.com',
    id: 'email',
    description: 'Fastest way to reach me.',
    tags: ['contact', 'hire', 'mail', 'gmail'],
    icon: mail
  },
  {
    name: 'Facebook',
    title: 'Facebook - Axl',
    link: 'https://web.facebook.com/jiushiii/',
    id: 'facebook',
    description: 'Connect with Axl on Facebook',
    icon: facebook
  },
  {
    name: 'Resume',
    title: 'Résumé: Jiu Axl R. Tabilla (PDF)',
    link: '/resume.pdf',
    id: 'resume',
    description: 'Two-page PDF: experience, skills, awards.',
    tags: ['cv', 'resume', 'pdf', 'download', 'hire'],
    icon: webpage
  }
]