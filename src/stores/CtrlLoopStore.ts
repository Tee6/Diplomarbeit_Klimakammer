import { defineStore } from 'pinia'

export const useReglerStore = defineStore('ReglerStore', {
    actions: {
        ChangeTemp() {
            console.log('ChangeTemp')
        },
        ChangeSun() {
            console.log('Change Sun')
        },
        ChangeHumid() {
            console.log('Change Humid')
        }
    }
})