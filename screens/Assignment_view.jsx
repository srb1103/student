import React, {useState} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import Colors from '../constants/Colors'
import Style from '../styles/Style'
import TopBar from '../components/TopBar'
import { RFValue } from 'react-native-responsive-fontsize'
import { LG_full } from '../components/LG'

export default function Assignment_view(props){
    const {navigation, route} = props
    const {sub, by,assn} = route.params
    let {createdOn,title,description,submissionDate,submitted} = assn
    return(
        <View style={Style.page}>
        <LG_full/>
            <TopBar icon="chevron-back-outline" text={title} fun={()=>{navigation.goBack()}}/>
            <View style={{marginTop: 10}}>
                <Text style={styles.page_head}>{title}</Text>
                <Text style={styles.description}>{description}</Text>
                <Text style={styles.description}>By: {by}</Text>
                <Text style={styles.description}>Subject: {sub}</Text>
                <Text style={styles.description}>Last Date: {submissionDate}</Text>
                <Text style={styles.description}>Status: <Text style={{...styles.status,color:submitted == 'no'?Colors.red:Colors.green}}>{submitted == 'no' ? 'Not submitted yet' : `Submitted on ${submitted}`}</Text></Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    page_head:{fontSize: RFValue(18), maxWidth: '80%', fontFamily: 'p6', color: Colors.primary, marginBottom: 5},
    description:{color: Colors.textColor, marginBottom: 3, fontSize: RFValue(15)},
    status:{fontFamily: 'p5'}
})