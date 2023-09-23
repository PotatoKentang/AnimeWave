import { useEffect, useRef, useState } from "react";
import { getAnimeInfo, getAnimeVideoLink } from "../../../utils/api";
import { Video } from "expo-av";
import SafeAreaView from "../../../components/safe-area-view";
import { Link, useLocalSearchParams } from "expo-router";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import * as ScreenOrientation from "expo-screen-orientation";
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
import { TouchableOpacity } from "react-native";
export default function Episode() {
  const { id, cover, animeId } = useLocalSearchParams();
  const videoRef = useRef(null);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [animeInfo, setAnimeInfo] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const episodeInfo = await getAnimeVideoLink(id);
      const animeInfo = await getAnimeInfo(animeId);
      setAnimeInfo(animeInfo);
      setData(episodeInfo);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  const setOrientation = async () => {
    const currentOrientation = await ScreenOrientation.getOrientationAsync();

    if (currentOrientation === ScreenOrientation.Orientation.PORTRAIT_UP) {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE_LEFT
      );
    } else {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP
      );
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <HStack space="sm">
          <Spinner color="$indigo600" />
          <Text size="md">Please Wait</Text>
        </HStack>
      </SafeAreaView>
    );
  }
  // Conditional rendering for Video component
  return (
    <SafeAreaView>
      <ScrollView>
        {data.sources.length > 0 ? (
          <Video
            source={{
              uri:
                data?.sources[3].url ||
                data?.sources[data?.sources?.length - 1]?.url,
              headers: {
                Referer: data?.headers?.Referer,
                "User-Agent":
                  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36",
              },
            }}
            ref={videoRef}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode="contain"
            onFullscreenUpdate={setOrientation}
            style={{ width: wp("100%"), height: hp("30%") }}
            posterStyle={{
              resizeMode: "contain",
            }}
            
            shouldPlay
            usePoster={true}
            posterSource={{ uri: cover }}
            useNativeControls
            onError={(e) => {
              console.log(e);
            }}
          />
        ) : (
          <Text>No video sources available.</Text>
        )}
        <View style={{ marginTop: 10 }} />
        <VStack style={{ padding: 10 }}>
          <Heading size="lg">Episodes</Heading>
          <ScrollView showsHorizontalScrollIndicator={false} bounces={false}>
            {animeInfo.episodes?.map((episode, index) => {
              return (
                <Link
                  key={episode?.id}
                  replace
                  href={{
                    pathname:
                      "/episodes/[episode]?cover=[cover]&animeId=[animeId]",
                    params: {
                      episode: episode?.id,
                      cover: episode?.image,
                      animeId: animeId,
                    },
                  }}
                  asChild
                >
                  <TouchableOpacity>
                    <HStack gap={10} style={{ padding: 10,alignItems:"center" }}>
                      {episode.image && (
                        <Image
                          w="$20"
                          h="$20"
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
                      <VStack w="$full">
                        <Text
                          size="xl"
                          style={{
                            wordWrap: "wrap",
                            flexWrap: "wrap",
                            maxWidth: wp("70%")
                          }}
                        >
                          {episode?.title}
                        </Text>
                        <Text
                          style={{
                            wordWrap: "wrap",
                            flexWrap: "wrap",
                          }}
                          size="lg"
                        >
                          Episode {index + 1}
                        </Text>
                      </VStack>
                    </HStack>
                  </TouchableOpacity>
                </Link>
              );
            })}
          </ScrollView>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
}
