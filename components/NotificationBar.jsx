import React from 'react'
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native'
import Colors from '../constants/Colors'
import Style from '../styles/Style'
import IonIcon from 'react-native-vector-icons/Ionicons'
import { RFValue } from 'react-native-responsive-fontsize'
import { MotiView } from 'moti'

export default function NotificationBar(props) {
    const {head, text, fun} = props
  return (
    <MotiView from={{opacity:0,marginBottom:-10}} animate={{opacity:1,marginBottom:0}} transition={{type:'timing'}}>
        <TouchableOpacity activeOpacity={.5} style={styles.bar} onPress={fun}>
            <View style={styles.text_wrap}>
                {head && <Text style={{...styles.bar_head, marginVertical: text ? 0 : 8}}>{head}</Text>}
                {text && <Text style={styles.bar_text}>{text}</Text>}
            </View>
            {fun && <IonIcon name="chevron-forward-outline" style={styles.icon}/>}
        </TouchableOpacity>
    </MotiView>
  )
}

const styles = StyleSheet.create({
    bar:{
        padding: 15,
        backgroundColor: Colors.faded,
        borderRadius: 15,
        margin: 5,
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    bar_head:{
        fontSize: RFValue(16),
        color: Colors.primary,
        fontFamily: 'p6'
    },
    bar_text:{
        fontSize: RFValue(12),
        color: Colors.textColor,
        fontFamily: 'p4',
        opacity: .7
    },
    icon:{
        color: Colors.primary,
        fontSize: RFValue(20),
        width: '5%', 
        textAlign:'center'
    },
    text_wrap:{
        width: '80%'
    }
})