import axios from "axios"
import { Image, StyleSheet, View } from "react-native"
import { API_ACCESS_KEY, API_URL } from "../App"

type ItemImageProps = { alt: string, pic_url: string }
export const ItemImage: React.FC<ItemImageProps> = ({ alt, pic_url }) => {
  const styles = StyleSheet.create({
    image: {
      width: 165,
      height: 165,
      margin: 10
    }
  })

  const onTouchEnd = () => {
    console.log('touched');
    
  }
  return <View
    onTouchEnd={onTouchEnd}
    >
    <Image
      style={styles.image}
      source={{ uri: pic_url }}
      alt={alt}
    />
  </View>

} 