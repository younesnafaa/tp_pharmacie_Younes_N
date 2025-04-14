<template>
  <form @submit.prevent="submitForm" class="form">
    <input type="text" v-model="denomination" placeholder="Dénomination" required />
    <input type="text" v-model="forme" placeholder="Forme pharmaceutique" required />
    <input type="number" v-model="qte" placeholder="Quantité" required min="0" />
    <input type="file" @change="handleFileUpload" />
    <input type="submit" value="Ajouter médicament" />
  </form>
</template>

<script setup>
import { ref } from 'vue';

const denomination = ref("");
const forme = ref("");
const qte = ref(0);
const photo = ref(null);

const emit = defineEmits(['addMedicament']);

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => { photo.value = reader.result; };
  reader.readAsDataURL(file);
};

const submitForm = () => {
  if (!denomination.value || !forme.value || qte.value === null) return;
  const newMed = {
    denomination: denomination.value,
    formepharmaceutique: forme.value,
    qte: Number(qte.value),
    photo: photo.value
  };
  emit('addMedicament', newMed);
  denomination.value = "";
  forme.value = "";
  qte.value = 0;
  photo.value = null;
};
</script>

<style scoped>
.form {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  padding: 10px;
  background-color: #f7f9fc;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  margin-bottom: 20px;
}
.form input[type="text"],
.form input[type="number"],
.form input[type="file"] {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  flex: 1 1 200px;
}
.form input[type="submit"] {
  background-color: #27ae60;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}
.form input[type="submit"]:hover {
  background-color: #219150;
}
</style>
