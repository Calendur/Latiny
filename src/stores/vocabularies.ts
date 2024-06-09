import { reactive, toRaw } from 'vue';
import { Storage } from '@ionic/storage';
import defaultVocabulary from '@/vocabulary';

const store = new Storage();

export interface Vocabulary {
    latein: string,
    deutsch: string,
    wortart: string,
    formen: string,
    lektion: number,
};

export var vocabularies = reactive({
    list: [] as Vocabulary[],
});
export var lessons = reactive({
    list: [] as number[],
});

export async function saveVocabulariesToStorage() {
    console.log("Save to storage: ", vocabularies.length);
    await store.set('vocabularies', toRaw(vocabularies));
}

function onlyUnique(value: any, index: any, array: any[]) {
    return array.indexOf(value) === index;
}

async function init() {
    console.log("Init Vocabularies");
    await store.create();
    const storeVocabularies = await store.get('vocabularies');
    if (storeVocabularies) {
        vocabularies.list = storeVocabularies;
    } else {
        vocabularies.list = defaultVocabulary;
    }
    lessons.list = vocabularies.list.map((vocabulary) => {return vocabulary.lektion;}).sort((a, b) => {return a - b;}).filter(onlyUnique);
}
init();