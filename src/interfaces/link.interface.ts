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
  icon?: string
}

interface QnAItem{
  question: string;
  answer: string;
}

export type {Link, SearchItem, QnAItem}