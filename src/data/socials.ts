import {Link} from "../interfaces/link.interface.ts";
import {PhEnvelope, PhFilePdf, PhGithubLogo, PhLinkedinLogo} from "@phosphor-icons/vue";

export const socials: Link[] = [
  {
    name: 'LinkedIn',
    link: 'https://www.linkedin.com/in/jiu-axl-tabilla-9bb659303/',
    color: '#0077b5',
    icon: PhLinkedinLogo
  },
  {
    name: 'Email',
    link: 'https://mail.google.com/mail/u/0/?fs=1&to=axldamnaxl@gmail.com&tf=cm',
    color: '#c52626',
    icon: PhEnvelope
  },
  {
    name: 'Github',
    link: 'https://github.com/ajaxarrow',
    color: '#010810',
    icon: PhGithubLogo
  },
  {
    name: 'Resume',
    link: '/resume.pdf',
    color: '#F9A825',
    icon: PhFilePdf
  }
];

