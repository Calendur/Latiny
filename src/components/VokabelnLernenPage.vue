<template>
  <div v-if="!hasUnlearnedVocabulary">
    <p>Glückwunsch! Du hast alle Vokabeln gelernt! Wähle neue Vokabeln zum Lernen aus.<br />
    Lektionen hinzufügen:</p>
    <div v-for="lesson in lessons.list">
      <ion-checkbox class="ms-3" justify="start" label-placement="end" v-model="selectedLessons[lesson]">{{ lesson }}</ion-checkbox>
    </div>
    <ion-button @click="addVocabularies()">ausgewählte Lektionen hinzufügen</ion-button>
  </div>
  
  <ion-card v-if="hasUnlearnedVocabulary" style="min-height: 10em;">
    <ion-card-header>
      <ion-card-title>
        <p class="d-inline-block">{{ selectedVocabulary?.latein }}</p>
        <div class="d-inline-block float-end">
          <span class="badge bg-secondary d-inline-block">Lektionen: {{ currentLessons.join(", ") }}</span>
        </div>
      </ion-card-title>
    </ion-card-header>

    <ion-card-content v-if="translationVisible">
      {{ selectedVocabulary?.deutsch }}
    </ion-card-content>
    <ion-button fill="clear" v-if="!translationVisible" @click="translationVisible = true">Übersetzung Anzeigen</ion-button>
  </ion-card>
  
  <traffic-light2-colors v-if="translationVisible" @red="markBad()" @green="markGood()" />
</template>

<script lang="ts">
import { IonButton, IonCheckbox, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/vue';
import { defineComponent, toRaw } from 'vue';
import { statusLernen } from '@/stores/statusLernen';
import { lessons, vocabularies, Vocabulary } from '@/stores/vocabularies';
import TrafficLight2Colors from '@/components/TrafficLight2Colors.vue';

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
type Nullable<T> = T | null;

export default defineComponent({
  name: "VokabelnLernenPage",
  components: {
    IonButton,
    IonCheckbox,
    IonCard, IonCardHeader, IonCardTitle, IonCardContent,
    TrafficLight2Colors
  },
  data() {
    return {
      translationVisible: false,
      selectedVocabularyIdx: -1,
      selectedVocabulary: {} as Nullable<Vocabulary>,
      selectedLessons: {},
      statusLernen,
      lessons,
      vocabularies,
    };
  },
  watch: {
    'statusLernen.updateTime'(newValue, oldValue) {
      if (this.selectedVocabularyIdx === -1) {
        console.log("VokabelnLernenPage: statusLernen updated");
        this.getNextVocabulary();
      }
    }
  },
  computed: {
    hasUnlearnedVocabulary() {
      return this.statusLernen.learned.length > 0;
    },
    currentLessons() {
      var currentLessons = [] as number[];
      for (let idx = 0; idx < this.statusLernen.learned.length; idx++) {
        if (this.statusLernen.learned[idx].automaticallyAdded) {
          continue;
        }
        const lektion = this.vocabularies.list[this.statusLernen.learned[idx].index].lektion;
        if (!(currentLessons.includes(lektion))) {
          currentLessons.push(lektion);
        }
      }
      return currentLessons.sort((a, b) => {return a - b;});
    }
  },
  methods: {
    markGood() {
      this.statusLernen.markGood(this.selectedVocabularyIdx);
      this.statusLernen.saveToStorage();
      this.getNextVocabulary();
    },
    markBad() {
      this.statusLernen.markBad(this.selectedVocabularyIdx);
      this.statusLernen.saveToStorage();
      this.getNextVocabulary();
    },
    getNextVocabulary() {
      this.translationVisible = false;
      if (this.statusLernen.learned.length > 0) {
        // use a random vocabulary with a probability of 5%
        const searchRandomVocabulary = getRandomInt(0, 100) > 95;
        if (searchRandomVocabulary) {
          // determine possible lessons = the selected lessons and the previous lessons
          var possibleLessons = [] as number[];
          for (let idx = 0; idx < this.currentLessons.length; idx++) {
            possibleLessons.push(this.currentLessons[idx]);
            possibleLessons.push(this.currentLessons[idx] - 1);
          }
          // now determine possible vocabularies from the possible lessons
          // do not include vocabularies that should be learned
          var possibleVocabularies = [] as number[];
          for (let idx = 0; idx < this.vocabularies.list.length; idx++) {
            if ((possibleLessons.includes(this.vocabularies.list[idx].lektion))) {
              if (this.statusLernen.learned.findIndex((vocabulary) => vocabulary.index === idx) === -1) {
                possibleVocabularies.push(idx);
              }
            }
          }
          const idx = getRandomInt(0, possibleVocabularies.length - 1);
          this.selectedVocabularyIdx = possibleVocabularies[idx];
          console.log('Selected Random Vocabulary Idx = ', idx, ", ", this.selectedVocabularyIdx);
          this.selectedVocabulary = this.vocabularies.list[this.selectedVocabularyIdx];
          console.log('Selected Random Vocabulary = ', toRaw(this.selectedVocabulary));
        } else {
          const idx = getRandomInt(0, this.statusLernen.learned.length - 1);
          this.selectedVocabularyIdx = this.statusLernen.learned[idx].index;
          console.log('Selected Vocabulary Idx = ', idx, ", ", this.selectedVocabularyIdx);
          this.selectedVocabulary = this.vocabularies.list[this.selectedVocabularyIdx];
          console.log('Selected Vocabulary = ', toRaw(this.selectedVocabulary));
        }
      } else {
        this.selectedVocabularyIdx = -1;
        this.selectedVocabulary = null;
        console.log('No vocabulary left');
      }
    },
    addVocabularies() {
      console.log("addVocabularies(): ", this.selectedLessons);
      for (let idx = 0; idx < this.vocabularies.list.length; idx++) {
        if (this.vocabularies.list[idx].lektion in this.selectedLessons) {
          this.statusLernen.add(idx);
        }
      }
      this.statusLernen.saveToStorage();
      this.selectedLessons = {};
      this.getNextVocabulary();
    },
  },
  created() {
    console.log("VokabelnLernenPage created (unlearned: " + this.statusLernen.learned.length + ")");
    if (this.vocabularies.list.length === 0) {
      console.log("Create VokabelnLernenPage: Vocabularies empty.")
    } else {
      console.log("Vocabularies: ", this.vocabularies.list[0]);
    }
    this.getNextVocabulary();
  }
});
</script>