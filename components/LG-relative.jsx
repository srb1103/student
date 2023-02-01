import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'

export default function LG_relative(props){
    let {left,right} = props.colors
    return(
        <LinearGradient colors={['rgba(0,0,0,0)',left,right]} 
        start={[0, 0]}
        end={[1, 1]}
        location={[0, 0.9, 1]}
        style={{flex:1,position:'absolute',top:0,left:0,height:'300%',width:'110%',zIndex:-1,opacity:.15}}/>
    )
}

