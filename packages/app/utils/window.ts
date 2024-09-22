const LOCAL_USERNAME_KEY = "local-username";

export const storeLocalUsername = (name: string) => {
  sessionStorage.setItem(LOCAL_USERNAME_KEY, name);
};

export const getStoredLocalUsername = () => {
  const localUsername = sessionStorage.getItem(LOCAL_USERNAME_KEY);
  return localUsername || "";
};
