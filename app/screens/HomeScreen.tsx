import React, { useCallback, useState } from "react";
import { ScrollView, View, Text } from "react-native";
import Button from "../components/Button";
import NoteCard from "../components/NoteCard";
import { NoteService } from "../utils/storage";
import { Note } from "../state/notes/types";
import { useTheme } from "../hooks/useTheme";
import { useFocusEffect } from "@react-navigation/native";

export default function HomeScreen({ navigation }: any) {
  const { colors } = useTheme();
  const [notes, setNotes] = useState<Note[]>([]);

  // Fetch notes every time the screen comes into focus 
  useFocusEffect(
    useCallback(() => {
      const fetchNotes = async () => {
        const storedNotes = await NoteService.getNotes();
        setNotes(storedNotes);
      };

      fetchNotes();
    }, [])
  );

  const handleDelete = (id: string) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={{ padding: 16 }}
    >
      <View className="mb-4">
        <Button
          title="Add Note"
          onPress={() => navigation.navigate("AddNote")}
          variant="primary"
        />
      </View>
      {notes.length > 0 ? (
        notes.map((note) => (
          <NoteCard
            key={note.id}
            id={note.id}
            title={note.title}
            description={note.description}
            onDelete={handleDelete}
            onEdit={() => navigation.navigate("EditNote", { noteId: note.id })}
          />
        ))
      ) : (
        <Text
          className="text-center mt-4"
          style={{ color: colors.text }}
        >
          No notes found.
        </Text>
      )}
    </ScrollView>
  );
}
