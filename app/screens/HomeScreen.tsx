import React from "react";
import { View, ScrollView } from "react-native";
import Button from "../components/Button";
import NoteCard from "../components/NoteCard";
import { useTheme } from "../hooks/useTheme";

export default function HomeScreen() {
  const { colors, toggleTheme } = useTheme();

  const notes = [
    { id: 1, title: "Note 1", description: "This is the first note." },
    { id: 2, title: "Note 2", description: "This is the second note." },
  ];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background, paddingHorizontal: 16 }}>
      <View style={{ marginBottom: 16 }}>
        <Button title="Add Note" onPress={() => console.log("Add Note")} />
        <Button title="Toggle Theme" onPress={toggleTheme} variant="secondary" />
      </View>
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          title={note.title}
          description={note.description}
        />
      ))}
    </ScrollView>
  );
}
