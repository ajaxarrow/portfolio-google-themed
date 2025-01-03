import {SearchItem} from "../interfaces/link.interface.ts";
import facebook from "../assets/icons/facebook.png";
import github from "../assets/icons/github.png";
import linkedin from "../assets/icons/linkedin.png";
import mail from "../assets/icons/gmail.png";

export const socialItems: SearchItem[] = [
  {
    name: 'LinkedIn',
    title: 'LinkedIn Profile - Jiu Axl R. Tabilla',
    link: 'https://www.linkedin.com/in/jiu-axl-tabilla-9bb659303/',
    id: 'linkedin',
    description: 'Connect with me in LinkedIn',
    icon: linkedin
  },
  {
    name: 'GitHub',
    title: 'Github - AjaxArrow',
    link: 'https://github.com/ajaxarrow',
    id: 'github',
    description: 'View my projects and repositories here',
    icon: github
  },
  {
    name: 'Gmail',
    title: 'Email - axldamnaxl@gmail.com',
    link: 'https://mail.google.com/mail/u/0/?fs=1&to=axldamnaxl@gmail.com&tf=cm',
    id: 'email',
    description: 'Send me an email',
    icon: mail
  },
  {
    name: 'Facebook',
    title: 'Facebook - Axl',
    link: 'https://web.facebook.com/axlsunflower00/',
    id: 'facebook',
    description: 'Connect with Axl on Facebook',
    icon: facebook
  }
]