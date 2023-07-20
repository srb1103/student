import React,{useReducer, useCallback, useState} from 'react'
import {View, Text, StyleSheet, Image, Dimensions, Alert, ActivityIndicator,TouchableOpacity, TouchableWithoutFeedback, Keyboard, ScrollView,StatusBar} from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { useDispatch } from 'react-redux'
import { setUserAction } from '../store/action'
import Colors from '../constants/Colors'
import InputField from '../components/InputField'
import {usrCr} from '../database/firebase-config'
import { fetch_data } from '../database/functions'
import { updateUserDetail } from '../database/sql'
import {LG_full} from '../components/LG'
import Style from '../styles/Style'

const {height,width} = Dimensions.get('window')
let stateReducer = (state, action)=>{
    return {
        ...state, [action.name]: action.text
    }
}
export default function Login() {
    const[loading, setLoading] = useState(false)
    let dispatch = useDispatch()
    let {iid} = usrCr
    let updateDet = async(data)=>{
        await updateUserDetail(data)
        dispatch(setUserAction(data))
    }
    const onSubmit = async()=>{
        setLoading(true)
        let {username, password} = state
        let err = '';
        if(!username && !password){
            err = 'Username and Password required'
        }else if(!username){
            err = 'Please enter username'
        }else if(!password){
            err = 'Please enter password'
        }
        if(!err){
            try{
                let students = await fetch_data('students')
                students = students.filter(e=>e.instituteID == iid)
                let st = students.find(e=>e.username == username)
                if(st){
                    if(st.password == ''){
                        if(st.id == password){
                            updateDet(st)
                        }else{
                            Alert.alert('Error','Please enter valid password',[{text:'Okay'}])
                            setLoading(false)
                        }
                    }else{
                        if(st.password == password){
                            updateDet(st)
                        }else{
                            Alert.alert(`Error`,`Please enter valid password`,[{text:'Okay'}])
                            setLoading(false)
                        }
                    }
                }else{
                    Alert.alert('Error','Invalid username',[{text:'Okay'}])
                    setLoading(false)
                }
            }catch(err){
                console.log(err.message)
                setLoading(false)
            }
        }else{
            Alert.alert('Error', err, [{text: 'Okay'}])
            setLoading(false)
        }
    }
    let [state, dispatchState] = useReducer(stateReducer,{
        username: '',
        password: '',
    })
    const addItem = useCallback((name, text)=>{
        dispatchState({
            name,
            text
        })
    },[dispatchState])
    
  return (
    <View style={{alignItems:'center',flex:1}}>
    <StatusBar animated={true} backgroundColor={Colors.blck}/>
        <LG_full/>
        <View style={styles.top_circle}/>
        <ScrollView overScrollMode='never' style={{width:'100%'}} showsVerticalScrollIndicator={false}>
        <View style={{flex:1,alignItems:'center',justifyContent:'center',paddingVertical:20}}>
        <Image source={require('../assets/logo.png')} style={styles.logo}/>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.form_wrap}>
            <Text style={styles.head}>Login</Text><View style={{height:20}}/>
            <InputField val='' placeholder='Enter Username' name='username' onChangeFun={addItem}/>
            <InputField val='' placeholder='Enter Password' name='password' onChangeFun={addItem} password iseye/><View style={{height:20}}/>
            <View style={{height:RFValue(80),alignItems:'center',justifyContent:'center'}}>
                {!loading ? <TouchableOpacity activeOpacity={.5} onPress={onSubmit} style={{width:width*.8}}><Text style={Style.form_btn}>Login</Text></TouchableOpacity> : <ActivityIndicator size="large" color={Colors.blck}/>}
            </View>
            
        </View>
        </TouchableWithoutFeedback>
        </View>
        </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
    topDiv:{
        backgroundColor: Colors.primary,
        flex: 1,
        alignItems: 'center',
        justifyContent:'center',
    },
    logo:{
        height: RFValue(50),zIndex:2,resizeMode:'contain',marginBottom:80,marginTop:height/5.5
    },
    head:{
        fontSize: RFValue(25),fontFamily:'p6',textAlign:'center'
    },
    form_wrap:{padding:20,borderRadius:20,backgroundColor:Colors.white,width:'90%',zIndex:2,position:'relative'},
    top_circle:{backgroundColor:Colors.blck,height,width:height,position:'absolute',top:-width,left:-width*.49,borderRadius:height,zIndex:-1}
})
