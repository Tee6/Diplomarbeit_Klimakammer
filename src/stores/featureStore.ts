/* eslint-disable */
import { defineStore } from 'pinia'

export const useFeatureStore = defineStore('featureStore', {
    state: () => ({
        Features:
            [
                { id: 0, name: 'Sonne', value: 0, PUactive: false },
                { id: 1, name: 'Regen', value: 0, PUactive: false },
                { id: 2, name: 'Luftfeuchtigkeit', value: 0, PUactive: false }
            ]
    })

})
