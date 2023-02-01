import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Dimensions} from 'react-native'
import IonIcon from 'react-native-vector-icons/Ionicons'
import Colors from '../constants/Colors'
import { RFValue } from 'react-native-responsive-fontsize'
import NavItem from '../components/NavItem'
import { useSelector } from 'react-redux'

let {width} = Dimensions.get('window')
export default function NavBar(props) {
    const {navigation} = props
    let user = useSelector(state=>state.user)
    let {img} = user.user_detail
    return (
        <View style={styles.container}>
            <View style={styles.topDiv}>
                <Image source={require('../assets/logo.png')} style={styles.logo}/>
                <Image source={{uri:img}} style={styles.profile_img} resizeMode="cover"/>
                <Text style={styles.studentName}>Himalayan Institute of Digital Arts</Text>
            </View>
            <ScrollView overScrollMode='never'>
                <NavItem icon="home" text="Home" fun={()=>{navigation.navigate('homepage',{screen:'home'})}}/>
                <NavItem icon="bar-chart" text="Results" fun={()=>{navigation.navigate('res')}}/>
                <NavItem icon="newspaper" text="Assignments" fun={()=>{navigation.navigate('assign')}}/>
                <NavItem icon="time" text="Time Table" fun={()=>{navigation.navigate('homepage',{screen:'tt_main'})}}/>
                <NavItem icon="person" text="Profile" fun={()=>{navigation.navigate('profile')}}/>
                <NavItem icon="book" text="Courses" fun={()=>{navigation.navigate('homepage',{screen:'courses'})}}/>
                <NavItem icon="document-text" text="Homework" fun={()=>{navigation.navigate('homework')}}/>
                <NavItem icon="information-circle" text="Inquiry" fun={()=>{navigation.navigate('inq')}}/>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{flex: 1},
    topDiv:{
        backgroundColor: Colors.primary,
        padding: 40,
        alignItems:'center',
        justifyContent:'center',
        height: RFValue(220),
        marginBottom: 30,position:'relative',overflow:'hidden'
    },
    logo:{height:RFValue(60),resizeMode:'contain',marginTop:RFValue(40)},
    studentName:{color: Colors.white,fontSize: RFValue(14),textAlign:'center',marginTop:5,fontFamily:'p6',lineHeight:RFValue(17)},
    profile_img:{position:'absolute',top:0,left:0,height:'180%',width:'150%',zIndex:-1,opacity:.2}
    
})
