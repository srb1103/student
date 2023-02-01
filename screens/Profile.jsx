import React, { useCallback, useReducer } from 'react'
import {View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, Alert} from 'react-native'
import Style from '../styles/Style'
import Colors from '../constants/Colors'
import * as ImgPicker from 'expo-image-picker'
import LG, { LG_full } from '../components/LG'
import { RFValue } from 'react-native-responsive-fontsize'
import IonIcon from 'react-native-vector-icons/Ionicons'
import Box from '../components/Box'
import { useDispatch, useSelector } from 'react-redux'
import { createTable, deleteUser, updateImg } from '../database/sql'
import { logOut, updateImgUrl } from '../store/action'
import { LinearGradient } from 'expo-linear-gradient'


const UPDATE = 'UPDATE'
const stateReducer = (state,action)=>{
  switch (action.type){
    case UPDATE:
      let url = action.url
      return{...state,url}
  }
  return state
}
let {height} = Dimensions.get('window')
export default function Profile({navigation}) {
  let user = useSelector(state=>state.user)
  let usr = user.user_detail
  const [state,dispatchState] = useReducer(stateReducer,{
    url: usr.img
  })
  let dispatch = useDispatch()
  const update = useCallback(async(url)=>{
    dispatchState({type: UPDATE,url})
  },[dispatchState])
  const pickImg = async ()=>{
    let img = await ImgPicker.launchImageLibraryAsync({
      mediaTypes:ImgPicker.MediaTypeOptions.Images,
      allowsEditing:true,
      aspect:[1,1],
      quality:1
    })
    if(!img.cancelled){
      let url = img.uri
      update(url)
      let url1 = JSON.stringify(url)
      await updateImg(url1)
      dispatch(updateImgUrl(url))
    }
  }
  const showAlert = ()=>{
    Alert.alert('Are you sure?','Do you really want to log out?',[{text:'No'},{text:'Logout',onPress:handleLogout}])
  }
  const handleLogout = async()=>{
    await deleteUser()
    await createTable()
    dispatch(logOut())
  }
  return (
    <View style={{...Style.page,padding:0}}>
    <TouchableOpacity activeOpacity={.5} style={{...styles.btn,left:RFValue(11)}} onPress={()=>navigation.goBack()}><IonIcon name="chevron-back" style={styles.icon}/></TouchableOpacity>
    <TouchableOpacity activeOpacity={.5} style={{...styles.btn,right:RFValue(11)}} onPress={pickImg}><IonIcon name="camera-outline" style={styles.icon}/></TouchableOpacity>
    <LinearGradient colors={[Colors.grad1, 'rgba(0,0,0,0)']} style={{position:'absolute',top:0,left:0,height:'100%',width:'100%',zIndex:2,height:150}}/>
      <Image source={{uri:state.url}} style={styles.img}/>
      <View style={{alignItems:'center',justifyContent:'flex-start',flex:1}}>
      <LG/>
        <View style={{...styles.div,marginTop:-RFValue(30)}}>
            <Text style={styles.name}>{usr.name}</Text>
            <Text style={styles.desc}>{`Admission No: ${usr.admissionNo}`}</Text>
            <Text style={styles.desc}>{`Class: 10, Roll No: ${usr.rollNo}`}</Text>
            <Text style={styles.desc}><IonIcon name="call"/> {`${usr.phone}`}</Text>
            <Text style={styles.desc}><IonIcon name="mail"/> {`${usr.email}`}</Text>
            <Text style={styles.desc}><IonIcon name="location"/> {`${usr.address}`}</Text>
        </View>
        <View style={{flexDirection:'row',width:'90%'}}>
          <Box text="Leave application" icon="document-outline" left fun={()=>navigation.navigate('applications')} width='33%'/>
          <Box text="Change Password" icon="key-outline" fun={()=>navigation.navigate('change_password')} width='33%'/>
          <Box text="Log out" icon="log-out-outline" right fun={showAlert} width='33%'/>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  img:{width:'100%',resizeMode:'cover',height:height*.5},
  div:{padding:RFValue(15),borderRadius:15,backgroundColor:Colors.white,width:'90%',marginBottom:5},
  name:{fontSize:RFValue(25),fontFamily:'p6',color:Colors.blck,marginBottom:-8},
  desc:{color:Colors.grey,fontSize:RFValue(13)},
  btn:{position:'absolute',top:RFValue(15),backgroundColor:Colors.faded,height:RFValue(40),width:RFValue(40),borderRadius:30,alignItems:'center',justifyContent:'center',zIndex:3},
  icon:{fontSize:RFValue(25),color:Colors.primary}
})
