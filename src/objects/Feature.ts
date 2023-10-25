export interface Feature {
    id: number,
    name: string,
    value_name: string,
    value: number,
    time: number,
    timeString: string
}

export const Sonne: Feature = {
    id: 0,
    name: 'Sonne',
    value_name: 'Intensität',
    value: 0,
    time: 0,
    timeString: '00:00'
};

export const Regen: Feature = {
    id: 0,
    name: 'Regen',
    value_name: 'Intensität',
    value: 0,
    time: 0,
    timeString: '00:00'
};

export const Luftfeuchtigkeit: Feature = {
    id: 0,
    name: 'Luftfeuchtigkeit',
    value_name: 'Prozent',
    value: 0,
    time: 0,
    timeString: '00:00'
};

export const Feat = [Sonne, Regen, Luftfeuchtigkeit]