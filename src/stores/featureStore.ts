/* eslint-disable */
import { defineStore } from 'pinia'

export const useFeatureStore = defineStore('featureStore', {
    state: () => ({
        Features:
            [
                { id: 0, name: 'Sonne', value_name: 'Intensität', value: 0, time: 0 },
                { id: 1, name: 'Regen', value_name: 'Intensität', value: 0, time: 0 },
                { id: 2, name: 'Luftfeuchtigkeit', value_name: 'Prozent', value: 0, time: 0 }
            ]
    }),
})
