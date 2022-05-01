import { useEffect, useState } from "react";
import * as Location from "expo-location";

function useLocation() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  // const [latitude, setLatitude] = useState(null);
  // const [longitude, setLongitude] = useState(null);
  const [ville, setVille] = useState(null);
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      //ajout
      let regionName = await Location.reverseGeocodeAsync({
        longitude: location.coords.longitude,
        latitude: location.coords.latitude,
      });
      setVille(regionName[0].city);
      // console.log("\n ------------\n", ville, "\n ------------\n");
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    console.log(location);
    return [location.coords.latitude, location.coords.longitude, ville];
  }

  // return location;
  // return [latitude, longitude];
}

export default useLocation;
