import * as React from "react";
import { Input } from "@rneui/base";
import { Header, Icon, Button } from "@rneui/base";
import { View } from "react-native"

export function RNEInput({data_id, label, placeholder, update_function}:{data_id:string, label:string, placeholder:string, update_function:Function}) {
  return (
    <View style={{backgroundColor:"#fff"}}>
      <Input
        onChangeText={function(value){
          update_function(value)
        }}
        containerStyle={{}}
        disabledInputStyle={{ background: "white" }}
        inputContainerStyle={{}}
        errorMessage="Oops! that's not correct."
        errorStyle={{}}
        errorProps={{}}
        inputStyle={{}}
        label={label}
        labelStyle={{}}
        labelProps={{}}
        leftIcon={<Icon name="account-outline" size={20} />}
        leftIconContainerStyle={{}}
        rightIcon={<Icon name="close" size={20} />}
        rightIconContainerStyle={{}}
        placeholder={placeholder}
      />
    </View>
  );
}






export function RNEHeader() {
  return (
    <Header
      backgroundImageStyle={{}}
      barStyle="default"
      centerComponent={{
        text: "食材追加",
        style: {
          color: "black",
          fontSize: 20,
          fontWeight: 'bold'
        }
      }}
      centerContainerStyle={{}}
      containerStyle={{
        width: "100%",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: "white",
        fontColor: "black"
      }}
      leftContainerStyle={{}}
      linearGradientProps={{}}
      placement="center"
      rightContainerStyle={{}}
      statusBarProps={{}}
    />
  );
}


export function RNEButton({update_function}:{update_function:Function}) {
  return (
    <Button
      buttonStyle={{ width: 150,
        borderRadius: 5 }}
      containerStyle={{
        margin: 5 ,
      }}
      disabledStyle={{
        borderWidth: 2,
        borderColor: "#00F",
      }}
      disabledTitleStyle={{ color: "#00F" }}
      linearGradientProps={null}
      icon={<Icon name="react" size={15} color="#0FF" />}
      iconContainerStyle={{ background: "#000" }}
      loadingProps={{ animating: true }}
      loadingStyle={{}}
      onPress={update_function}
      title="追加する"
      titleProps={{}}
      titleStyle={{ marginHorizontal: 5 }}
    />
  );
}