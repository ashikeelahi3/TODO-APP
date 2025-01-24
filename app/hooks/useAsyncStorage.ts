import AsyncStorage from "@react-native-async-storage/async-storage";

export default function useAsyncStorage(key: string) {
  const save = async (value: any) => {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  };

  const load = async () => {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  };

  return { save, load };
}
