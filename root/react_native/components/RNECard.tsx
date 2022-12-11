import * as React from "react";
import { Card } from "@rneui/themed";
import { View, Image, Button, TouchableHighlight } from "react-native";
import { Text, TextProps } from './Themed';

export function RNECard({ title, category, img, food_kind, update_function, down_function }: { title: string, category: string, img: string, food_kind: string, update_function: Function, down_function: Function }) {
  return (
    <TouchableHighlight onPress={() => update_function(food_kind, title)} underlayColor="#eee">
      <Card containerStyle={{ borderRadius: 7 }} wrapperStyle={{}} style={{ width: 80 }}>
        <Card.Title>{title}</Card.Title>
        <Card.Divider />
        <View
          style={{
            position: "relative",
            alignItems: "center"
          }}
        >
          <Image
            style={{ width: 100, height: 100 }}
            resizeMode="contain"
            source={{
              uri: img
            }}
          />
          <Text>{category + "つ"} </Text>
          <Button
            onPress={() => down_function(food_kind, title)}
            title="減らす"
          />
        </View>
      </Card>
    </TouchableHighlight>
  );
}

