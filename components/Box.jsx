import React from 'react'
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native'
import Colors from '../constants/Colors'
import { RFValue } from 'react-native-responsive-fontsize'
import IonIcon from 'react-native-vector-icons/Ionicons'
import * as Animatable from 'react-native-animatable'
import LG_relative from './LG-relative'
import { MotiView } from 'moti'
const grow = {
    0:{opacity:0,scale:0},
    1:{opacity:1,scale:1},
}
const fadeIn = {
    0:{opacity:0},
    1:{opacity:1},
}
export default function Box(props){
    const {text,icon,left,right,fun,delay,width} = props
    return(
        <TouchableOpacity activeOpacity={.7} style={{width:width?width:'25%'}} onPress={fun}>
            <Animatable.View useNativeDriver animation={grow} style={{...styles.box,marginLeft:left?0:RFValue(4),marginRight:right?0:RFValue(4)}} delay={delay ? delay*50 : 0} duration={500}>
                <IonIcon name={icon} style={styles.icon}/>
                <Text style={styles.txt}>{text}</Text>
            </Animatable.View>
        </TouchableOpacity>
    )
}
export function LongBox(props){
    const {heading,text,fun,icon,head1,colors,lg,txt2} = props
    return(
        <TouchableOpacity activeOpacity={.7} onPress={fun} style={{marginBottom:8,overflow:'hidden',borderRadius:15,backgroundColor:Colors.faded,position:'relative'}}>
            <MotiView from={{opacity:0,marginRight:-100}} animate={{opacity:1,marginRight:0}} transition={{type:'timing'}}>
                <View style={{...styles.long_box,justifyContent: !head1 || !icon ? 'space-between' : 'space-around'}} animation={fadeIn} duration={1000}>
                    {icon && <IonIcon name={icon} style={styles.lb_icon}/>}
                    {head1 && <Text style={styles.lb_icon}>{head1}</Text>}
                    <View style={{width:'80%'}}>
                        <Text style={styles.lb_heading}>{heading}</Text>
                        {text && <Text style={styles.lb_text}>{text}</Text>}
                        {txt2 && <Text style={{...styles.lb_text,fontSize:RFValue(8)}}>{txt2}</Text>}
                    </View>
                    {fun && <IonIcon name="chevron-forward" style={styles.lb_icon1}/>}
                    {lg && <LG_relative colors={colors}/>}
                </View>
            </MotiView>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    box:{alignItems:'center',justifyContent:'center',backgroundColor:Colors.faded,borderRadius:15,paddingVertical:15,margin:RFValue(4)},
    txt:{color:Colors.blck,fontSize:RFValue(9),marginTop:3},
    icon:{fontSize:RFValue(30),color:Colors.blck},
    long_box:{padding:15,flexDirection:'row',alignItems:'center',justifyContent:'space-around',borderRadius:15,height:RFValue(80),position:'relative',overflow:'hidden'},
    lb_heading:{fontSize:RFValue(15),fontFamily:'p6',lineHeight:RFValue(18),color:Colors.blck},
    lb_icon:{fontSize:RFValue(22),color:Colors.blck,width:'10%',textAlign:'left'},
    lb_text:{color:Colors.grey,fontSize:RFValue(10)},
    lb_icon1:{color:Colors.grey,fontSize:RFValue(18),width:'5%',textAlign:'right'}
})