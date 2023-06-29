import React from 'react'
import {View, StyleSheet, FlatList} from 'react-native'
import TopBar from '../components/TopBar'
import Style from '../styles/Style'
import { LG_full } from '../components/LG'
import { LongBox } from '../components/Box'
import { useSelector } from 'react-redux'
import { setNum } from '../database/functions'

export default function Notifications_home({navigation}) {
  let user = useSelector(state=>state.user)
  let {notifications} = user
  const renderNotice = (item)=>{
    let notice = item.item
    let d = setNum(notice.date)
    return(
      <LongBox heading={notice.title} text={`${notice.by} | Date: ${d}`} fun={()=>{navigation.navigate('notification',{notice})}}/>
    )
  }
  return (
    <View style={Style.page}>
    <LG_full/>
        <TopBar icon="chevron-back-outline" text="Notifications" fun={()=>{navigation.goBack()}}/>
        <View style={styles.bar_view}>
          <FlatList data={notifications} overScrollMode='never' keyExtractor={(item,index)=>index.toString()} renderItem={renderNotice}/>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  bar_view:{
    marginTop: 20
  }
})
