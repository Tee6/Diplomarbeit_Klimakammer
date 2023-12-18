export interface Feature {
    id: number,
    name: string,
    value_name: string,
    forecast?: any[]
    istvalue?: number,
    iconLink?: string,
    FeatureActions?: Feature[]
}

export interface Action {
    id: number,
    name: string,
    sollvalue: number
    time: number,
    timeString: string,
}


export const Sonne: Feature = {
    id: 0,
    name: 'Sonne',
    value_name: 'Intensität',
    iconLink: 'sunny',
};

export const Temperatur: Feature = {
    id: 0,
    name: 'Temperatur',
    value_name: 'Intensität',
    iconLink: 'thermostat',
};

export const Regen: Feature = {
    id: 1,
    name: 'Regen',
    value_name: 'Intensität',
    iconLink: 'rainy'
};

export const Luftfeuchtigkeit: Feature = {
    id: 2,
    name: 'Luftfeuchtigkeit',
    value_name: 'Prozent',
    iconLink: 'humidity_percentage'
};

export const Feat = [Sonne, Temperatur, Regen, Luftfeuchtigkeit]
