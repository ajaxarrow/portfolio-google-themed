import {defineComponent} from "vue";

type CustomComponent = ReturnType<typeof defineComponent>;
interface Link{
  name: string;
  link: string;
  icon: CustomComponent
  color: string;
}

interface SearchItem{
  name: string;
  title: string;
  link: string;
  id: string;
  image?: string;
  description: string;
  icon?: string;
  date?: string;
  visible?: boolean;
  /** One line: what I did on this, e.g. "Lead full-stack Django developer". */
  role?: string;
  /** Stack / skills shown under the title and matched by search. */
  stack?: string[];
  /** Extra search keywords not shown on screen. */
  tags?: string[];
  featured?: boolean;
}

interface QnAItem{
  question: string;
  answer: string;
}

export type {Link, SearchItem, QnAItem}