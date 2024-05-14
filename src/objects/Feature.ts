export interface Feature {
    id: number,
    name: string,
    value_name: string,
    url: string,
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

export interface StatusUpdate {
    Time: number,
    Sonne: string,
    //Regen: string,
    Luftfeuchtigkeit: string,
    Temperatur: string,
    //Tuer: string,
    //PSUstatus: string,
    //PSUvolt: string,
    Wind: string,
}

export const Sonne: Feature = {
    id: 0,
    name: 'Sonne',
    value_name: 'Intensität',
    iconLink: 'sunny',
    url: '/sun/intensity',
};

export const Temperatur: Feature = {
    id: 0,
    name: 'Temperatur',
    value_name: 'Intensität',
    iconLink: 'thermostat',
    url: '/air/temperature',
};

export const Regen: Feature = {
    id: 1,
    name: 'Regen',
    value_name: 'Intensität',
    iconLink: 'rainy',
    url: '/water/flow',
};

export const Luftfeuchtigkeit: Feature = {
    id: 2,
    name: 'Luftfeuchtigkeit',
    value_name: 'Prozent',
    iconLink: 'humidity_percentage',
    url: '/air/humidity',
};

export const Wind: Feature = {
    id: 3,
    name: 'Wind',
    value_name: 'Prozent',
    iconLink: 'mode_fan',
    url: '/air/fanspeed',
};

export const Feat = [Sonne, Temperatur, Regen, Luftfeuchtigkeit, Wind]
export const ValueHistory: StatusUpdate[] = []
