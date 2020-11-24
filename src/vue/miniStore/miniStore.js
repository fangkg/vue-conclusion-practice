import Vue from 'vue';

export const miniStore = Vue.observable({ count: 0 });

export const actions = {
    setCount(count) {
        miniStore.count = count
    }
}

export const getters = {
    count: () => miniStore.count
}