<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Storage Test</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-button @click="initStorage()">Storage initialisieren</ion-button><br />
      <ion-button @click="readStorage()">Storage auslesen</ion-button><br />
      <ion-button @click="writeStorage()">Storage schreiben</ion-button><br />
      Storage Inhalt:
      {{ content.storage }}
      Konsole:
      {{ content.console }}
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/vue';
import { reactive, toRaw } from 'vue';
import { Storage } from '@ionic/storage';

var store = new Storage();
var content = reactive({
  storage: {},
  console: "",
});
async function initStorage() {
  await store.create();
  content.console = "initStorage done";
  console.log('initStorage done');
}

async function readStorage() {
  const newStorageContent = await store.get('testContent');
  console.log('readStorage done', newStorageContent);
  content.console = "readStorage done "+ JSON.stringify(newStorageContent);
  content.storage.now = newStorageContent.now;
  content.storage.rnd = newStorageContent.rnd;
}

async function writeStorage() {
  content.storage.now = new Date();
  content.storage.rnd = Math.floor(Math.random() * 10000);
  await store.set('testContent', toRaw(content.storage));
  content.console = "writeStorage done "+ JSON.stringify(content.storage);
  console.log('writeStorage done', content.storage);
}
</script>
