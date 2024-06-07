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
  Text,
} from 'react-native';
import { Alert } from './components/alert';
import { Section } from './components/section';

type app_data = { id: string, description: string, url: string }

function App(): React.JSX.Element {
  
  useEffect(() => {
    fetchPics()
  }, [])

  const API_URL = 'https://api.unsplash.com'
  const API_ACCESS_KEY = 'AhXstOVlPrzPfO1sC_76IyZkrXImj90zTXwKiTeN8ws'

  const [app_data, setAppData] = useState<app_data[]>([])

  const prepareData = (data: any[]) => {
    return data.map((item) => ({
      id: item.id,
      description: item.description,
      url: item.urls.small
    })
  )}
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
        .catch(response => console.error('Fetch failed: ',response))
    } catch (e) {
      if (e instanceof Error) {
        return (
          <Alert
            header_text='Ошибка получения данных из Unsplash'
            body_text={`${e.message}`}
          />
        )
      }
    }
  }

  return (
    <SafeAreaView
    style={{
      flex: 1,
      width: Dimensions.get('window').width
    }}
    >
      <Text>
        Random pics from Unsplash
      </Text>
      <FlatList
        style={{
          flex: 1,
          width: Dimensions.get('window').width
        }}
        data={app_data}
        renderItem={ ({ item } ) => 
          <Section
            description={item.description}
            pic_url={item.url}
          />
        }
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}

export default App;
