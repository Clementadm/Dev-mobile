import React from "react";
import { View, Text, StyleSheet } from "react-native";

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

const DateHeure = () => {
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
};

export default DateHeure;

const styles = StyleSheet.create({
  container: {
    flex: 1.5,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  temps: {
    fontSize: 45,
    color: "cyan",
    fontWeight: "100",
    textAlign: "left",
  },
  date: {
    fontSize: 25,
    color: "cyan",
    fontWeight: "300",
    textAlign: "left",
  },
});
