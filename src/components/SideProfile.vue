<script setup lang="ts">
import Profile from '../assets/images/closeup.jpg'
import ProfileWide from '../assets/images/profile-wide.jpg'

defineProps<{ compact?: boolean }>();

interface SkillCategory {
  label: string;
  skills: string[];
}

// Mirrors the "Technical Skills" section of public/resume.pdf, 1:1.
const skillCategories: SkillCategory[] = [
  {label: 'Languages', skills: ['Python', 'JavaScript', 'TypeScript', 'PHP', 'Dart']},
  {label: 'Backend', skills: ['Django', 'Laravel', 'Express.js', 'REST API Development', 'API Integration']},
  {label: 'Frontend', skills: ['Vue.js', 'React', 'Next.js', 'HTML', 'CSS']},
  {label: 'Mobile', skills: ['Flutter']},
  {label: 'Databases', skills: ['PostgreSQL', 'MySQL', 'SQLite', 'Firebase', 'Supabase', 'SQL']},
  {label: 'Cloud & DevOps', skills: ['AWS (Lightsail, RDS, IAM)', 'Azure DevOps', 'Git', 'GitHub']},
  {label: 'Testing & Quality', skills: ['Manual and API/Integration Testing', 'Debugging', 'Issue Triage', 'Code Review']},
  {label: 'Architecture & Practices', skills: ['Full-Stack Development', 'Backend Architecture', 'Database Design', 'Data Engineering']},
  {label: 'Additional', skills: ['AI-Assisted Development (Claude, ChatGPT)', 'Figma', 'UI/UX Prototyping']},
];

const fields = [
  {label: 'Role', value: 'Full-Stack Software Engineer'},
  {label: 'Based in', value: 'Bukidnon, Philippines'},
  {label: 'Available for', value: 'Remote work, flexible timezone overlap'},
  {label: 'Education', value: 'Magna Cum Laude, BS Information Technology, Central Mindanao University (2021 - 2025)'},
];

const highlights = [
  'Champion, DIGIMC 2025 Reverse Pitching Competition',
  'Champion, Innova Hackathon 2024',
  '2nd place, HABI Workshop, 2025 National Innovation Day',
  'Co-author, CyberSciTech 2025 paper',
];

const actions = [
  {label: 'Résumé (PDF)', href: '/resume.pdf', primary: true},
  {label: 'Email', href: 'mailto:axldamnaxl@gmail.com'},
  {label: 'LinkedIn', href: 'https://www.linkedin.com/in/jiu-axl-tabilla-9bb659303/'},
  {label: 'GitHub', href: 'https://github.com/ajaxarrow'},
];
</script>

<template>
  <section class="side-profile-container" :class="{ 'side-profile-container--compact': compact }" aria-label="Profile summary">
    <div class="d-flex align-center ga-2">
      <img :src="Profile" alt="Portrait of Jiu Axl Tabilla" class="avatar" width="80" height="80">
      <div>
        <h2 class="text-name">Jiu Axl R. Tabilla</h2>
        <p class="text-role">Full-Stack Software Engineer</p>
      </div>
    </div>

    <div class="actions my-4">
      <a
        v-for="action in actions"
        :key="action.label"
        :href="action.href"
        :target="action.href.startsWith('mailto:') ? undefined : '_blank'"
        rel="noopener noreferrer"
        class="action"
        :class="{ 'action--primary': action.primary }"
      >{{ action.label }}</a>
    </div>

    <img v-if="!compact" :src="ProfileWide" alt="Jiu Axl Tabilla standing outdoors at night" class="avatar-wide mb-4" width="600" height="450">
    <p class="bio-text my-4">
      Two years shipping production SaaS in Python and Django: compliance automation, AWS Marketplace tooling and two-sided marketplaces for an Ontario-based software company.
    </p>

    <VDivider class="my-4"/>
    <div class="field-group">
      <div v-for="field in fields" :key="field.label" class="field">
        <p class="field-label">{{ field.label }}</p>
        <p class="field-value">{{ field.value }}</p>
      </div>
      <div class="field">
        <p class="field-label">Highlights</p>
        <ul class="highlights">
          <li v-for="item in highlights" :key="item">{{ item }}</li>
        </ul>
      </div>
    </div>

    <VDivider class="my-4"/>
    <div class="skills-section">
      <h3 class="section-title mb-3">Skills</h3>
      <div v-for="category in skillCategories" :key="category.label" class="skill-category">
        <p class="field-label">{{ category.label }}</p>
        <div class="chip-row">
          <span v-for="skill in category.skills" :key="skill" class="skill-chip">{{ skill }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
  .side-profile-container{
    background-color: var(--grey-50);
    border-radius: 16px;
    max-width: 600px !important;
    padding: 24px;
  }

  .avatar{
    height: 80px;
    width: 80px;
    border-radius: 16px;
    object-fit: cover;
  }

  .avatar-wide{
    width: 100%;
    aspect-ratio: 4 / 3;
    object-fit: cover;
    object-position: center 55%;
    border-radius: 16px;
    display: block;
  }

  .text-name{
    font-size: 20px;
    font-weight: 500;
    line-height: 1.3;
    color: var(--ink);
  }

  .text-role{
    font-size: 14px;
    color: var(--meta);
  }

  .bio-text{
    font-size: 14px;
    line-height: 1.5;
    color: var(--ink);
  }

  .section-title{
    font-weight: 600;
    font-size: 18px;
    color: var(--ink);
  }

  .field-group{
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .field-label{
    font-size: 12px;
    font-weight: 600;
    color: var(--meta);
    margin-bottom: 2px;
  }

  .field-value{
    font-size: 14px;
    color: var(--ink);
    line-height: 1.4;
  }

  .skills-section{
    display: flex;
    flex-direction: column;
  }

  .skill-category{
    margin-bottom: 16px;
  }

  .skill-category:last-child{
    margin-bottom: 0;
  }

  .chip-row{
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  .actions{
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .action{
    display: inline-flex;
    align-items: center;
    min-height: 44px;
    padding: 0 16px;
    border-radius: 9999px;
    border: 1px solid var(--grey-300);
    background-color: var(--surface);
    color: var(--ink);
    font-size: 14px;
    font-weight: 500;
    text-decoration: none;
    transition: background-color var(--duration-fast) var(--ease-out-quart);
  }

  .action:hover{
    background-color: var(--grey-200);
  }

  .action--primary{
    background-color: var(--google-link);
    border-color: var(--google-link);
    color: #fff;
  }

  .action--primary:hover{
    background-color: #1558b0;
  }

  .highlights{
    margin: 0;
    padding-left: 18px;
    font-size: 14px;
    line-height: 1.5;
    color: var(--ink);
  }

  .side-profile-container--compact{
    margin-bottom: 24px;
  }

  .skill-chip{
    font-size: 12px;
    font-weight: 500;
    color: var(--ink);
    background-color: var(--grey-100);
    padding: 4px 10px;
    border-radius: 8px;
  }
</style>