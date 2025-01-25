import React, { useCallback, useEffect, useState } from "react";
import { View, Alert } from "react-native";
import Button from "../components/Button";
import InputField from "../components/InputField";
import { NoteService } from "../utils/storage";
import { Note } from "../state/notes/types";
import { useTheme } from "../hooks/useTheme";
import { useNavigation } from "@react-navigation/native";
import { debounce } from "../utils/debounce"; // Debounce utility

export default function AddNoteScreen() {
  const { colors } = useTheme();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isNewNote, setIsNewNote] = useState(true);
  const navigation = useNavigation();

  // Debounced autosave function
  const autosave = useCallback(
    debounce(async (note: Note) => {
      try {
        if (isNewNote) {
          await NoteService.addNote(note); // Create a new note
          setIsNewNote(false); // Mark as an existing note
        } else {
          await NoteService.updateNote(note); // Update the existing note
        }
        console.log("Autosaved note:", note);
      } catch (error) {
        Alert.alert("Autosave Error", "Could not autosave the note.");
      }
    }, 1000), // Autosave after 1 second of inactivity
    []
  );

  // Handle title/description updates with autosave
  useEffect(() => {
    if (title || description) {
      const newNote: Note = {
        id: Date.now().toString(),
        title,
        description,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      autosave(newNote);
    }
  }, [title, description]);

  // Handle manual save
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

    Alert.alert("Save Note", "Are you sure you want to save this note?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Save",
        style: "default",
        onPress: async () => {
          try {
            await NoteService.addNote(newNote);
            navigation.goBack(); // Navigate back to HomeScreen
          } catch (error: any) {
            Alert.alert("Error", error.message || "An unexpected error occurred");
          }
        },
      },
    ]);
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
