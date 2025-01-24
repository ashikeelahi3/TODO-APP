import { Text, TouchableOpacity } from "react-native";

export default function Button({ title, onPress }: { title: string; onPress: () => void }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-blue-500 p-4 rounded-md"
    >
      <Text className="text-white text-center">{title}</Text>
    </TouchableOpacity>
  );
}
