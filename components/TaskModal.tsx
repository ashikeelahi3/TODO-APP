import React, { useState } from "react";
import {
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

interface TaskModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (
    title: string, 
    description: string, 
    priority: "Low" | "Medium" | "High" | "",
    dueDate: Date | null
  ) => void;
  initialTitle?: string;
  initialDescription?: string;
  initialPriority?: "Low" | "Medium" | "High" | "";
  initialDueDate?: Date | null;
}

const TaskModal: React.FC<TaskModalProps> = ({
  visible,
  onClose,
  onSave,
  initialTitle = "",
  initialDescription = "",
  initialPriority = "",
  initialDueDate = null,
}) => {
  const [title, setTitle] = useState(initialTitle)
  const [description, setDescription] = useState(initialDescription)
  const [priority, setPriority] = useState(initialPriority)
  const [dueDate, setDueDate] = useState<Date | null>(initialDueDate)
  const [showDatePicker, setShowDatePicker] = useState(false)

  const priorities = ["Low", "Medium", "High"];

  const handleSave = () => {
    onSave(title, description, priority, dueDate);
    setTitle("")
    setDescription("")
    setPriority("")
    setDueDate(null)
  }

  return (
    <Modal 
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-blue/50">
        <View className="bg-white w-11/12 p-6 rounded-lg shadow-lg">
          <Text className="text-xl font-semibold text-center mb-4">Add/Edit Task</Text>
          <TextInput
            placeholder="Task Title"
            value={title}
            onChangeText={setTitle}
            className="border border-gray-300 p-3 rounded-lg mb-4"
          />
          <TextInput
            placeholder="Task Description"
            value={description}
            onChangeText={setDescription}
            multiline
            className="border border-gray-300 p-3 rounded-lg mb-4"
          />    

          <View className="mb-4 flex-row justify-around">
            {priorities.map((priority: any) => (
              <TouchableOpacity
                key={priority}
                className={`py-2 px-4 rounded-lg ${
                  priority === priority ? "bg-blue-300" : "bg-gray-300"
                }`}
                onPress={() => setPriority(priority)}
              >
                <Text className="text-gray-700 font-semibold">{priority}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            className="border border-gray-300 p-3 rounded-lg mb-4"
            onPress={() => setShowDatePicker(true)}
          >
            <Text className="text-gray-700">
              {dueDate ? dueDate.toDateString() : "Set Due Date"}
            </Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={dueDate || new Date()}
              mode="date"
              display="default"
              onChange={(event, date) => {
                setShowDatePicker(false);
                if (date) setDueDate(date);
              }}
            />
          )}

          <View className="flex-row justify-between">
            <TouchableOpacity
              className="bg-gray-300 py-2 px-4 rounded-lg"
              onPress={onClose}
            >
              <Text className="text-gray-700 font-semibold">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-blue-600 py-2 px-4 rounded-lg"
              onPress={handleSave}
            >
              <Text className="text-white font-semibold">Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default TaskModal;