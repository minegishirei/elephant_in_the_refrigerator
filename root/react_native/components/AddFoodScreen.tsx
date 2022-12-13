import { StyleSheet, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native';

import EditScreenInfo from './EditScreenInfo';
import { Text, View } from './Themed';
import { RootTabScreenProps } from '../types';
import * as React from "react";
import { RNECard } from './RNECard'
import { useState } from 'react';
import { RNEInput, RNEHeader, RNEButton } from './rne'
import { Modal } from 'react-native';
import { Icon } from "@rneui/themed";

export function AddFoodScreen({add_function}:{add_function: Function}) {
  const [MODAL_FLAG, setMODLA_FLAG] = useState(false);
  function showModal() {
    setMODLA_FLAG(true)
  }
  function hideModal() {
    setMODLA_FLAG(false)
  }
  return (
    <View style={{ backgroundColor: "#fff" }}>
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
          onLongPress={() => console.log("test()")}
          onPress={function () {
            console.log("press modal_flag on")
            showModal()
          }}
          size={40}
          type="material"
        />

      </TouchableOpacity>
      <Modal visible={MODAL_FLAG}
        transparent={true}
        animationType={"slide" || "fade"}
        presentationStyle={"pageSheet" || "formSheet" || "overFullScreen"}>
        <View
          style={{
            margin: 10,
            borderRadius: 10,
            height: '80%',
            marginTop: 'auto',
            backgroundColor: '#eee',
            opacity: 1
          }}>
          <View style={{
            opacity: 0
          }}>
          </View>
          <TouchableOpacity
            onPress={() => {
              hideModal()
            }}>
            <InsideModal hideFunction={hideModal} add_function={add_function}></InsideModal>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  )
}


function InsideModal({ hideFunction, add_function }: { hideFunction: Function, add_function: Function }) {
  let new_food_info ={
    "food_kind": "",
    "food_title": "",
  }

  function updateNewFoodName(new_name) {
    new_food_info["food_kind"] = new_name
  }
  function updateNewCategoryName(new_name) {
    new_food_info["food_title"] = new_name
  }
  function onClickAddButton() {
    add_function(new_food_info["food_kind"], new_food_info["food_title"])
    // new_food_infoを使ってデータをセットする
    hideFunction()
  }

  return (
    <>
      <RNEHeader />
      <Text></Text>
      <Text style={{ backgroundColor: "#fff" }}></Text>
      <RNEInput label='食材名' placeholder='ねぎ' update_function={updateNewFoodName}></RNEInput>
      <RNEInput label='食品カテゴリー' placeholder='やさい' update_function={updateNewCategoryName}></RNEInput>
      <View style={{ alignItems: "center" }}>
        <RNEButton update_function={onClickAddButton}></RNEButton>

        <Text style={{ backgroundColor: "#fff" }}></Text>
      </View>
    </>
  )
}


