import React, { useCallback, useReducer, useState } from 'react'
import {View, Text,ActivityIndicator, Keyboard, Alert,TouchableWithoutFeedback,TouchableOpacity} from 'react-native'
import InputField from '../components/InputField'
import Colors from '../constants/Colors'
import { LG_full } from '../components/LG'
import { useDispatch, useSelector } from 'react-redux'
import {addDoc,collection} from 'firebase/firestore'
import { db } from '../database/firebase-config'
import Style from '../styles/Style'
import TopBar from '../components/TopBar'
import { RFValue } from 'react-native-responsive-fontsize'
import { addApplication } from '../store/action'

const UPDATE = 'UPATE'
const stateReducer = (state,action)=>{
    switch(action.type){
        case UPDATE:    
          let {name,value} = action
          return{...state,[name]:value}
    }
    return state
}
export default function App_form(props){
    let {navigation,route} = props
    let user = useSelector(state=>state.user)
    let {id,instituteID} = user.user_detail
    let {fun} = route.params
    let {session} = user
    let sesID = session.id
    let dispatch = useDispatch()
    let [loading,setLoading] = useState(false)
    let [state,dispatchState] = useReducer(stateReducer,{
        subject:'',
        message:''
    })
    const handleChange = useCallback((name,value)=>{
        dispatchState({type:UPDATE,name,value})
    },[dispatchState])
    const submit = async()=>{
        setLoading(true)
        let {subject,message} = state
        if(subject && message){
            let newD = new Date()
            newD = `${newD.getDate()}-${newD.getMonth()+1}-${newD.getFullYear()}`
            try{
                let res = await addDoc(collection(db,'applications'),{studentID:id,instituteID,subject,application:message,status:'pending',date:newD,message:'',session:sesID})
                let app_id = res.id
                let obj = {id:app_id,subject,application:message,date:newD,status:'pending',message:''}
                dispatch(addApplication(obj))
                fun(obj)
                navigation.goBack()
            }catch(err){console.log(err),setLoading(false)}
        }else{
            Alert.alert('Error','All fields are required',[{text:'Okay'}])
            setLoading(false)
        }
    }
    return(
        <View style={Style.page}>
            <LG_full/>
            <TopBar icon="chevron-back-outline" text='Write new application' fun={()=>{navigation.goBack()}}/>
            <View style={{height:50}}/>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View>
                    <InputField val={state.old} placeholder='Enter Application subject' name='subject' onChangeFun={handleChange} label="Subject"/>
                    <InputField val={state.newP} placeholder='Write application...' name='message' onChangeFun={handleChange} label="Description" multiline nol={5}/>
                </View>
            </TouchableWithoutFeedback>
            <View style={{height:30}}/>
            <View style={{height:RFValue(80),alignItems:'center',justifyContent:'center'}}>
                {!loading ? <TouchableOpacity activeOpacity={.5} onPress={submit} style={{width:'80%'}}><Text style={{...Style.tiny_btn,paddingVertical:20}}>Send Application</Text></TouchableOpacity> : <ActivityIndicator size="large" color={Colors.blck}/>}
            </View>
        </View>
    )
}