import { reactive, toRaw } from 'vue';
import { Storage } from '@ionic/storage';

const store = new Storage();

export var statusLateinDeutsch = reactive({
    red: [] as number[],
    yellow: [] as number[],
    updateTime: 0,
    addTo(color: String, idx: number) {
        statusLateinDeutsch[color].push(idx);
    },
    remove(idx: number) {
        statusLateinDeutsch.red = statusLateinDeutsch.red.filter((el) => {return el !== idx;});
        statusLateinDeutsch.yellow = statusLateinDeutsch.yellow.filter((el) => {return el !== idx;});
    },
    clear() {
        statusLateinDeutsch.red = [];
        statusLateinDeutsch.yellow = [];
    },
    saveToStorage() {
        saveToStorage();
    }
});

async function saveToStorage() {
    console.log("StatusLateinDeutsch: Save to storage: ", statusLateinDeutsch);
    await store.set('statusLateinDeutsch', {
        red: toRaw(statusLateinDeutsch.red),
        yellow: toRaw(statusLateinDeutsch.yellow),
        updateTime: toRaw(statusLateinDeutsch.updateTime)});
}

async function init() {
    console.log("StatusLateinDeutsch: Init");
    await store.create();
    const storeStatusLateinDeutsch = await store.get('statusLateinDeutsch');
    console.log("StatusLateinDeutsch: Init2: ", storeStatusLateinDeutsch);
    if (storeStatusLateinDeutsch) {
        statusLateinDeutsch.red = storeStatusLateinDeutsch.red;
        statusLateinDeutsch.yellow = storeStatusLateinDeutsch.yellow;
        statusLateinDeutsch.updateTime = Date.now();
    }
}
init();