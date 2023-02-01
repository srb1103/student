import React from 'react'
import { View, StyleSheet, Text, FlatList} from 'react-native'
import TopBar from '../components/TopBar'
import Style from '../styles/Style'
import NotificationBar from '../components/NotificationBar'
import Colors from '../constants/Colors'
import { RFValue } from 'react-native-responsive-fontsize'
import { useSelector } from 'react-redux'
import { LG_full } from '../components/LG'
import Attendance_bar from '../components/Attendance_bar'
import { setNum } from '../database/functions'

export default function Results(props) {
  const {navigation, route} = props
  let {name,data,type} = route.params
  let user = useSelector(state=>state.user)
  let {courses} = user
  let overall = 0;
  data.forEach(r=>{
    let {marks,maxMarks} = r
    let percent = Math.floor((marks/maxMarks)*100)
    overall = overall+percent
  })
  let final = overall/data.length
  function render(r){
    let {item,index} = r
    let {title,subjectID,examDate,marks,marksType,maxMarks} = item
    let sub = courses.find(e=>e.id == subjectID).name
    marks = parseInt(marks)
    let percent = Math.floor((marks/maxMarks)*100)
    let bg = Colors.green
    let gradient = Colors.greenGradient
    if((marksType == 'marks' && percent < 33) || (marksType == 'cgpa' && percent < 3.3)){
      bg = Colors.red
      gradient = Colors.redGradient
    }
    if((marksType == 'marks' && percent > 32 && percent < 60) || (marksType == 'cgpa' && percent > 3.2 && percent < 6)){
      bg = Colors.yellow
      gradient = Colors.yellowGradient
    }
    let mr = 'Marks'
    if(marksType == 'cgpa'){mr = 'CGPA'}
    let date = setNum(examDate)
    return(
      <Attendance_bar head={sub} bg={bg} stat={`${marks}`} lg colors={gradient} main={Colors.white} text={`${title} | ${mr}`} txt2={`${date}`} txt3={`/ ${maxMarks}`}/>
    )
  }
  return (
    <View style={Style.page}>
    <LG_full/>
        <TopBar icon="chevron-back-outline" text={`${type} (${name})`} fun={()=>{navigation.goBack()}}/>
        {data && <View>
          <View style={styles.bar_view}>
            <FlatList data={data} keyExtractor={(item,index)=>index.toString()} showsVerticalScrollIndicator={false} overScrollMode='never' renderItem={render}/>
          </View>
          <View style={styles.bottom_view}>
            <Text style={styles.ovr_head}>Overall: {final}%</Text>
          </View>
        </View>}
    </View>
  )
}

const styles = StyleSheet.create({
  bar_view:{marginVertical: 20},
  bottom_view:{padding: 10},
  ovr_head:{color: Colors.primary, fontSize: RFValue(18), fontFamily: 'p6'},
  ovr_status:{color: Colors.textColor, fontSize: RFValue(12), marginTop: -5}
})
