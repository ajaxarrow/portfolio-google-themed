<script setup lang="ts">
import Profile from '../assets/images/closeup.jpg'
import ProfileWide from '../assets/images/profile-wide.jpg'

interface SkillCategory {
  label: string;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {label: 'Programming Languages', skills: ['JavaScript', 'TypeScript', 'Dart', 'Python', 'PHP']},
  {label: 'UI/UX Design', skills: ['Figma', 'Design']},
  {label: 'Databases', skills: ['Firebase', 'Supabase', 'PostgreSQL', 'MySQL', 'SQLite']},
  {label: 'Frameworks', skills: ['VueJS', 'ReactJS', 'ExpressJS', 'Flutter', 'Laravel']},
  {label: 'Version Control', skills: ['Git', 'Github']},
];

const fields = [
  {label: 'Address', value: 'Purok-11, Lampanusan, Kalilangan, Bukidnon'},
  {label: 'Education', value: 'Magna Cum Laude, BS Information Technology Major in Software Development, Central Mindanao University (August 2021 - July 2025)'},
];
</script>

<template>
  <div class="side-profile-container">
    <div class="d-flex align-center ga-2">
      <img :src="Profile" alt="profile" class="avatar">
      <div>
        <p class="text-name">Jiu Axl R. Tabilla</p>
        <p class="text-role">UI/UX Designer | Frontend Developer</p>
      </div>
    </div>
    <img :src="ProfileWide" alt="Jiu Axl Tabilla standing outdoors at night" class="avatar-wide my-4">
    <p class="bio-text my-4">
      A dedicated software developer with extensive experience in full-stack development, specializing in JavaScript, Node.js, React, Vue, and Flutter. Committed to delivering high-quality, scalable applications through meticulous planning, innovative design, and efficient coding practices.
    </p>

    <VDivider class="my-4"/>
    <div class="field-group">
      <div v-for="field in fields" :key="field.label" class="field">
        <p class="field-label">{{ field.label }}</p>
        <p class="field-value">{{ field.value }}</p>
      </div>
    </div>

    <VDivider class="my-4"/>
    <div class="skills-section">
      <p class="section-title mb-3">Skills</p>
      <div v-for="category in skillCategories" :key="category.label" class="skill-category">
        <p class="field-label">{{ category.label }}</p>
        <div class="chip-row">
          <span v-for="skill in category.skills" :key="skill" class="skill-chip">{{ skill }}</span>
        </div>
      </div>
    </div>
  </div>
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

  .skill-chip{
    font-size: 12px;
    font-weight: 500;
    color: var(--ink);
    background-color: var(--grey-100);
    padding: 4px 10px;
    border-radius: 8px;
  }
</style>