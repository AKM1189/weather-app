import { useEffect, useState } from "react";
import { useStore } from "@/context";
import useFetch from "@/fetch";
import axios from "axios";
import { CityTypes } from "@/types/cityTypes";
import { WeatherTypes } from "@/types/weatherTypes";

type LocationTypes = {
  lat: number | null;
  lon: number | null;
};

interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  weather: [
    {
      description: string;
    }
  ];
}

const Home = () => {
  const apiKey = import.meta.env.VITE_API_KEY;

  const { store, setStoreFunc } = useStore();
  // const [cityData, setCityData] = useState<CityTypes | null>(null);
  // const [weatherData, setWeatherData] = useState<WeatherTypes | null>(null);

  const [isLoading, setLoading] = useState<boolean>(true);
  const [isError, setError] = useState<unknown | null>(null);

  const today = new Date();
  // console.log("date", today.getDate());

  useEffect(() => {
    setStoreFunc("activeNav", "home");

    const getTodayData = async (lat: string, lon: string) => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`
        );
        if (response) {
          console.log("hourly", response.data.list);

          // const hour = date.getHours();
          // console.log("hour", date.getHours());
          // const list: any = [];
          const list = response.data.list.filter((item: any) => {
            const timestamp = item.dt;
            console.log(timestamp);
            const date = new Date(timestamp * 1000);
            console.log("date", date);
            console.log(date.getDate(), today.getDate());
            return date.getDate() == today.getDate();
          });
          if (list.length > 0) {
            setStoreFunc("todayWeather", list);
          }
          console.log("list", list);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const getData = async () => {
      try {
        const cityResponse = await axios.get(
          `http://api.openweathermap.org/geo/1.0/direct?q=Yangon&limit=5&appid=${apiKey}`
        );
        // setCityData(cityResponse.data);
        setStoreFunc("currentCity", cityResponse.data);
        if (cityResponse.data && cityResponse.data.length > 0) {
          const { lon, lat } = cityResponse.data[0];
          const weatherResponse = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
          );
          // setWeatherData(weatherResponse.data);
          setStoreFunc("weather", weatherResponse.data);
          console.log(weatherResponse.data);
          setLoading(false);
          getTodayData(lat, lon);
        }
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    getData();
    // console.log("w", weatherData);
  }, []);

  const getHour = (time: number) => {
    const date = new Date(time * 1000);
    return date.getHours();
  };

  useEffect(() => {
    // Log the data after it's updated
    if (store.todayWeather) {
      console.log("Weather Data Updated:");
      console.log(store.todayWeather[0]); // First object in the array
    }
  }, [store.todayWeather]);

  if (isError) {
    return <p className="ps-5">Error while fetching data.</p>;
  }
  if (isLoading) {
    return <p className="ps-5">Loading...</p>;
  }
  if (!store.weather) {
    return <p className="ps-5">Data not available.</p>;
  }
  if (store.weather) {
    const weatherData = store.weather;
    const { main } = weatherData;
    const temp = parseInt(main.temp) - 273;

    return (
      <div className="m-5 w-[1025px]">
        <div className="bg-white rounded-xl p-16 flex items-center justify-between w-full text-font">
          <div>
            {store.currentCity && (
              <div className="mb-7">
                <p className="text-5xl mb-2 font-bold ">
                  {store.currentCity[0].name}
                </p>
                {weatherData.weather && (
                  <p className="text-lg">
                    {weatherData.weather[0].description}
                  </p>
                )}
              </div>
            )}
            <div className="mt-16">
              <div className="flex">
                <p className="text-7xl me-2 font-semibold">{temp}</p>
                <div className="w-4 h-4 bg-transparent border-4 border-slate-600 rounded-full"></div>
              </div>
            </div>
          </div>

          <div className="w-[200px]">
            <img
              src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
              className="w-full"
              alt=""
            />
          </div>
        </div>

        <div className="mt-7">
          <div className="text-lg font-semibold text-gray-400">
            {/* <span
              className={`me-5 cursor-pointer select-none ${
                store.currentList === "today" ? "text-black" : ""
              }`}
              onClick={() => setStoreFunc("currentList", "today")}
            >
              Today
            </span>
            <span
              className={`cursor-pointer select-none ${
                store.currentList === "week" ? "text-black" : ""
              }`}
              onClick={() => setStoreFunc("currentList", "week")}
            >
              Week
            </span> */}
            <p>Today's Forecast</p>
          </div>

          <div className="overflow-auto h-[300px] w-full mt-5">
            {store.todayWeather && (
              <div className="flex gap-3">
                {store.todayWeather.map((item: any, index: number) => (
                  <div
                    key={index}
                    className="bg-white p-5 rounded-lg w-[200px] text-center"
                  >
                    <div className="text-xl font-semibold text-gray-500">
                      {getHour(item.dt)}:00
                    </div>
                    <div className="w-[120px] h-auto">
                      <img
                        src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                        className="w-full h-auto"
                        alt=""
                      />
                    </div>
                    <div className="flex justify-center">
                      <p className="text-xl">
                        {parseInt(item.main.temp) - 273}
                      </p>
                      <div className="w-2 h-2 bg-transparent border-2 border-gray-600 rounded-full"></div>
                    </div>
                    <p className="text-sm text-gray-500">
                      {item.weather[0].description}
                    </p>
                  </div>
                ))}
                {/* <p>{store.todayWeather[0].pop}</p> */}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
};

export default Home;
