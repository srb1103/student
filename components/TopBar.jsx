import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import IonIcon from 'react-native-vector-icons/Ionicons'
import Colors from '../constants/Colors'

export default function TopBar(props) {
    const {icon, fun, text,txt2} = props
  return (
    <View style={styles.pageHead}>
        <TouchableOpacity activeOpacity={.7} onPress={fun} style={styles.menuBar_wrap}>
            <IonIcon name={icon} style={styles.menuBar}></IonIcon>
        </TouchableOpacity>
        <View>
            <Text style={{...styles.pageHeading,marginTop:txt2?-8:0}}>{text}</Text>
            {txt2 && <Text style={styles.pageHeading1}>{txt2}</Text>}
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    pageHead:{
        position: 'relative',
        padding: RFValue(10),
        alignItems:'center',
        flexDirection: 'row',
        justifyContent:'center',
        paddingTop:RFValue(5),
        marginBottom:10
    },
    pageHeading1:{color:'grey',fontSize:RFValue(11),marginTop:-5},
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
