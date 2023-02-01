import React from 'react'
import { View, StyleSheet, Text, ScrollView, SafeAreaView } from 'react-native'
import TopBar from '../components/TopBar'
import Style from '../styles/Style'
import Colors from '../constants/Colors'
import { RFValue } from 'react-native-responsive-fontsize'
import { LG_full } from '../components/LG'
import { setNum } from '../database/functions'

export default function HW_view(props) {
    const {navigation, route} = props
    let {title,description,date,subject} = route.params
  return (
    <SafeAreaView style={Style.page}>
    <LG_full/>
        <TopBar icon="chevron-back-outline" fun={()=>{navigation.goBack()}} text={date}/>
        <View style={styles.bar_view}>
          <Text style={styles.ovr_head}>{title}</Text>
          <Text style={{fontSize:RFValue(12),marginTop:-5,color:'grey'}}>{subject}</Text>
          <View style={{height:10}}/>
          <Text style={styles.ovr_status}>{description}</Text>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  bar_view:{marginVertical: 20},
  ovr_head:{color: Colors.primary, fontSize: RFValue(20), fontFamily: 'p6'},
  ovr_status:{color: Colors.textColor, fontSize: RFValue(15)}
})
