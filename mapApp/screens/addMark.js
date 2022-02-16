import React, { useState } from "react";
import MapView, { Marker } from "react-native-maps";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Dimensions,
  TextInput,
} from "react-native";

export default function AddMark() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  const addMarker = async () => {
    try {
      const res = await fetch("https://mobile.ect.ufrn.br:3003/markers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer vv7oTsHdw0X9g5e7QbniP58j3iJY4h6AoOSxMIw2X8xjokSHjF`,
        },
        body: JSON.stringify({
          title,
          description,
          latitude,
          longitude,
        }),
      });

      const postResponse = await res.json();

      setTitle("");
      setDescription("");
      setLatitude(0);
      setLongitude(0);

      console.log(postResponse);
    } catch {
      throw new Error();
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        onPress={(event) => {
          setLatitude(event.nativeEvent.coordinate.latitude);
          setLongitude(event.nativeEvent.coordinate.longitude);
        }}
      >
        <Marker
          coordinate={{ latitude: latitude, longitude: longitude }}
          title={title}
          description={description}
        />
      </MapView>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Título"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={styles.input}
          placeholder="Descrição"
          value={description}
          onChangeText={setDescription}
        />
        <Button title="Adicionar" onPress={() => addMarker()} />
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
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  input: {
    height: 40,
    width: "90%",
    marginTop: 20,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    backgroundColor: "white",
    paddingLeft: 10,
  },
  form: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    width: Dimensions.get("window").width,
    height: 200,
    backgroundColor: "white",
  },
});
