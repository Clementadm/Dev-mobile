import { StyleSheet, View, Text, Dimensions } from "react-native";
import { useState, useEffect } from "react";

import DateHeure from "../components/DateHeure";

apiKey = "3932ba01df8229908d7822d35db8123b";
var latitude = "14.574620";
var longitude = "-60.966648";
function Meteo() {
  var [humidity, setHumidity] = useState("");
  var [actualTemp, setActualTemp] = useState("");
  var [minTemp, setMinTemp] = useState("");
  var [maxTemp, setMaxTemp] = useState("");
  var [description, setDescription] = useState("");
  var [pressureAtmos, setPressureAtmos] = useState("");
  var [sunriseTime, setSunriseTime] = useState("");
  var [sunsetTime, setSunsetTime] = useState("");
  var [windSpeed, setWindSpeed] = useState("");
  // var [humidity, setHumidity] = useState("");

  fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${apiKey}`
  )
    .then((res) => res.json())
    .then((data) => {
      humidity = data.current.humidity;
      setHumidity(humidity);

      actualTemp = data.current.temp;
      setActualTemp(actualTemp);

      maxTemp = data.daily[0].temp.max;
      setMaxTemp(maxTemp);

      minTemp = data.daily[0].temp.min;
      setMinTemp(minTemp);

      description = data.daily[0].weather[0].description;
      setDescription(description);

      pressureAtmos = data.current.pressure;
      setPressureAtmos(pressureAtmos);

      var sunrisetimestamp = new Date(data.current.sunrise * 1000);
      sunriseTime =
        sunrisetimestamp.getHours() + ":" + sunrisetimestamp.getMinutes();
      setSunriseTime(sunriseTime);

      var sunsetTimestamp = new Date(data.current.sunset * 1000);
      sunsetTime =
        sunsetTimestamp.getHours() + ":" + sunsetTimestamp.getMinutes();
      setSunsetTime(sunsetTime);

      windSpeed = data.current.wind_speed;
      setWindSpeed(windSpeed);
      // console.log(latitude, "N", longitude, "E");
      // console.log("-----------------------");
    });

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text>Actually in Bordeaux :</Text>
        <Text>{description}</Text>
      </View>
      <View style={styles.row}>
        <View style={styles.card}>
          <Text>Actual temp : {actualTemp}°C</Text>
          <Text>Min temp : {minTemp}°C</Text>
          <Text>Max temp : {maxTemp}°C</Text>
        </View>
        <View style={styles.card}>
          <Text>humidity : {humidity}%</Text>
          <Text>Pressure : {pressureAtmos} hPa</Text>
          <Text>Wind speed : {windSpeed} nds</Text>
        </View>
        <View style={styles.card}>
          <Text>Sunrise : {sunriseTime}</Text>
          <Text>Sunset : {sunsetTime}</Text>
        </View>
      </View>
    </View>
  );
}

export default Meteo;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
  },
  title: {
    justifyContent: "center",
    textAlign: "center",
    padding: 50,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#00000033",
    borderRadius: 10,
    borderColor: "#eee",
    borderWidth: 1,
    width: Dimensions.get("window").width,
    padding: 10,
  },
  card: {
    flex: 1,
    backgroundColor: "#00000033",
    borderRadius: 8,
    borderColor: "#eee",
    borderWidth: 0.5,
    padding: 20,
  },
});
