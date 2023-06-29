import React from 'react'
import { View, StyleSheet,Text } from 'react-native'
import TopBar from '../components/TopBar'
import Style from '../styles/Style'
import { LG_full } from '../components/LG'
import { Calendar } from 'react-native-calendars'
import Colors from '../constants/Colors'
import LG_relative from '../components/LG-relative'
import { RFValue } from 'react-native-responsive-fontsize'

let red = '#da0000'
let green = '#057b58'
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
    marked = {...marked,[finalDate]:{selected: true, selectedColor: status=='present'?green:red}}
  })
  let present = attn.filter(e=>e.status == 'present').length
  let absent = attn.filter(e=>e.status == 'absent').length
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
          <View style={{height:10}}/>
          <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
            <View style={{...styles.box,backgroundColor:green}}>
              <Text style={styles.big}>{present}<Text style={{fontSize:RFValue(14),color:'white',marginLeft:-5,fontFamily:'p4'}}>days</Text></Text>
            </View>
            <View style={{...styles.box,backgroundColor:red}}>
              <Text style={styles.big}>{absent}<Text style={{fontSize:RFValue(14),color:'white',marginLeft:3,fontFamily:'p4'}}>days</Text></Text>
            </View>
          </View>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  bar_view:{marginVertical: 20},
  box:{padding:10,borderRadius:8,position:'relative',width:'49%',overflow:'hidden',minHeight:50},
  big:{fontFamily:'p6',color:Colors.white,fontSize:RFValue(50)}
})
