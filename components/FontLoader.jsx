import React from 'react'
import Colors from '../constants/Colors'
import Style from '../styles/Style';
import {View, ActivityIndicator} from 'react-native'
import { useFonts, Poppins_300Light, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold, Poppins_800ExtraBold } from "@expo-google-fonts/poppins";

export default function FontLoader() {
    let [fontsLoaded] = useFonts({
        p3: Poppins_300Light,
        p4: Poppins_400Regular,
        p5: Poppins_500Medium,
        p6: Poppins_600SemiBold,
        p7: Poppins_700Bold,
        p8: Poppins_800ExtraBold,
      });
    if(!fontsLoaded){
        return(
            <View style={Style.screen}>
                <ActivityIndicator color={Colors.primary} size="large"/>
            </View>
        )
    }
  
}
