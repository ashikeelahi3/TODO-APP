import React, { useState } from "react";
import { Modal, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const [modalVisible, setModalVisible] = useState(false);
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
            setModalVisible(true);
          }}
        >
          <Text className="text-white text-center text-lg font-bold">
            + Add Task
          </Text>
        </TouchableOpacity>
      </View>

      {/* Task Input Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white w-11/12 p-6 rounded-lg shadow-lg">
            <Text className="text-xl font-semibold text-center mb-4">
              Add New Task
            </Text>

            {/* Task Title Input */}
            <TextInput
              placeholder="Task Title"
              className="border border-gray-300 p-3 rounded-lg mb-4"
            />

            {/* Task Description Input */}
            <TextInput
              placeholder="Task Description"
              multiline
              className="border border-gray-300 p-3 rounded-lg mb-4"
            />

            {/* Save and Cancel Buttons */}
            <View className="flex-row justify-between">
            <TouchableOpacity 
                className="bg-gray-300 py-2 px-4 rounded-lg"
                onPress={() => setModalVisible(false)}
              >
                <Text className="text-gray-700 font-semibold">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                className="bg-blue-600 py-2 px-4 rounded-lg"
                onPress={() => {
                  console.log("Save Task")
                  setModalVisible(false);
                }}
              >
                <Text className="text-white font-semibold">Save</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}
