// save data into session
export const storeInSession = (key, value) => {
   return sessionStorage.setItem(key, value);
};

// return data from session
export const lookInSession = (key) => {
   return sessionStorage.getItem(key);
};

// remove data from session
export const removeFromSession = (key) => {
   return sessionStorage.removeItem(key);
};

// clear user session when logout
export const logOutUser = () => {
   return sessionStorage.clear();
};
