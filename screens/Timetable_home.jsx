import React, {useEffect, useState} from 'react'
import {View, Text, StyleSheet, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, FlatList, ScrollView} from 'react-native'
import Style from '../styles/Style'
import TopBar from '../components/TopBar'
import Colors from '../constants/Colors'
import { LG_full } from '../components/LG'
import { LongBox } from '../components/Box'
import { useSelector } from 'react-redux'

export default function Timetable_home({navigation}) {
  let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let user = useSelector(state=>state.user)
  let {teachers,timetable} = user
  const [activeDay, setActiveDay] = useState(0)
  const flatlistRef = React.useRef()
  function renderDays(item){
    let ind = item.index
    return(
      <TouchableOpacity activeOpacity={.5} onPress={()=>fetch_timetable(ind)}>
        <Text style={{...styles.day_nav, backgroundColor: ind == activeDay ? Colors.primary : Colors.white, color: ind == activeDay ? Colors.white : Colors.primary, marginLeft: ind == 0 ? 8 : 2}}>{item.item}</Text>
      </TouchableOpacity>
    )
  }
  let [periods,setPeriods] = useState(timetable.find(e=>e.day == 'Monday'))
  function fetch_timetable(id){
    setActiveDay(id)
    let day_name = days[id]
    setPeriods(timetable.find(e=>e.day == day_name))
  }
  useEffect(()=>{
    fetch_timetable(0)
  },[])
  useEffect(()=>{
    flatlistRef.current?.scrollToIndex({
        index: activeDay,
        animated: true,
        viewPosition: .02
    })
},[activeDay])
  
  function renderPeriod(item){
    let ind = item.index
    let per = item.item
    let {period,subjectID,teacherID,time} = per
    let tchr = teachers.find(e=>e.id == teacherID)
    return(
      <View style={{maringBottom:5}}><LongBox head1={period} heading={subjectID.name} text={`Teacher: ${tchr.name}, Timing: ${time.from}-${time.to}`} fun={()=>navigation.navigate('course_view',{subject:subjectID})}/></View>
    )
  }
  return (
    <View style={{...Style.page, paddingHorizontal: 0}}>
    <LG_full/>
      <View style={{paddingHorizontal: 20}}>
        <TopBar icon="menu-outline" text='Time Table' fun={()=>navigation.toggleDrawer()}/>
      </View>
      <View style={{marginTop: 20}}>
        <FlatList data={days} horizontal showsHorizontalScrollIndicator={false} keyExtractor={(item, index)=>index.toString()} renderItem={renderDays} ref={flatlistRef}/>
      </View>
      <View style={{padding: 15}}>
        <FlatList data={periods.subjects} showsVerticalScrollIndicator={false} overScrollMode='never' renderItem={renderPeriod} keyExtractor={(item,index)=>index.toString()}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  day_nav:{paddingVertical: 10, paddingHorizontal: 25, borderRadius: 20, marginHorizontal: 2}
})
