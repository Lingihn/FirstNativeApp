import axios from "axios"
import { useEffect, useState } from "react"
import { FlatList, StyleSheet, Text, View } from "react-native"
import { API_URL, API_ACCESS_KEY, RootStackParamList } from "../App"
import { ItemImage } from "./ItemImage"
import { Toast } from "./Toast"
import type { NativeStackScreenProps } from '@react-navigation/native-stack';


type app_data = { id: string, alt: string, url: string, camera_model: string, camera_exposure_time: string, camera_aperture: string, camera_focal_length: string, camera_iso: string }
type toast_message_type = 'success' | 'warning' | 'error' | 'info'
type toastMessage = { message: string, toastType: toast_message_type }

type homeProps = NativeStackScreenProps<RootStackParamList, 'Home'>


export const Home: React.FC<homeProps> = ({navigation, route}) => {

useEffect(() => {
    fetchPics()
  }, [])


  const [app_data, setAppData] = useState<app_data[]>([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [toastMessage, setToastMessage] = useState<toastMessage>({ message: '', toastType: 'info' })

  const prepareData = (data: any[]) => {
    return data.map((item) => {
      return {
        id: item.id,
        alt: item.description,
        url: item.urls.small,
        camera_model: item.exif.make && item.exif.model ? `${item.exif.make} ${item.exif.model}` : null,
        camera_exposure_time: item.exif.exposure_time,
        camera_aperture: item.exif.aperture,
        camera_focal_length: item.exif.focal_length,
        camera_iso: item.exif.iso
      }
    }
    )
  }
  const displayToast = (message: string, message_type: toast_message_type) => {
    setIsModalVisible(true)
    setToastMessage({ message, toastType: message_type })
  }
  const refreshPics = async () => {
    try {
      await axios.get(`${API_URL}/photos/random`, {
        params: {
          client_id: API_ACCESS_KEY,
          count: 10
        }
      })
        .then(response => prepareData(response.data as any[]))
        .then(response => setAppData(response as unknown as app_data[]))
    } catch (e) {
      if (e instanceof Error) {
        displayToast('Ошибка получения данных из Unsplash', 'error')
      }
    }
  }

  const fetchPics = async () => {
    try {
      await axios.get(`${API_URL}/photos/random`, {
        params: {
          client_id: API_ACCESS_KEY,
          count: 10
        }
      })
        .then(response => prepareData(response.data as any[]))
        .then(response => setAppData([...app_data, ...response as unknown as app_data[]]))
    } catch (e) {
      if (e instanceof Error) {
        displayToast('Ошибка получения данных из Unsplash', 'error')
      }
    }
  }
  const styles = StyleSheet.create({
    appContainer: {
      flex: 1,
      paddingTop: 15,
      backgroundColor: '#E2E3DD'
    }
  })


  return <View
  style={styles.appContainer}
>
  <FlatList
    data={app_data}
    onEndReached={fetchPics}
    numColumns={2}
    renderItem={({ item }) =>{
     return <ItemImage
        id={item.id}
        alt={item.alt}
        pic_url={item.url}
        navigation={navigation}
      />
    }}
    keyExtractor={item => item.id}
  />
  <Toast
    message={toastMessage.message}
    messageType={toastMessage.toastType}
    isVisible={isModalVisible}
    setVisible={setIsModalVisible}
  />
</View>
}