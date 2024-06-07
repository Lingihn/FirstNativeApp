import { Image, Text, View } from "react-native";

type SectionProps = {
    description: string,
    pic_url: string
  }
export const Section: React.FC<SectionProps> = ({ description, pic_url }) => {
    return (
      <View>
        <Text>
          {description}
        </Text>
        <Image
          source={{ uri: pic_url }}
          style={{
            width: 200,
            height: 200
          }}
        />
      </View>
    );
  }