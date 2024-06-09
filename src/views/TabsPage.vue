<template>
  <ion-page>
    <ion-tabs @ion-tabs-did-change="onTabsChange">
      <ion-menu content-id="main-page" :disabled="selectedTab !== 'tab1Vokabeln'">
        <ion-header>
          <ion-toolbar>
            <ion-title>Vokabeln synchonisieren</ion-title>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <vokabeln-sync />
        </ion-content>
      </ion-menu>

      <ion-menu content-id="main-page" :disabled="selectedTab !== 'tab2VokabelnLernen'">
        <ion-header>
          <ion-toolbar>
            <ion-title>Vokabeln lernen - Einstellungen</ion-title>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <vokabeln-lernen-settings />
        </ion-content>
      </ion-menu>

      <ion-router-outlet id="main-page"></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="tab1Vokabeln" href="/tabs/tab1Vokabeln">
          <ion-icon aria-hidden="true" :icon="fileTrayOutline" />
          <ion-label>Vokabeln</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab2VokabelnLernen" href="/tabs/tab2VokabelnLernen">
          <ion-icon aria-hidden="true" :icon="fileTrayOutline" />
          <ion-label>Vokabeln lernen</ion-label>
        </ion-tab-button>
<!--
        <ion-tab-button tab="tab3Tabellen" href="/tabs/tab3Tabellen">
          <ion-icon aria-hidden="true" :icon="gridOutline" />
          <ion-label>Tabellen</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab4TabellenLernen" href="/tabs/tab4TabellenLernen">
          <ion-icon aria-hidden="true" :icon="gridOutline" />
          <ion-label>Tabellen lernen</ion-label>
        </ion-tab-button>-->
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonLabel,
  IonIcon,
  IonPage,
  IonRouterOutlet,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonMenu,
} from "@ionic/vue";
import { fileTrayOutline, gridOutline } from "ionicons/icons";
import { ref } from "vue";

import VokabelnLernenSettings from "@/components/VokabelnLernenSettings.vue";
import VokabelnSync from "@/components/VokabelnSync.vue";

var selectedTab = ref("tab1Vokabeln");
function onTabsChange(evt: any) {
  console.log("onTabsChange", evt, "...", selectedTab);
  selectedTab.value = evt.tab;
}
</script>
