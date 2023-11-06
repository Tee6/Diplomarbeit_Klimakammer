export interface Feature {
    id: number,
    name: string,
    value_name: string,
    sollvalue: number,
    time: number,
    timeString: string,
    istvalue?: number,
    iconLink?: string
}
export const Sonne: Feature = {
    id: 0,
    name: 'Sonne',
    value_name: 'Intensität',
    sollvalue: 0,
    time: 0,
    timeString: '00:00',
    iconLink: 'https://www.svgrepo.com/show/18743/sun.svg'
};

export const Regen: Feature = {
    id: 0,
    name: 'Regen',
    value_name: 'Intensität',
    sollvalue: 0,
    time: 0,
    timeString: '00:00'
};

export const Luftfeuchtigkeit: Feature = {
    id: 0,
    name: 'Luftfeuchtigkeit',
    value_name: 'Prozent',
    sollvalue: 0,
    time: 0,
    timeString: '00:00'
};

export const Feat = [Sonne, Regen, Luftfeuchtigkeit]