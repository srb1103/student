import React from 'react'
import { Image,View,StyleSheet,StatusBar } from 'react-native'
import Colors from '../constants/Colors'
import { MotiView } from 'moti'
import { Easing } from 'react-native-reanimated'
import { LG_full } from './LG'
import { RFValue } from 'react-native-responsive-fontsize'


export default function Loader(){
    return(
        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
          <StatusBar hidden={false} animated={true} backgroundColor={Colors.grad1} barStyle="dark-content"/>
          <LG_full/>
          <MotiView style={[styles.dot,styles.center]} from={{scale:.9}} animate={{scale:1.1}} transition={{type:'timing',easing:Easing.out(Easing.ease),loop:true,duration:1500}}>
            {[...Array(3).keys()].map((index)=>{
              return(
                <MotiView from={{opacity:.6,scale:1}} animate={{opacity:0,scale:2.5}} transition={{type:'timing',loop:true,repeatReverse:false,duration:2000,easing:Easing.out(Easing.ease),delay:index*400}} key={index} style={[StyleSheet.absoluteFillObject,styles.dot]}/>
              )
            })}
            <Image source={require('../assets/logo_dark.png')} style={styles.logo}/>
          </MotiView>
      </View>
    )
}

const styles = StyleSheet.create({
    dot:{backgroundColor:Colors.white,height:RFValue(100),width:RFValue(100),borderRadius:80,alignItems:'center',justifyContent:'center'},
    logo:{height:RFValue(25),resizeMode:'contain'},
    center:{zIndex:2}
})