<template>
  <li class="card">
    <div class="info">
      <strong>{{ medicament.denomination }}</strong> - {{ medicament.formepharmaceutique }} - Qté: {{ medicament.qte }}
    </div>
    <div class="actions">
      <button @click="handleIncrease">+1</button>
      <button @click="handleDecrease">-1</button>
      <button @click="handleModify">Modifier</button>
      <button @click="handleDelete">Supprimer</button>
    </div>
    <div v-if="medicament.photo" class="img-container">
      <img :src="getPhotoUrl(medicament.photo)" alt="photo" />
    </div>
  </li>
</template>

<script setup>
const { medicament } = defineProps(["medicament"]);
const emit = defineEmits(["deleteMed", "increase", "decrease", "modify"]);

const getPhotoUrl = (photo) => {
  if (!photo) return null;
  if (photo.startsWith("data:")) return photo;
  return `https://apipharmacie.pecatte.fr/images/${photo}`;
};

function handleDelete() {
  emit("deleteMed", medicament.id);
}
function handleIncrease() {
  emit("increase", medicament);
}
function handleDecrease() {
  emit("decrease", medicament);
}
function handleModify() {
  const newDenom = prompt("Modifier la dénomination", medicament.denomination);
  if (newDenom !== null) {
    const updatedInfo = { denomination: newDenom };
    emit("modify", medicament, updatedInfo);
  }
}
</script>

<style scoped>
.card {
  background-color: #fff;
  border: 1px solid #ddd;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 6px;
  transition: transform 0.2s;
}
.card:hover {
  transform: scale(1.01);
}
.info {
  margin-bottom: 10px;
  font-size: 1.1em;
  color: #333;
}
.actions {
  margin-bottom: 10px;
}
.actions button {
  margin-right: 5px;
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #2980b9;
  color: #fff;
  transition: background-color 0.2s;
}
.actions button:hover {
  background-color: #1c5980;
}
.img-container {
  text-align: center;
}
.img-container img {
  max-width: 100px;
  border-radius: 4px;
}
</style>
