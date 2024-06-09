<template>
  <p>Sync?</p>

  <ion-button @click="clearVocabularies()">alle Vokabeln entfernen</ion-button>
</template>

<script lang="ts">
import { IonButton, IonCheckbox } from '@ionic/vue';
import { defineComponent } from 'vue';


export default defineComponent({
  name: "VokabelnSync",
  components: {
    IonButton,
    IonCheckbox,
  },
});
</script>