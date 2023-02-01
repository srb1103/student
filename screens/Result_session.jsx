import React from 'react'
import {View, StyleSheet, FlatList} from 'react-native'
import TopBar from '../components/TopBar'
import Style from '../styles/Style'
import NotificationBar from '../components/NotificationBar'
import { LG_full } from '../components/LG'

export default function Result_session(props) {
  let {navigation,route} = props
  let {name,results} = route.params
  let result_data = []
  let exam_types = [
    {key:'class_test',value:'Class Test'},
    {key:'house_test',value:'House Test'},
    {key:'mid_term',value:'Mid Term'},
    {key:'term_end',value:'Term End'},
  ]
  exam_types.forEach(t=>{
    let cat = t.key
    let r = results.filter(e=>e.type == cat)
    if(r.length>0){
      let obj = {cat,type:t.value,data:r}
      result_data.push(obj)
    }
  })
  function render(i){ 
    let {item} = i
    let {type,data} = item
    return(
      <NotificationBar head={type} fun={()=>{navigation.navigate('result',{name,data,type})}}/>
    )
  }
  return (
    <View style={Style.page}>
    <LG_full/>
        <TopBar icon="chevron-back-outline" text="Select Term" fun={()=>{navigation.toggleDrawer()}}/>
        <View style={styles.bar_view}>
          <FlatList data={result_data} keyExtractor={(item,index)=>index.toString()} showsVerticalScrollIndicator={false} overScrollMode='never' renderItem={render}/>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  bar_view:{
    marginTop: 20
  }
})
