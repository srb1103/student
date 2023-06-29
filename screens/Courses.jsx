import React, { useState } from 'react'
import {View, SafeAreaView, ScrollView, ActivityIndicator, FlatList} from 'react-native'
import Style from '../styles/Style'
import TopBar from '../components/TopBar'
import { LG_full } from '../components/LG'
import { LongBox } from '../components/Box'
import { useSelector } from 'react-redux'
export default function Courses({navigation}) {
  let user = useSelector(state=>state.user)
  let {teachers,courses} = user
  const renderCourse = (item)=>{
    let subject = item.item
    let {id,name} = subject
    let tchr = teachers.find(e=>e.subjects_allotted.includes(id))
    let tchr_name = tchr ? tchr.name : ''
    return(
      <LongBox icon="book-outline" heading={name} text={`Teacher: ${tchr_name}`} fun={()=>{navigation.navigate('course_view',{subject})}}/>
    )
  }
  return (
    <SafeAreaView style={Style.page}>
    <LG_full/>
      <TopBar icon="menu-outline" text="Courses" fun={()=>{navigation.toggleDrawer()}}/>
      <View style={{marginTop: 10}}></View>
      <FlatList data={courses} keyExtractor={(item,index)=>index.toString()} showsVerticalScrollIndicator={false} overScrollMode='never' renderItem={renderCourse}/>
    </SafeAreaView>
  )
}

