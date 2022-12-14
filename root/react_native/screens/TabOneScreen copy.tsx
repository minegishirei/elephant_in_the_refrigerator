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
  const food_list_init = {}
  const [food_list, SetFood_list] = useState(food_list_init)
  function fetch_food_list(){
    fetch('http://192.168.0.19/refrigerator/get')
    .then((response) => response.json())
    .then(function(responseJson){
      SetFood_list(responseJson)
    })
  }
  //fetch_food_list()


  function incremen_food_list(food_kind, food_title) {
    food_list[food_kind].map(function (row) {
      if (row.title === food_title) {
        fetch(`http://192.168.0.19/refrigerator/set?title=${food_title}&food_kind=${food_kind}&food_count=${row.category+1}`)
          .then((response) => response.json())
          .then(function(responseJson){})
          .then(fetch_food_list)
      }
    }).filter(e => e)
  }
  function decremen_food_list(food_kind, food_title) {
    food_list[food_kind].map(function (row) {
      if (row.title === food_title) {
        fetch(`http://192.168.0.19/refrigerator/set?title=${food_title}&food_kind=${food_kind}&food_count=${row.category-1}`)
          .then((response) => response.json())
          .then(function(responseJson){})
          .then(fetch_food_list)
      }
    }).filter(e => e)
  }
  function add_new_food(food_kind, food_title) {
    fetch(`http://192.168.0.19/refrigerator/set?title=${food_title}&food_kind=${food_kind}&food_count=${1}`)
      .then((response) => response.json())
      .then(function(responseJson){})
      .then(fetch_food_list)
  }


  
  function AllFoodRender() {
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
        <RNEButton update_function={function(){
          fetch('http://192.168.0.19/')
            .then((response) => response.json())
            //.then((response) => alert(response["food_kind"]))
            .then((responseJson) => add_new_food(responseJson["food_kind"], responseJson["title"]))
        }} />
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
