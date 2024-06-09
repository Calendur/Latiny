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
        <ion-title>Vokabeln lernen</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <vokabeln-lernen-page />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonButtons, IonButton, IonMenuToggle } from '@ionic/vue';
import { settingsOutline } from 'ionicons/icons';
import VokabelnLernenPage from '@/components/VokabelnLernenPage.vue';

</script>
