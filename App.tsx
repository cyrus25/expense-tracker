/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from "react";
import SmsAndroid from "react-native-get-sms-android";
// import { FlashList } from "@shopify/flash-list";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  PermissionsAndroid,
  useColorScheme,
  View,
  Button,
  FlatList,
} from "react-native";

import { Colors } from "react-native/Libraries/NewAppScreen";

const App = () => {
  const isDarkMode = useColorScheme() === "dark";

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [messages, setMessages] = React.useState([]);

  async function getPermission() {
    try {
      let granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_SMS,
        {
          title: "Read SMS",
          message: "Need access to read sms",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("READ_SMS permissions granted", granted);
      } else {
        console.log("READ_SMS permissions denied");
      }
    } catch (err) {
      console.log(err);
    }
  }

  React.useEffect(() => {
    getPermission();
    listMessage();
  }, []);

  // async function requestReadSmsPermission() {
  //   try {
  //     await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.READ_SMS,
  //       {
  //         title: '(...)',
  //         message: "Why you're asking for...",
  //       },
  //     );
  //   } catch (err) {}
  // }

  const sendMessage = () => {
    let phoneNumber = "+919877544358";
    let message = "hello";

    // SmsAndroid.autoSend(
    //   phoneNumber,
    //   message,
    //   fail => {
    //     console.log('Failed with this error: ' + fail);
    //   },
    //   success => {
    //     console.log('SMS sent successfully');
    //   },
    // );
  };

  const listMessage = () => {
    SmsAndroid.list(
      JSON.stringify({
        box: "inbox", // 'inbox' (default), 'sent', 'draft', 'outbox', 'failed', 'queued', and '' for all
        bodyRegex: "(.*)debited for(.*)",
      }),
      (fail) => {
        console.log("Failed with this error: " + fail);
      },
      (count, smsList) => {
        console.log("Count: ", count);
        console.log("List: ", smsList);
        const list = JSON.parse(smsList);

        const result = list.map((obj) => {
          const message = obj.body;
          //  console.log('message', message);
          console.log("\n");
          const userStartIndex = message.includes(";")
            ? message.indexOf(";") + 2
            : message.indexOf("&") + 2;
          const userEndIndex = message.indexOf("credited") - 1;

          let amount = message.match(
            /(?:INR|Rs|inr|rs|RS|Inr)\s*\d+(?:\.\d{2})?/m
          );

          return {
            value: amount?.[0] ?? null,
            date: obj.date,
            debited: true,
            credited: false,
            user: message.substring(userStartIndex, userEndIndex),
          };
        });

        setMessages(result);

        // arr.forEach(function (object) {
        //   //  console.log('Object: ' + JSON.stringify(object, null, 4));
        //   console.log('-->' + new Date(object.date).getMonth());
        //   console.log('-->' + object.body);
        // });
      }
    );
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />

      <View
        style={{
          backgroundColor: isDarkMode ? Colors.black : Colors.white,
          width: "100%",
          height: "100%",
        }}
      >
        {/* <Text>Hello</Text> */}
        {/* <Button onPress={sendMessage} title="Press me" />
           <Button onPress={listMessage} title="List messages" /> */}

        <Text>Transactions</Text>
        <FlatList
          data={messages}
          estimatedItemSize={100}
          renderItem={({ item }) => {
            return (
              <View style={styles.transactionContainer}>
                <Text>{item.user}</Text>
                <View>
                  <Text>{item.value}</Text>
                  <Text>{new Date(item.date).toLocaleDateString("en-US")}</Text>
                </View>
              </View>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
  },
  highlight: {
    fontWeight: "700",
  },
  transactionContainer: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
});

export default App;
