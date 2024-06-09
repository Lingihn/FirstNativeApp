import axios from "axios";
import { Image, StyleSheet, Text, View } from "react-native";
import { API_URL, API_ACCESS_KEY, RootStackParamList } from "../App";
import { useEffect, useState } from "react";
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
type CardData = { id: string, alt: string, url: string, camera_model: string, camera_exposure_time: string, camera_aperture: string, camera_focal_length: string, camera_iso: string }
type CardProps = NativeStackScreenProps<RootStackParamList, 'Card'>
export const Card: React.FC<CardProps> = ({ navigation, route }) => {
  useEffect(() => {    
    fetchPicById(route.params.id)
  }, [])
  const styles = StyleSheet.create({
    card: {
      backgroundColor: '#E5E1D8',
      padding: 5,
      width: 350,
      height: 360,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: '#C5C5B9',
      margin: 10,
      alignItems: 'baseline'
    },
    image: {
      width: 340,
      height: 340,
      marginBottom: 5,
      marginTop: 5,
    },
    text_cardInfo: {
      color: '#31312F',
      paddingLeft: 10,
      paddingBottom: 3
    }
  })
  const fetchPicById = async (id: string) => {
    try {
      await axios.get(`${API_URL}/photos/${id}`, {
        params: {
          client_id: API_ACCESS_KEY
        }
      })
        .then(response => {
          console.log('response', response);
          return response
        })
        .then(response => prepareData(response.data as any[]))
        .then(response => setCardData(response as unknown as CardData))
    } catch (e) {
      if (e instanceof Error) {
        // displayToast('Ошибка получения данных из Unsplash', 'error')
      }
    }
  }
  const emptyCard = { id: '', alt: '', url: '', camera_model: '', camera_aperture: '', camera_exposure_time: '', camera_focal_length: '', camera_iso: '' }
  const [cardData, setCardData] = useState<CardData>(emptyCard)
  const prepareData = (data: any) => {
    return {
      id: data.id,
      alt: data.description,
      url: data.urls.small,
      camera_model: data.exif.make && data.exif.model ? `${data.exif.make} ${data.exif.model}` : null,
      camera_exposure_time: data.exif.exposure_time,
      camera_aperture: data.exif.aperture,
      camera_focal_length: data.exif.focal_length,
      camera_iso: data.exif.iso
    }
  }
  


  return (
    <View style={styles.card}>
      <Image
        source={{ uri: cardData.url }}
        style={styles.image}
        alt={cardData.alt}
      />
      <View>
        {cardData.camera_model && <Text style={styles.text_cardInfo}>Camera model: {cardData.camera_model}</Text>}
        {cardData.camera_exposure_time && <Text style={styles.text_cardInfo}>Exposure time: {cardData.camera_exposure_time}</Text>}
        {cardData.camera_aperture && <Text style={styles.text_cardInfo}>Aperture: {cardData.camera_aperture}</Text>}
        {cardData.camera_focal_length && <Text style={styles.text_cardInfo}>Focal length: {cardData.camera_focal_length}</Text>}
        {cardData.camera_iso && <Text style={styles.text_cardInfo}>ISO: {cardData.camera_iso}</Text>}
      </View>

    </View>
  );
}