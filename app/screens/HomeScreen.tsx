import React from "react";
import { useTheme } from "../hooks/useTheme";
import { View, Text, Button } from "react-native";

export default function HomeScreen({ navigation }) {
  const { theme, colors, toggleTheme } = useTheme(); 

  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-lg font-bold">Home Screen</Text>
      <Button
        title="Add Note"
        onPress={() => navigation.navigate("AddNote")}
      />
      <Button
        title="View Note Details"
        onPress={() => navigation.navigate("NoteDetail")}
      />
      <Button title="Toggle Theme" onPress={toggleTheme} color={colors.primary} />
      <View className="flex-1 justify-center items-center" style={{ backgroundColor: colors.background }}>
        <Text className="text-lg font-bold" style={{ color: colors.text }}>
          Current Theme: {theme.toUpperCase()}
        </Text>
      </View>
    </View>
  );
}
