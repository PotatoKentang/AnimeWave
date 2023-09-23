import { View, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import MasonryList from "@react-native-seoul/masonry-list";
import { getAnimeInfo, searchAnime } from "../../../utils/api";
import { Heading, Image, ScrollView, Text, VStack } from "@gluestack-ui/themed";
import { Link, useFocusEffect } from "expo-router";
import SafeAreaViewWrapper from "../../../components/safe-area-view";
import { CardItem } from "../../../components/card-item";
import { getDataFromLocalStorage } from "../../../utils/local-storage";

const PlaceholderCardItem = ({ isLoading }) => {
  if (isLoading) {
    return (
      <TouchableOpacity>
        <VStack style={{ wordWrap: "wrap", padding: 5 }}>
          <View
            style={{ height: 96, width: "100%", backgroundColor: "grey" }}
          />
          <View
            style={{ height: 16, width: "100%", backgroundColor: "grey" }}
          />
          <View
            style={{ height: 12, width: "100%", backgroundColor: "grey" }}
          />
        </VStack>
      </TouchableOpacity>
    );
  } else {
    return null;
  }
};

export default function FavoriteAnimeScreen() {
  const [favoriteAnimeData, setFavoriteAnimeData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchFavoriteAnime() {
    const storedData = await getDataFromLocalStorage();
    const newData = [];

    for (const item of storedData) {
      const animeInfo = await getAnimeInfo(item.id);
      newData.push(animeInfo);
    }
    setFavoriteAnimeData(newData);
    setIsLoading(false);
  }

  useFocusEffect(() => {
    fetchFavoriteAnime();
  });

  return (
    <SafeAreaViewWrapper>
      {isLoading ? (
        // Render loading indicator here
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>Loading...</Text>
        </View>
      ) : (
        // Render the MasonryList when data is loaded
        <MasonryList
          data={favoriteAnimeData}
          keyExtractor={(item) => item.id}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={CardItem}
          onEndReachedThreshold={0.1}
          ListHeaderComponent={
            <Heading size="xl" style={{ padding: 5 }}>
              Favorite Anime
            </Heading>
          }
          ListFooterComponent={<PlaceholderCardItem isLoading={isLoading} />}
        />
      )}
    </SafeAreaViewWrapper>
  );
}
