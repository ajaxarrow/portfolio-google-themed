<script setup lang="ts">
import Logo from '../assets/logo.jpg'
</script>

<template>
  <div class="side-profile-container px-5">
    <div class="d-flex align-center ga-2">
      <img :src="Logo" alt="profile" class="avatar">
      <div>
        <p class="text-name">About Portfolio</p>
        <p class="text-role">Portfolio of Jiu Axl R. Tabilla</p>
      </div>
    </div>
    <div class="desc-container my-5">
      This is a google-themed portfolio created by Jiu Axl R. Tabilla to showcase his skills in frontend development and able to adapt to existing design to make a twist of his own. The purpose of this portfolio of to show the skills and capabilities as well as the projects he has worked on.
    </div>

    <VDivider/>
    <div class="my-5">
      <p class="mb-1">
        <span class="font-weight-medium">Framework and Other Technologies Used: </span>
        Vue.JS, TypeScript
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