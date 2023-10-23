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
            if (this.Features.length < 1) {
                for (const a of Feat) {
                    this.Features.push(a)
                }
            }
        }
    }
})
