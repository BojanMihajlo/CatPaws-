import {create} from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default useStore = create((set) => ({
    name: "",
    loadUserName: async () => {
      const userData = await AsyncStorage.getItem("user");
      set({ name: userData ? JSON.parse(userData).name : "Guest" });
    },
  }));

// export default useStore;
