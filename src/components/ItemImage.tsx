import { Image, StyleSheet, TouchableHighlight, View } from "react-native"
import { RootStackParamList } from "../App"
import { NativeStackScreenProps } from "@react-navigation/native-stack"

type ItemImage = NativeStackScreenProps<RootStackParamList, 'Home'>;
type ItemImageProps = { id: string, alt: string, pic_url: string, navigation: ItemImage['navigation'] }

export const ItemImage: React.FC<ItemImageProps> = ({ id, alt, pic_url, navigation }) => {


  const onTouchEnd = () => {
    navigation.navigate('Card', { id: id })
  }

  const styles = StyleSheet.create({
    image: {
      width: 165,
      height: 165,
      margin: 10
    }
  })

  return (
    <TouchableHighlight onPress={onTouchEnd}>
      <Image
        style={styles.image}
        source={{ uri: pic_url }}
        alt={alt}
      />
    </TouchableHighlight>
  )
} 