export const getLocalStorage = (key) => {
  const data = window.localStorage.getItem(key);
  if (data) return JSON.parse(data);
};

export const setLocalStorage = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};
