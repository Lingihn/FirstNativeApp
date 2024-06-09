import { observer } from "mobx-react-lite"
import { Modal, Pressable, StyleSheet, Text, View } from "react-native"

type ToastProps = {
  message: string,
  messageType: 'success' | 'warning' | 'error' | 'info'
  isVisible: boolean,
  setVisible: (visible:boolean) => void
}

export const Toast: React.FC<ToastProps> = observer( ({ message, messageType, isVisible, setVisible }) => {
  const styles = StyleSheet.create({
    centered: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
      marginBottom: 10,
    },
    message: {
      color: '#31312F',
      fontSize: 18,
      textAlign:'center',
      padding: 5,
      marginBottom: 10
    },
    body: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingLeft: 10,
      paddingRight: 10,
      paddingTop:10,
      paddingBottom: 10,
      borderRadius: 5,
      borderColor: '#C5C5B9',
      borderWidth: 1,
      backgroundColor: '#A09F8D',
    },
    button: {
      borderRadius: 5,
      backgroundColor: '#E2E3DD',
      paddingLeft: 50,
      paddingRight:50,
      paddingTop: 10,
      paddingBottom: 10
    },
    button_text: {
      fontSize: 18,
      color: '#31312F'
    }
  })

  return (
    <View>
      <Modal
        visible={isVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.centered}>
          <View style={styles.body}>
            <Text style={styles.message}>
              {message}
            </Text>
            <Pressable
              style={styles.button}
              onPress={() => setVisible(false)}
            >
              <Text style={styles.button_text}>
                Закрыть
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  )
})