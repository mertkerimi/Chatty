import { useRoute } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import firebase from "firebase/compat/app";
import { GiftedChat, Bubble } from "react-native-gifted-chat";

const Chat = () => {
  const route = useRoute();

  const [messages, setMessages] = useState([]);

  const [uid, setUID] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    return firebase.auth().onAuthStateChanged((user) => {
      setUID(user?.uid);
      setName(user?.displayName);
    });
  }, []);

  useEffect(() => {
    return firebase
      .firestore()
      .doc("chats/" + route.params.chatId)
      .onSnapshot((snapshot) => {
        setMessages(snapshot.data()?.messages ?? []);
      });
  }, [route.params.chatId]);

  const onSend = (m = []) => {
    firebase
      .firestore()
      .doc("chats/" + route.params.chatId)
      .set(
        {
          messages: GiftedChat.append(messages, m),
        },
        { merge: true }
      );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <GiftedChat
        messages={messages.map((x) => ({
          ...x,
          createdAt: x.createdAt?.toDate(),
        }))}
        onSend={(messages) => onSend(messages)}
        renderBubble={props => {
          return (
        <Bubble
          {...props}

          textStyle={{
            right: {
              color: 'white',
            },
            left: {
              color: '#24204F',
            },
          }}
          wrapperStyle={{
            left: {
              backgroundColor: '#ede0d4',
            },
            right: {
              backgroundColor: "#a98467",
            },
          }}
        />
      );
    }}  
        user={{
          _id: uid,
          name: name,
        }}
      />
    </View>
  );
};

export default Chat;
