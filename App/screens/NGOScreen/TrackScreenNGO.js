import React from "react";
import { Text, StyleSheet, View } from "react-native";
import IconButton from "../../UI/IconButton";

export default function TrackScreenNGO() {
  return (
    <View style={styles.outerCont}>
      <View style={styles.cont}>
        <Text style={styles.text}>No active order to track! </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerCont:{
    flex:1,
    alignItems: 'center',
  },
  cont: {
    height: 50,
    width: 300,
    marginTop: 300,
    borderRadius: 20,
    alignContent: "center",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#50C878",
  },
  text: {
    marginLeft: 65,
    fontSize: 18,
  }

});
