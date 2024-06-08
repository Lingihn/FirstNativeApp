import { Image, StyleSheet, Text, View } from "react-native";

type SectionProps = {
  alt: string, pic_url: string, camera_model: string, camera_exposure_time: string, camera_aperture: string, camera_focal_length: string, camera_iso: string
}
export const Section: React.FC<SectionProps> = ({ alt, pic_url, camera_model, camera_exposure_time, camera_aperture, camera_focal_length, camera_iso }) => {
  const styles = StyleSheet.create({
    card: {
      backgroundColor: '#E5E1D8',
      padding: 5,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: '#C5C5B9',
      margin: 10,
      alignItems: 'baseline'
    },
    image: {
      width: 350,
      height: 350,
      marginBottom:5,
      marginTop: 5,
    },
    text_cardInfo: {
      color: '#31312F',
      paddingLeft: 10,
      paddingBottom: 3
    }
  })
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: pic_url }}
        style={styles.image}
        alt={alt}
      />
      <View>
        {camera_model && <Text style={styles.text_cardInfo}>Camera model: {camera_model}</Text> }
        {camera_exposure_time && <Text style={styles.text_cardInfo}>Camera exposure time: {camera_exposure_time}</Text> }
        {camera_aperture && <Text style={styles.text_cardInfo}>Camera aperture: {camera_aperture}</Text> }
        {camera_focal_length && <Text style={styles.text_cardInfo}>Camera focal length: {camera_focal_length}</Text> }
        {camera_iso && <Text style={styles.text_cardInfo}>Camera ISO: {camera_iso}</Text> }
      </View>

    </View>
  );
}