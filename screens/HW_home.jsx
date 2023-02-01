import React,{ useReducer,useState } from 'react'
import {View,Text, TouchableOpacity, FlatList} from 'react-native'
import { LG_full } from '../components/LG'
import Style from '../styles/Style'
import TopBar from '../components/TopBar'
import { useSelector } from 'react-redux'
import Colors from '../constants/Colors'
import { LongBox } from '../components/Box'
import { RFValue } from 'react-native-responsive-fontsize'
import { useCallback } from 'react'
import { setNum } from '../database/functions'
import InputField from '../components/InputField'

const FILTER = 'FILTER'
let stateReducer = (state,action)=>{
    switch(action.type){
        case FILTER:
            let {date,arr} = action
            let na = state.previous
            if(date){
                na = na.filter(e=>e.date.match(date))
            }else{na = arr}
            return{...state,previous:na}
    }
    return state
}
export default function HW_home(props){
    let {navigation} = props
    let user = useSelector(state=>state.user)
    let {homework,courses} = user
    let d = new Date()
    let [srch,setSrch] = useState('')
    let date = `${d.getDate()}-${d.getMonth()+1}-${d.getFullYear()}` 
    const [active, setActive] = useState(true)
    let previous = homework.filter(e=>e.date !== date)
    let [state,dispatchState] = useReducer(stateReducer,{
        today:homework.filter(e=>e.date == date),
        previous
    })
    function toggle(){
        setActive(s=>!s)
    }
    function render(s){
        let {item} = s
        let {title,subjectID,date,description} = item
        let gradient = Colors.greenGradient
        date = setNum(date)
        let subject = courses.find(e=>e.id == subjectID).name
        return(
        <LongBox heading={title} text={`${subject} | Date: ${date}`} fun={()=>{navigation.navigate('hw_view',{title,date,description,subject})}} icon="document-text-outline"/>
        )
    }
    const handleSrch = useCallback((name,value)=>{
        setSrch(value)
        dispatchState({type:FILTER,arr:previous,date:value})
    },[dispatchState])
    return(
        <View style={Style.page}>
            <LG_full/>
            <TopBar icon="chevron-back-outline" text='Homework' fun={()=>{navigation.goBack()}}/>
            <View style={{...Style.homeBtns_wrap, marginVertical: 20,justifyContent:'center',backgroundColor:'rgba(0,0,0,0)'}}>
                <TouchableOpacity activeOpacity={.7} style={{...Style.btn, width: '40%', backgroundColor: active ? Colors.primary : Colors.faded}} onPress={toggle}><Text style={{...Style.btn_text, color: active ? Colors.bg : Colors.primary}}>Today</Text></TouchableOpacity>
                <TouchableOpacity activeOpacity={.7} style={{...Style.btn, width: '40%', backgroundColor: !active ? Colors.primary : Colors.faded}} onPress={toggle}><Text style={{...Style.btn_text, color: !active ? Colors.bg : Colors.primary}}>Previous</Text></TouchableOpacity>
            </View>
            <View style={{height:10}}/>
            {active ? state.today.length == 0 ? <View style={Style.ai_screen}>
                <Text style={{color:Colors.blck,fontSize:RFValue(12),fontFamily:'p5'}}>No homework today.</Text>
            </View> :
            <View style={{...Style.ai_screen,justifyContent:'flex-start'}}>
                <FlatList data={state.today} keyExtractor={(item,index)=>index.toString()} showsVerticalScrollIndicator={false} overScrollMode='never' renderItem={render}/>
            </View>
            : <View>
                <InputField val={srch} placeholder='Search date...' name='srch' onChangeFun={handleSrch} />
                <View style={{height:15}}/>
                <FlatList data={state.previous} keyExtractor={(item,index)=>index.toString()} showsVerticalScrollIndicator={false} overScrollMode='never' renderItem={render}/>
            </View>}
        </View>
    )
}

