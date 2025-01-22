import { CityTypes } from "./cityTypes";
import {
  TodayWeatherTypes,
  WeatherTypes,
  WeekWeatherTypes,
} from "./weatherTypes";

export type storeTypes = {
  store: {
    currentCity: CityTypes | null;
    weather: WeatherTypes | null;
    theme: string | null;
    isNavOpen: boolean;
    activeNav: string;
    currentList: string;
    todayWeather: TodayWeatherTypes | null;
    weekWeather: WeekWeatherTypes | null;
  };
  setStoreFunc: <K extends keyof storeTypes["store"]>(
    key: K,
    value: storeTypes["store"][K]
  ) => void;
};
