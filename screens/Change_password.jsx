import React, { useCallback, useReducer, useState } from 'react'
import {View,Text, TouchableWithoutFeedback,Keyboard,ActivityIndicator,TouchableOpacity, Dimensions,Alert} from 'react-native'
import Colors from '../constants/Colors'
import InputField from '../components/InputField'
import TopBar from '../components/TopBar'
import Style from '../styles/Style'
import { useDispatch, useSelector } from 'react-redux'
import { LG_full } from '../components/LG'
import { RFValue } from 'react-native-responsive-fontsize'
import { fetch_data } from '../database/functions'
import { updateDoc,doc } from 'firebase/firestore'
import { db } from '../database/firebase-config'

let {width} = Dimensions.get('window')
const UPDATE = 'UPDATE'
const formReducer = (state,action)=>{
    switch(action.type){
        case UPDATE:
            let {name,value} = action
            return{...state,[name]:value}
    }
    return state
}

export default function ChangePassword(props){
    let {navigation} = props
    let user = useSelector(state=>state.user)
    const [loading,setLoading] = useState(false)
    let {user_detail} = user
    let {id} = user_detail
    let dispatch = useDispatch()
    let [state,dispatchState] = useReducer(formReducer,{
        old:null,
        newP:null,
    })
    const handleChange = useCallback((name,value)=>{
        dispatchState({type:UPDATE,name,value})
    },[dispatchState])
    const onSubmit = async()=>{
        let {old,newP} = state
        if(old && newP){
            setLoading(true)
            try{
                let students = await fetch_data('students')
                let student = students.find(e=>e.id == id)
                if(student.password == ''){
                    if(student.id == old){
                        await updateDoc(doc(db,'students',id),{password:newP})
                        Alert.alert('Success','Your password has been changed.',[{text:'Okay'}])
                        setTimeout(()=>{
                            navigation.goBack()
                        },2000)

                    }else{
                        Alert.alert('Error','Current password does not match.',[{text:'Okay'}])
                    }
                }else{
                    if(student.password == old){
                        await updateDoc(doc(db,'students',id),{password:newP})
                        Alert.alert('Success','Password changed successfully.',[{text:'Okay'}])
                        setTimeout(()=>{
                            navigation.goBack()
                        },2000)

                    }else{
                        Alert.alert('Error','Current password does not match',[{text:'Okay'}])
                    }
                }
                setLoading(false)
            }catch(err){console.warn(err);setLoading(false)}
        }else{
            Alert.alert('Error','All fields are required.',[{text:'Okay'}])
        }
    }
    return(
        <View style={Style.page}>
            <LG_full/>
            <TopBar icon="chevron-back-outline" text='Change Password' fun={()=>{navigation.goBack()}}/>
            <View style={{height:50}}/>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View>
                    <InputField val={state.old} placeholder='Enter Current Password' name='old' onChangeFun={handleChange} password iseye label="Current Password"/>
                    <InputField val={state.newP} placeholder='Enter New Password' name='newP' onChangeFun={handleChange} password iseye label="New Password"/>
                </View>
            </TouchableWithoutFeedback>
            <View style={{height:30}}/>
            <View style={{height:RFValue(80),alignItems:'center',justifyContent:'center'}}>
                {!loading ? <TouchableOpacity activeOpacity={.5} onPress={onSubmit} style={{width:width*.9}}><Text style={Style.form_btn}>Change</Text></TouchableOpacity> : <ActivityIndicator size="large" color={Colors.blck}/>}
            </View>
        </View>
    )
}