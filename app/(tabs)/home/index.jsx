import { View, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import MasonryList from "@react-native-seoul/masonry-list";
import { getPopularAnime } from "../../../utils/api";
import { Heading, Image, ScrollView, Text, VStack } from "@gluestack-ui/themed";
import { Link } from "expo-router";
import SafeAreaViewWrapper from "../../../components/safe-area-view";
import { CardItem } from "../../../components/card-item";
import * as Permissions from "expo-permissions";

export default function index() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [newData, setNewData] = useState([]); // Separate array for new data

  useEffect(() => {
    async function fetchPopularAnime() {
      if (!hasNextPage) return;
      const response = await getPopularAnime(page);
      const newDataArray = response?.results || [];
      setNewData(newDataArray); // Set new data separately
      if (response.hasNextPage === false) {
        setHasNextPage(false);
      }
    }
    fetchPopularAnime();
  }, [page, hasNextPage]);

  // Update the data array by concatenating the new data
  useEffect(() => {
    setData((prevData) => [...prevData, ...newData]);
  }, [newData]);

  const getStoragePermission = async () => {
    const { status } = await Permissions.askAsync(
      Permissions.MEDIA_LIBRARY_WRITE_ONLY
    );
    if (status !== "granted") {
      console.error("Storage permission not granted");
    }
  };

  useEffect(() => {
    getStoragePermission();
  }, []);

  if (!data) {
    return (
      <View
        style={{
          flex: 1,
          marginTop: "70%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text>No anime Searched or Found</Text>
      </View>
    );
  }

  return (
    <SafeAreaViewWrapper>
      <MasonryList
        data={data}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={CardItem}
        onEndReachedThreshold={0.1}
        onEndReached={() => setPage((prevPage) => prevPage + 1)}
        ListHeaderComponent={
          <Heading size="xl" style={{ padding: 5 }}>
            Popular Anime
          </Heading>
        }
        ListEmptyComponent={() => (
          <View
            style={{
              flex: 1,
              marginTop: "70%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text>No anime Searched or Found</Text>
          </View>
        )}
      />
    </SafeAreaViewWrapper>
  );
}
