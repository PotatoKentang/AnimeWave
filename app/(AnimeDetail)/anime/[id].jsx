import {
  Badge,
  BadgeText,
  HStack,
  Heading,
  Image,
  ScrollView,
  Spinner,
  Text,
  VStack,
  View,
} from "@gluestack-ui/themed";
// import useSWR from 'swr'
import { getAnimeInfo, searchAnime } from "../../../utils/api";
import { Fragment, useEffect, useState } from "react";
import { Link, useLocalSearchParams } from "expo-router";
import SafeAreaView from "../../../components/safe-area-view";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { TouchableOpacity } from "react-native";
import Favorite from "../../../components/icon/favorite";
export default function AnimeDetail() {
  const { id } = useLocalSearchParams();
  const [data, setData] = useState({});
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function showData() {
      const animeInfo = await getAnimeInfo(id);
      setData(animeInfo);
      setIsLoading(false);
    }
    showData();
  }, []);
  if (isLoading) {
    return (
      <SafeAreaView style={{ flex:1,justifyContent:"center",alignItems:"center" }}>
        <HStack space="sm">
          <Spinner color="$indigo600"/>
          <Text size="md">Please Wait</Text>
        </HStack>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView>
      <ScrollView
        style={{
          paddingBottom: 30,
        }}
      >
        {data.cover && (
          <Image
            w="$full"
            h="$1/4"
            borderRadius="$none"
            source={{
              uri: data?.cover,
            }}
            objectFit="fill"
            alt={data?.title?.romaji}
          />
        )}
        <HStack alignItems="center" paddingRight="$5">
          <Heading w="$5/6" size="3xl" style={{ padding:5,flexGrow:1 }}>{data.title?.romaji}</Heading>
          <Favorite w="$1/6" id={id} />
        </HStack>
        <Text size="md" style={{ padding:5 }}>
          {data.description?.split("<br>").map((paragraph, index) => (
            <Fragment key={index}>{paragraph}</Fragment>
          ))}
        </Text>
        <View style={{ marginTop: 10 }} />
        <HStack flexWrap="wrap" gap="$1">
          {data.genres?.map((genre, index) => {
            return (
              <Badge
                key={index}
                size="lg"
                variant="outline"
                borderRadius="$none"
                bgColor="transparent"
              >
                <BadgeText>{genre}</BadgeText>
              </Badge>
            );
          })}
        </HStack>
        <View style={{ marginTop: 10 }} />
        <VStack style={{ padding:5 }}>
          <Heading size="lg">Episodes</Heading>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            bounces={false}
          >
            {data.episodes?.map((episode, index) => {
              return (
                <Link
                  key={episode?.id}
                  href={{
                    pathname: "/episodes/[episode]?cover=[cover]&animeId=[animeId]",
                    params: { episode: episode?.id,cover:episode?.image,animeId:id },

                  }}
                  asChild
                >
                  <TouchableOpacity>
                    <VStack w="$48" style={{ wordWrap: "wrap",marginRight:5 }}>
                      {episode.image && (
                        <Image
                          w="$48"
                          h="$48"
                          style={{
                            objectFit: "cover",
                          }}
                          borderRadius="$none"
                          source={{
                            uri: episode?.image,
                          }}
                          alt={episode?.title}
                        />
                      )}
                      <Text
                        size="lg"
                        style={{
                          textAlign: "center",
                        }}
                      >
                        {episode?.title}
                      </Text>
                      <Text
                        size="md"
                        style={{
                          textAlign: "center",
                        }}
                      >
                        Episode {index + 1}
                      </Text>
                    </VStack>
                  </TouchableOpacity>
                </Link>
              );
            })}
          </ScrollView>
        </VStack>
        <View style={{ marginTop: 10 }} />
        <VStack style={{ padding:5 }}>
          <Heading size="lg">Recommendations</Heading>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            snapToAlignment="start"
            bounces={false}
          >
            {data.recommendations?.map((recommendation, index) => {
              return (
                <Link
                  key={recommendation?.id}
                  href={{
                    pathname: "/anime/[id]",
                    params: { id: recommendation?.id },
                  }}
                  asChild
                >
                  <TouchableOpacity>
                    <VStack key={index} w="$48" style={{ wordWrap: "wrap" }}>
                      {recommendation.image && (
                        <Image
                          w="$48"
                          h="$48"
                          style={{
                            objectFit: "cover",
                          }}
                          borderRadius="$none"
                          source={{
                            uri: recommendation?.image,
                          }}
                          alt={recommendation?.title?.romaji}
                        />
                      )}
                      <Text
                        size="lg"
                        style={{
                          textAlign: "center",
                        }}
                      >
                        {recommendation?.title?.romaji}
                      </Text>
                    </VStack>
                  </TouchableOpacity>
                </Link>
              );
            })}
          </ScrollView>
        </VStack>
        <View
          style={{
            marginBottom: 500,
          }}
        ></View>
      </ScrollView>
    </SafeAreaView>
  );
}
