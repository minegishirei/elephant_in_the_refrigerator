import { StyleSheet, ScrollView } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import * as React from "react";
import { RNECard } from '../components/RNECard'
import { useState } from 'react';
import { AddFoodScreen } from '../components/AddFoodScreen';
import { RNEButton } from '../components/rne';

function FoodListRender() {
  const SERVER_ADRESS = "34.125.84.235"
  const food_list_init = {}
  const [food_list, SetFood_list] = useState(food_list_init)

  function fetch_food_list() {
    return fetch(`http://${SERVER_ADRESS}/refrigerator/get`)
      .then((response) => response.json())
      .then(function (responseJson) {
        SetFood_list(responseJson)
      })
  }

  function push_food_change(food_kind, food_title, amount) {
    return fetch(`http://${SERVER_ADRESS}/refrigerator/set?title=${food_title}&food_kind=${food_kind}&food_count=${amount}`)
      .then((response) => response.json())
      .then(function (responseJson) { })
  }


  function incremen_food_list(food_kind, food_title) {
    let new_food_list = { ...food_list }
    new_food_list[food_kind] = food_list[food_kind].map(function (row) {
      if (row.title === food_title) {
        row.category = row.category + 1
        push_food_change(food_kind, food_title, row.category)
        return row
      } else {
        return row
      }
    })
    SetFood_list(new_food_list)
  }
  function decremen_food_list(food_kind, food_title) {
    let new_food_list = { ...food_list }
    new_food_list[food_kind] = food_list[food_kind].map(function (row) {
      if (row.title === food_title) {
        row.category = row.category - 1
        if (row.category <= 0) {
          return
        }
        push_food_change(food_kind, food_title, row.category)
        return row
      } else {
        return row
      }
    }).filter(e => e)
    SetFood_list(new_food_list)
  }
  function add_new_food(food_kind, food_title) {
    let new_food_list = { ...food_list }
    push_food_change(food_kind, food_title, 1)
      .then(fetch_food_list)
    //SetFood_list(new_food_list)
  }

  function FoodKindRender(card_list, food_kind, update_function, downgrade_function) {
    return card_list[food_kind].map(function (row) {
      return (<RNECard
        title={row.title}
        category={row.category}
        img={row.img}
        food_kind={food_kind}
        update_function={update_function}
        down_function={downgrade_function}
      ></RNECard>)
    })
  }



  function AllFoodRender() {
    return Object.keys({ ...food_list }).map(function (key) {
      return (
        <>
          <Text style={styles.title}>・{key}</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{
            flex: 1,
            flexDirection: 'row'
          }}>
            {FoodKindRender(food_list, key, incremen_food_list, decremen_food_list)}
            <Text style={styles.title}></Text>
          </ScrollView>
          <Text style={styles.title}></Text>
        </>
      )
    })
  }

  return (
    <>
      <ScrollView alignItems="center">
        <Text style={styles.title}></Text>
        {AllFoodRender()}
        <EditScreenInfo path="/screens/ModalScreen.tsx" />
        <Text style={styles.title}></Text>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

        <RNEButton update_function={fetch_food_list} />
      </ScrollView>
      <AddFoodScreen add_function={add_new_food} />
    </>
  )
}


export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  return (
    <>
      {FoodListRender()}
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
    paddingLeft: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
