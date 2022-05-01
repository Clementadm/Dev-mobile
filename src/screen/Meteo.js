import { StyleSheet, View, Text, Image } from "react-native";
import { useState } from "react";

import DateHeure from "../components/DateHeure";
import useLocation from "../components/Localisation";

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

apiKey = "3932ba01df8229908d7822d35db8123b";
// latitutude et longitude pour bordeaux
// var latitude = "44.844362";
// var longitude = "-0.572744";

function Meteo() {
  var geoloc = useLocation();
  if (geoloc == undefined) {
    setTimeout(() => {
      console.log("Wait to get Geolocalisation");
    }, 4000);
  } else {
    // console.log(geoloc);
    var latitude = geoloc[0];
    var longitude = geoloc[1];
  }

  //Géolocalisation ==> get latitute et longitude

  // console.log("/n -----------------------------/n", geoloc.coords.latitude);
  // await console.log(geoloc.coords);
  // console.log(geoloc.latitude);
  // console.log(JSON.stringify(geoloc.longitude));
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

  var a = DateHeure;

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

      icon = data.current.weather[0].icon;
      setIcon(icon);
    });

  const imageApi = {
    uri: "http://openweathermap.org/img/wn/" + icon + "@2x.png",
  };
  return (
    <View style={styles.container}>
      <View>
        <View>
          <Text style={styles.time}>
            {heure}:{min}
          </Text>
          <Text style={styles.date}>
            {jour[nbrJour]} {date}
          </Text>
          <Text style={styles.date}>
            {mois[nbrMois]} {année}
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
            <WeatherItem title="Sunrise :" value={sunriseTime} unit="H" />
            <WeatherItem title="Sunset :" value={sunsetTime} unit="H" />
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
    marginLeft: 20,
  },
  description: {
    fontSize: 30,
    color: "#ffb3b3",
    fontWeight: "bold",
    padding: 40,
    marginLeft: 55,
    textTransform: "capitalize",
  },
  rightAlign: {
    textAlign: "right",
    marginTop: 20,
  },
  timezone: {
    fontSize: 20,
    color: "#d1ae54",
    textAlign: "center",
    marginLeft: -220,
    padding: 10,
    marginTop: 20,
  },
  ville: {
    fontSize: 16,
    color: "#d1ae54",
    fontWeight: "700",
    textAlign: "center",
    marginLeft: -220,
  },
  latlong: {
    fontSize: 16,
    color: "#d1ae54",
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
