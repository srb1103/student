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
import { addInquiry } from '../store/action'
import { SelectList } from 'react-native-dropdown-select-list'

const UPDATE = 'UPATE'
const stateReducer = (state,action)=>{
    switch(action.type){
        case UPDATE:    
          let {name,value} = action
          return{...state,[name]:value}
    }
    return state
}
export default function Inq_form(props){
    let {navigation,route} = props
    let user = useSelector(state=>state.user)
    let {id,instituteID} = user.user_detail
    let {session} = user
    let sesID = session.id
    let {fun,sub} = route.params
    let dispatch = useDispatch()
    let [loading,setLoading] = useState(false)
    let [selected, setSelected] = useState("");
    let [state,dispatchState] = useReducer(stateReducer,{
        title:'',
        inquiry:'',
        subjectID: ''
    })
    const handleChange = useCallback((name,value)=>{
        dispatchState({type:UPDATE,name,value})
    },[dispatchState])
    const submit = async()=>{
        setLoading(true)
        let {title,subjectID,inquiry} = state
        if(title && inquiry && subjectID){
            let newD = new Date()
            newD = `${newD.getDate()}-${newD.getMonth()+1}-${newD.getFullYear()}`
            try{
                let res = await addDoc(collection(db,'inquiries'),{title,studentID:id,instituteID,subjectID,inquiry,status:'pending',date:newD,response:'',session:sesID})
                let app_id = res.id
                let obj = {id:app_id,subjectID,inquiry,title,date:newD,status:'pending',response:''}
                dispatch(addInquiry(obj))
                fun(obj)
                navigation.goBack()
            }catch(err){console.log(err),setLoading(false)}
        }else{
            Alert.alert('Error','All fields are required',[{text:'Okay'}])
            setLoading(false)
        }
    }
    const setCls = (opt)=>{
        handleChange('subjectID', opt)
    }
    return(
        <View style={Style.page}>
            <LG_full/>
            <TopBar icon="chevron-back-outline" text='Write new inquiry' fun={()=>{navigation.goBack()}}/>
            <View style={{height:30}}/>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View>
                    <InputField val={state.old} placeholder='Enter Title' name='title' onChangeFun={handleChange} label="Title"/>
                    <InputField val={state.newP} placeholder='Write inquiry...' name='inquiry' onChangeFun={handleChange} label="Inquiry" multiline nol={5}/>
                    <View style={{marginTop:8,padding:2}}>
                        <Text style={Style.label}>Select Subject</Text>
                        <SelectList setSelected={setSelected} data={sub} onSelect={() => setCls(selected)} boxStyles={{...Style.input, paddingVertical: 20}} placeholder="Select Subject" searchPlaceholder="Search subject..." dropdownStyles={{backgroundColor: Colors.bg,borderColor:'rgba(0,0,0,0)'}}/>
                    </View>
                </View>
            </TouchableWithoutFeedback>
            <View style={{height:30}}/>
            <View style={{height:RFValue(80),alignItems:'center',justifyContent:'center'}}>
                {!loading ? <TouchableOpacity activeOpacity={.5} onPress={submit} style={{width:'80%'}}><Text style={{...Style.tiny_btn,paddingVertical:20}}>Send Inquiry</Text></TouchableOpacity> : <ActivityIndicator size="large" color={Colors.blck}/>}
            </View>
        </View>
    )
}