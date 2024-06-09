<template>
  <p>zu lernende Vokabeln: {{ statusLernen.learned.length }}</p>
  <br />

  <ion-button @click="clearVocabularies()">alle Vokabeln entfernen</ion-button>

  <br />
  <p>Lektionen hinzufügen:</p>
  <div v-for="lesson in lessons.list">
    <ion-checkbox class="ms-3" justify="start" label-placement="end" v-model="selectedLessons[lesson]">{{ lesson }}</ion-checkbox>
  </div>
  <ion-button @click="addVocabularies()">ausgewählte Lektionen hinzufügen</ion-button>
</template>

<script lang="ts">
import { IonButton, IonCheckbox } from '@ionic/vue';
import { defineComponent } from 'vue';
import { statusLernen } from '@/stores/statusLernen';
import { lessons, vocabularies } from '@/stores/vocabularies';

export default defineComponent({
  name: "VokabelnLernenSettings",
  components: {
    IonButton,
    IonCheckbox,
  },
  data() {
    return {
      selectedLessons: {} as any,
      statusLernen,
      vocabularies,
      lessons,
    };
  },
  methods: {
    addVocabularies() {
      console.log("addVocabularies(): ", this.selectedLessons);
      for (let idx = 0; idx < this.vocabularies.list.length; idx++) {
        if (this.vocabularies.list[idx].lektion in this.selectedLessons) {
          this.statusLernen.add(idx);
        }
      }
      this.statusLernen.saveToStorage();
      this.selectedLessons = [];
    },
    clearVocabularies() {
      this.statusLernen.clear();
      this.statusLernen.saveToStorage();
    }
  },
  created() {
    if (this.vocabularies.list.length === 0) {
      console.log("Create VokabelnLernenSettings: Vocabularies empty.")
    } else {
      console.log("Vocabularies: ", this.vocabularies.list[0]);
    }
  }
});
</script>