import React, { useEffect } from 'react'
import {View, Text, StyleSheet, FlatList} from 'react-native'
import TopBar from '../components/TopBar'
import Style from '../styles/Style'
import NotificationBar from '../components/NotificationBar'
import { LG_full } from '../components/LG'
import { useSelector } from 'react-redux'

export default function Results_home({navigation}) {
  let user = useSelector(state=>state.user)
  let {iSessions,results} = user
  let sessions = []
  iSessions.forEach(s=>{
    let r = results.filter(e=>e.session == s.id)
    if(r.length>0){
      let obj = {id:s.id,name:s.title,results:r}
      sessions.push(obj)
    }
  })
  function render(i){
    let {item} = i
    let {id,name,results} = item
    return(
      <NotificationBar head={name} fun={()=>{navigation.navigate('result-session',{id,name,results})}}/>
    )
  }
  return (
    <View style={Style.page}>
    <LG_full/>
        <TopBar icon="menu-outline" text="Select Session" fun={()=>{navigation.toggleDrawer()}}/>
        <View style={styles.bar_view}>
          <FlatList data={sessions} keyExtractor={(item,index)=>index.toString()} showsVerticalScrollIndicator={false} overScrollMode='never' renderItem={render}/>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  bar_view:{
    marginTop: 20
  }
})
