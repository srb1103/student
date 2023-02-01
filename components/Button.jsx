import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import Colors from '../constants/Colors'

export default function Button(props){
    let {text, pressFun} = props
    return(
        <TouchableOpacity style={styles.button} activeOpacity={.7} onPress={pressFun}>
            <Text style={styles.btnText}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button:{
        backgroundColor: Colors.primary,
        borderRadius: 15,
        padding: 18
    },
    btnText:{
        color: Colors.white,
        fontSize: RFValue(18),
        textAlign: 'center'
    }
})
