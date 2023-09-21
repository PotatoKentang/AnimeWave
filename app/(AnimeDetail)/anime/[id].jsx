import {
  Badge,
  BadgeText,
  HStack,
  Heading,
  Image,
  ScrollView,
  Text,
  VStack,
  View,
} from "@gluestack-ui/themed";
// import useSWR from 'swr'
import useSWRNative from "@nandorojo/swr-react-native";
import { useSWRNativeRevalidate } from "@nandorojo/swr-react-native";
import { getAnimeInfo, searchAnime } from "../../../utils/api";
import { Fragment, useEffect, useState } from "react";
import { Link, useLocalSearchParams } from "expo-router";
import SafeAreaView from "../../../components/safe-area-view";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { TouchableOpacity } from "react-native";
export default function AnimeDetail() {
  const { id } = useLocalSearchParams();
  const [data, setData] = useState({});
  useEffect(() => {
    async function showData() {
      const animeInfo = await getAnimeInfo(id);
      console.log(animeInfo);
      setData(animeInfo);
    }
    showData();
  }, []);
  if (!data) {
    return <Text>Loading...</Text>;
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
            size="2xl"
            style={{
              width: wp("100%"),
              minWidth: wp("100%"),
              minHeight: hp("50%"),
              // aspectRatio: "16:9",
            }}
            borderRadius="$none"
            source={{
              uri: data?.cover,
            }}
            alt={data?.title?.romaji}
          />
        )}

        <Heading>{data.title?.romaji}</Heading>
        <Text>
          {data.description?.split("<br>").map((paragraph, index) => (
            <Fragment key={index}>{paragraph}</Fragment>
          ))}
        </Text>
        <HStack flexWrap="wrap">
          {data.genres?.map((genre, index) => {
            return (
              <Badge
                key={index}
                size="md"
                variant="solid"
                borderRadius="$none"
                action="success"
              >
                <BadgeText>{genre}</BadgeText>
              </Badge>
            );
          })}
        </HStack>
        <VStack>
          <Text>Episodes</Text>
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
                    pathname: "/episodes/[episode]",
                    params: { episode: episode?.id },
                  }}
                  asChild
                >
                  <TouchableOpacity>
                    <VStack w="$40" style={{ wordWrap: "wrap" }}>
                      {episode.image && (
                        <Image
                          w="$40"
                          h="$40"
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

                      <Text>Episode {index + 1}</Text>
                      <Text>{episode?.title}</Text>
                    </VStack>
                  </TouchableOpacity>
                </Link>
              );
            })}
          </ScrollView>
        </VStack>
        <VStack>
          <Text>Recommendations</Text>
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
                    <VStack key={index} style={{ wordWrap: "wrap" }}>
                      {recommendation.image && (
                        <Image
                          w="$40"
                          h="$40"
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

                      <Text>{recommendation.title?.romaji}</Text>
                    </VStack>
                  </TouchableOpacity>
                </Link>
              );
            })}
          </ScrollView>
        </VStack>
        <View
          style={{
            marginBottom: 200,
          }}
        ></View>
      </ScrollView>
    </SafeAreaView>
  );
}
