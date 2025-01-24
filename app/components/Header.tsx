import { View, Text } from "react-native";

export default function Header({ title }: { title: string }) {
  return (
    <View className="p-4 bg-gray-800">
      <Text className="text-lg font-bold text-white">{title}</Text>
    </View>
  );
}
