<script setup lang="ts">
import SidePanel from "./SidePanel.vue";
import {PhCaretDown, PhGlobe, PhGraduationCap, PhMapPin, PhTrophy, PhUser} from "@phosphor-icons/vue";

defineProps<{ compact?: boolean }>();

interface SkillRow {
  label: string;
  items: string[];
}

// The tools from the "Technical Skills" section of public/resume.pdf, one row
// per group so the whole stack reads at a glance.
const toolRows: SkillRow[] = [
  {label: 'Languages', items: ['Python', 'TypeScript', 'JavaScript', 'PHP', 'Dart']},
  {label: 'Backend', items: ['Django', 'Laravel', 'Express.js', 'REST APIs']},
  {label: 'Frontend', items: ['Vue.js', 'React', 'Next.js', 'HTML', 'CSS']},
  {label: 'Mobile', items: ['Flutter']},
  {label: 'Data', items: ['PostgreSQL', 'MySQL', 'SQLite', 'Supabase', 'Firebase']},
  {label: 'Cloud', items: ['AWS (Lightsail, RDS, IAM)', 'Azure DevOps', 'Git', 'GitHub']},
  {label: 'Design', items: ['Figma', 'UI/UX prototyping']},
];

// The non-tool lines of the résumé's skills section, kept as one sentence.
const practices = 'Backend architecture, database design and data engineering; API and integration testing, debugging, issue triage and code review; AI-assisted development with Claude and ChatGPT.';

const facts = [
  {icon: PhUser, label: 'Full name', value: 'Jiu Axl Ramos Tabilla (Axl)'},
  {icon: PhMapPin, label: 'Based in', value: 'Bukidnon, Philippines (UTC+8)'},
  {icon: PhGlobe, label: 'Works', value: 'Remote, with flexible timezone overlap'},
  {icon: PhGraduationCap, label: 'Education', value: 'BS Information Technology, Magna Cum Laude, Central Mindanao University (2021 - 2025)'},
];

const awards = [
  {title: 'Champion', event: 'DIGIMC 2025 Reverse Pitching Competition'},
  {title: 'Champion', event: 'Innova Hackathon 2024'},
  {title: '2nd place', event: 'HABI Workshop, 2025 National Innovation Day'},
  {title: 'Co-author', event: 'CyberSciTech 2025 paper'},
];
</script>

<template>
  <SidePanel :compact="compact">
    <p class="profile-bio">
      Two years shipping production SaaS in Python and Django: compliance automation, AWS Marketplace tooling and two-sided marketplaces for an Ontario-based software company.
    </p>

    <!-- On phones and tablets the panel sits above the results, so the details
         fold away behind a toggle; in the desktop side column they are always open. -->
    <component :is="compact ? 'details' : 'div'" class="profile-more">
      <summary v-if="compact" class="profile-more-summary">
        Details, awards and tech stack
        <PhCaretDown size="16" class="profile-more-caret" aria-hidden="true"/>
      </summary>

      <ul class="profile-facts">
        <li v-for="fact in facts" :key="fact.label">
          <component :is="fact.icon" size="18" class="profile-fact-icon" aria-hidden="true"/>
          <span><strong>{{ fact.label }}:</strong> {{ fact.value }}</span>
        </li>
      </ul>

      <h3 class="profile-section-title">Awards and recognition</h3>
      <ul class="profile-awards">
        <li v-for="award in awards" :key="award.event">
          <PhTrophy size="18" class="profile-award-icon" aria-hidden="true"/>
          <span>
            <span class="profile-award-title">{{ award.title }}</span>
            <span class="profile-award-event">{{ award.event }}</span>
          </span>
        </li>
      </ul>

      <h3 class="profile-section-title">Tech stack</h3>
      <dl class="stack-rows">
        <div v-for="row in toolRows" :key="row.label">
          <dt>{{ row.label }}</dt>
          <dd>{{ row.items.join(' · ') }}</dd>
        </div>
      </dl>
      <p class="stack-practices"><span>Also:</span> {{ practices }}</p>
    </component>
  </SidePanel>
</template>

<style scoped>
.profile-bio{
  font-size: 15px;
  line-height: 1.55;
}

.profile-facts{
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 18px 0 0;
  padding: 0;
  list-style: none;
}

.profile-facts li{
  display: flex;
  align-items: flex-start;
  gap: 12px;
  font-size: 14px;
  line-height: 1.45;
}

.profile-fact-icon{
  flex-shrink: 0;
  margin-top: 1px;
  color: var(--meta);
}

.profile-facts strong{ font-weight: 600; }

.profile-section-title{
  margin: 24px 0 10px;
  padding-top: 20px;
  border-top: 1px solid var(--grey-200);
  font-size: 16px;
  font-weight: 600;
}

.profile-awards{
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.profile-awards li{
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.profile-award-icon{
  flex-shrink: 0;
  margin-top: 2px;
  color: var(--meta);
}

.profile-award-title{
  display: block;
  font-size: 12px;
  font-weight: 600;
  color: var(--meta);
}

.profile-award-event{
  display: block;
  font-size: 14px;
  line-height: 1.35;
}

/* Label column + plain list: the whole stack in a few lines instead of a wall of chips. */
.stack-rows{
  overflow: hidden;
  border: 1px solid var(--grey-200);
  border-radius: 12px;
  background-color: var(--surface);
}

.stack-rows > div{
  display: grid;
  grid-template-columns: 84px minmax(0, 1fr);
  gap: 12px;
  padding: 9px 14px;
  border-top: 1px solid var(--grey-200);
}

.stack-rows > div:first-child{ border-top: 0; }

.stack-rows dt{
  color: var(--meta);
  font-size: 12px;
  font-weight: 600;
  line-height: 20px;
}

.stack-rows dd{
  font-size: 14px;
  line-height: 20px;
}

.stack-practices{
  margin-top: 12px;
  color: var(--meta);
  font-size: 13px;
  line-height: 1.5;
}

.stack-practices span{ font-weight: 600; }

.profile-more-summary{
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 44px;
  margin-top: 8px;
  color: var(--google-link);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  list-style: none;
}

.profile-more-summary::-webkit-details-marker{ display: none; }

.profile-more-caret{ transition: transform var(--duration-base) var(--ease-out-quart); }
details.profile-more[open] .profile-more-caret{ transform: rotate(180deg); }
</style>
