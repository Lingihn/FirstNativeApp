import axios from "axios"
import { Image, StyleSheet, TouchableHighlight, View } from "react-native"
import { API_ACCESS_KEY, API_URL, RootStackParamList } from "../App"
import { NativeStackScreenProps } from "@react-navigation/native-stack"

type itemImage = NativeStackScreenProps<RootStackParamList, 'Home'>;

type ItemImageProps = {id: string, alt: string, pic_url: string, navigation: itemImage['navigation'] }

export const ItemImage: React.FC<ItemImageProps> = ({id, alt, pic_url, navigation }) => {
  const styles = StyleSheet.create({
    image: {
      width: 165,
      height: 165,
      margin: 10
    }
  })

  const onTouchEnd = () => {
    navigation.navigate('Card', { id: id })
  }
  return <TouchableHighlight
    onPress={onTouchEnd}
  >
    <Image
      style={styles.image}
      source={{ uri: pic_url }}
      alt={alt}
    />
  </TouchableHighlight>

} 