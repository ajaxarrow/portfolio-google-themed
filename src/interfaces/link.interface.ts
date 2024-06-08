import {defineComponent} from "vue";

type CustomComponent = ReturnType<typeof defineComponent>;
interface Link{
  name: string;
  link: string;
  icon: CustomComponent
  color: string;
}

export type {Link}