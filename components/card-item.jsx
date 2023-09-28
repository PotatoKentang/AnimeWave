import { Text, VStack, View } from "@gluestack-ui/themed";
import { Link } from "expo-router";
import { ImageBackground, TouchableOpacity } from "react-native";

export const CardItem = ({ item, i }) => {
  return (
    <Link
      key={item?.id}
      href={{
        pathname: "/anime/[animeId]",
        params: { animeId: item?.id },
      }}
      asChild
    >
      <TouchableOpacity>
        <VStack style={{ wordWrap: "wrap", padding: 5 }}>
          {item.image && (
            <ImageBackground
              style={{
                objectFit: "cover",
                height: 300,
              }}
              borderRadius="$none"
              source={{
                uri: item?.image,
              }}
              alt={item?.title?.romaji}
            >
              {/* Overlay to cover the bottom of the image */}
              <View style={{ flex:1 }}></View>
              <ImageBackground
                style={{
                  justifyContent: "flex-end", // Align the content to the bottom
                  paddingBottom: 10, // Adjust this value to control the amount of overlay
                  alignItems: "center",
                  backgroundPosition:"bottom center"
                }}
                borderRadius="$none"
                source={{
                  uri: item?.image,
                }}
                alt={item?.title?.romaji}
                blurRadius={40}
                overlayColor="rgba(0, 0, 0, 0.3)" // Adjust the opacity and color as needed
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: "white",
                  }}
                >
                  {item?.title?.romaji}
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    color: "white",
                  }}
                >
                  Episode {item?.totalEpisodes}
                </Text>
              </ImageBackground>
            </ImageBackground>
          )}
        </VStack>
      </TouchableOpacity>
    </Link>
  );
};
