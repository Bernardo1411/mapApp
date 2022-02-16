import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import MapView, { Marker } from "react-native-maps";
import { TouchableOpacity } from "react-native-gesture-handler";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Constants from "expo-constants";

export default function MapScreen({ navigation }) {
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        // markers database
        const res = await fetch("https://mobile.ect.ufrn.br:3003/markers", {
          headers: {
            Authorization: `Bearer vv7oTsHdw0X9g5e7QbniP58j3iJY4h6AoOSxMIw2X8xjokSHjF`,
          },
        });

        const markers = await res.json();

        setMarkers(markers);
      } catch {
        throw new Error();
      }
    }
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar />
      <MapView style={styles.map}>
        {markers.map((marker, id) => (
          <Marker
            key={id}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            title={marker.title}
            description={marker.description}
          />
        ))}
      </MapView>
      <View style={styles.buttonArea}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("AddMark")}
        >
          <Text style={styles.buttonContent}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: Constants.statusBarHeight,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  buttonArea: {
    display: "flex",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    bottom: 0,
    width: 60,
    height: 60,
    right: 10,
    bottom: 50,
    backgroundColor: "transparent",
  },
  button: {
    backgroundColor: "#695",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    height: 60,
    width: 60,
    borderRadius: 60,
  },
  buttonContent: {
    fontWeight: "bold",
    color: "white",
    fontSize: 40,
  },
});
