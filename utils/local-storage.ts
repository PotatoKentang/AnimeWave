import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "my-favorite";

//value is the interview object stringified
export const storeDataToLocalStorage = async (value: string) => {
  try {
    await AsyncStorage.setItem(KEY, value);
  } catch (e) {
    // saving error
    console.log("error in saving data");
  }
};

export const getDataFromLocalStorage = async () => {
  try {
    const value = await AsyncStorage.getItem(KEY);
    if (value !== null) {
      return JSON.parse(value);
    } else {
      return [];
    }
  } catch (e) {
    // error reading value
    console.log("error in reading data");
  }
};

export const addSingleToLocalStorage = async (newItem: { id: string }) => {
  try {
    const value = await AsyncStorage.getItem(KEY);
    console.log("hit add operation")
    if (value !== null) {
      const data = JSON.parse(value);

      // Check if the newItem's id already exists in the data
      const existingIndex = data.findIndex((item:any) => item.id === newItem.id);

      if (existingIndex !== -1) {
        // If an item with the same ID exists, override it
        data[existingIndex] = newItem;
      } else {
        // If it doesn't exist, add the new item to the data
        data.push(newItem);
      }

      await storeDataToLocalStorage(JSON.stringify(data));
      return newItem;
    } else {
      await storeDataToLocalStorage(JSON.stringify([newItem]));
      return newItem;
    }
  } catch (e) {
    console.log("error in adding data:", e);
    return null;
  }
};

export const removeSingleFromLocalStorage = async (newItem :{id:string})=>{
  try {
    const value = await AsyncStorage.getItem(KEY);
    console.log("hit remove operation")
    if (value !== null) {
      const data = JSON.parse(value);

      // Check if the newItem's id already exists in the data
      const existingIndex = data.findIndex((item:any) => item.id === newItem.id);
      console.log(existingIndex);
      if (existingIndex !== -1) {
        // If an item with the same ID exists, remove it
        data.splice(existingIndex,1);
      }
      await storeDataToLocalStorage(JSON.stringify(data));
      return newItem;
    } else {
      return newItem;
    }
  } catch (e) {
    console.log("error in adding data:", e);
    return null;
  }
}

export const getLocalStorageDataByID = async (id: string | string[]) => {
  try {
    const value = await AsyncStorage.getItem(KEY);
    if (value !== null) {
      const data = JSON.parse(value);
      const foundItem = data.find((item: { id: string }) => item.id === id);
      return foundItem || null;
    } else {
      return null; // Return null if the storage is empty
    }
  } catch (e) {
    console.log("error in reading data:", e);
    return null;
  }
};

export const clearLocalStorage = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    // clear error
    console.log("error in clearing data");
  }
};
