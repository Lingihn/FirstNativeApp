import { View } from "react-native"

type AlertProps = { header_text: string, body_text: string }

export const Alert: React.FC<AlertProps> = ({ header_text, body_text }) => {
  return (
    <View>
      Something Wrong!
    </View>
  )
}