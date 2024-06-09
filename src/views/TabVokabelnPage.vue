<style>
.ion-table {
  color: var(--ion-text-color, black);
  background-color: var(--ion-background-color, white);
  line-height: 1;
}
.ion-table-striped > tbody > tr:nth-of-type(2n+1) {
  background-color: var(--ion-background-color-step-100, #d0d0d0);
}
</style>
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="end">
          <ion-menu-toggle>
            <ion-button>
              <ion-icon aria-hidden="true" :icon="settingsOutline"/>
            </ion-button>
          </ion-menu-toggle>
        </ion-buttons>
        <ion-title>Vokabeln</ion-title>
        <ion-item>
          <ion-input label="Filter" placeholder="Filterausdruck" v-model="sortCriteria.filter"></ion-input>
        </ion-item>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">

      <table class="table ion-table ion-table-striped table-sm fs-7 w-100">
        <thead>
          <tr>
            <th @click='sort("lektion")'>L</th>
            <th @click='sort("latein")'>Latein</th>
            <th @click='sort("deutsch")'>Deutsch</th>
            <th @click='sort("wortart")'>Wortart</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="vocabulary in sortedVocabularies">
            <td>{{vocabulary.lektion}}</td>
            <td>{{vocabulary.latein}}{{(vocabulary.formen !== undefined ? (', ' + vocabulary.formen) : '')}}</td>
            <td>{{vocabulary.deutsch}}</td>
            <td>{{vocabulary.wortart}}</td>
          </tr>
        </tbody>
      </table>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonIcon, IonMenuToggle, IonInput, IonItem } from '@ionic/vue';
import { settingsOutline } from 'ionicons/icons';
import { computed, reactive } from 'vue';
import { vocabularies } from '@/stores/vocabularies';

var sortCriteria = reactive({
  key: 'lektion',
  direction: 1,
  filter: null});
const sortedVocabularies = computed(() => {
    return [...vocabularies.list]
        .filter((item) => {
            if (sortCriteria.filter === null) return true;
            if (String(sortCriteria.filter).length === 0) return true;
            if (!isNaN(sortCriteria.filter)) { // it is a number
                return (item.lektion === Number.parseInt(sortCriteria.filter));
            }
            if (sortCriteria.filter.startsWith('#')) {
              return item.latein.toLowerCase().startsWith(sortCriteria.filter.substring(1));
            }
            return item.deutsch.toLowerCase().includes(sortCriteria.filter.toLowerCase()) ||
                   item.latein.toLowerCase().includes(sortCriteria.filter.toLowerCase()) ||
                   item.wortart.toLowerCase().includes(sortCriteria.filter.toLowerCase());
        })
        .sort((a, b) => {
            if (typeof a[sortCriteria.key] === 'number') return (a[sortCriteria.key] - b[sortCriteria.key]) * sortCriteria.direction;
            
            return a[sortCriteria.key].localeCompare(b[sortCriteria.key], undefined, { sensitivity: 'accent' }) * sortCriteria.direction;
        });
});
function sort(sortBy) {
    if (sortBy === sortCriteria.key) {
        sortCriteria.direction = -1 * sortCriteria.direction;
    } else {
        sortCriteria.key = sortBy;
        sortCriteria.direction = 1;
    }
}
</script>
