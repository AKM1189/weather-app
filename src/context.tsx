import { useContext, createContext, useState } from "react";
import { storeTypes } from "./types/storeTypes";
import App from "./App";

const StoreContext = createContext({});

const StoreProvider: React.FC = () => {
  const [store, setStore] = useState<storeTypes["store"]>({
    currentCity: null,
    weather: null,
    theme: "light",
    isNavOpen: true,
    activeNav: "",
    currentList: "today",
    todayWeather: null,
    weekWeather: null,
  });

  const setStoreFunc: storeTypes["setStoreFunc"] = (key, value) => {
    setStore((prevStore) => {
      return { ...prevStore, [key]: value };
    });
  };

  return (
    <StoreContext.Provider value={{ store, setStoreFunc }}>
      <App />
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context as storeTypes;
};

export default StoreProvider;
