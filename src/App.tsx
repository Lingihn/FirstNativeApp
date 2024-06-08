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

type app_data = { id: string, description: string, url: string }
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
      description: item.description,
      url: item.urls.small
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
            description={item.description}
            pic_url={item.url}
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
