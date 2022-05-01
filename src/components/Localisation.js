import { useEffect, useState } from "react";
import * as Location from "expo-location";

function useLocation() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    return [location.coords.latitude, location.coords.longitude];
  }

  // return location;
  // return [latitude, longitude];
}
// const [location, setLocation] = useState();
// const getLocation = async () => {
//   try {
//     const { granted } = await Location.requestForegroundPermissionsAsync();
//     if (!granted) return;
//     const {
//       coords: { latitude, longitude },
//     } = await Location.getCurrentPositionAsync();
//     setLocation({ latitude, longitude });
//   } catch (error) {
//     console.log(error);
//   }
// };

// useEffect(() => {
//   getLocation();
// }, []);

// return location;
//}

export default useLocation;
