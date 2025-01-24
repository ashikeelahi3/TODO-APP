import { View, Text, Modal as RNModal } from "react-native";

export default function Modal({ visible, children }: { visible: boolean; children: React.ReactNode }) {
  return (
    <RNModal visible={visible} transparent>
      <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
        <View className="bg-white p-4 rounded-lg">{children}</View>
      </View>
    </RNModal>
  );
}
