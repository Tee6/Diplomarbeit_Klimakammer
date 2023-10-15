/* eslint-disable */
import { defineStore } from 'pinia'

export const useFeatureStore = defineStore('featureStore', {
    state: () => ({
        Features:
            [
                { id: 0, name: 'Sonne', value_name: 'intensität', value: 0 },
                { id: 1, name: 'Regen', value_name: 'intensität', value: 0 },
                { id: 2, name: 'Luftfeuchtigkeit', value_name: 'Prozent', value: 0 }
            ]
    })

})
