import { StyleSheet, Text, TouchableOpacity } from "react-native";

function Button({ title, onPress }) {
  return (
    <TouchableOpacity style={styles.root} onPress={onPress}>
      <Text style={styles.label}>{title}</Text>
    </TouchableOpacity>
  );
}

export default Button;

const styles = StyleSheet.create({
  root: {
    borderColor: "black",
    borderWidth: 4,
    borderStyle: "solid",
    backgroundColor: "rgba(0,0,0,0.1)",
    padding: 8,
  },
  label: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
  },
});

// import { StyleSheet, Text, TouchableOpacity } from "react-native";
// import { useState, useEffect } from "react";

// function Button({ title, onPress }) {
//   const [disabled, setDisabled] = useState(false);

//   const handlePress = () => {
//     onPress();
//     setDisabled(!disabled);
//   };

//   useEffect(() => {
//     // componentsDiMount et commonentDidUpdate
//     const id = setInterval(() => {
//       setDisabled(!disabled);
//       console.log("toggle!");
//     }, 2300);
//     // componentWillUmount
//     return () => {
//       clearInterval(id);
//     };
//   }, [disabled]);

//   return (
//     <TouchableOpacity style={styles.root} onPress={onPress} disabled={disabled}>
//       <Text style={styles.label}>
//         {title} {disabled ? "No" : "Yes"}
//       </Text>
//     </TouchableOpacity>
//   );
// }

// export default Button;

// const styles = StyleSheet.create({
//   root: {
//     borderColor: "black",
//     borderWidth: 4,
//     borderStyle: "solid",
//     backgroundColor: "rgba(0,0,0,0.1)",
//     padding: 8,
//   },
//   label: {
//     fontSize: 20,
//     fontWeight: "700",
//     textAlign: "center",
//   },
// });
