import React, {useState} from 'react'
import {View, Text, StyleSheet, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, FlatList} from 'react-native'
import TopBar from '../components/TopBar'
import Style from '../styles/Style'
import Colors from '../constants/Colors'
import Attendance_bar from '../components/Attendance_bar'
import { LG_full } from '../components/LG'
import { useSelector } from 'react-redux'
export default function Attendance_home({navigation}) {
  let user = useSelector(state=>state.user)
  let {attendance,courses} = user
  function render(a){
    let {item} = a
    let {id,name} = item
    let attn = attendance.filter(e=>e.subject == id)
    let pr = attn.filter(e=>e.status == 'present')
    let attn_percent = Math.floor((pr.length/attn.length)*100)
    return(
      <Attendance_bar head={name} bg={attn_percent > 50 ? Colors.green : Colors.red} stat={`${attn_percent}%`} fun={()=>{navigation.navigate('attendance_view',{attn,name})}} lg colors={attn_percent > 50 ? Colors.greenGradient:Colors.redGradient} main={Colors.white}/>

    )
  }
  return (
    <View style={Style.page}>
    <LG_full/>
        <TopBar icon="menu-outline" text="Attendance" fun={()=>{navigation.toggleDrawer()}}/>
        <View style={{marginTop: 10}}>
          <FlatList data={courses} keyExtractor={(item,index)=>index.toString()} showsVerticalScrollIndicator={false} overScrollMode='never' renderItem={render}/>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  bar_view:{
    marginTop: 20
  }
})
