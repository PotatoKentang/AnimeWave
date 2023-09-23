import { Image, Text, VStack } from "@gluestack-ui/themed";
import { Link } from "expo-router";
import { TouchableOpacity } from "react-native";

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
        <VStack style={{ wordWrap: "wrap", padding:5 }}>
          {item.image && (
            <Image
              style={{
                objectFit: "cover",
              }}
              w="$full"
              h="$56"
              borderRadius="$none"
              source={{
                uri: item?.image,
              }}
              alt={item?.title?.romaji}
            />
          )}
          <Text
            style={{
              textAlign: "center",
            }}
          >
            {item?.title?.romaji}
          </Text>
          <Text
            style={{
              textAlign: "center",
            }}
          >
            Episode {item?.totalEpisodes}
          </Text>
        </VStack>
      </TouchableOpacity>
    </Link>
  );
};

const LoadingCardItem = () => {
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
    </Link>
  );
};