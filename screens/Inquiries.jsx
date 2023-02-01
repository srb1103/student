import React,{ useReducer,useState } from 'react'
import {View,Text, TouchableOpacity, FlatList} from 'react-native'
import InputField from '../components/InputField'
import { LG_full } from '../components/LG'
import Style from '../styles/Style'
import TopBar from '../components/TopBar'
import { useSelector } from 'react-redux'
import Colors from '../constants/Colors'
import { LongBox } from '../components/Box'
import { RFValue } from 'react-native-responsive-fontsize'
import { useCallback } from 'react'
import { setNum } from '../database/functions'

const NEW = 'NEW'
const REMOVE = 'REMOVE'
let stateReducer = (state,action)=>{
    switch(action.type){
        case NEW:
            let app = action.data
            let na = state.new
            na = na.concat(app)
            return{...state,new:na}
        case REMOVE:
            let id = action.id
            na = state.new
            na = na.filter(e=>e.id !== id)
            return{...state,new:na}
    }
    return state
}
export default function Inquiry_home(props){
    let {navigation} = props
    let user = useSelector(state=>state.user)
    let {inquiries,courses} = user
    let new_ap = inquiries.filter(e=>e.status == 'pending')
    let old_ap = inquiries.filter(e=>e.status !== 'pending')
    let sub = []
    courses.forEach(s=>{
        let obj = {key:s.id,value:s.name}
        sub.push(obj)
    })
    const [active, setActive] = useState(true)
    let [state,dispatchState] = useReducer(stateReducer,{
        new:new_ap,
        previous:old_ap
    })
    function render(s){
        let {item} = s
        let {title,status,date,subjectID} = item
        let subject = courses.find(e=>e.id == subjectID).name
        let gradient = Colors.greenGradient
        date = setNum(date)
        if(status == 'pending'){
            gradient = Colors.yellowGradient
        }
        return(
        <LongBox heading={title} lg colors={gradient} text={`${subject} | Date: ${date}`} fun={()=>{navigation.navigate('inquiry',{data:{...item,subject},deleteFun:handleDelete})}} icon="document-outline"/>
        )
    }
    const addNew = useCallback((data)=>{
        dispatchState({type:NEW,data})
    },[dispatchState])
    const handleDelete = useCallback((id)=>{
        dispatchState({type:REMOVE,id})
    },[dispatchState])
    return(
        <View style={Style.page}>
            <LG_full/>
            <TopBar icon="chevron-back-outline" text='Student Inquiries' fun={()=>{navigation.goBack()}}/>
            <View style={{...Style.homeBtns_wrap, marginVertical: 20,justifyContent:'center',backgroundColor:'rgba(0,0,0,0)'}}>
                <TouchableOpacity activeOpacity={.7} style={{...Style.btn, width: '40%', backgroundColor: active ? Colors.primary : Colors.faded}} onPress={()=>setActive(true)}><Text style={{...Style.btn_text, color: active ? Colors.bg : Colors.primary}}>New</Text></TouchableOpacity>
                <TouchableOpacity activeOpacity={.7} style={{...Style.btn, width: '40%', backgroundColor: !active ? Colors.primary : Colors.faded}} onPress={()=>setActive(false)}><Text style={{...Style.btn_text, color: !active ? Colors.bg : Colors.primary}}>Previous</Text></TouchableOpacity>
            </View>
            <View style={{height:10}}/>
            {active ? state.new.length == 0 ? <View style={Style.ai_screen}>
                <Text style={{color:Colors.blck,fontSize:RFValue(12),fontFamily:'p5'}}>No pending inquiries.</Text>
                <TouchableOpacity activeOpacity={.5} onPress={()=>{navigation.navigate('inq_form',{fun:addNew,sub})}}><Text style={Style.tiny_btn}>New Inquiry</Text></TouchableOpacity>
            </View> :
            <View style={{...Style.ai_screen,justifyContent:'flex-start'}}>
                <TouchableOpacity activeOpacity={.5} onPress={()=>{navigation.navigate('inq_form',{fun:addNew,sub})}}><Text style={{...Style.tiny_btn,backgroundColor:Colors.faded,color:Colors.blck}}>New Inquiry</Text></TouchableOpacity><View style={{height:15}}/>
                <FlatList data={state.new} keyExtractor={(item,index)=>index.toString()} showsVerticalScrollIndicator={false} overScrollMode='never' renderItem={render}/>
            </View>
            : <View>
                <FlatList data={state.previous} keyExtractor={(item,index)=>index.toString()} showsVerticalScrollIndicator={false} overScrollMode='never' renderItem={render}/>
            </View>}
        </View>
    )
}

