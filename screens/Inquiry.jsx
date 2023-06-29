import React from 'react'
import {View, Text, StyleSheet,TouchableOpacity,Image, Alert} from 'react-native'
import Colors from '../constants/Colors'
import Style from '../styles/Style'
import TopBar from '../components/TopBar'
import { RFValue } from 'react-native-responsive-fontsize'
import { LG_full } from '../components/LG'
import { useSelector } from 'react-redux'
import { setNum } from '../database/functions'

export default function Inquiry(props){
    const {navigation, route} = props
    let {data,deleteFun} = route.params
    let {id} = data
    let u = useSelector(state=>state.user)
    let {img} = u.user_detail
    let {courses,inquiries,teachers} = u
    let inq = inquiries.find(e=>e.id == id)
    let {title,response,inquiry,status,date,subjectID,sender} = inq
    let subject = courses.find(e=>e.id == subjectID).name
    let timg = 'https://i.pngimg.me/thumb/f/720/comvecteezy420303.jpg'
    let teacher = teachers.find(e=>e.id == sender)
    if(teacher){
        timg = teacher.img_url
    }
    date = setNum(date)
    function showAlert(){
        Alert.alert('Are you sure?','Do you really want to delete this inquiry?',[{text:'No'},{text:'Yes, delete',onPress:()=>{
            deleteFun(id);
            navigation.goBack()
        }}])
    }
    return(
        <View style={Style.page}>
        <LG_full/>
            <TopBar icon="chevron-back-outline" text={date} fun={()=>{navigation.goBack()}}/>
            <View style={{marginTop: 10}}>
                <Text style={styles.page_head}>{title}</Text>
                <Text style={{...styles.description,fontSize:RFValue(10),color:'grey',marginBottom:8}}>{`${date}, ${subject}`}</Text>
                <View style={{alignItems:'flex-start',justifyContent:'center'}}>
                    <Text style={{backgroundColor:status == 'pending'?Colors.yellow:Colors.green,borderRadius:5,paddingHorizontal:10,paddingVertical:1,fontSize:RFValue(11),color:status=='pending'?Colors.blck:Colors.white,fontFamily:'p5'}}>{status}</Text>
                </View>
                <View style={{flexDirection:'row',alignItems:'center',marginTop:RFValue(15)}}>
                    <Image source={{uri:img}} resizeMode="contain" style={{height:RFValue(35),borderRadius:30,marginRight:8,width:RFValue(35)}}/>
                    <Text style={styles.txt_wrap} selectable={true}>{inquiry}</Text>
                </View>
                {response !== '' && <View style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-end',marginTop:RFValue(15)}}>
                    <Text style={styles.txt_wrap} selectable={true}>{response}</Text>
                    <Image source={{uri:timg}} resizeMode="contain" style={{height:RFValue(35),borderRadius:30,marginLeft:8,width:RFValue(35)}}/>
                </View>}
                {status == 'pending' && 
                <View style={{height:RFValue(80),alignItems:'center',justifyContent:'center'}}>
                    <TouchableOpacity activeOpacity={.5} onPress={showAlert} style={{width:'80%'}}><Text style={{...Style.tiny_btn}}>Delete Inquiry</Text></TouchableOpacity>
                </View>}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    page_head:{fontSize: RFValue(16), maxWidth: '80%', fontFamily: 'p6', color: Colors.primary, marginBottom: -2},
    description:{color: Colors.textColor, marginBottom: 3, fontSize: RFValue(15)},
    status:{fontFamily: 'p5'},
    txt_wrap:{padding:10,borderRadius:10,backgroundColor:Colors.faded,maxWidth:'85%'}
})