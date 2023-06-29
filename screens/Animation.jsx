import React,{useState} from 'react'
import {View,StyleSheet, Dimensions,StatusBar, TouchableOpacity,Text} from 'react-native'
import Style from '../styles/Style'
import { MotiView,MotiImage, MotiText } from 'moti'
import Colors from '../constants/Colors'
import { Easing, set } from 'react-native-reanimated'
import { LG_full } from '../components/LG'
import { RFValue } from 'react-native-responsive-fontsize'

let {height} = Dimensions.get('window')
export default function Animate(props){
    let {text,fun} = props
    return(
        <View style={{...Style.screen,position:'relative',overflow:'hidden',alignItems:'center'}}>
            <StatusBar hidden={false} animated={true} backgroundColor={Colors.grad1} barStyle="dark-content"/>
            <LG_full/>
            <MotiView style={styles.main_dot} from ={{scale:0,opacity:1}} animate={{scale:25,opacity:0}} transition={{duration:600,type:'timing'}}/>
            <MotiView style={styles.main_dot2} from ={{scale:0,opacity:1}} animate={{scale:25,opacity:0}} transition={{duration:600,type:'timing',delay:400}}/>
            <MotiView style={{...styles.main_dot1,zIndex:1}} from ={{scale:0,opacity:0,marginLeft:-200}} animate={{scale:1,opacity:1,marginLeft:0}} transition={{duration:2000,easing:Easing.out(Easing.ease),delay:800}}>
                <View style={{...styles.main_dot1, zIndex:2,flex:1,overflow:'hidden',alignItems:'center',justifyContent:'center',position:'relative'}}>
                    <MotiImage source={require('../assets/logo_dark.png')} style={styles.img} from={{opacity:0,marginRight:-100}} animate={{opacity:1,marginRight:0}} transition={{delay:1200,easing:Easing.out(Easing.ease),duration:200}}/>
                    <MotiView from={{opacity:0.2,scale:0,marginLeft:-100,marginBottom:-70}} animate={{opacity:.8,scale:1,marginLeft:0,marginBottom:0}} transition={{delay:2200,type:'timing',duration:300}} style={{...styles.main_dot1,zIndex:3,backgroundColor:Colors.grad1,position:'absolute',bottom:0,left:0}}/>
                </View>
                {[...Array(2).keys()].map((index)=>{
                return(
                    <MotiView from={{opacity:1,scale:1}} animate={{opacity:0,scale:1.5}} transition={{type:'timing',loop:true,repeatReverse:false,duration:2000,easing:Easing.out(Easing.ease),delay:index*400}} key={index} style={[StyleSheet.absoluteFillObject,styles.main_dot1]}/>
                )
                })}
            </MotiView>
            <MotiText style={{fontFamily:'p6',color:Colors.blck,textAlign:'center',marginTop:45,fontSize:RFValue(15),width:'70%'}} from={{opacity:0,marginBottom:-200}} animate={{opacity:1,marginBottom:0}} transition={{easing:Easing.out(Easing.ease),delay:3000,duration:2000}}>{text}</MotiText>
            <MotiView style={{marginTop:15}} from={{opacity:0}} animate={{opacity:1}} transition={{type:'timing',delay:3000}}>
                <TouchableOpacity activeOpacity={.5} onPress={fun} style={{width:'80%'}}><Text style={{...Style.tiny_btn}}>Go Back</Text></TouchableOpacity>
            </MotiView>
        </View>
    )
}
const styles = StyleSheet.create({
    main_dot:{position:'absolute',top:height*.4,left:0,height:50,width:50,backgroundColor:Colors.grad1,borderRadius:1000},
    main_dot2:{position:'absolute',top:height*.6,right:0,height:50,width:50,backgroundColor:Colors.grad2,borderRadius:1000},
    main_dot1:{height:130,width:130,backgroundColor:Colors.grad2,borderRadius:100,alignItems:'center',justifyContent:'center'},
    img:{resizeMode:'contain',height:35,zIndex:4}
})