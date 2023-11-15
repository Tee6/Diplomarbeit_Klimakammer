/* eslint-disable */
import { defineStore } from 'pinia'
import { Feature } from '@/objects/Feature'
import { Feat } from '@/objects/Feature'
import { Action } from '@/objects/Feature'

export const useFeatureStore = defineStore('featureStore', {
    state: () => ({
        Features: [] as Feature[],
        Featuremap: new Map<string, Action[]>()

    }),
    actions: {
        Fill() {
            if (this.Features.length < 1) {
                for (const a of Feat) {
                    this.Features.push(a)

                }
            }
        },
        UpdateMap(ActionList: Action[]) {
            const FMap = new Map<string, Action[]>()
            ActionList.forEach(objekt => {
                const { name } = objekt;
                if (FMap.has(name)) {
                    FMap.get(name)?.push(objekt);
                } else {
                    FMap.set(name, [objekt]);
                }
            });
            this.Featuremap = FMap
        },
        CreateXaxis(orimap: Map<string, Action[]>): Map<string, string[]> {
            const resultMap = new Map<string, string[]>()
            orimap.forEach((action, key) => {
                if (action !== undefined) {
                    if (resultMap.has(key)) {
                        for (const a of action) {
                            resultMap.get(key)?.push(a.timeString)
                        }
                    } else {
                        resultMap.set(key, [action[0].timeString])
                        for (const b of action) {
                            resultMap.get(key)?.push(b.timeString)
                        }
                    }
                }
            })
            resultMap.forEach((list, key) => {
                if (list.length > 0) {
                    list.shift(); // Entfernt das erste Element aus der Liste
                }
            });
            return resultMap
        },
        CreateYaxis(orimap: Map<string, Action[]>): Map<string, number[]> {
            const resultMap = new Map<string, number[]>()
            orimap.forEach((action, key) => {
                if (action !== undefined) {
                    if (resultMap.has(key)) {
                        for (const a of action) {
                            resultMap.get(key)?.push(a.sollvalue)
                        }
                    } else {
                        resultMap.set(key, [action[0].sollvalue])
                        for (const b of action) {
                            resultMap.get(key)?.push(b.sollvalue)
                        }
                    }
                }
            })
            resultMap.forEach((list, key) => {
                if (list.length > 0) {
                    list.shift(); // Entfernt das erste Element aus der Liste
                }
            });
            return resultMap
        }
    }
})
