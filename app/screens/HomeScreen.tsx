import React, { useCallback, useState } from "react";
import { ScrollView, View, Text, TextInput } from "react-native";
import Button from "../components/Button";
import NoteCard from "../components/NoteCard";
import { NoteService } from "../utils/storage";
import { Note } from "../state/notes/types";
import { useTheme } from "../hooks/useTheme";
import { useFocusEffect } from "@react-navigation/native";

export default function HomeScreen({ navigation }: any) {
  const { colors } = useTheme();
  const [notes, setNotes] = useState<Note[]>([]);
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]); // State for filtered notes

  // Fetch notes every time the screen comes into focus
  useFocusEffect(
    useCallback(() => {
      const fetchNotes = async () => {
        const storedNotes = await NoteService.getNotes();
        setNotes(storedNotes);
        setFilteredNotes(storedNotes); // Initialize filtered notes
      };

      fetchNotes();
    }, [])
  );

  // Handle search input changes
  const handleSearch = (query: string) => {
    setSearchQuery(query);

    // Filter notes by title
    const filtered = notes.filter((note) =>
      note.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredNotes(filtered);
  };

  const handleDelete = (id: string) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    setFilteredNotes((prevNotes) => prevNotes.filter((note) => note.id !== id)); // Update filtered list
  };

  return (
    <View className="flex-1 bg-gray-100 dark:bg-black p-4">
      {/* Search Bar */}
      <View className="mb-4">
        <TextInput
          placeholder="Search notes..."
          placeholderTextColor={colors.text}
          value={searchQuery}
          onChangeText={handleSearch}
          className="border border-blue-500 dark:border-blue-300 rounded-lg px-4 py-2 text-black dark:text-white bg-white dark:bg-gray-800"
        />
        <Button
          title="Add Note"
          onPress={() => navigation.navigate("AddNote")}
          variant="primary"
        />
      </View>

      {/* Filtered Notes */}
      <ScrollView>
        {filteredNotes.length > 0 ? (
          filteredNotes.map((note) => (
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
          <Text className="text-center mt-4 text-gray-500 dark:text-gray-400">
            No notes found.
          </Text>
        )}
      </ScrollView>
    </View>
  );
}
