import React,{ useReducer,useState } from 'react'
import {View,Text, TouchableOpacity, FlatList,ActivityIndicator} from 'react-native'
import { LG_full } from '../components/LG'
import Style from '../styles/Style'
import TopBar from '../components/TopBar'
import { useDispatch, useSelector } from 'react-redux'
import Colors from '../constants/Colors'
import { LongBox } from '../components/Box'
import { RFValue } from 'react-native-responsive-fontsize'
import { useCallback } from 'react'
import { setNum } from '../database/functions'
import { deleteDoc,doc } from 'firebase/firestore'
import { db } from '../database/firebase-config'
import { deleteApplication } from '../store/action'

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
export default function Leave_home(props){
    let {navigation} = props
    let user = useSelector(state=>state.user)
    const [loading,setLoading] = useState(false)
    let {applications} = user
    let new_ap = applications.filter(e=>e.status == 'pending')
    let old_ap = applications.filter(e=>e.status == 'granted' || e.status == 'rejected')
    const [active, setActive] = useState(true)
    let dispatch = useDispatch()
    let [state,dispatchState] = useReducer(stateReducer,{
        new:new_ap,
        previous:old_ap
    })
    function render(s){
        let {item} = s
        let {subject,status,date,id} = item
        let gradient = Colors.greenGradient
        date = setNum(date)
        if(status == 'pending'){
            gradient = Colors.yellowGradient
        }
        if(status == 'rejected'){
            gradient = Colors.redGradient
        }
        return(
        <LongBox heading={subject} lg colors={gradient} text={`${status.toUpperCase()} | Date: ${date}`} fun={()=>{navigation.navigate('application',{data:id,deleteFun:handleDelete})}} icon="document-outline"/>
        )
    }
    const addNew = useCallback((data)=>{
        dispatchState({type:NEW,data})
    },[dispatchState])
    const handleDelete = useCallback(async(id)=>{
        setLoading(true)
        try{
            await deleteDoc(doc(db,'applications',id))
            dispatch(deleteApplication(id))
            dispatchState({type:REMOVE,id})
            setLoading(false)
        }catch(err){console.warn(err),setLoading(false)}
    },[dispatchState])
    
    return(
        <View style={Style.page}>
            <LG_full/>
            <TopBar icon="chevron-back-outline" text='Leave applications' fun={()=>{navigation.goBack()}}/>
            <View style={{...Style.homeBtns_wrap, marginVertical: 20,justifyContent:'center',backgroundColor:'rgba(0,0,0,0)'}}>
                <TouchableOpacity activeOpacity={.7} style={{...Style.btn, width: '40%', backgroundColor: active ? Colors.primary : Colors.faded,borderRadius:3,borderTopLeftRadius:15,borderBottomLeftRadius:15}} onPress={()=>setActive(true)}><Text style={{...Style.btn_text, color: active ? Colors.bg : Colors.primary}}>New</Text></TouchableOpacity>
                <TouchableOpacity activeOpacity={.7} style={{...Style.btn, width: '40%', backgroundColor: !active ? Colors.primary : Colors.faded,borderRadius:3,borderTopRightRadius:15,borderBottomRightRadius:15}} onPress={()=>setActive(false)}><Text style={{...Style.btn_text, color: !active ? Colors.bg : Colors.primary}}>Previous</Text></TouchableOpacity>
            </View>
            <View style={{height:10}}/>
            { loading ? 
                <ActivityIndicator size="large" color={Colors.blck}/>
                :
                active ? state.new.length == 0 ? <View style={Style.ai_screen}>
                <Text style={{color:Colors.blck,fontSize:RFValue(12),fontFamily:'p5'}}>No pending applications.</Text>
                <TouchableOpacity activeOpacity={.5} onPress={()=>{navigation.navigate('app_form',{fun:addNew})}}><Text style={Style.tiny_btn}>New Application</Text></TouchableOpacity>
            </View> :
            <View style={{...Style.ai_screen,justifyContent:'flex-start'}}>
                <TouchableOpacity activeOpacity={.5} onPress={()=>{navigation.navigate('app_form',{fun:addNew})}}><Text style={{...Style.tiny_btn,backgroundColor:Colors.faded,color:Colors.blck}}>New Application</Text></TouchableOpacity><View style={{height:15}}/>
                <FlatList data={state.new} keyExtractor={(item,index)=>index.toString()} showsVerticalScrollIndicator={false} overScrollMode='never' renderItem={render}/>
            </View>
            : <View>
                <FlatList data={state.previous} keyExtractor={(item,index)=>index.toString()} showsVerticalScrollIndicator={false} overScrollMode='never' renderItem={render}/>
            </View>}
        </View>
    )
}

