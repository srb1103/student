import React from 'react'
import {View,FlatList,StyleSheet,Image,Text,Linking, TouchableOpacity} from 'react-native'
import { useSelector } from 'react-redux'
import Style from '../styles/Style'
import { LG_full } from '../components/LG'
import TopBar from '../components/TopBar'
import Colors from '../constants/Colors'
import { RFValue } from 'react-native-responsive-fontsize'
import IonIcon from 'react-native-vector-icons/Ionicons'

export default function Faculty(props){
    let {navigation} = props
    let user = useSelector(state=>state.user)
    let {teachers} = user
    function handleClick(type,source){
        if(type == 'mail'){
            Linking.openURL(`mailto:${source}`);

        }else if (type == 'call'){
            Linking.openURL(`tel:+91${source}`)
        }
    }
    function renderTeacher(teacher){
        let {item,index} = teacher
        let ln = teachers.length-1
        let {category,email,img_url,name,phone} = item
        return(
            <View style={{...styles.fac_wrap,borderBottomWidth:index==ln?0:1}}>
                <View style={styles.facImg_wrap}>
                    <Image source={{uri:img_url}} style={styles.fac_img}/>
                </View>
                <View style={styles.facDet_wrap}>
                    <Text style={styles.fac_name}>{name}</Text>
                    <Text style={styles.fac_txt}>{category}</Text>
                    <View style={styles.fcdet_sakd}></View>
                    <TouchableOpacity style={styles.fac_txt_ico} activeOpacity={.5} onPress={()=>handleClick('call',phone)}>
                        <View style={styles.fac_txt_ico_wrap}>
                            <IonIcon name="call" style={styles.fac_ico}></IonIcon>
                        </View>
                        <Text style={styles.fac_itxt}>{phone}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.fac_txt_ico} activeOpacity={.5} onPress={()=>handleClick('mail',email)}>
                        <View style={styles.fac_txt_ico_wrap}>
                            <IonIcon name="mail" style={styles.fac_ico}></IonIcon>
                        </View>
                        <Text style={styles.fac_itxt}>{email}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    return (
        <View style={{...Style.page}}>
            <LG_full/>
            <TopBar icon="chevron-back-outline" text='Faculty' fun={()=>{navigation.goBack()}}/>
            <View style={{...Style.ai_screen,justifyContent:'flex-start'}}>
                <FlatList data={teachers} keyExtractor={(item,index)=>index.toString()} showsVerticalScrollIndicator={false} overScrollMode='never' renderItem={renderTeacher}/>
            </View>
        </View>
    )
}

let styles = StyleSheet.create({
    fac_wrap:{flex:1,margin:3,borderRadius:10,overflow:'hidden',flexDirection:'row',minHeight:RFValue(100),borderBottomWidth:0,borderBottomColor:Colors.white,padding:7},
    facImg_wrap:{alignItems:'center',justifyContent:'center',height:RFValue(90),width:RFValue(90),borderRadius:RFValue(100),overflow:'hidden'},
    fac_img:{resizeMode:'cover',height:'100%',width:'100%',borderRadius:RFValue(100)},
    facDet_wrap:{padding:10,width:'70%',paddingLeft:15},
    fac_name:{fontSize: RFValue(15),color: Colors.primary,fontFamily: 'p6',marginBottom:-4},
    fac_txt:{fontSize: RFValue(12),color: Colors.textColor,opacity:.5,marginBottom:2},
    fac_itxt:{color:Colors.textColor,fontSize:RFValue(12)},
    fac_ico:{color:Colors.white,fontSize:RFValue(7)},
    ksfj:{height:RFValue(35),width:RFValue(45),backgroundColor:Colors.primary,alignItems:'center',justifyContent:'center',borderRadius:5,marginRight:5},
    fac_txt_ico:{flexDirection:'row',justifyContent:"flex-start",alignItems:'center',marginTop:2},
    fac_txt_ico_wrap:{height:RFValue(13),width:RFValue(13),borderRadius:5,backgroundColor:Colors.textColor,alignItems:'center',justifyContent:'center',marginRight:2}

})