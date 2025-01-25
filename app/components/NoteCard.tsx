import React from "react";
import { View, Text, Button, Alert } from "react-native";
import { useTheme } from "../hooks/useTheme";
import { NoteService } from "../utils/storage";

interface NoteCardProps {
  id: string;
  title: string;
  description: string;
  searchQuery: string;
  onDelete: (id: string) => void;
  onEdit: () => void; // Callback to navigate to edit screen
}

export default function NoteCard({ id, title, description, searchQuery, onDelete, onEdit }: NoteCardProps) {
  const { colors } = useTheme();

  const handleDelete = async () => {
    Alert.alert(
      "Delete Note",
      "Are you sure you want to delete this note?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            await NoteService.deleteNote(id);
            onDelete(id);
          },
        },
      ]
    );
  };

  // Function to highlight matching text
  const highlightText = (text: string, query: string) => {
    if (!query) return text;

    const regex = new RegExp(`(${query})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, index) => 
    part.toLowerCase() === query.toLowerCase() ? (
      <Text key={index} style={{ backgroundColor: colors.primary, color: colors.background }}>{part}</Text>
    ):(
      part
    ))
  }

  return (
    <View
      className="rounded-lg p-4 shadow-md mb-4"
      style={{
        backgroundColor: colors.background,
        shadowColor: colors.text,
      }}
    >
      <Text className="text-lg font-bold mb-2" style={{ color: colors.text }}>
        {highlightText(title, searchQuery)}
      </Text>
      <Text className="text-base mb-4" style={{ color: colors.text }}>
        {highlightText(description, searchQuery)}
      </Text>
      <View className="flex-row justify-between">
        <Button title="Edit" onPress={onEdit} color={colors.primary} />
        <Button title="Delete" onPress={handleDelete} color="red" />
      </View>
    </View>
  );
}
