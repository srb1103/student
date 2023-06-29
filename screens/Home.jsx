import React, { useState,useEffect,useCallback,useRef } from 'react'
import {View, Text, StyleSheet, TouchableOpacity, SafeAreaView, FlatList, Dimensions, Alert, ScrollView,StatusBar,RefreshControl,Image,Button,Platform} from 'react-native'
import Style from '../styles/Style'
import { RFValue } from 'react-native-responsive-fontsize'
import Colors from '../constants/Colors'
import TopBar from '../components/TopBar'
import LG_full from '../components/LG'
import Box, {LongBox} from '../components/Box'
import { useDispatch, useSelector } from 'react-redux'
import { addNotif, setUserData,setResponse,addAssignment, addHomework, setAppRes } from '../store/action'
import Loader from '../components/Loading'
import { db } from '../database/firebase-config'
import { updateDoc,doc } from 'firebase/firestore'
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications'
import {setNum} from '../database/functions'

let {width} = Dimensions.get('screen')
export default function Home({navigation}) {
  let [loading,setLoading] = useState(true)
  const [refreshing,setRefreshing] = useState(false)
  let days = ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let user = useSelector(state=>state.user)
  let {id,instituteID,classId} = user.user_detail
  let sesID = user.session.id
  let {timetable,teachers,notifications,homework,iType,assignments,courses} = user
  let dispatch = useDispatch()
  let now = new Date()
  async function registerForPushNotificationsAsync() {
    let token;
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        Alert.alert('Error','Failed to get push token for push notification!',[{text:'Okay'}]);
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
      Alert.alert('Error','Must use physical device for Push Notifications',[{text:'Okay'}]);
    }
    return token;
  }
  useEffect(()=>{
    dispatch(setUserData(instituteID,classId,sesID,id)).then(()=>{
      registerForPushNotificationsAsync().then((token)=>{
        updateDoc(doc(db,'students',id),{last_login:now,pushToken:token}).then(()=>{
        setLoading(false)
        })
      }).catch(err=>console.log(err))
    }).catch(err=>console.log(err))
  },[])
  useEffect(()=>{
      const subscription = Notifications.addNotificationResponseReceivedListener(res=>{
        let response = res.notification.request.trigger.remoteMessage.data.body
        response = JSON.parse(response)
        let {data,nav,type,screen,source} = response
        if(type ==  'announcement'){
          let {id,title,text,date} = data
          let notif = {id,text,title,date,by:source}
          let isThere = notifications.find(e=>e.id == id)
          if(isThere){
            navigation.navigate(nav,{screen,params:{notice:{title,text,by:source,date}}})
          }else{
            dispatch(addNotif(notif)).then(()=>{
              navigation.navigate(nav,{screen,params:{notice:{title,text,by:source,date}}})
            }).catch(err=>console.log(err))
          }
        }else if(type == 'assignment'){
          let {id} = data
          let isThere = assignments.find(e=>e.id == id)
            if(isThere){
              navigation.navigate(nav,{screen,params:{id}})
            }else{
              dispatch(addAssignment(data)).then(()=>{
                navigation.navigate(nav,{screen,params:{id}})
              }).catch(err=>console.log(err))
            }
        }else if(type == 'query_response'){
          let {id} = data
          dispatch(setResponse(data)).then(()=>{
            navigation.navigate(nav,{screen,params:{data:{id},deleteFun:null}})
          }).catch(err=>console.log(err))
        }else if(type == 'student_inquiry'){
          let {id} = data
          dispatch(setAppRes(data)).then(()=>{
            navigation.navigate(nav,{screen,params:{data:id,deleteFun:null}})
          }).catch(err=>console.log(err))
        }else if(type == 'homework'){
          let {title,subjectID,date,description,id} = data
          let isThere = homework.find(e=>e.id == id)
          let course = courses.find(e=>e.id == subjectID)
          if(isThere){
            navigation.navigate(nav,{screen,params:{title,description,date,subject:course.name}})
          }else{
            dispatch(addHomework(data)).then(()=>{
              navigation.navigate(nav,{screen,params:{title,description,date,subject:course.name}})
            }).catch(err=>console.log(err))
          }
        }
      })
      return ()=>{
        subscription.remove()
      }
  },[])
  const onRefresh = useCallback(()=>{
    setRefreshing(true)
    dispatch(setUserData(instituteID,classId,sesID,id)).then(()=>{setRefreshing(false)}).catch(err=>console.log(err))
  },[])
  let d = new Date()
  let date = `${d.getDate()}-${d.getMonth()+1}-${d.getFullYear()}` 
  let msg = ''
  let a1 = homework ? homework.filter(e=>e.date == date) : []
  let a1l = a1.length
  if(a1l == 0){
    msg = `No homework today`
  }else if(a1l<2){
    msg = `You have ${a1l} homework today`
  }else{
    msg = `You have ${a1l} homeworks today`

  }
  let todayIND = d.getDay()
  let today = days[todayIND]
  let ud = user.user_detail
  let pen_assn = assignments.filter(e=>e.submitted== 'no').length
  let periods = timetable.find(e=>e.day == today)
  const renderNotice = (item)=>{
    let notice = item.item
    if(item.index > 4){return}
    let d = notice.date
    return(
      <TouchableOpacity activeOpacity={.5} onPress={()=>navigation.navigate('notification',{notice})} style={{marginBottom:15}}>
        <Text style={styles.notif_txt}>{notice.title}</Text>
        <Text style={styles.notif_det}>{`By: ${notice.by} | ${setNum(d)}`}</Text>
      </TouchableOpacity>
    )
  }
  const renderTimetable = (s)=>{
    let l = periods.subjects.length
    const {item,index} = s
    let {period,subjectID,teacherID,time} = item
    let tchr = teachers.find(e=>e.id == teacherID)
    return(
      <View style={{...styles.tt_wrap,marginLeft:index == 0 ? 20 : 0,marginRight:index == (l-1) ? 20 : 5,width:l== 1 ? (width-40) : (width - RFValue(90))}}>
        <View>
          <Text style={styles.subject_name}>{`${period}. ${subjectID.name}`}</Text>
          <Text style={styles.notif_det}>{`Teacher: ${tchr.name}`}</Text>
          <Text style={styles.time}>{`${time.from}-${time.to}`}</Text>
        </View>
      </View>
    )
  }
  if(refreshing || loading){
    return <Loader/>
  }
  return (
    <SafeAreaView style={Style.page1}>
      <StatusBar hidden={false} animated={true} backgroundColor={Colors.grad1} barStyle="dark-content"/>
      <View style={{padding:20,paddingBottom:0}}><TopBar icon="menu-outline" text='' fun={()=>navigation.toggleDrawer()}/></View>
      <LG_full/>
      <ScrollView showsVerticalScrollIndicator={false} overScrollMode='never' refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
      <View style={{padding:20,paddingVertical:0}}>
        <Text style={styles.homeHead}>{`Hello, ${ud.name}`}</Text>
        <View style={styles.home_div}>
          <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
            <Text style={styles.hd_head}>Recent Announcements</Text>
            <TouchableOpacity activeOpacity={.5} onPress={()=>navigation.navigate('notes')}><Text style={styles.notif_txt}>View All</Text></TouchableOpacity>
          </View>
          <View style={Style.line}/><View style={{height:10}}/>
          <FlatList data={notifications} overScrollMode='never' keyExtractor={(item,index)=>index.toString()} renderItem={renderNotice}/>
        </View>
        <View style={{flexDirection:'row',flexWrap:'wrap'}}>
          <Box text="Courses" icon="book-outline" left fun={()=>navigation.navigate('courses')}/>
          <Box text="Timetable" icon="time-outline" fun={()=>navigation.navigate('tt_main')} delay={1}/>
          <Box text="Attendance" icon="calendar-outline" fun={()=>navigation.navigate('attendance',{screen:'attendance_home'})} delay={2}/>
          <Box text="Results" icon="bar-chart-outline" right fun={()=>navigation.navigate('res',{screen:'results'})} delay={3}/>
        </View>
        <View style={{height:15}}/>
        {periods && <Text style={{...styles.notif_txt}}>Today's classes</Text>}
      </View>
      <View>
        {periods && <FlatList showsHorizontalScrollIndicator={false} overScrollMode='never' horizontal data={periods.subjects} keyExtractor={(item,index)=>index.toString()} renderItem={renderTimetable}/>}
      </View>
      <View style={{padding:20,paddingBottom:0}}>
        <LongBox heading="Assignments" text={`${pen_assn} pending assignment(s)`} fun={()=>navigation.navigate('assign',{screen:'assignments'})} icon="newspaper-outline"/>
      </View>
      {iType == 'school' && <View style={{padding:20,paddingTop:0}}>
        <LongBox heading="Today's Homework" text={msg} fun={()=>navigation.navigate('homework',{screen:'hw_home'})} icon="document-text-outline"/>
      </View>}
    </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  homeHead:{
    marginTop:RFValue(25),
    fontSize: RFValue(25),
    color: Colors.textColor,
    fontFamily: 'p6',marginLeft:1
  },
  categoryDiv:{
    marginTop: 20
  },
  categoryHead:{
    marginVertical: 8,
    fontSize: RFValue(18),
    fontFamily: 'p6',
    color: Colors.textColor
  },
  category:{
    width: '47%',
    margin: 5,
    alignItems: 'center',
    justifyContent:'center',
    borderRadius: 15,
    backgroundColor: Colors.faded,
    paddingVertical: 35
  },
  catetory_wrap:{
    flexDirection:'row',
    flexWrap: 'wrap'
  },
  category_icon:{
    color: Colors.primary,
    fontSize: RFValue(45),
    marginBottom: 7
  },
  category_title:{
    color: Colors.textColor,
    fontSize: RFValue(14),
    fontFamily: 'p5'
  },
  feed_head_wrap:{
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'space-between',
    marginBottom: 20
  },
  viewall_btn:{
    color: Colors.white,
    fontSize: RFValue(10),
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: Colors.textColor
  },
  home_div:{padding:15,borderRadius:20,backgroundColor:Colors.faded,marginVertical:20,maxHeight:RFValue(220)},
  hd_head:{fontFamily:'p5',fontSize:RFValue(13),color:Colors.grey},
  notif_txt:{color:Colors.blck,fontSize:RFValue(12),fontFamily:'p5'},
  notif_det:{color:Colors.grey,fontSize:RFValue(9),marginTop:-3},
  tt_wrap:{backgroundColor:Colors.blck,padding:20,flexDirection:'row',borderRadius:15,margin:3,alignItems:'center',paddingVertical:10,minHeight:RFValue(80)},
  subject_name:{color:Colors.white,fontSize:RFValue(15),fontFamily:'p6',lineHeight:RFValue(18),marginVertical:2},
  subject_time:{fontSize:RFValue(10),color:Colors.white},
  time:{fontFamily:'p4',fontSize:RFValue(15),color:Colors.faded},
  
})
