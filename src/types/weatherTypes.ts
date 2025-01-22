export type WeatherTypes = {
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  base: string;
  [key: string]: any;
};

export type TodayWeatherTypes = {
  dt: number;
  [key: string]: any;
};

export type WeekWeatherTypes = {
  dt: number;
  [key: string]: any;
};
