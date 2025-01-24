import React from "react";
import { View, Text, Button, Alert } from "react-native";
import { useTheme } from "../hooks/useTheme";
import { NoteService } from "../utils/storage";

interface NoteCardProps {
  id: string;
  title: string;
  description: string;
  onDelete: (id: string) => void;
  onEdit: () => void; // Callback to navigate to edit screen
}

export default function NoteCard({ id, title, description, onDelete, onEdit }: NoteCardProps) {
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
            onDelete(id); // Call the callback to refresh the notes list
          },
        },
      ]
    );
  };

  return (
    <View
      className="rounded-lg p-4 shadow-md mb-4"
      style={{
        backgroundColor: colors.background,
        shadowColor: colors.text,
      }}
    >
      <Text className="text-lg font-bold mb-2" style={{ color: colors.text }}>
        {title}
      </Text>
      <Text className="text-base mb-4" style={{ color: colors.text }}>
        {description}
      </Text>
      <View className="flex-row justify-between">
        <Button title="Edit" onPress={onEdit} color={colors.primary} />
        <Button title="Delete" onPress={handleDelete} color="red" />
      </View>
    </View>
  );
}
