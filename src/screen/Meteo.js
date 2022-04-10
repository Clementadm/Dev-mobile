import { StyleSheet, View, Text, TextInput, Platform } from "react-native";
import { useState, useEffect } from "react";
import * as Localization from "expo-localization";

import DateHeure from "../components/DateHeure";

apiKey = "3932ba01df8229908d7822d35db8123b";
// var latitude = "14°34'28.6 N";
// var longitude = "60°57'59.9W";
var latitude = "14.574620";
var longitude = "-60.966648";
function Meteo() {
  fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${apiKey}`
  )
    .then((res) => res.json())
    .then((data) => {
      //   console.log(data);
      console.log("Temprature moyenen dans la journée", data.temp.night);
      console.log("humidité :", data.current.humidity, "%");
      console.log("pression atmosphérique :", data.current.pressure, "hPA");
      var sunrisetimestamp = new Date(data.current.sunrise);
      console.log(
        "L'heure de levée du soleil",
        sunrisetimestamp.getHours(),
        ":",
        sunrisetimestamp.getMinutes()
      );
      var sunsetTimestamp = new Date(data.current.sunset);
      console.log(
        "L'heure de couchée du soleil",
        sunsetTimestamp.getHours(),
        ":",
        sunsetTimestamp.getMinutes()
      );
      console.log("vitesse du vents", data.current.wind_speed, "Noeuds");
      console.log(latitude, "N", longitude, "E");
      console.log("-----------------------");
    });

  return <View style={styles.container}></View>;
}

export default Meteo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
