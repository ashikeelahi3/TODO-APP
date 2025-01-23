import React, { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Task, TaskManager } from "@/managers/TaskManager";
import TaskItem from "@/components/TaskItem";
import TaskModal from "@/components/TaskModal";



export default function Index() {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [taskManager] = useState<TaskManager>(new TaskManager());
  const [tasks, setTasks] = useState<Task[]>(taskManager.getTasks());
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  const handleSave = (
    title: string,
    description: string,
    priority: "High" | "Medium" | "Low" | "",
    dueDate: Date | null
  ) => {
    if (editingTask) {
      taskManager.editTask(editingTask.id, {
        title,
        description,
        priority,
        dueDate,
      })
    } else {
      const newTask = new Task(
        Date.now(),
        title,
        description,
        priority,
        false,
        dueDate
      );
      taskManager.addTask(newTask);
    }

    setTasks([...taskManager.getTasks()]);
    setModalVisible(false);
    setEditingTask(null);
  }

  const handleDelete = (taskId: number) => {
    taskManager.deleteTask(taskId)
    setTasks([...taskManager.getTasks()]);
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
              <TaskItem 
                task={item}
                onEdit={(task) => {
                  setEditingTask(task);
                  setModalVisible(true);
                }}
                onDelete={handleDelete}
              />
            )}
          />
        )}
        {/* Add Task Button */}
        <TouchableOpacity
          className="absolute bottom-6 right-6 bg-blue-600 p-4 rounded-full shadow-lg"
          onPress={() => setModalVisible(true)}
        >
          <Text className="text-white text-xl font-semibold">+</Text>
        </TouchableOpacity>
      </View>

      

      {/* Task Input Modal */}
      <TaskModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSave}
        initialTitle={editingTask?.title}
        initialDescription={editingTask?.description}
        initialPriority={editingTask?.priority}
        initialDueDate={editingTask?.dueDate}
      />

    </SafeAreaView>
  );
}
