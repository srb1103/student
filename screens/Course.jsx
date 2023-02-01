import React from 'react'
import {View, Text, StyleSheet, TextBase, FlatList} from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import TopBar from '../components/TopBar'
import Colors from '../constants/Colors'
import Style from '../styles/Style'
import { LG_full } from '../components/LG'
import { LongBox } from '../components/Box'
import { useSelector } from 'react-redux'

export default function Course(props){
    const {navigation, route} = props
    let user = useSelector(state=>state.user)
    let {attendance} = user
    let {subject,home} = route.params
    let {id,name,topics} = subject
    let state = {
        completed: topics.filter(e=>e.status == 'complete'),
        pending: topics.filter(e=>e.status == 'pending'),
        current: topics.find(e=>e.status == 'current'),
    }
    let next = null
    state.pending.forEach((e,i)=>{
        if(i == 0){next = e}
    })
    let attn = attendance.filter(e=>e.subject == id)
    let pr = attn.filter(e=>e.status == 'present')
    let attn_percent = Math.floor((pr.length/attn.length)*100)
    let percent = Math.floor((state.completed.length/topics.length)*100)
    let renderTopic = (item)=>{
        let topic = item.item
        let index = item.index
        let l = topics.length
        return(
            <View style={{marginLeft:index == 0?15:0,marginRight:index == (l-1) ? 15 : 6,width:260}}>
                <LongBox icon="document-text" heading={topic.name} text={`Completed on: ${topic.date}`}/>
            </View>
        )
    }
    return(
        <View style={{...Style.page,paddingHorizontal:0}}>
            <LG_full/>
            <View style={{paddingHorizontal:15}}>
                <TopBar icon="chevron-back-outline" text={name} fun={()=>{home ? navigation.navigate('homepage'): navigation.navigate('courses',{screen:'course'})}}/>
                <View style={{marginTop: 10}}/>
                <View style={styles.course_stats}>
                    <View style={styles.course_stat}>
                        <Text style={styles.cs_label}>Attendance</Text>
                        <Text style={styles.cs_ans}>{`${attn_percent}%`}</Text>
                    </View>
                    <View style={styles.course_stat}>
                        <Text style={styles.cs_label}>Course Completed</Text>
                        <Text style={styles.cs_ans}>{`${percent}%`}</Text>
                    </View>
                </View>
                {state.current && <View style={styles.cc_view}>
                    <Text style={styles.cc_name}>Current Topic</Text>
                    <LongBox icon="document-text-outline" heading={state.current.name} text={`Started on: 25/05/2022`}/>
                </View>}
                {next && <View style={styles.cc_view}>
                    <Text style={styles.cc_name}>Next Topic</Text>
                    <LongBox icon="document-text-outline" heading={next.name}/>
                </View>}
                <View style={styles.cc_view}>
                    <Text style={styles.cc_name}>Completed Topics</Text>
                </View>
            </View>
            <FlatList data={state.completed} horizontal showsHorizontalScrollIndicator={false} overScrollMode='never' keyExtractor={(item,index)=>index.toString()} renderItem={renderTopic}/>
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