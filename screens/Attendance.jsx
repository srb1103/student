import React from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import TopBar from '../components/TopBar'
import Style from '../styles/Style'
import Colors from '../constants/Colors'
import Attendance_bar from '../components/Attendance_bar'
import { LG_full } from '../components/LG'
import { setNum } from '../database/functions'
import { Calendar } from 'react-native-calendars'

export default function Attendance(props) {
    const {navigation, route} = props
    let {attn,name} = route.params
    
  let marked = {}
  attn.forEach(s=>{
    let {date,status} = s
    let d = date.split('-')
    let m = d[1]
    let dt = d[0]
    if(m<9){m = `0${m}`}
    if(dt<9){dt = `0${dt}`}
    let finalDate = `${d[2]}-${m}-${dt}`
    marked = {...marked,[finalDate]:{selected: true, selectedColor: status=='present'?Colors.green:Colors.red}}
  })
  let date = new Date()
  let m = date.getMonth()+1
  let dt = date.getDate()
  if(m<9){m = `0${m}`}
  if(dt<9){dt = `0${dt}`}
  let d = `${date.getFullYear()}-${m}-${dt}`
  return (
    <View style={Style.page}>
    <LG_full/>
        <TopBar icon="chevron-back-outline" text={name} fun={()=>{navigation.goBack()}}/>
        <View style={styles.bar_view}>
          <Calendar maxDate={d} hideExtraDays={true} markedDates={marked} markingType={'custom'} horizontal={true}/>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  bar_view:{marginVertical: 20},
  
})
