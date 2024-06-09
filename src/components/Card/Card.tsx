import axios from "axios";
import { Image, StyleSheet, Text, View } from "react-native";
import { API_URL, API_ACCESS_KEY, RootStackParamList } from "../../App";
import { useEffect, useState } from "react";
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCardStore } from "./cardStore";
import { observer } from "mobx-react-lite";
type CardData = { id: string, alt: string, url: string, camera_model: string, camera_exposure_time: string, camera_aperture: string, camera_focal_length: string, camera_iso: string }
type CardProps = NativeStackScreenProps<RootStackParamList, 'Card'>
export const Card: React.FC<CardProps> = observer(({ navigation, route }) => {
  const {data, fetchDataByID, exifDataisEmpty} = useCardStore()

  useEffect(() => {
    fetchDataByID(route.params.id)
  }, [])
  const styles = StyleSheet.create({
    card: {
      backgroundColor: '#E5E1D8',
      width: 350,
      height: 355,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: '#C5C5B9',
      margin: 10,
      alignItems: 'baseline'
    },
    image: {
      width: 350,
      height: 340,
      marginBottom: 5,
      marginTop: 5,
      padding: 5
    },
    text_cardElem: {
      color: '#31312F',
      paddingLeft: 5,
      paddingBottom: 5
    },
    text_cardHead: {
      fontSize: 16,
    },
    text_card: {
      padding: 5,
      marginTop: 15,
      width: 350,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: '#C5C5B9',
      backgroundColor: '#E5E1D8',
    }
  })

  return (
    <View style={styles.card}>
      <Image
        source={{ uri: data.url }}
        style={styles.image}
        alt={data.alt}
      />
      <View style={styles.text_card}>
        <Text style={[styles.text_cardElem, styles.text_cardHead]}>Exif data: {exifDataisEmpty ? '' : 'is empty'}</Text>
        {data.camera_model && <Text style={styles.text_cardElem}>Camera model: {data.camera_model}</Text>}
        {data.camera_exposure_time && <Text style={styles.text_cardElem}>Exposure time: {data.camera_exposure_time}</Text>}
        {data.camera_aperture && <Text style={styles.text_cardElem}>Aperture: {data.camera_aperture}</Text>}
        {data.camera_focal_length && <Text style={styles.text_cardElem}>Focal length: {data.camera_focal_length}</Text>}
        {data.camera_iso && <Text style={styles.text_cardElem}>ISO: {data.camera_iso}</Text>}
      </View>

    </View>
  );
})