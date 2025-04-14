<script setup>
import { reactive, onMounted } from 'vue';
import PharmacieListItem from "./PharmacieListItem.vue";
import PharmacieForm from "./PharmacieForm.vue";
import Medicament from "../Medicament";

const idPharmacie = 22;
const url = `https://apipharmacie.pecatte.fr/api/${idPharmacie}/medicaments`;
const medicaments = reactive([]);

function getMedicaments() {
  fetch(url)
    .then(response => response.json())
    .then(dataJSON => {
      medicaments.splice(0, medicaments.length);
      dataJSON.forEach(item => {
        medicaments.push(reactive(new Medicament(item.id, item.denomination, item.formepharmaceutique, item.qte, item.photo)));
      });
    })
    .catch(error => console.log(error));
}

function addMedicament(newMed) {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  const options = { method: "POST", headers: headers, body: JSON.stringify(newMed) };
  fetch(url, options)
    .then(response => response.json())
    .then(() => getMedicaments())
    .catch(error => console.log(error));
}

function deleteMedicament(id) {
  const options = { method: "DELETE" };
  fetch(`${url}/${id}`, options)
    .then(response => response.json())
    .then(() => getMedicaments())
    .catch(error => console.log(error));
}

function updateMedicament(med) {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  const payload = {
    id: med.id,
    denomination: med.denomination,
    formepharmaceutique: med.formepharmaceutique,
    qte: med.qte
  };
  // N'envoyer la photo que si elle a été modifiée (c'est-à-dire en Base64)
  if (med.photo && med.photo.startsWith("data:")) {
    payload.photo = med.photo;
  }
  const options = { method: "PUT", headers: headers, body: JSON.stringify(payload) };
  fetch(url, options)
    .then(response => response.json())
    .then(() => getMedicaments())
    .catch(error => console.log(error));
}

function increaseQte(med) {
  med.qte = med.qte + 1;
  updateMedicament(med);
}

function decreaseQte(med) {
  if (med.qte > 0) {
    med.qte = med.qte - 1;
    updateMedicament(med);
  }
}

function modifyMedicament(med, updatedInfo) {
  if (updatedInfo.denomination !== undefined) med.denomination = updatedInfo.denomination;
  if (updatedInfo.formepharmaceutique !== undefined) med.formepharmaceutique = updatedInfo.formepharmaceutique;
  if (updatedInfo.qte !== undefined) med.qte = updatedInfo.qte;
  if (updatedInfo.photo !== undefined) med.photo = updatedInfo.photo;
  updateMedicament(med);
}

onMounted(() => { getMedicaments(); });
</script>

<template>
  <div class="list-container">
    <PharmacieForm @addMedicament="addMedicament" />
    <h3>Liste des médicaments</h3>
    <ul>
      <PharmacieListItem
        v-for="med in medicaments"
        :key="med.id"
        :medicament="med"
        @deleteMed="deleteMedicament"
        @increase="increaseQte"
        @decrease="decreaseQte"
        @modify="modifyMedicament"
      />
    </ul>
  </div>
</template>

<style scoped>
.list-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}
ul {
  padding: 0;
}
h3 {
  text-align: center;
  color: #333;
  margin-bottom: 15px;
  font-size: 1.5em;
}
</style>
