import { StyleSheet, View, Text, TextInput, Platform } from "react-native";
import { useState, useEffect } from "react";
import * as Calendar from "expo-calendar";

import Button from "../components/Button";

// date à rentrer sous form april 10 2022
function Event() {
  const [valueDate, setValue] = useState("Pas de date");
  const [valueTitle, setValueTitle] = useState("Pas de titre");
  const [valueLocation, setValueLocation] = useState("Pas de localisation");
  const [error, setError] = useState(false);
  const [granted, setGranted] = useState(false);
  // var calendarId = 0;
  const onChange = (text) => {
    setValue(text);
  };
  const onPress = () => {
    setValueTitle(valueTitle);
    setValueLocation(valueLocation);
    createEvent(valueDate, valueTitle);
  };

  function createEvent(date, valueTitle, valueLocation) {
    // createCalendar();
    // const id = calendarId;
    // const calendarId = calendars.id;

    // const calendarId = "16";
    const calendarId = "21";
    const eventData = {
      title: valueTitle,
      startDate: new Date(Date.parse(date)),
      endDate: new Date(Date.parse(date) + 2 * 60 * 60 * 1000),
      timeZone: "Europe/Paris",
      location: valueLocation,
      // location: "89 Quai des Chartrons, 33300 Bordeaux",
    };
    // Calendar.createEventAsync(id, eventData);
    // Calendar.createEventAsync(calendarId, eventData);
    // console.log("Event push");
    // console.log
    pushEvent(calendarId, eventData);
  }

  function pushEvent(calendarId, eventData) {
    Calendar.createEventAsync(calendarId, eventData);
    console.log("Event push");
    console.log;
  }

  async function getDefaultCalendarSource() {
    const defaultCalendar = await Calendar.getDefaultCalendarAsync();
    return defaultCalendar.source;
  }

  async function obtainCalendarPermission() {
    const { status } = await Calendar.requestCalendarPermissionsAsync();
    if (status === "granted") {
      setGranted(true);

      const defaultCalendarSource =
        Platform.OS === "ios"
          ? await getDefaultCalendarSource()
          : { isLocalAccount: true, name: "Expo Calendar" };
      const newCalendarID = await Calendar.createCalendarAsync({
        title: "Calendar Manager APP",
        color: "cyan",
        entityType: Calendar.EntityTypes.EVENT,
        sourceId: defaultCalendarSource.id,
        source: defaultCalendarSource,
        name: "internalCalendarName",
        ownerAccount: "personal",
        accessLevel: Calendar.CalendarAccessLevel.OWNER,
      });
      console.log(`Your new calendar ID is: ${newCalendarID}`);

      const calendars = await Calendar.getCalendarsAsync(
        Calendar.EntityTypes.EVENT
      );
      // console.log("Here are all your calendars:");
      // console.log({ calendars });
    } else {
      setError("Permissions not granted");
    }
  }

  useEffect(() => {
    obtainCalendarPermission();
  });

  return (
    <View>
      <Text>Choose the event date : </Text>
      <TextInput
        placeholder="Date (month day year) "
        style={styles.input}
        valueDate={valueDate}
        onChangeText={onChange}
      />
      <TextInput
        placeholder="Title"
        style={styles.input}
        valueDate={valueTitle}
        onChangeText={onChange}
      />
      <TextInput
        placeholder="Localisation"
        style={styles.input}
        valueDate={valueLocation}
        onChangeText={onChange}
      />
      {granted && <Button title="Push the event" onPress={onPress} />}
    </View>
  );
}

export default Event;

const styles = StyleSheet.create({
  list: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  avatar: {
    margin: 8,
  },
  footer: {
    backgroundColor: "white",
    padding: 32,
  },
});
