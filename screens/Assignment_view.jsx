import React from 'react'
import {View, Text, StyleSheet,Image} from 'react-native'
import Colors from '../constants/Colors'
import Style from '../styles/Style'
import TopBar from '../components/TopBar'
import { RFValue } from 'react-native-responsive-fontsize'
import { LG_full } from '../components/LG'
import { useSelector } from 'react-redux'
import { setNum } from '../database/functions'

export default function Assignment_view(props){
    const {navigation, route} = props
    const {id} = route.params
    let u = useSelector(state=>state.user)
    let{courses,teachers,assignments} = u
    let assn = assignments.find(e=>e.id == id)
    let {title,description,submissionDate,submitted,subjectID,createdOn} = assn
    let tchr = teachers.find(e=>e.subjects_allotted.includes(subjectID))
    let course = courses.find(e=>e.id == subjectID).name
    let timg = 'https://i.pngimg.me/thumb/f/720/comvecteezy420303.jpg'
    if(tchr){
        timg = tchr.img_url
    }
    return(
        <View style={Style.page}>
        <LG_full/>
            <TopBar icon="chevron-back-outline" text={title} fun={()=>{navigation.goBack()}}/>
            <View style={{marginTop: 10}}>
                <Text style={styles.page_head}>{title}</Text>
                <Text style={{...styles.description,fontSize:RFValue(11),color:'grey',marginBottom:0}}>{`${setNum(createdOn)}, ${course}`}</Text>
                <Text style={{...styles.description,fontSize:RFValue(11),color:'grey',marginBottom:8}}>{`Last Date: ${setNum(submissionDate)}, ${tchr.name}`}</Text>
                <View style={{alignItems:'flex-start',justifyContent:'center'}}>
                    <Text style={{backgroundColor:submitted == 'no'?Colors.yellow:Colors.green,borderRadius:5,paddingHorizontal:10,paddingVertical:1,fontSize:RFValue(11),color:submitted=='no'?Colors.blck:Colors.white,fontFamily:'p5'}}>{submitted == 'no'?'Not submitted yet' : `Submitted on ${submitted}`}</Text>
                </View>
                <View style={{flexDirection:'row',alignItems:'center',marginTop:RFValue(15)}}>
                    <Image source={{uri:timg}} resizeMode="contain" style={{height:RFValue(35),borderRadius:30,marginRight:8,width:RFValue(35)}}/>
                    <Text style={styles.txt_wrap}>{description}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    page_head:{fontSize: RFValue(17), maxWidth: '80%', fontFamily: 'p6', color: Colors.primary, marginBottom: -2},
    description:{color: Colors.textColor, marginBottom: 3, fontSize: RFValue(15)},
    status:{fontFamily: 'p5'},
    txt_wrap:{padding:10,borderRadius:10,backgroundColor:Colors.faded,maxWidth:'85%'}

})