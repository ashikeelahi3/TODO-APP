import React, { useState } from "react";
import { View, Alert } from "react-native";
import Button from "../components/Button";
import InputField from "../components/InputField";
import { NoteService } from "../utils/storage";
import { Note } from "../state/notes/types";
import { useTheme } from "../hooks/useTheme";
import { useNavigation } from "@react-navigation/native";

export default function AddNoteScreen() {
  const { colors } = useTheme();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigation = useNavigation();

  const handleSave = async () => {
    if (!title.trim() || !description.trim()) {
      Alert.alert("Validation Error", "Both title and description are required.");
      return;
    }

    const newNote: Note = {
      id: Date.now().toString(),
      title,
      description,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await NoteService.addNote(newNote);
    navigation.goBack(); // Navigate back to HomeScreen
  };

  return (
    <View
      className="flex-1 p-4"
      style={{ backgroundColor: colors.background }}
    >
      <InputField
        label="Title"
        placeholder="Enter note title"
        value={title}
        onChangeText={setTitle}
      />
      <InputField
        label="Description"
        placeholder="Enter note description"
        value={description}
        onChangeText={setDescription}
      />
      <Button title="Save Note" onPress={handleSave} variant="primary" />
    </View>
  );
}
