import { MaterialIcons } from "@expo/vector-icons";
import { HStack, Heading, Text } from "@gluestack-ui/themed";
import MasonryList from "@react-native-seoul/masonry-list";
import * as Permissions from "expo-permissions";
import React, { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { CardItem } from "../../../components/card-item";
import SafeAreaViewWrapper from "../../../components/safe-area-view";
import { getPopularAnime } from "../../../utils/api";
export default function Index() {
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [data, setData] = useState([]);
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

  useEffect(() => {
    async function fetchPopularAnime() {
      if (!hasNextPage) return;
      const response = await getPopularAnime(page);
      const newDataArray = response?.results || [];
      setData(newDataArray);
      if (response.hasNextPage === false) {
        setHasNextPage(false);
      }
    }
    fetchPopularAnime();
  }, [page]);


  return (
    <SafeAreaViewWrapper>
      <MasonryList
        // data={uniqueData} // Use unique data
        data={data}
        keyExtractor={(item) => item.id.toString()} // Ensure a string key
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <CardItem item={item} />}
        // onEndReached={() => setPage((prevPage) => prevPage + 1)}
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
            <Text>No anime Found</Text>
          </View>
        )}
        ListFooterComponent={
          <HStack gap="$12" my="$5" justifyContent="center" alignItems="center">
            {page >= 1 && (
              <MaterialIcons
                name="navigate-before"
                size={36}
                color="black"
                onPress={() => setPage((page) => page - 1) && this.scrollTo({y:0})}
              />
            )}
            <Heading size="lg">{page}</Heading>
            {hasNextPage && (
              <MaterialIcons
                name="navigate-next"
                size={36}
                color="black"
                onPress={() => setPage((page) => page + 1) && this.scrollTo({y:0})}
              />
            )}
          </HStack>
        }
      />
    </SafeAreaViewWrapper>
  );
}
