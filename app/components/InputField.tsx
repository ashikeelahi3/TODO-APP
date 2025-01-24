import React from "react";
import { TextInput, View, Text } from "react-native";
import { useTheme } from "../hooks/useTheme";

interface InputFieldProps {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
}

export default function InputField({ label, placeholder, value, onChangeText }: InputFieldProps) {
  const { colors } = useTheme();

  return (
    <View style={{ marginBottom: 16 }}>
      <Text style={{ marginBottom: 4, color: colors.text, fontWeight: "600" }}>{label}</Text>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={colors.text}
        value={value}
        onChangeText={onChangeText}
        style={{
          borderWidth: 1,
          borderColor: colors.primary,
          borderRadius: 8,
          padding: 8,
          color: colors.text,
          backgroundColor: colors.background,
        }}
      />
    </View>
  );
}
