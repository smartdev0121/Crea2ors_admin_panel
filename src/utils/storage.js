// gloable Storage

const APP_ID = "A2F";

export const setItem = (key, data) => {
  localStorage.setItem(APP_ID + key, JSON.stringify(data));
};

export const getItem = (key, defaultValue) => {
  try {
    return JSON.parse(localStorage.getItem(APP_ID + key)) || defaultValue;
  } catch (err) {
    return defaultValue || false;
  }
};

export const deleteItem = (key) => {
  localStorage.removeItem(APP_ID + key);
};

export const getToken = () => {
  return localStorage.getItem("ADMIN_TOKEN", false);
};

export const setToken = (data) => {
  return localStorage.setItem("ADMIN_TOKEN", data);
};

export const deleteToken = () => localStorage.removeItem("TOKEN");
export const getProfileId = () => getItem("USER_ID", false);
export const setUserId = (data) => setItem("USER_ID", data);
export const deleteUserId = () => deleteItem("USER_ID");

export const clearInfo = () => {
  deleteUserId();
  deleteToken();
};
