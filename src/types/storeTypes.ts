export type storeTypes = {
  store: {
    theme: string;
  };
  setStoreFunc: <K extends keyof storeTypes["store"]>(
    key: K,
    value: storeTypes["store"][K]
  ) => void;
};
