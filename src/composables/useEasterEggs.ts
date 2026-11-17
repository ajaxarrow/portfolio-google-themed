import {createGlobalState} from '@vueuse/core';
import {ref} from 'vue';

interface EasterEgg {
  id: string;
  /** Pre-lowercased exact-match phrases. Exact match (not fuzzy/substring) is
   *  deliberate: real navigation attempts typed into the search box are short
   *  slash/hyphen paths, never multi-word phrases, so this can never collide
   *  with a legitimate route. */
  triggers: string[];
  kind: 'transform' | 'toast';
  className?: string;
  /** A string, or a function for answers that change each time (coin, dice). */
  toastMessage: string | (() => string);
}

export const KONAMI_SEQUENCE = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'b', 'a',
];

const EGG_REGISTRY: EasterEgg[] = [
  {
    id: 'barrel-roll',
    triggers: ['do a barrel roll', 'barrel roll'],
    kind: 'transform',
    className: 'egg-barrel-roll',
    toastMessage: 'Did a barrel roll.',
  },
  {
    id: 'askew',
    triggers: ['askew', 'tilt'],
    kind: 'transform',
    className: 'egg-askew',
    toastMessage: "Everything's a little askew.",
  },
  {
    id: 'blink',
    triggers: ['blink html', 'blink', '<blink>'],
    kind: 'transform',
    className: 'egg-blink',
    toastMessage: 'Links are blinking like it is 1998.',
  },
  {
    id: 'recursion',
    triggers: ['recursion'],
    kind: 'toast',
    toastMessage: 'Did you mean: recursion',
  },
  {
    id: 'answer',
    triggers: ['the answer to life the universe and everything', 'answer to life', '42'],
    kind: 'toast',
    toastMessage: '42',
  },
  {
    id: 'coin',
    triggers: ['flip a coin', 'coin flip'],
    kind: 'toast',
    toastMessage: () => (Math.random() < 0.5 ? 'Heads.' : 'Tails.'),
  },
  {
    id: 'dice',
    triggers: ['roll a dice', 'roll a die', 'roll dice'],
    kind: 'toast',
    toastMessage: () => `You rolled a ${Math.floor(Math.random() * 6) + 1}.`,
  },
  {
    id: 'konami-note',
    triggers: [],
    kind: 'toast',
    toastMessage: 'Cheat code accepted. This whole site started as a joke about how often recruiters just Google a candidate\'s name, and you just found the secret menu.',
  },
  {
    id: 'ajaxarrow',
    triggers: ['ajaxarrow', 'ajax arrow'],
    kind: 'toast',
    toastMessage: 'Ajax. Arrow functions. My GitHub handle is just two JS features I use constantly (github.com/ajaxarrow).',
  },
  {
    id: 'the-alchemist',
    triggers: ['the alchemist'],
    kind: 'toast',
    toastMessage: "Good taste, that's my favorite book too. Pop-punk's still on repeat while I code, by the way.",
  },
];

function normalize(query: string): string {
  return query.trim().replace(/^\//, '').replace(/\s+/g, ' ').toLowerCase();
}

const toastMessage = ref('');
const toastVisible = ref(false);
const pendingEgg = ref<EasterEgg | null>(null);
const triggerToken = ref(0);

function fire(egg: EasterEgg) {
  pendingEgg.value = egg;
  triggerToken.value++;
  toastMessage.value = typeof egg.toastMessage === 'function' ? egg.toastMessage() : egg.toastMessage;
  toastVisible.value = true;
}

export const useEasterEggs = createGlobalState(() => {
  function tryTrigger(query: string): boolean {
    const normalized = normalize(query);
    if (!normalized) return false;
    const egg = EGG_REGISTRY.find((candidate) => candidate.triggers.includes(normalized));
    if (!egg) return false;
    fire(egg);
    return true;
  }

  function triggerById(id: string) {
    const egg = EGG_REGISTRY.find((candidate) => candidate.id === id);
    if (egg) fire(egg);
  }

  return {toastMessage, toastVisible, pendingEgg, triggerToken, tryTrigger, triggerById};
});
