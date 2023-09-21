import { View, Text } from "react-native";
import { useEffect, useRef, useState } from "react";
import { getAnimeVideoLink } from "../../../utils/api";
import { Video } from "expo-av";
import SafeAreaView from "../../../components/safe-area-view";
import { useLocalSearchParams } from "expo-router";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import * as ScreenOrientation from "expo-screen-orientation";

export default function Episode() {
  const { id } = useLocalSearchParams();
  const videoRef = useRef(null);
  const [data, setData] = useState(null); // Initialize data as null
  useEffect(() => {
    async function showData() {
      const episodeInfo = await getAnimeVideoLink(id);
      console.log(episodeInfo);
      setData(episodeInfo);
    }
    showData();
  }, []);

  const setOrientation = async (event) => {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE_LEFT
    );
  };

  if (data === null) {
    return <Text>Loading...</Text>;
  }

  // Conditional rendering for Video component
  return (
    <SafeAreaView>
      {data.sources.length > 0 ? (
        <Video
          source={{
            uri: data?.sources[data?.sources?.length - 1]?.url,
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
          shouldPlay
          // onFullscreenUpdate={setOrientation}
          ScreenOrientation="landscape"
          style={{ width: wp("100%"), height: hp("50%") }}

          // posterStyle={{
          //   resizeMode: "cover",
          // }}
          useNativeControls
          onError={(e) => {
            console.log(e);
          }}
        />
      ) : (
        <Text>No video sources available.</Text>
      )}
    </SafeAreaView>
  );
}
