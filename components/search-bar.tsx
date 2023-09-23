import React from "react";
import { Input, InputField, InputIcon } from "@gluestack-ui/themed";
import { AntDesign } from "@expo/vector-icons";

export default function Searchbar(props:any) {
  return (
    <Input
      variant="outline"
      size="md"
      isDisabled={false}
      isInvalid={false}
      isReadOnly={false}
      style={{
        alignItems: "center",
        paddingHorizontal: 5,
      }}
    >
      <AntDesign name="search1" size={24} color="gray" />
      <InputField
        placeholder="Enter Text here"
        value={props.value}
        onChangeText={props.onTextChange} 
      />
    </Input>
  );
}
