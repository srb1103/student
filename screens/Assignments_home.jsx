import React, { useState } from 'react'
import {View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, ActivityIndicator, FlatList} from 'react-native'
import Style from '../styles/Style'
import TopBar from '../components/TopBar'
import NotificationBar from '../components/NotificationBar'
import Colors from '../constants/Colors'
import { LG_full } from '../components/LG'
import { LongBox } from '../components/Box'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { makeDate, setNum } from '../database/functions'

export default function Assignments_home({navigation}) {
  const [active, setActive] = useState(1)
  const [loading, setLoading] = useState(false)
  let user = useSelector(state=>state.user)
  let {assignments,teachers,courses} = user
  let d = assignments.sort(function(a,b){
    let d1 = a.createdOn
    let d2 = b.createdOn
    d1 = makeDate(d1)
    d2 = makeDate(d2)
    return d2-d1;
})
  let state = {
    total: d,
    pending: d.filter(e=>e.submitted == 'no'),
    complete: d.filter(e=>e.submitted !== 'no'),
  }
  let [items,setItems] = useState(state.total)
  function filterData(type){
    setActive(type);
    if(type == 1){setItems(state.total)}
    if(type == 2){setItems(state.complete)}
    if(type == 3){setItems(state.pending)}
  }
  function renderAssignment(item){
    let assn = item.item
    let {title,subjectID,createdOn,id} = assn
    let tchr = teachers.find(e=>e.subjects_allotted.includes(subjectID))
    let course = courses.find(e=>e.id == subjectID)
    return(
      <LongBox icon="newspaper" heading={title} text={`${course.name} by ${tchr.name}`} fun={()=>navigation.navigate('assignment_view',{id})} txt2={setNum(createdOn)}/>
    )
  }
  return (
    <SafeAreaView style={Style.page}>
    <LG_full/>
      <TopBar icon="menu-outline" text="Assignments" fun={()=>{navigation.toggleDrawer()}}/>
      <View style={{...Style.homeBtns_wrap, marginVertical: 20}}>
          <TouchableOpacity activeOpacity={.7} style={{...Style.btn, width: '33%', backgroundColor: active == 1 ? Colors.primary : Colors.faded}} onPress={()=>{filterData(1)}}><Text style={{...Style.btn_text, color: active == 1 ? Colors.bg : Colors.primary}}>All</Text></TouchableOpacity>
          <TouchableOpacity activeOpacity={.7} style={{...Style.btn, width: '33%', backgroundColor: active == 2 ? Colors.primary : Colors.faded}} onPress={()=>{filterData(2)}}><Text style={{...Style.btn_text, color: active == 2 ? Colors.bg : Colors.primary}}>Complete</Text></TouchableOpacity>
          <TouchableOpacity activeOpacity={.7} style={{...Style.btn, width: '33%', backgroundColor: active == 3 ? Colors.primary : Colors.faded}} onPress={()=>{filterData(3)}}><Text style={{...Style.btn_text, color: active == 3 ? Colors.bg : Colors.primary}}>Pending</Text></TouchableOpacity>
      </View>
      {loading ? <View style={{marginTop: 10}}><ActivityIndicator size='large' color={Colors.primary}/></View> : 
      <View style={{marginTop: 10}}>
          <FlatList data={items} keyExtractor={(item,index)=>index.toString()} renderItem={renderAssignment} showsVerticalScrollIndicator={false} overScrollMode='never'/>
      </View> }
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({

})
