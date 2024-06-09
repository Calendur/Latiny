import { reactive, toRaw } from 'vue';
import { Storage } from '@ionic/storage';

const store = new Storage();

export interface Learned {
    index: number,
    known?: number,
    automaticallyAdded: boolean, // is set to true if the vocabulary was added automatically, the vocabulary should not be shown in the selected lessons
};

export var statusLernen = reactive({
    learned: [] as Learned[],
    updateTime: 0,
    add(index: number) {
        statusLernen.learned.push({index: index, automaticallyAdded: false});
    },
    markGood(index: number) {
        var element = statusLernen.learned.find((el) => el.index === index);
        if (!element) {
            console.log('markGood(): No element found with index ', index);
        } else if (element.known) {
            element.known++;
            if (element.known == 2) {
                console.log('markGood(): Remove element with index ', index);
                statusLernen.learned = statusLernen.learned.filter((el) => {return el.index !== index;});
            }
        } else {
            element.known = 1;
        }
    },
    markBad(index: number) {
        var element = statusLernen.learned.find((el) => el.index === index);
        if (!element) {
            // if the element is not in the list, add it
            // because it was presented as a random one from the current or previous lessons
            statusLernen.learned.push({index: index, known: 0, automaticallyAdded: true});
        } else {
            element.known = 0;
        }
    },
    clear() {
        statusLernen.learned = [];
    },
    saveToStorage() {
        saveToStorage();
    }
});

async function saveToStorage() {
    console.log("StatusLernen: Save to storage: ", statusLernen);
    const learnedCopy = [];
    for (var idx = 0; idx < statusLernen.learned.length; idx++) {
        learnedCopy.push(toRaw(statusLernen.learned[idx]));
    }
    await store.set('statusLernen', {
        learned: learnedCopy,
        updateTime: toRaw(statusLernen.updateTime)});
}

async function init() {
    console.log("StatusLernen: Init");
    await store.create();
    const storeStatusLernen = await store.get('statusLernen');
    console.log("StatusLernen: Init2: ", storeStatusLernen);
    if (storeStatusLernen) {
        statusLernen.learned = storeStatusLernen.learned;
        statusLernen.updateTime = Date.now();
    }
}
init();