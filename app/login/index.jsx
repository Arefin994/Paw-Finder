import { Image, Pressable, Text, View } from "react-native";
import Colors from "@/constants/Colors";
import * as WebBrowser from 'expo-web-browser'
import { Link } from 'expo-router'
import { useOAuth } from '@clerk/clerk-expo'
import * as Linking from 'expo-linking'
import { useCallback, useEffect } from "react";

export const useWarmUpBrowser = () => {
  useEffect(() => {
    // Warm up the android browser to improve UX 
    // https://docs.expo.dev/guides/authentication/#improving-user-experience
    void WebBrowser.warmUpAsync()
    return () => {
      void WebBrowser.coolDownAsync()
    }
  }, [])
}


WebBrowser.maybeCompleteAuthSession()

export default function LoginScreen() {

  useWarmUpBrowser()
  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' })
  
  const onPress = useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow({
        redirectUrl: Linking.createURL('/home', { scheme: 'myapp' }),
      })

      if (createdSessionId) {

      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error('OAuth error', err)
    }
  }, [])


  return (
    <View style={{
      backgroundColor: Colors.WHITE,
      height:'100%'
    }}
    >
    <Image 
      source={require('../../assets/images/login.png')} 
      style={{
        width: '100%',
        height: 500,
      }}
    />
    <View style={{
      padding:20,
      display:'flex',
      alignItems: 'center'
    }}>
      <Text style={{
        fontFamily: 'outfit-bold', 
        fontSize:30,
        textAlign: 'center'}}
      >Ready to make a new Friend?</Text>
      <Text style={{
        fontFamily: 'outfit',
        forntSize: 18,
        textAlign: 'center',
        color: Colors.GRAY
      }}>Adopt a pet and make their as well as your life better.</Text>
    </View>
    <Pressable 
    onPress={onPress}
    style={{
      padding: 10,
      marginTop: 10,
      backgroundColor:Colors.PRIMARY,
      width:'100%',
      borderRadius:20
    }}>
      <Text style={{
        fontFamily:'outfit-medium',
        fontSize: 20,
        textAlign: 'center'
      }}>Get Started</Text>
    </Pressable>
  </View>);
}
