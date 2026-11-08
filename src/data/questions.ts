import { QnAItem } from "../interfaces/link.interface.ts";

const link = (href: string, label: string, external = false) =>
  `<a href="${href}" class="text-decoration-underline text-primary"${external ? ' target="_blank" rel="noopener noreferrer"' : ''}>${label}</a>`;

const aboutQuestions: QnAItem[] = [
  {
    question: "What did you build at Buzzerboy?",
    answer: `I led development of StraightLine, TechRepNetwork and Visage, and was a core developer on SocBridge and IronFort. I started part-time in July 2024 and was promoted to full-time Product Engineer in 13 months. See the ${link('/projects', 'full list of projects')}.`
  },
  {
    question: "Are you a designer or a developer?",
    answer: `Both, and I try to keep them in one loop. I designed LINNKS in Figma, then built it as the frontend developer in Vue.js, taking one product from Figma to production. My ${link('/designs', 'UI designs')} are all clickable Figma prototypes.`
  },
  {
    question: "What is your tech stack?",
    answer: "Python, Django and REST APIs on the backend, with Laravel when the project calls for it. Vue.js on the frontend, PostgreSQL for data, and AWS (Lightsail, RDS, IAM) for deployment. I also design in Figma."
  },
  {
    question: "Do you work remotely across time zones?",
    answer: "Yes. I am in Bukidnon, Philippines (UTC+8) and I already work remotely with a team based in Ontario, Canada."
  },
  {
    question: "How do you use AI in your work?",
    answer: "Daily, for development, debugging and code review, with Claude and ChatGPT. The architecture and data models are still mine, as with StraightLine's backend."
  },
  {
    question: "What is the best way to reach you?",
    answer: `Email is best: ${link('mailto:axldamnaxl@gmail.com', 'axldamnaxl@gmail.com')}. You can also call or message ${link('tel:+639631788461', '+63 963 178 8461')}, find me on ${link('https://www.linkedin.com/in/jiu-axl-tabilla-9bb659303/', 'LinkedIn', true)}, or grab my ${link('/resume.pdf', 'résumé (PDF)', true)}.`
  },
  {
    question: "Are you available for work?",
    answer: "Yes. I am open to full-time remote roles, freelance gigs, collaborations and part-time work."
  },
  {
    question: "What are your strengths?",
    answer: "Moving fast without leaving a mess. I shipped the EcoTrail landing page in two hours as a timed challenge, and the KahibawHub app screens in two days by reusing components from earlier projects. At Buzzerboy that turned into leading StraightLine, TechRepNetwork and Visage, and a promotion from part-time to full-time within 13 months."
  },
  {
    question: "What are your hobbies?",
    answer: "I enjoy reading books, with 'The Alchemist' by Paulo Coelho being one of my favorites. I also love listening to pop-punk music."
  },
];

const overviewQuestions: QnAItem[] = [
  {
    question: "What is the quickest way to see your best work?",
    answer: `Open ${link('/projects', 'Projects')}. It leads with the production SaaS work from Buzzerboy: StraightLine, IronFort, SocBridge, TechRepNetwork and Visage.`
  },
  {
    question: "Is this a real search engine?",
    answer: `No, but the search box works. Try ${link('/all?q=django', 'django')}, ${link('/all?q=figma', 'figma')} or ${link('/all?q=champion', 'champion')}.`
  },
];

export { aboutQuestions, overviewQuestions };
