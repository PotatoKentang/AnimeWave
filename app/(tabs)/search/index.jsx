import { useEffect, useState, useMemo } from "react";
import MasonryList from "@react-native-seoul/masonry-list";
import { getPopularAnime, searchAnime } from "../../../utils/api";
import { Image, ScrollView, Text, VStack, View } from "@gluestack-ui/themed";
import { Link } from "expo-router";
import SafeAreaViewWrapper from "../../../components/safe-area-view";
import SearchBar from "../../../components/search-bar";
import { CardItem } from "../../../components/card-item";
import Searchbar from "../../../components/search-bar";

export default function index() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [textInput, setTextInput] = useState("");
  const [hasNextPage, setHasNextPage] = useState(true);

  useEffect(() => {
    // Your data fetching logic here
    async function fetchSearchedAnime() {
      if (!hasNextPage) return;
      const searchData = await searchAnime(textInput, page);
      if (page === 1) {
        setData(searchData.results);
      } else {
        setData((prevData) => [...prevData, ...searchData.results]);
      }
      console.log(searchData);
      if (!searchData.hasNextPage) {
        setHasNextPage(false);
      }
    }
    fetchSearchedAnime();
  }, [textInput, hasNextPage, page]);

  const memoizedOnTextChange = useMemo(() => {
    return (text) => {
      setTextInput(text);
      setPage(1);
      setHasNextPage(true);
    };
  }, []);

  return (
    <SafeAreaViewWrapper>
      <View style={{ padding: 10 }}>
        <Searchbar onTextChange={memoizedOnTextChange} value={textInput} />
      </View>
      <MasonryList
        data={data}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={CardItem}
        onEndReachedThreshold={0.1}
        onEndReached={() => setPage((prevPage) => prevPage + 1)}
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
