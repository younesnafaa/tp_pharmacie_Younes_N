<script setup>
import PharmacieHeader from "./components/PharmacieHeader.vue";
import PharmacieList from "./components/PharmacieList.vue";
</script>

<template>
  <div class="app-container">
    <PharmacieHeader />
    <PharmacieList />
  </div>
</template>

<style>
body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #ecf0f1;
  margin: 0;
  padding: 20px;
}
.app-container {
  max-width: 1000px;
  margin: 0 auto;
}
</style>
