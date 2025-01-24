import { View, Text, Button } from "react-native";

export default function AddNoteScreen({ navigation }) {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-lg font-bold">Add Note Screen</Text>
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
}
