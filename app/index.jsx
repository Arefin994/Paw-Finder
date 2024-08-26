import { Image, Pressable, Text, View } from "react-native";
import { Link, Redirect } from "expo-router"; // Ensure this is the correct import for Link
import Colors from "@/constants/Colors";
import { useUser } from "@clerk/clerk-expo";

export default function LoginScreen() {
  
  const {user} = useUser();

  return user && (
    <View
      style={{
        flex: 1,
      }}
    >
     { user ?
      <Redirect href = {'/home'} />
        :<Redirect href={'login'} />
     }
    </View>
  );
}
