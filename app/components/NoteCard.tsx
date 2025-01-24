import React from "react";
import { View, Text } from "react-native";
import { useTheme } from "../hooks/useTheme";

interface NoteCardProps {
  title: string;
  description: string;
}

export default function NoteCard({ title, description }: NoteCardProps) {
  const { colors } = useTheme();

  return (
    <View
      style={{
        backgroundColor: colors.background,
        padding: 16,
        borderRadius: 8,
        shadowColor: colors.text,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        marginBottom: 16,
      }}
    >
      <Text style={{ color: colors.text, fontSize: 18, fontWeight: "bold", marginBottom: 8 }}>
        {title}
      </Text>
      <Text style={{ color: colors.text, fontSize: 14 }}>{description}</Text>
    </View>
  );
}
