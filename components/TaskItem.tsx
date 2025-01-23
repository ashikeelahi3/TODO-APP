import React from 'react';
import {View, Text, TouchableOpacity} from "react-native"
import { Task } from '@/managers/TaskManager';

interface TaskItemPromps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: number) => void;
}



const TaskItem: React.FC<TaskItemPromps> = ({ task, onEdit, onDelete}) => {
  
  const priorityColor = (priority: "High" | "Medium" | "Low" | ""): string => {
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
    <View
      className={`${priorityColor(task.priority)} p-4 mb-4 rounded-lg shadow-sm border-l-4`}
    >
      <Text className="text-lg font-bold text-gray-800">{task.title}</Text>
      <Text className="text-gray-600">{task.description}</Text>
      {task.priority && (<Text className="text-gray-600 italic">Priority: {task.priority}</Text>)}
      {task.dueDate && (<Text className="text-gray-600 italic">
        Due Date: {task.dueDate.toDateString()}
      </Text>)}
      <View className="flex-row justify-between mt-2">
        <TouchableOpacity
          className='bg-blue-500 py-2 px-4 rounded-lg'
          onPress={() => onEdit(task)}
        >
          <Text className="text-white text-center font-semibold">Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className='bg-red-500 py-2 px-4 rounded-lg'
          onPress={() => onDelete(task.id)}
        >
          <Text className="text-white text-center font-semibold">Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default TaskItem;