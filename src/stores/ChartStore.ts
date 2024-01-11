import { defineStore } from 'pinia';
import { useGlobalStore } from '@/stores/globalStore';
import { useFeatureStore } from '@/stores/featureStore';
import { useReglerStore } from '@/stores/CtrlLoopStore';
import { Feature } from '@/objects/Feature';
import { counter } from '@fortawesome/fontawesome-svg-core';

export const useChartStore = defineStore('chart', {
    state: () => ({
        counter: 0 as number,
        StatusBoxCharts: new Map<string, any[]>(),
        check: 0 as number,
        istTime: [] as any[],
        entireistTime: [] as any[],
        TempData: {
            labels: [],
            datasets: [
                {
                    label: 'Temperatur in °C soll',
                    data: [],
                    borderColor: '#FFFFFF'
                },
            ],
        } as any,
        HumidData: {
            labels: [],
            datasets: [
                {
                    label: 'Luftfeuchtigkeit in %',
                    data: [],
                    borderColor: '#FFFFFF'
                },
            ],
        } as any,
        RainData: {
            labels: [],
            datasets: [
                {
                    label: 'Regen in %',
                    data: [],
                    borderColor: '#FFFFFF'
                },
            ],
        } as any,
        SunData: {
            labels: [],
            datasets: [
                {
                    label: 'Sonne in %',
                    data: [],
                    borderColor: '#FFFFFF'
                }
            ],
        } as any,
        istSunData: {
            labels: [] as any[],
            datasets: [
                {
                    label: 'istwert',
                    data: [] as any[],
                    borderColor: '#FFFFFF'
                },
            ],
        },
        istTempData: {
            labels: [] as any[],
            datasets: [
                {
                    label: 'istwert',
                    data: [] as any[],
                    borderColor: '#FFFFFF'
                },
            ],
        },
        istHumidData: {
            labels: [] as any[],
            datasets: [
                {
                    label: 'istwert',
                    data: [] as any[],
                    borderColor: '#FFFFFF'
                },
            ],
        },
        istRainData: {
            labels: [] as any[],
            datasets: [
                {
                    label: 'istwert',
                    data: [] as any[],
                    borderColor: '#FFFFFF'
                },
            ],
        },
    }),
    actions: {
        updateCharts() {
            //#region sollWerte
            this.TempData.labels = useGlobalStore().keyList
            this.TempData.datasets[0].data = useGlobalStore().tempList

            this.HumidData.labels = useGlobalStore().keyList
            this.HumidData.datasets[0].data = useGlobalStore().humidList

            this.RainData.labels = useGlobalStore().keyList
            this.RainData.datasets[0].data = useGlobalStore().rainList

            this.SunData.labels = useGlobalStore().keyList
            this.SunData.datasets[0].data = useGlobalStore().sunList
            //#endregion sollWerte
        },
        StatusChart(F: Feature) {
            if (F == undefined) return []
            let temp = this.StatusBoxCharts.get(F.name) || []
            let tempval = useReglerStore().httpGetValue(useReglerStore().BackEndIP + F.url)
            temp.push(tempval)

            if (this.counter % 4 === 0) {
                this.istTime.push(this.getCurrentTime())
                this.entireistTime.push(this.getCurrentTime())
                if (this.istTime.length > useGlobalStore().samplesize && useGlobalStore().swift) {
                    this.istTime.shift();
                }
            }
            this.counter++;
            this.StatusBoxCharts.set(F.name, temp)

            if (useGlobalStore().swift) {
                this.istHumidData.labels = this.istTime
                this.istHumidData.datasets[0].data = (this.StatusBoxCharts.get("Luftfeuchtigkeit") || []).slice(-useGlobalStore().samplesize);
                this.istRainData.labels = this.istTime
                this.istRainData.datasets[0].data = (this.StatusBoxCharts.get("Regen") || []).slice(-useGlobalStore().samplesize);
                this.istSunData.labels = this.istTime
                this.istSunData.datasets[0].data = (this.StatusBoxCharts.get("Sonne") || []).slice(-useGlobalStore().samplesize);
                this.istTempData.labels = this.istTime
                this.istTempData.datasets[0].data = (this.StatusBoxCharts.get("Temperatur") || []).slice(-useGlobalStore().samplesize);
            } else {
                this.istHumidData.labels = this.istTime
                this.istHumidData.datasets[0].data = this.StatusBoxCharts.get("Luftfeuchtigkeit") || []
                this.istRainData.labels = this.istTime
                this.istRainData.datasets[0].data = this.StatusBoxCharts.get("Regen") || []
                this.istSunData.labels = this.istTime
                this.istSunData.datasets[0].data = this.StatusBoxCharts.get("Sonne") || []
                this.istTempData.labels = this.istTime
                this.istTempData.datasets[0].data = this.StatusBoxCharts.get("Temperatur") || []
            }

            this.check++
        },
        getCurrentTime() {
            const now = new Date();
            const hours = now.getHours();
            const minutes = now.getMinutes();
            const seconds = now.getSeconds();

            return `${hours}:${minutes}:${seconds}`;
        }
    },
});
