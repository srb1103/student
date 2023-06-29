import React from 'react'
import {View, Text, StyleSheet, TextBase, FlatList} from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import TopBar from '../components/TopBar'
import Colors from '../constants/Colors'
import Style from '../styles/Style'
import { LG_full } from '../components/LG'
import { LongBox } from '../components/Box'
import { setNum } from '../database/functions'

export default function Chapter(props){
    const {navigation, route} = props
    let {topics,chapter_name} = route.params
    function renderTopic(itm){
        let {index,item} = itm
        let {count,name,status} = item
        let str_string = status == 'complete'?`Completed on ${setNum(item.date)}` : status
        return <LongBox icon="document-text" heading={`${count}. ${name}`} text={str_string}/>
    }
    return(
        <View style={{...Style.page,paddingHorizontal:0}}>
            <LG_full/>
            <View style={{paddingHorizontal:15}}>
                <TopBar icon="chevron-back-outline" text="Topics" txt2={chapter_name} fun={()=>{home ? navigation.navigate('homepage'): navigation.navigate('courses',{screen:'course'})}}/>
                <FlatList data={topics} showsVerticalScrollIndicator={false} overScrollMode='never' keyExtractor={(item,index)=>index.toString()} renderItem={renderTopic}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    course_name:{fontSize: RFValue(16), fontFamily: 'p6', color: Colors.primary, textAlign: 'center', marginBottom: 10},
    course_stats:{flexDirection: 'row', paddingVertical: 5, alignItems:'center', justifyContent:'space-between'},
    course_stat:{padding: 15, backgroundColor: Colors.faded, borderRadius: RFValue(15), width: '48%', margin: 3},
    cs_label:{color: '#939393'},
    cs_ans:{fontSize: RFValue(30), color: Colors.primary, fontFamily: 'p6'},
    cc_view:{marginTop: 15},
    cc_name:{fontFamily: 'p5', fontSize: RFValue(14), color: Colors.blck, marginBottom: 2, marginLeft: 10},
    cc_topic:{fontFamily: 'p6', fontSize: RFValue(14), color: Colors.primary},
    cs_label:{color: '#939393', fontSize: RFValue(11)}
})