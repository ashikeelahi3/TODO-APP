import React, { useState, useEffect } from "react";
import { View, Alert } from "react-native";
import Button from "../components/Button";
import InputField from "../components/InputField";
import { NoteService } from "../utils/storage";
import { Note } from "../state/notes/types";
import { useTheme } from "../hooks/useTheme";

export default function EditNoteScreen({ route, navigation }: any) {
  const { colors } = useTheme();
  const { noteId } = route.params; // Get the note ID from route params
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchNote = async () => {
      const notes = await NoteService.getNotes();
      const noteToEdit = notes.find((note: Note) => note.id === noteId);
      if (noteToEdit) {
        setTitle(noteToEdit.title);
        setDescription(noteToEdit.description);
      }
    };
    fetchNote();
  }, [noteId]);

  const handleUpdate = async () => {
    if (!title.trim() || !description.trim()) {
      Alert.alert("Validation Error", "Both title and description are required.");
      return;
    }

    const updatedNote: Note = {
      id: noteId,
      title,
      description,
      createdAt: new Date().toISOString(), // Keep original createdAt
      updatedAt: new Date().toISOString(),
    };

    Alert.alert(
          "Save Note",
          "Are you sure you want to save this note?",
          [
            { text: "Cancel", style: "cancel" },
            {
              text: "Save",
              style: "default",
              onPress: async () => {
                try {
                  await NoteService.updateNote(updatedNote);
                  navigation.goBack(); // Navigate back to HomeScreen
                } catch (error:any) {
                  Alert.alert("Error", error.message || "An unexpected error occurred.");
                }
              }
            }
          ]
        )
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
      <Button title="Save Changes" onPress={handleUpdate} variant="primary" />
    </View>
  );
}
