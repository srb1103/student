import React from 'react'
import { Dimensions } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import Colors from '../constants/Colors'

let {height, width} = Dimensions.get('window')
export default function LG(){
    return(
        <LinearGradient colors={[Colors.grad1, Colors.grad2]} style={{flex:1,position:'absolute',top:0,left:0,height:'100%',width:'100%',zIndex:-1}}/>
    )
}
export function LG_full(){
    return(
        <LinearGradient colors={[Colors.grad1, Colors.grad2]} style={{flex:1,position:'absolute',top:0,left:0,height:height*1.1,width,zIndex:-1}}/>
    )
}

