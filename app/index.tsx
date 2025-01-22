import React, { useState } from "react";
import { Alert, FlatList, Modal, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Define Task Type
interface Task {
  id: number;
  title: string;
  description: string;
}

export default function Index() {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskTitle, setTaskTitle] = useState<string>("");
  const [taskDescription, setTaskDescription] = useState<string>("");

  const saveTask = () => {
    if (taskTitle.trim() === "" || taskDescription.trim() === "") {
      Alert.alert("Please enter both a title and a description for the task.")
      return;
    }

    const newTask: Task = {
      id: Date.now(),
      title: taskTitle,
      description: taskDescription,
    }

    setTasks([...tasks, newTask]);
    setTaskTitle("")
    setTaskDescription("")
    setModalVisible(false);
  }

  

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
        {tasks.length === 0 ? (<Text className="text-gray-400 text-lg text-center italic">
          Your task list is empty. Tap the button below to add a new task.
        </Text>) : (
          <FlatList
            data={tasks}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) => (
              <View className="bg-white p-4 mb-4 rounded-lg shadow-sm">
                <Text className="text-lg font-bold text-gray-800">{item.title}</Text>
                <Text className="text-gray-600">{item.description}</Text>
              </View>
            )}
          />
        )}
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
              value={taskTitle}
              onChangeText={(text) => setTaskTitle(text)}
              className="border border-gray-300 p-3 rounded-lg mb-4"
            />

            {/* Task Description Input */}
            <TextInput
              placeholder="Task Description"
              value={taskDescription}
              onChangeText={(text) => setTaskDescription(text)}
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
                onPress={saveTask}
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
