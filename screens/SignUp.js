import React, { useState } from "react";
import { Text, View } from "react-native";
import { TextInput, Button, Subheading } from "react-native-paper";
import firebase from "firebase/compat/app";
import { useNavigation } from "@react-navigation/core";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const navigation = useNavigation();

  const createAccount = async () => {
    setIsLoading(true);
    try {
      const response = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      await response.user.updateProfile({ displayName: name });
      navigation.popToTop();
    } catch (e) {
      setIsLoading(false);
      setError(e.message);
    }
  };

  return (
    <View style={{ margin: 16 }}>
      {!!error && (
        <Subheading
          style={{ color: "red", textAlign: "center", marginBottom: 16 }}
        >
          {error}
        </Subheading>
      )}
      <TextInput
        label="Kullanıcı Adı"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        label="E-mail"
        style={{ marginTop: 12 }}
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        label="Şifre"
        style={{ marginTop: 12 }}
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry

      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          marginTop: 16,
        }}
      >
        <Button
          mode="contained"
          onPress={() => createAccount()}
          loading={isLoading}
        >
          Kayıt Ol
        </Button>
      </View>
    </View>
  );
};

export default SignUp;
