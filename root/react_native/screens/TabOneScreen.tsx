import { StyleSheet, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import * as React from "react";
import { RNECard } from '../components/RNECard'
import { useState } from 'react';

import { Icon } from "@rneui/themed";


function FoodListRender() {
  const food_list_init = {
    vegetable: [
      {
        category: 3,
        title: "じゃがいも",
        img: "https://3.bp.blogspot.com/-EiqKoF2kMTQ/UkJM5vVnb7I/AAAAAAAAYVU/tCuJxeQQiNE/s400/jagaimo_poteto.png"
      },
      {
        category: 4,
        title: "にんじん",
        img: "https://4.bp.blogspot.com/-hVyLhB3-upo/VNH7A0iCAGI/AAAAAAAArY0/EnjhVjd64EY/s800/color05_orange_carrot.png"
      },
      {
        category: 1,
        title: "たまねぎ",
        img: "https://3.bp.blogspot.com/-SDkR2b5YQec/UkJNENH-daI/AAAAAAAAYYE/fZCzG5KG9I4/s800/tamanegi_onion+(1).png"
      },
      {
        category: 1,
        title: "ねぎ",
        img: "https://4.bp.blogspot.com/-ouxvqS-MNoI/UkJM7ra15rI/AAAAAAAAYVw/2zZKFSO09Hw/s800/negi_green_onion.png"
      }
    ],
    meat: [
      {
        category: 1,
        title: "ぶた",
        img: "https://4.bp.blogspot.com/-aUK47jtERxE/VJF_EpPrEAI/AAAAAAAApyg/XR-tDtuD9Vs/s800/animalface_buta.png"
      },
      {
        category: 4,
        title: "とり",
        img: "https://2.bp.blogspot.com/-fhkRCjjEO98/VJF_LkOt_bI/AAAAAAAApzs/jYqrTFF6XA4/s800/animalface_niwatori.png"
      },
      {
        category: 1,
        title: "うし",
        img: "https://2.bp.blogspot.com/-I1bXhmXwLKk/VJF_QyNPkhI/AAAAAAAAp00/uoMPct9C4j8/s800/animalface_ushi.png"
      }
    ],
    fish: [
      {
        category: 1,
        title: "しゃけ",
        img: "https://i.pinimg.com/originals/54/40/ed/5440ed40bc0d5ed94cb83672faac4a1c.png"
      },
      {
        category: 4,
        title: "ほっけ",
        img: "https://2.bp.blogspot.com/-nS9RDSHR3Ng/V2FUnpEgCbI/AAAAAAAA7Y8/OpjkUzpngukjI9HJ2INxT1htxZBer343QCLcB/s800/fish_hokke.png"
      },
      {
        category: 1,
        title: "さば",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0gKRUcBjTN2lQmDekPzK2NfM9Ay4tt_LMVmbuta4B&s"
      }
    ],
    else: [
      {
        category: 1,
        title: "なっとう",
        img: "https://1.bp.blogspot.com/-3QYPEGCAI5o/VUIJwT_DOGI/AAAAAAAAtZA/Pe8ZfrGtBYs/s800/food_nattou_wara.png"
      }
    ]
  }

  const [food_list, SetFood_list] = useState(food_list_init)
  function incremen_food_list(food_kind, food_title) {
    let new_food_list = { ...food_list }
    new_food_list[food_kind] = food_list[food_kind].map(function (row) {
      if (row.title === food_title) {
        row.category = row.category + 1
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
        return row
      } else {
        return row
      }
    }).filter(e => e)
    SetFood_list(new_food_list)
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

  return (
    <>
      <Text style={styles.title}></Text>
      <Text style={styles.title}>・やさーい</Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{
        flex: 1,
        flexDirection: 'row'
      }}>
        {FoodKindRender(food_list, "vegetable", incremen_food_list, decremen_food_list)}
        <Text style={styles.title}></Text>
      </ScrollView>

      <Text style={styles.title}></Text>
      <Text style={styles.title} >・にくー</Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{
        flex: 1,
        flexDirection: 'row',
      }}>
        {FoodKindRender(food_list, "meat", incremen_food_list, decremen_food_list)}
        <Text style={styles.title}></Text>
      </ScrollView>

      <Text style={styles.title}></Text>
      <Text style={styles.title} >・さかなー</Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{
        flex: 1,
        flexDirection: 'row',
      }}>
        {FoodKindRender(food_list, "fish", incremen_food_list, decremen_food_list)}
        <Text style={styles.title}></Text>
      </ScrollView>

      <Text style={styles.title}></Text>
      <Text style={styles.title}>・その他</Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{
        flex: 1,
        flexDirection: 'row'
      }}>
        {FoodKindRender(food_list, "else", incremen_food_list, decremen_food_list)}
        <Text style={styles.title}></Text>
      </ScrollView>
    </>
  )
}


export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  return (
    <>
      <ScrollView alignItems="center">
        {FoodListRender()}
        <Text style={styles.title}></Text>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <EditScreenInfo path="/screens/TabOneScreen.tsx" />
      </ScrollView>
      <TouchableOpacity
        style={{
          borderWidth: 1,
          borderColor: 'rgba(0,0,0,0.2)',
          alignItems: 'center',
          justifyContent: 'center',
          width: 70,
          position: 'absolute',
          bottom: 10,
          right: 10,
          height: 70,
          backgroundColor: '#fff',
          borderRadius: 100,
        }}
      >
        <Icon
          color="#6E2A40"
          containerStyle={{}}
          disabledStyle={{}}
          iconProps={{}}
          iconStyle={{}}
          name="add"
          onLongPress={() => console.log("onLongPress()")}
          onPress={() => console.log("onPress()")}
          size={40}
          type="material"
        />
      </TouchableOpacity>
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
