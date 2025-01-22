import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header Section */}
      <View className="bg-blue-600 p-5 shadow-md">
        <Text className="text-white text-3xl font-semibold text-center">
          To-Do App
        </Text>
      </View>

      {/* Task List Placeholder */}
      <View className="flex-1 p-6">
        <Text className="text-gray-400 text-lg text-center italic">
          No tasks yet. Add a task to get started!
        </Text>
      </View>

      {/* Add Task Button */}
      <View className="p-6">
        <TouchableOpacity 
          className="bg-blue-600 py-4 rounded-xl shadow-lg active:opacity-90"
          onPress={() => {
            console.log("Add Task Button Clicked");
          }}
        >
          <Text className="text-white text-center text-lg font-bold">
            + Add Task
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
