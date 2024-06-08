import { Button, Modal, Pressable, StyleSheet, Text, View } from "react-native"

type ToastProps = {
  message: string,
  messageType: 'success' | 'warning' | 'error' | 'info'
  isVisible: boolean,
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export const Toast: React.FC<ToastProps> = ({ message, messageType, isVisible, setVisible }) => {
  const styles = StyleSheet.create({
    centered: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
      marginBottom: 10,
    },
    message: {
      color: 'white',
      fontSize: 18,
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
      borderRadius: 10,
      backgroundColor: '#31312F'
    },
    button: {
      borderRadius: 8,
      backgroundColor: '#E2E3DD',
      padding: 5
    },
    button_text: {
      fontSize: 16
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
}