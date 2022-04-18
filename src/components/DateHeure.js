import React from "react";
import { View, Text, StyleSheet } from "react-native";

function DateHeure() {
  const jour = [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ];

  const mois = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];

  var nbrJour = new Date().getDay();
  var date = new Date().getDate();
  var nbrMois = new Date().getMonth() + 1;
  var année = new Date().getFullYear();
  var heure = new Date().getHours();
  var min = new Date().getMinutes();

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.temps}>
          {heure}:{min}
        </Text>

        <Text style={styles.date}>
          {jour[nbrJour]} {date} {mois[nbrMois]} {année}
        </Text>
      </View>
    </View>
  );
}

export default DateHeure;

const styles = StyleSheet.create({
  container: {
    flex: 1.5,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "cyan",
  },
  temps: {
    fontSize: 45,
    color: "#d1ae54",
    fontWeight: "100",
    padding: 10,
    marginTop: 30,
  },
  date: {
    fontSize: 25,
    color: "#d1ae54",
    fontWeight: "300",
    padding: -55,
  },
});
