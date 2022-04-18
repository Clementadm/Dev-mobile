import { StyleSheet, View, Text, Dimensions, Image } from "react-native";
import { useState, useEffect } from "react";
import { Card } from "react-native-elements";

import DateHeure from "../components/DateHeure";

apiKey = "3932ba01df8229908d7822d35db8123b";
// var latitude = "14.574620";
// var longitude = "-60.966648";
var latitude = "44.844362";
var longitude = "-0.572744";
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
  var [timezone, setTimezone] = useState("");
  var [icon, setIcon] = useState("");

  const WeatherItem = ({ title, value, unit }) => {
    return (
      <View style={styles.weatherItem}>
        <Text style={styles.weatherItemTitle}>{title}</Text>
        <Text style={styles.weatherItemTitle}>
          {value + " "}
          {unit + " "}
        </Text>
      </View>
    );
  };

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

      timezone = data.timezone;
      setTimezone(timezone);
      // console.log(latitude, "N", longitude, "E");
      // console.log("-----------------------");

      icon = data.current.weather[0].icon;
      setIcon(icon);
      console.log(icon);
    });

  const imageApi = {
    uri: "http://openweathermap.org/img/wn/" + icon + "@2x.png",
  };
  console.log(imageApi, "icon =", icon);

  return (
    <View style={styles.container}>
      <View>
        <View>
          <Text style={styles.time}>
            {new Date().getHours() + ":" + new Date().getMinutes()}
          </Text>
          <Text style={styles.date}>
            {new Date().getDate() +
              "/" +
              new Date().getMonth() +
              "/" +
              new Date().getFullYear()}
          </Text>
        </View>
        <Text style={styles.description}>{description}</Text>
        <View style={styles.row}>
          <View style={styles.weatherItemContainerGauche}>
            <WeatherItem title="Wind speed :" value={humidity} unit="nds" />
            <WeatherItem
              title="Pressure :"
              value={"    " + pressureAtmos}
              unit="hPA"
            />
            <WeatherItem title="Sunrise :" value={sunriseTime} unit="" />
            <WeatherItem title="Sunset :" value={sunsetTime} unit="" />
          </View>
          <View style={styles.weatherItemContainerDroite}>
            <WeatherItem title="Now :" value={"    " + actualTemp} unit="°C" />
            <WeatherItem title="Max :" value={maxTemp} unit="°C" />
            <WeatherItem title="Min :" value={minTemp} unit="°C" />
            <WeatherItem title="Humidity :" value={humidity} unit="%" />
          </View>
        </View>
      </View>
      <View style={styles.rightAlign}>
        <Text style={styles.timezone}>{timezone}</Text>
        <Text style={styles.latlong}>
          {latitude}N {longitude}E
        </Text>
        <Text style={styles.ville}> Bordeaux</Text>
      </View>
      <View style={styles.center}>
        <Image source={imageApi} style={styles.image} />
      </View>
    </View>
  );
}

export default Meteo;

const styles = StyleSheet.create({
  container: {
    flex: 1.5,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "cyan",
  },
  time: {
    fontSize: 45,
    color: "black",
    fontWeight: "100",
    padding: 10,
    marginTop: 30,
  },
  date: {
    fontSize: 25,
    color: "black",
    fontWeight: "300",
    padding: -55,
  },
  description: {
    fontSize: 25,
    color: "#eee",
    fontWeight: "300",
    padding: 40,
    marginLeft: 65,
  },
  rightAlign: {
    textAlign: "right",
    marginTop: 20,
  },
  timezone: {
    fontSize: 20,
    color: "black",
    textAlign: "center",
    marginLeft: -220,
    padding: 10,
    marginTop: 20,
  },
  ville: {
    fontSize: 16,
    color: "black",
    fontWeight: "700",
    textAlign: "center",
    marginLeft: -220,
  },
  latlong: {
    fontSize: 16,
    color: "black",
    fontWeight: "700",
    marginLeft: -200,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  weatherItemContainerDroite: {
    backgroundColor: "black",
    borderRadius: 10,
    padding: 20,
    marginTop: -30,
  },
  weatherItemContainerGauche: {
    backgroundColor: "black",
    justifyContent: "center",
    borderRadius: 10,
    padding: 20,
    marginTop: -30,
    marginRight: 60,
  },
  weatherItem: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  weatherItemTitle: {
    color: "#eee",
    fontSize: 14,
    fontWeight: "100",
  },
  center: {
    flex: 1,
    padding: 10,
    marginLeft: -330,
  },
  image: {
    width: 250,
    height: 250,
    marginTop: 400,
    padding: 50,
  },
});
