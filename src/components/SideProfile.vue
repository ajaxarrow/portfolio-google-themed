<script setup lang="ts">
import Profile from '../assets/images/profile.jpg'
</script>

<template>
  <div class="side-profile-container px-5">
    <div class="d-flex align-center ga-2">
      <img :src="Profile" alt="profile" class="avatar">
      <div>
        <p class="text-name">Jiu Axl R. Tabilla</p>
        <p class="text-role">UI/UX Designer | Frontend Developer</p>
      </div>
    </div>
    <div class="desc-container my-5">
      A dedicated software developer with extensive experience in full-stack development, specializing in JavaScript, Node.js, React, Vue, and Flutter. Committed to delivering high-quality, scalable applications through meticulous planning, innovative design, and efficient coding practices.
    </div>

    <VDivider/>
    <div class="my-5">
      <p class="mb-1">
        <span class="font-weight-medium">Address: </span>
        Purok-11, Lampanusan, Kalilangan, Bukidnon
      </p>
      <p class="mb-1">
        <span class="font-weight-medium">Education: </span>
        Magna Cum Laude, BS Information Technology Major in Software Development, Central Mindanao University (August 2021 - July 2025)
      </p>
    </div>

    <div class="my-5">
      <p class="section-title mb-2">Skills</p>
      <p class="mb-1">
        <span class="font-weight-medium">Programming Languages: </span>
        JavaScript, TypeScript, Dart, Python, PHP
      </p>
      <p class="mb-1">
        <span class="font-weight-medium">UI/UX Design: </span>
        Figma, Design
      </p>
      <p class="mb-1">
        <span class="font-weight-medium">Databases: </span>
        Firebase, Supabase, PostgreSQL, MySQL, SQLite
      </p>
      <p class="mb-1">
        <span class="font-weight-medium">Frameworks: </span>
        VueJS, ReactJS, ExpressJS, Flutter, Laravel
      </p>
      <p class="mb-1">
        <span class="font-weight-medium">Version Control: </span>
        Git, Github
      </p>
    </div>
  </div>
</template>

<style scoped>
  .side-profile-container{
    border-left: 1px solid #e4e4e4;
    max-width: 600px !important;
    padding-bottom: 25px;
  }

  .avatar{
    height: 80px;
    width: 80px;
    border-radius: 16px;
    object-fit: cover;
  }

  .text-name{
    font-size: 20px;
    font-weight: 500;
  }

  .desc-container{
    background-color: #f5f5f5;
    padding: 10px;
    border-radius: 16px;
  }

  .section-title{
    font-weight: 600;
    font-size: 18px;
  }
</style>