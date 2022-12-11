import { StyleSheet } from 'react-native';
import { RootTabScreenProps } from '../types';
import * as React from "react";

import { DayRow } from "../components/DayRow"

export default function TabTwoScreen({ navigation }: RootTabScreenProps<'TabTwo'>) {
  const cooking_timeline = [
    {
      date: "12/11",
      week: "日",
      cooking_list: ["焼きそば"]
    },
    {
      date: "12/12",
      week: "月",
      cooking_list: ["鶏肉と小松菜の炒め", "ジブリ", "パン"]
    },
    {
      date: "12/13",
      week: "火",
      cooking_list: ["ピーマンつくね"]
    },
  ]
  return (
    <>
      {
        cooking_timeline.map(function (row) {
          return (<DayRow
            date={row.date}
            week={row.week}
            cooking_list={row.cooking_list}
          ></DayRow>)
        })
      }
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
