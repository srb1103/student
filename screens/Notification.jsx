import React from 'react'
import { View, StyleSheet, Text, ScrollView, SafeAreaView } from 'react-native'
import TopBar from '../components/TopBar'
import Style from '../styles/Style'
import Colors from '../constants/Colors'
import { RFValue } from 'react-native-responsive-fontsize'
import { LG_full } from '../components/LG'

export default function Notification(props) {
    const {navigation, route} = props
    let {id,title,text,by,date} = route.params.notice
  return (
    <SafeAreaView style={Style.page}>
    <LG_full/>
        <TopBar icon="chevron-back-outline" fun={()=>{navigation.goBack()}}/>
        <View style={styles.bar_view}>
          <Text style={styles.ovr_head}>{title}</Text>
          <Text style={styles.ovr_status}>{text}</Text>
          <View style={{height:10}}/>
          <Text style={styles.ovr_status}>{`By: ${by} | Date: ${date}`}</Text>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  bar_view:{marginVertical: 20},
  ovr_head:{color: Colors.primary, fontSize: RFValue(20), fontFamily: 'p6'},
  ovr_status:{color: Colors.textColor, fontSize: RFValue(13), marginTop: -3}
})
