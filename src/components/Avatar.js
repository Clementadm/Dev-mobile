import { Dimensions, StyleSheet, View, Text } from "react-native";

function Avatar({ color, label }) {
  return (
    <View style={styles({ color }).root}>
      <Text style={styles({ color }).label}>{label}</Text>
    </View>
  );
}

const SIZE = Dimensions.get("window").width / 4;

const styles = ({ color }) =>
  StyleSheet.create({
    root: {
      borderColor: color,
      borderWidth: 2,
      borderStyle: "solid",
      width: SIZE,
      height: SIZE,
      borderRadius: SIZE / 2,
      justifyContent: "center",
      alignItems: "center",
    },
    label: {
      color: color,
      fontWeight: "700",
      fontSize: SIZE / 3,
    },
  });

export default Avatar;
