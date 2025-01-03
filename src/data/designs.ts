import { SearchItem } from "../interfaces/link.interface.ts";
import figma from "../assets/icons/figma.png";
import sheesh from "../assets/images/sheesh.png";
import idmdr from "../assets/images/idmdr.png";
import payroll from "../assets/images/payroll.png";

export const designs: SearchItem[] = [
  {
    name: 'Sheesh',
    title: 'Sheesh: Shoe Cleaning and Repair Services Mobile Platform - UI Design',
    link: 'https://www.figma.com/proto/oijvNCjTjdhCSMdEQjh8lo/Sheesh?page-id=0%3A1&node-id=99-659&p=f&viewport=270%2C571%2C0.16&t=WK08MWBLG0c3XuaV-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=3%3A245',
    id: 'sheesh-ui',
    description: 'Dive into the sleek UI design of Sheesh, a modern mobile platform dedicated to simplifying shoe cleaning and repair services with user-friendly interfaces.',
    icon: figma,
    image: sheesh
  },
  {
    name: 'LINNKS',
    title: 'LINNKS - UI Design',
    link: 'https://www.figma.com/proto/AQpMfql8pUects40XKUVwk/Interactive-Mapping-Repository-Distribution?page-id=0%3A1&node-id=42-205&p=f&viewport=332%2C152%2C0.11&t=yGTbFLXKKUI040od-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=42%3A205',
    id: 'linnks-ui',
    description: 'Explore the intuitive UI design of LINNKS, an innovative platform designed for efficient data mapping, repository distribution, and project management.',
    icon: figma,
    image: idmdr
  },
  {
    name: 'Payroll System',
    title: 'Payroll System - UI Design',
    link: 'https://www.figma.com/proto/tkH1tMXlgEgVEgFMmtJshK/Payroll-System?page-id=0%3A1&node-id=9-428&p=f&viewport=66%2C218%2C0.06&t=I6CFt4slyn0sfBot-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=62%3A1936',
    id: 'payroll-ui',
    description: 'Discover the well-structured UI design of a payroll management system, crafted with reusable components from a robust design system.',
    icon: figma,
    image: payroll
  },
];
