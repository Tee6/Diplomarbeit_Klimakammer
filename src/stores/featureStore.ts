/* eslint-disable */
import { defineStore } from 'pinia'
import { Feature } from '@/objects/Feature'
import { Feat } from '@/objects/Feature'

export const useFeatureStore = defineStore('featureStore', {
    state: () => ({
        Features: [] as Feature[]
    }),
    actions: {
        Fill() {
            //this.Features.push(Feat.Sonne)
            //this.Features.push(Regen)
            //this.Features.push(Luftfeuchtigkeit)
            for (const a of Feat) {
                this.Features.push(a)
            }
        }
    }
})
