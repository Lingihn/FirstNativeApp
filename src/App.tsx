/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
} from 'react-native';
import { Toast } from './components/Toast';
import { Section } from './components/Section';

type app_data = { id: string, alt: string, url: string, camera_model: string, camera_exposure_time: string, camera_aperture: string, camera_focal_length: string, camera_iso:string }
type toast_message_type = 'success' | 'warning' | 'error' | 'info'
type toastMessage = {message: string, toastType: toast_message_type}

function App(): React.JSX.Element {
  
  useEffect(() => {
    fetchPics()
  }, [])

  const API_URL = 'https://api.unsplash.com'
  const API_ACCESS_KEY = 'AhXstOVlPrzPfO1sC_76IyZkrXImj90zTXwKiTeN8ws'

  const [app_data, setAppData] = useState<app_data[]>([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [toastMessage, setToastMessage] = useState<toastMessage>({message: '', toastType: 'info'})

  const prepareData = (data: any[]) => {
    return data.map((item) => ({
      id: item.id,
      alt: item.description,
      url: item.urls.small,
      camera_model: item.exif.make && item.exif.model ? `${item.exif.make} ${item.exif.model}` : null ,
      camera_exposure_time: item.exif.exposure_time ,
      camera_aperture: item.exif.aperture,
      camera_focal_length: item.exif.focal_length,
      camera_iso: item.exif.iso
    })
  )}
  const displayToast = (message: string, message_type: toast_message_type) =>{
    setIsModalVisible(true)
    setToastMessage({message, toastType: message_type}) 
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
      backgroundColor: '#E2E3DD'
    },
    h1Title: {
      color: '#31312F',
      fontSize: 36,
      textAlign: 'center'
    }
  })

  return (
    <SafeAreaView
      style={styles.appContainer}
    >
      <Text style={styles.h1Title}>
        Random pics from Unsplash
      </Text>
      <FlatList
        data={app_data}
        renderItem={ ({ item } ) => 
          <Section
            alt={item.alt}
            pic_url={item.url}
            camera_model={item.camera_model}
            camera_exposure_time={item.camera_exposure_time}
            camera_aperture={item.camera_aperture}
            camera_focal_length={item.camera_focal_length}
            camera_iso={item.camera_iso}
          />
        }
        keyExtractor={item => item.id}
      />
          <Toast
            message={toastMessage.message}
            messageType={toastMessage.toastType}
            isVisible={isModalVisible}
            setVisible={setIsModalVisible}
          />
    </SafeAreaView>
  );
}

export default App;
