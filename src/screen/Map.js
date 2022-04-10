import { StyleSheet, View, Text, TextInput, Platform } from "react-native";
import { useState, useEffect } from "react";
import * as Calendar from "expo-calendar";

import DateHeure from "../components/DateHeure";

function Map() {
  return (
    <View style={styles.container}>
      <DateHeure />
    </View>
  );
}

export default Map;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
