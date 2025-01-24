import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { useTheme } from "../hooks/useTheme";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary";
}

export default function Button({ title, onPress, variant = "primary" }: ButtonProps) {
  const { colors } = useTheme();

  const styles = {
    base: "px-4 py-3 rounded-lg text-center",
    primary: {
      backgroundColor: colors.primary,
      color: colors.text,
    },
    secondary: {
      backgroundColor: colors.background,
      borderColor: colors.primary,
      borderWidth: 1,
      color: colors.text,
    },
  };

  const variantStyles = variant === "primary" ? styles.primary : styles.secondary;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        { paddingHorizontal: 16, paddingVertical: 12, borderRadius: 8 },
        variantStyles,
      ]}
    >
      <Text style={{ color: variantStyles.color, fontWeight: "bold" }}>{title}</Text>
    </TouchableOpacity>
  );
}
