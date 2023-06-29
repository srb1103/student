import React, {useState} from 'react'
import {View, Text, StyleSheet,TouchableOpacity,ActivityIndicator, Alert} from 'react-native'
import Colors from '../constants/Colors'
import Style from '../styles/Style'
import TopBar from '../components/TopBar'
import { RFValue } from 'react-native-responsive-fontsize'
import { LG_full } from '../components/LG'
import {useSelector } from 'react-redux'
import { setNum } from '../database/functions'

export default function Application(props){
    const {navigation, route} = props
    let [loading,setLoading] = useState(false)
    let {data,deleteFun} = route.params
    let u = useSelector(state=>state.user)
    let {applications} = u
    let id = data
    let app = applications.find(e=>e.id == id)
    let {subject,message,application,status,date} = app
    date = setNum(date)
    function showAlert(){
        Alert.alert('Are you sure?','Do you really want to delete this application?',[{text:'No'},{text:'Yes, delete',onPress:()=>{
            deleteFun(id);
            navigation.goBack()
        }}])
    }
    return(
        <View style={Style.page}>
        <LG_full/>
            <TopBar icon="chevron-back-outline" text={date} fun={()=>{navigation.goBack()}}/>
            <View style={{marginTop: 10}}>
                <Text style={styles.page_head}>{subject}</Text>
                <Text style={styles.description}>{application}</Text>
                <Text style={styles.description}>Date: {date}</Text>
                <Text style={styles.description}>Status: <Text style={{...styles.status}}>{status}</Text></Text>
                {status == 'rejected' && message && <Text style={{...styles.description,fontSize:RFValue(14),color: status == 'rejected' ? Colors.red : Colors.green,width:'70%'}}>Note by admin: {message}</Text>}
                <View style={{height:30}}/>
                {status == 'pending' && 
                <View style={{height:RFValue(80),alignItems:'center',justifyContent:'center'}}>
                    {!loading ? <TouchableOpacity activeOpacity={.5} onPress={showAlert} style={{width:'80%'}}><Text style={{...Style.tiny_btn}}>Delete Application</Text></TouchableOpacity> : <ActivityIndicator size="large" color={Colors.blck}/>}
                </View>}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    page_head:{fontSize: RFValue(18), maxWidth: '80%', fontFamily: 'p6', color: Colors.primary, marginBottom: 5},
    description:{color: Colors.textColor, marginBottom: 3, fontSize: RFValue(15)},
    status:{fontFamily: 'p5'}
})