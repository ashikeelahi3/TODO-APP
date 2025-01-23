import React, { useState } from "react";
import { Alert, FlatList, Modal, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker from "@react-native-community/datetimepicker";

// Define Task Type
class Task {
  id: number;
  title: string;
  description: string;
  priority: "High" | "Medium" | "Low";
  isCompleted: boolean;
  dueDate: Date | null;

  constructor(
    id: number, 
    title: string, 
    description: string,
    priority: "High" | "Medium" | "Low",
    isCompleted: boolean,
    dueDate: Date | null = null
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.priority = priority;
    this.isCompleted = isCompleted;
    this.dueDate = dueDate;
  }
}

// TaskManager Class to encapsulate task operations
class TaskManager {
  private tasks: Task[];

  constructor() {
    this.tasks = [];
  }

  addTask(task: Task): void {
    this.tasks.push(task)
  }

  getTasks(): Task[] {
    return this.tasks;
  }

  deleteTask(taskId: number): void {
    this.tasks = this.tasks.filter((task) => task.id !== taskId)
  }
}

export default function Index() {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [taskManager] = useState<TaskManager>(new TaskManager());
  const [tasks, setTasks] = useState<Task[]>(taskManager.getTasks());
  const [taskTitle, setTaskTitle] = useState<string>("");
  const [taskDescription, setTaskDescription] = useState<string>("");
  const [taskPriority, setTaskPriority] = useState<"High" | "Medium" | "Low">("Medium")
  const [taskDueDate, setTaskDueDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  const priorities:string[] = ["Low", "Medium", "High"]

  const saveTask = () => {
    if (taskTitle.trim() === "" || taskDescription.trim() === "") {
      Alert.alert("Please enter both a title and a description for the task.")
      return;
    }

    const newTask = new Task(
      Date.now(), 
      taskTitle, 
      taskDescription,
      taskPriority, 
      false, 
      taskDueDate ? new Date(taskDueDate) : null
    )
    taskManager.addTask(newTask);
    setTasks([...taskManager.getTasks()]);
    setTaskTitle("")
    setTaskDescription("")
    setTaskDueDate(null)
    setModalVisible(false);
  }

  const deleteTask = (taskId: number) => {
    taskManager.deleteTask(taskId)
    setTasks([...taskManager.getTasks()]);
  }

  const priorityColor = (priority: "High" | "Medium" | "Low"): string => {
    switch (priority) {
      case "High":
        return "bg-red-100";
      case "Medium":
        return "bg-yellow-100";
      case "Low":
        return "bg-green-100";
      default:
        return "bg-gray-100";
    }
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
        {tasks.length === 0 ? (
          <Text className="text-gray-400 text-lg text-center italic">
            Your task list is empty. Tap the button below to add a new task.
          </Text>
        ) : (
          <FlatList
            data={tasks}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) => (
              <View className={`${priorityColor(item.priority)} p-4 mb-4 rounded-lg shadow-sm`}>
                <Text className="text-lg font-bold text-gray-800">{item.title}</Text>
                <Text className="text-gray-600">{item.description}</Text>
                <Text className="text-gray-600 italic">Priority: {item.priority}</Text>
                {item.dueDate ? (<Text className="text-gray-600 italic">Due Date: {item.dueDate.toDateString()}</Text>):""}
                <TouchableOpacity
                  className="mt-2 bg-red-500 py-2 px-4 rounded-lg"
                  onPress={() => deleteTask(item.id)}>
                    <Text className="text-white text-center font-semibold">Delete</Text>
                  </TouchableOpacity>
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

            {/* Task Priority Selection */}
            <View className="mb-4 flex-row justify-around">
              {
                priorities.map((priority) => (
                  <TouchableOpacity
                    key={priority}
                    onPress={() => setTaskPriority(priority)}
                    className={`py-2 px-4 rounded-lg ${
                      taskPriority === priority? "bg-blue-300" : "bg-gray-300"
                    }`}
                  >
                    <Text className="text-gray-700 font-semibold">{priority}</Text>
                  </TouchableOpacity>  
                ))
              }
            </View>

            {/* Task Due Date Input */}
            <TouchableOpacity
              className="border border-gray-300 p-3 rounded-lg mb-4"
              onPress={() => setShowDatePicker(true)}
            >
              <Text className="text-gray-700">
                {taskDueDate ? taskDueDate.toString() : "Set Due Date"}
              </Text>
            </TouchableOpacity>
            {
              showDatePicker && (
                <DateTimePicker
                  value = {taskDueDate || new Date()}
                  mode="date"
                  display="default"
                  onChange={(event, selectedDate) => {
                    setShowDatePicker(false)
                    if(selectedDate) {
                      setTaskDueDate(selectedDate)
                    }
                  }}
                />  
              )
            }

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
