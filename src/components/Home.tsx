import { useEffect, useState } from "react"
import { FlatList, StyleSheet, View } from "react-native"
import { RootStackParamList } from "../App"
import { ItemImage } from "./ItemImage"
import { Toast } from "./Toast"
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMainStore } from "../mainStore"
import { observer } from "mobx-react-lite"
type homeProps = NativeStackScreenProps<RootStackParamList, 'Home'>


export const Home: React.FC<homeProps> = observer(({ navigation, route }) => {
    const {mainData, fetchData, refreshData, toastMessage, setToastMessage, toastVisible, setToastVisible} = useMainStore()
    useEffect(() => {
        fetchData()
    }, [])

    const [refreshing, setRefreshing] = useState(false)
    const styles = StyleSheet.create({
        appContainer: {
            flex: 1,
            paddingTop: 15,
            backgroundColor: '#E2E3DD'
        }
    })
    const onRefresh = () => {
        setRefreshing(true)
        refreshData()
        setTimeout(() => {
            setRefreshing(false)
        }, 1000)
    }

    return <View
        style={styles.appContainer}
    >
        <FlatList
            refreshing={refreshing}
            onRefresh={onRefresh}
            data={mainData}
            onEndReached={fetchData}
            onEndReachedThreshold={0.5}
            numColumns={2}
            renderItem={({ item }) => {
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
            isVisible={toastVisible}
            setVisible={setToastVisible}
        />
    </View>
})