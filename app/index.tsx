import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      {/* Header Section */}
      <View className="bg-blue-500 p-4">
        <Text className="text-white text-2xl font-bold text-center">
          To-Do App
        </Text>
      </View>

      {/* Task List Placeholder */}
      <View className="flex-1 p-4">
        <Text className="text-gray-500 text-lg text-center">
          No tasks yet. Add a task to get started!
        </Text>
      </View>

      {/* Add Task Button */}
      <TouchableOpacity className="bg-blue-500 p-4 m-4 rounded-full">
        <Text className="text-white text-center text-lg font-bold">
          + Add Task
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
