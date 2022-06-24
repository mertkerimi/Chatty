import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Avatar, Title, Subheading, Button } from "react-native-paper";
import firebase from "firebase/compat/app";

const Settings = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setName(user?.displayName ?? "");
      setEmail(user?.email ?? "");
    });
  }, []);

  return (
    <View style={{ alignItems: "center", marginTop: 16 }}>
      <Avatar.Image size={200} source={require('../assets/avatar.png')} />
      <Title>{name}</Title>
      <Subheading>{email}</Subheading>
      <Button onPress={() => firebase.auth().signOut()}>Çıkış Yap</Button>
    </View>
  );
};

export default Settings;

