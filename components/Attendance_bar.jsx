import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import Colors from '../constants/Colors'
import LG_relative from './LG-relative'

export default function Attendance_bar(props){
    const {head, fun, bg, stat,main,lg,colors,text,wd,txt2,txt3} = props
    return(
        <TouchableOpacity activeOpacity={.8} style={styles.bar} onPress={fun}>
        <View style={{width:'70%'}}>
            {txt2 && <Text style={{...styles.bar_text,fontFamily:'p6',fontSize:RFValue(9),marginBottom:-2}}>{txt2}</Text>}
            <Text style={{...styles.bar_head}}>{head}</Text>
            {text && <Text style={{...styles.bar_text}}>{text}</Text>}
        </View>
            <Text style={{...styles.percent, backgroundColor: bg,width:wd?wd:RFValue(70)}}>{stat} {txt3 && <Text style={{fontSize:RFValue(8)}}>{txt3}</Text>}</Text>
            {lg && <LG_relative colors={colors}/>}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    bar:{
        padding: 15,
        paddingVertical:RFValue(20),
        backgroundColor: Colors.faded,
        borderRadius: 15,
        margin: 5,
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        position:'relative',overflow:'hidden'
    },
    bar_head:{
        fontSize: RFValue(15),
        fontFamily: 'p6'
    },
    bar_text:{
        fontSize: RFValue(12),
        color: Colors.textColor,
        fontFamily: 'p4',
        opacity: .7,marginTop:-4
    },
    percent:{paddingVertical: 5, borderRadius: 20, color: Colors.white, fontFamily: 'p6', fontSize: RFValue(15), textAlign: 'center'}
})