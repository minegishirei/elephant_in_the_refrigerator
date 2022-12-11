

import * as React from "react";
import { Text } from "react-native"
import { StyleSheet, TouchableOpacity } from 'react-native';

import { ListItem, Avatar } from "@rneui/themed";
import { TouchableHighlight } from "react-native";
import { View } from "./Themed";

export function DayRow({date, week, cooking_list}) {
  return (
    <>
    <View style = {line_styles.lineStyle} />
      <ListItem
        Component={TouchableHighlight}
        containerStyle={{}}
        disabledStyle={{ opacity: 0.5 }}
        onLongPress={() => console.log("onLongPress()")}
        onPress={() => console.log("onLongPress()")}
        pad={20}
      >
        <View style={{width:50, paddingLeft: 10}}>
        <ListItem.Content>
          <ListItem.Title>
            <Text style={{fontSize: 20}}>{week}</Text>
          </ListItem.Title>
        </ListItem.Content>
        </View>
        <ListItem.Content>
          <ListItem.Title>
            <Text style={{fontSize: 20}}>{cooking_list.join("/")}</Text>
          </ListItem.Title>
        </ListItem.Content>
      </ListItem>
      <View style = {line_styles.lineStyle} />
    </>
  );
}



const styles = StyleSheet.create({
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightContainer: {
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
  },
  helpContainer: {
    marginTop: 15,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    textAlign: 'center',
  },
});




const line_styles = StyleSheet.create({
  lineStyle:{
        borderWidth: 0.5,
        borderColor:'black',
   }
 });