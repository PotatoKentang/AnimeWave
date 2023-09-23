import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import {
  getLocalStorageDataByID,
  removeSingleFromLocalStorage,
  addSingleToLocalStorage,
  getDataFromLocalStorage,
} from "../../utils/local-storage";
export default function Favorite({ id }: { id: string }) {
  const [liked, setLiked] = useState(false);
  useEffect(() => {
    getLocalStorageDataByID(id).then((data) => {
      if (data) {
        setLiked(true);
      }
    });
  }, []);
  useEffect(() => {
    getDataFromLocalStorage().then((data) => console.log(data));
  });
  const onChange = async () => {
    setLiked((state) => !state);
    if (!liked) {
      await addSingleToLocalStorage({ id });
    } else {
      await removeSingleFromLocalStorage({ id });
    }
  };
  if (liked) {
    return <AntDesign name="heart" size={28} color="red" onPress={onChange} />;
  }
  return <AntDesign name="hearto" size={28} color="red" onPress={onChange} />;
}
