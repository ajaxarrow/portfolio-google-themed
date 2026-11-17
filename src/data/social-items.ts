import {SearchItem} from "../interfaces/link.interface.ts";
import github from "../assets/icons/github.png";
import linkedin from "../assets/icons/linkedin.png";
import mail from "../assets/icons/gmail.png";
import webpage from "../assets/icons/globe.png";

export const socialItems: SearchItem[] = [
  {
    name: 'Contact',
    title: 'Contact form: tell me what you are building',
    link: '/contact',
    id: 'contact-form',
    description: 'The quickest way to start a project. Your message lands in my inbox and you get a confirmation by email.',
    tags: ['contact', 'hire', 'message', 'form', 'project', 'email'],
    icon: mail
  },
  {
    name: 'Email',
    title: 'Email: axldamnaxl@gmail.com',
    link: 'mailto:axldamnaxl@gmail.com',
    id: 'email',
    description: 'Prefer your own mail app? Write to me directly.',
    tags: ['contact', 'hire', 'mail', 'gmail'],
    icon: mail
  },
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
    name: 'Resume',
    title: 'Résumé: Jiu Axl R. Tabilla (PDF)',
    link: '/resume.pdf',
    id: 'resume',
    description: 'Two-page PDF: experience, skills, awards.',
    tags: ['cv', 'resume', 'pdf', 'download', 'hire'],
    icon: webpage
  }
]