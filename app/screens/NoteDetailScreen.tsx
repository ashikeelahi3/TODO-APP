import { View, Text, Button } from "react-native";

export default function NoteDetailScreen({ navigation }: any) {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-lg font-bold">Note Detail Screen</Text>
      <Button
        title="Edit Note"
        onPress={() => navigation.navigate("EditNote")}
      />
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
}
