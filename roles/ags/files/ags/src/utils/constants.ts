export const SPACING = {
  MD: 8,
  SM: 4,
};

const NERD_ICON_MAP = {
  TIME: '',
  CALENDAR: '',
  BAT0: '',
  BAT1: '',
  BAT2: '',
  BAT3: '',
  BAT4: '',
};

export interface NerdIcon {
  L: string;
  R: string;
  LR: string;
  N: string;
}

type NerdIconsList = Record<keyof typeof NERD_ICON_MAP, NerdIcon>;

export const NERD_ICON: NerdIconsList = Object.fromEntries(
  Object.entries(NERD_ICON_MAP).map(([key, value]) => {
    return [key, { L: `${value}  `, R: ` ${value}`, LR: ` ${value} `, N: value }];
  })
) as NerdIconsList;
