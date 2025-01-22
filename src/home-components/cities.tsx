import { useEffect } from "react";
import { useStore } from "@/context";

const Cities = () => {
  const { store, setStoreFunc } = useStore();

  useEffect(() => {
    setStoreFunc("activeNav", "cities");
  }, []);
  return (
    <div className="flex">
      <h1>Cities</h1>
    </div>
  );
};

export default Cities;
