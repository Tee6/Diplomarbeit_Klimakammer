import { defineStore } from 'pinia';
import { useGlobalStore } from '@/stores/globalStore';

export const useChartStore = defineStore('chart', {
    state: () => ({
        TempData: {
            labels: [],
            datasets: [
                {
                    label: 'Temperatur',
                    data: [],
                    borderColor: '#FFFFFF'
                }
            ],
        } as any,
        HumidData: {
            labels: [],
            datasets: [
                {
                    label: 'Luftfeuchtigkeit',
                    data: [],
                    borderColor: '#FFFFFF'
                },
            ],
        } as any,
        RainData: {
            labels: [],
            datasets: [
                {
                    label: 'Rain',
                    data: [],
                    borderColor: '#FFFFFF'
                },
            ],
        } as any,
        SunData: {
            labels: [],
            datasets: [
                {
                    label: 'Sonne',
                    data: [],
                    borderColor: '#FFFFFF'
                }
            ],
        } as any,
    }),
    actions: {
        updateCharts() {
            this.TempData.labels = useGlobalStore().keyList
            this.TempData.datasets[0].data = useGlobalStore().tempList

            this.HumidData.labels = useGlobalStore().keyList
            this.HumidData.datasets[0].data = useGlobalStore().humidList

            this.RainData.labels = useGlobalStore().keyList
            this.RainData.datasets[0].data = useGlobalStore().rainList

            this.SunData.labels = useGlobalStore().keyList
            this.SunData.datasets[0].data = useGlobalStore().sunList
        }
    },
});
