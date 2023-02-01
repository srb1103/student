import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import IonIcon from 'react-native-vector-icons/Ionicons'
import Colors from '../constants/Colors'

export default function TopBar(props) {
    const {icon, fun, text} = props
  return (
    <View style={styles.pageHead}>
        <TouchableOpacity activeOpacity={.7} onPress={fun} style={styles.menuBar_wrap}>
            <IonIcon name={icon} style={styles.menuBar}></IonIcon>
        </TouchableOpacity>
        <Text style={styles.pageHeading}>{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    pageHead:{
        position: 'relative',
        padding: RFValue(10),
        alignItems:'flex-start',
        flexDirection: 'row',
        justifyContent:'center',
        paddingTop:RFValue(5),
        marginBottom:10
    },
    pageHeading:{
        textAlign:'center',
        fontSize: RFValue(15),
        color: Colors.primary,
        fontFamily: 'p5'
    },
    menuBar_wrap:{
        position:'absolute',
        top: RFValue(3),
        left: 0,
    },
    menuBar:{
        fontSize: RFValue(25),
        color: Colors.primary,
    },
    
})
