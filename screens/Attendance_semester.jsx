import React, {useState} from 'react'
import {View, ActivityIndicator} from 'react-native'
import TopBar from '../components/TopBar'
import Style from '../styles/Style'
import Colors from '../constants/Colors'
import Attendance_bar from '../components/Attendance_bar'
export default function Attendance_semester(props) {
    const {navigation, route} = props
    const {sem, userID} = route.params
    const [loading, setLoading] = useState(true)
  return (
    <View style={Style.page}>
        <TopBar icon="chevron-back-outline" text={`Semester ${sem}`} fun={()=>{navigation.goBack()}}/>
        <View style={{marginTop: 10}}>
          <Attendance_bar head='BSM-01' bg={Colors.red} stat='30%' fun={()=>{navigation.navigate('attendance_view',{course: 'BSM-01', sem:1, userID: 1})}}/>
          <Attendance_bar head='AED-01' bg={Colors.green} stat='70%' fun={()=>{navigation.navigate('attendance_view',{course: 'AED-01', sem:1, userID: 1})}}/>
          <Attendance_bar head='ASHF-01' bg={Colors.yellow} stat='50%' fun={()=>{navigation.navigate('attendance_view',{course: 'ASHF-01', sem:1, userID: 1})}}/>
        </View>
    </View>
  )
}

