import React from 'react'
import { View, StyleSheet, Text, ScrollView, SafeAreaView } from 'react-native'
import TopBar from '../components/TopBar'
import Style from '../styles/Style'
import Colors from '../constants/Colors'
import { RFValue } from 'react-native-responsive-fontsize'
import { LG_full } from '../components/LG'
import { setNum } from '../database/functions'
import IonIcon from 'react-native-vector-icons/Ionicons'

export default function Notification(props) {
    const {navigation, route} = props
    let {title,text,by,date} = route.params.notice
  return (
    <SafeAreaView style={Style.page}>
    <LG_full/>
        <TopBar icon="chevron-back-outline" fun={()=>{navigation.goBack()}} text={setNum(date)}/>
        <View style={styles.bar_view}>
          <Text style={styles.ovr_head}>{title}</Text>
          <Text style={{...styles.description,fontSize:RFValue(11),color:'grey',marginBottom:5}}>{`${by}`}</Text>
          <View style={{flexDirection:'row',alignItems:'center',marginTop:RFValue(15)}}>
              <View style={{justifyContent:'center',alignItems:'center',height:RFValue(35),borderRadius:30,marginRight:8,width:RFValue(35),backgroundColor:Colors.faded}}>
                <IonIcon name="chatbubble-ellipses-outline" color={Colors.blck} style={{fontSize:RFValue(16)}}/>
              </View>
              <Text style={styles.txt_wrap} selectable={true}>{text}</Text>
          </View>
          <View style={{height:10}}/>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  bar_view:{marginVertical: 20},
  ovr_head:{fontSize: RFValue(16), maxWidth: '80%', fontFamily: 'p6', color: Colors.primary, marginBottom: 2,lineHeight:20},
  ovr_status:{color: Colors.textColor, fontSize: RFValue(13), marginTop: -3},
  txt_wrap:{padding:10,borderRadius:10,backgroundColor:Colors.faded,maxWidth:'85%'}
})
