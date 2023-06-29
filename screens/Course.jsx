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
    let {id,name,chapters} = subject
    let state = {
        // completed: topics.filter(e=>e.status == 'complete'),
        // pending: topics.filter(e=>e.status == 'pending'),
        // current: topics.find(e=>e.status == 'current'),
    }
    // let next = null
    // state.pending.forEach((e,i)=>{
    //     if(i == 0){next = e}
    // })
    let attn = attendance.filter(e=>e.subject == id)
    let pr = attn.filter(e=>e.status == 'present')
    let attn_percent = Math.floor((pr.length/attn.length)*100)
    let tops = []
    chapters.forEach(c=>{
        let {topics} = c
            topics.forEach(t=>{
                let {id,status} = t
                let ind = tops.findIndex(e=>e.id == id)
                if(ind < 0){tops.push({id,status})}
            })
    })
    let ttl_topics = tops.length
    let complete = 0
    tops.forEach(t=>{
        let {status} = t
        if(status == 'complete'){
            complete += 1
        }
    })
    let progress = ttl_topics > 0 ? Math.round((complete/ttl_topics)*100) : 0
    if(isNaN(attn_percent)){
        attn_percent = '0'
    }
    if(isNaN(progress)){
        progress = '0'
    }
    let renderChapter = (item)=>{
        let itm = item.item
        let {count,name,topics} = itm
        let ttl = topics.length
        let str = ttl == 1 ? 'topic': 'topics'
        let c = topics.filter(e=>e.status === 'complete').length
        let progress = ttl > 0 ? Math.floor((c/ttl)*100) : 0
        return <LongBox icon="document-text" heading={`${count}. ${name}`} text={`${ttl} ${str}`} txt2={`${progress}% complete`} fun={()=>navigation.navigate('chapter',{topics,chapter_name:name})}/>
    }
    return(
        <View style={{...Style.page,paddingHorizontal:0}}>
            <LG_full/>
            <View style={{paddingHorizontal:15}}>
                <TopBar icon="chevron-back-outline" text="Course Content" txt2={name} fun={()=>{home ? navigation.navigate('homepage'): navigation.navigate('courses',{screen:'course'})}}/>
                <View style={{marginTop: 10}}/>
                <View style={styles.course_stats}>
                    <View style={styles.course_stat}>
                        <Text style={styles.cs_label}>Attendance</Text>
                        <Text style={styles.cs_ans}>{`${attn_percent}%`}</Text>
                    </View>
                    <View style={styles.course_stat}>
                        <Text style={styles.cs_label}>Course Completed</Text>
                        <Text style={styles.cs_ans}>{`${progress}%`}</Text>
                    </View>
                </View>
                <View style={{height:10}}/>
                <Text style={Style.btn_text}>Chapters in the Course</Text>
                <View style={{height:5}}/>
                <FlatList data={chapters} showsVerticalScrollIndicator={false} overScrollMode='never' keyExtractor={(item,index)=>index.toString()} renderItem={renderChapter}/>
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