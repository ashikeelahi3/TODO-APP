import React, { useCallback, useEffect, useState } from "react";
import { View, Alert } from "react-native";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { NoteService } from "../utils/storage";
import { Note } from "../state/notes/types";
import { useTheme } from "../hooks/useTheme";
import { useNavigation } from "@react-navigation/native";
import { debounce } from "../utils/debounce";

export default function EditNoteScreen({ route }: any) {
  const { colors } = useTheme();
  const { noteId } = route.params; // Get the note ID from route params
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigation = useNavigation();

  // Debounced autosave function
  const autosave = useCallback(
    debounce(async (updatedNote: Note) => {
      try {
        await NoteService.updateNote(updatedNote);
        console.log("Autosaved note:", updatedNote);
      } catch (error) {
        Alert.alert("Autosave Error", "Could not autosave the note.");
      }
    }, 1000), // Save after 1 second of inactivity
    []
  );

  // Fetch the note when the screen loads
  useEffect(() => {
    const fetchNote = async () => {
      const notes = await NoteService.getNotes();
      const noteToEdit = notes.find((note) => note.id === noteId);
      if (noteToEdit) {
        setTitle(noteToEdit.title);
        setDescription(noteToEdit.description);
      } else {
        Alert.alert("Error", "Note not found.");
        navigation.goBack();
      }
    };

    fetchNote();
  }, [noteId, navigation]);

  // Autosave whenever title or description changes
  useEffect(() => {
    if (title || description) {
      const updatedNote: Note = {
        id: noteId,
        title,
        description,
        createdAt: new Date().toISOString(), // Keep original createdAt if available
        updatedAt: new Date().toISOString(),
      };
      autosave(updatedNote);
    }
  }, [title, description, autosave, noteId]);

  // Handle manual save
  const handleSave = async () => {
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

    Alert.alert("Save Note", "Are you sure you want to save this note?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Save",
        style: "default",
        onPress: async () => {
          try {
            await NoteService.updateNote(updatedNote);
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
        placeholder="Edit note title"
        value={title}
        onChangeText={setTitle}
      />
      <InputField
        label="Description"
        placeholder="Edit note description"
        value={description}
        onChangeText={setDescription}
      />
      <Button title="Save Changes" onPress={handleSave} variant="primary" />
    </View>
  );
}
