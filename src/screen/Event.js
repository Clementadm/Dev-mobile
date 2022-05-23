import { StyleSheet, View, Text, TextInput, Platform } from "react-native";
import { useState, useEffect, useMemo } from "react";
import {
  requestCalendarPermissionsAsync,
  getCalendarsAsync,
  EntityTypes,
  createCalendarAsync,
  getDefaultCalendarAsync,
  CalendarAccessLevel,
  createEventAsync,
} from "expo-calendar";

import Button from "../components/Button";

const CALENDAR_TITLE = "Le calendrier de Clément";
const USER_NAME = "Clément Augier De Moussac";

function Event({ navigation }) {
  const [granted, setGranted] = useState(false);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [calendar, setCalendar] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const styles = useMemo(
    () => createStyles({ color: calendar.color }),
    [calendar.color]
  );

  async function onCreateEvent() {
    setLoading(true);
    try {
      const timeZone = "Europe/Paris";
      const timeZoneOffSet = 2 * 60 * 60 * 1000;
      const startDate = Date.parse(date) + timeZoneOffSet + 1000;
      const id = await createEventAsync(calendar.id, {
        title,
        startDate,
        endDate: startDate,
        allDay: true,
        location,
        timeZone,
      });
      if (id) {
        setError(null);
        navigation.navigate("Identification");
      } else {
        setError("Event not created. Please try again.");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function requestPermissions() {
    const { status } = await requestCalendarPermissionsAsync();
    setGranted(status);
  }

  async function getDefaultCalendarSource() {
    const defaultCalendar = await getDefaultCalendarAsync();
    return defaultCalendar.source;
  }

  async function getCalendar() {
    const calendars = await getCalendarsAsync(EntityTypes.EVENT);
    const existingCalendar = calendars.find(
      (calendar) => calendar.title === CALENDAR_TITLE
    );
    if (existingCalendar) {
      setCalendar(existingCalendar);
    } else {
      const source =
        Platform.OS === "ios"
          ? await getDefaultCalendarSource()
          : { isLocalAccount: true, name: USER_NAME };
      const id = await createCalendarAsync({
        name: CALENDAR_TITLE,
        title: CALENDAR_TITLE,
        color: "red",
        source,
        ownerAccount: USER_NAME,
        accessLevel: CalendarAccessLevel.OWNER,
      });
      const calendars = await getCalendarsAsync(EntityTypes.EVENT);
      const newCalendar = calendars.find((calendar) => calendar.id === id);
      setCalendar(newCalendar);
    }
  }

  useEffect(() => {
    requestPermissions();
  }, []);

  useEffect(() => {
    if (granted) {
      getCalendar();
    }
  }, [granted]);

  if (!granted)
    return (
      <View>
        <Text>
          You have to grant permission to create an event. Please go to your
          device settings and allow this app to edit your calendar.
        </Text>
      </View>
    );

  return (
    <View style={styles.root}>
      <View style={styles.field}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="🥗 Lunch w/ friends"
          style={styles.input}
        />
      </View>
      <View style={[styles.field, styles.calendar]}>
        <View style={styles.dot} />
        <Text style={styles.label}>{calendar.title}</Text>
      </View>
      <View style={styles.field}>
        <Text style={styles.label}>Date</Text>
        <TextInput
          value={date}
          onChangeText={setDate}
          placeholder="01/13/2022"
          style={styles.input}
        />
        <Text style={styles.legend}>
          Format should be mm/dd/yyyy e.g. 01/13/2022
        </Text>
      </View>
      <View style={styles.field}>
        <Text style={styles.label}>Location</Text>
        <TextInput
          value={location}
          onChangeText={setLocation}
          placeholder="Restaurant les 3 marmites, 33300 Bordeaux"
          style={styles.input}
        />
      </View>
      <View style={styles.actions}>
        <Button
          title={loading ? "Creating..." : "Create"}
          onPress={!loading && onCreateEvent}
        />
      </View>
      {error && (
        <View>
          <Text style={styles.error}>{error}</Text>
        </View>
      )}
    </View>
  );
}

export default Event;

const createStyles = ({ color }) =>
  StyleSheet.create({
    root: {
      padding: 16,
    },
    field: {
      paddingVertical: 4,
    },
    input: {
      fontSize: 20,
      padding: 8,
      borderColor: "black",
      borderWidth: 4,
      borderStyle: "solid",
    },
    label: {
      fontSize: 20,
      fontWeight: "700",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    calendar: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    legend: {
      fontSize: 14,
    },
    actions: {
      paddingVertical: 16,
    },
    dot: {
      backgroundColor: color,
      width: 20,
      height: 20,
      borderRadius: 10,
      marginHorizontal: 8,
    },
    error: {
      color: "red",
    },
  });
