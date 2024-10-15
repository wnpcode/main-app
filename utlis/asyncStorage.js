const prefix = "main-app";

export const setSessionStorage = async (key, value) => {
  try {
    setTimeout(() => {
      sessionStorage.setItem(`${prefix}-${key}`, value);
    }, 500);
  } catch (e) {
    console.log(e);
  }
};

export const setBulkSessionStorage = async (value = []) => {
  try {
    setTimeout(() => {
      value.forEach(({ key, value }) =>
        sessionStorage.setItem(`${prefix}-${key}`, value)
      );
    }, 500);
  } catch (e) {
    console.log(e);
  }
};

export const getSessionStorage = async (key, isObject = false) => {
  try {
    setTimeout(() => {
      const value = sessionStorage.getItem(`${prefix}-${key}`);
      if (value !== null) {
        if (isObject) {
          return JSON.parse(value);
        }
        return value;
      }
    }, 500);
  } catch (e) {
    console.log(e);
  }
};

// export const getSessionStorage = (key, isObject = false) => {
//   const value = sessionStorage.getItem(`${prefix}-${key}`);
//   if (value !== null) {
//     if (isObject) {
//       return JSON.parse(value);
//     }
//     return value;
//   }
// };

export const removeSessionStorage = async (key) => {
  try {
    setTimeout(() => {
      sessionStorage.removeItem(`${prefix}-${key}`);
    }, 500);
  } catch (e) {
    console.log(e);
  }
};

export const clearSessionStorage = async () => {
  try {
    setTimeout(() => {
      sessionStorage.clear();
    }, 500);
  } catch (e) {
    console.log(e);
  }
};

export default {
  setSessionStorage,
  setBulkSessionStorage,
  getSessionStorage,
  removeSessionStorage,
  clearSessionStorage,
};
