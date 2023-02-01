import React, {useState, useEffect} from 'react'
import {View, Text, StyleSheet, TextInput,TouchableOpacity, KeyboardAvoidingView} from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import Colors from '../constants/Colors'
import IonIcon from 'react-native-vector-icons/Ionicons'
import Style from '../styles/Style'

export default function InputField(props){
    const {val, onChangeFun, multiline,nol, label, placeholder, password, name,iseye} = props
    const [focus, setFocus] = useState(false)
    const [value, setValue] = useState(val)
    const [eye,setEye] = useState(password ? true : false)
    const handleChange = (txt)=>{
        setValue(txt)
    }
    
    useEffect(()=>{
        onChangeFun(name, value)
    },[name, value, onChangeFun])
    return(
        <View style={styles.inpGrp}>
            {label && <Text style={{...Style.label, color: focus ? Colors.primary: Colors.textColor}}>{label}</Text>}
            <TextInput value={value} style={{...Style.input, borderColor: focus ? Colors.primary : '#e9e9e9',textAlignVertical: nol ? 'top' : 'center'}} onFocus={()=>setFocus(true)} onBlur={()=>setFocus(false)} onChangeText={handleChange} placeholder={placeholder} secureTextEntry={eye} multiline={multiline ? true : false} numberOfLines={nol ? nol : 1}/>
            {iseye && <TouchableOpacity activeOpacity={.5} onPress={()=>setEye(e=>!e)} style={{...styles.eye_wrap,top:label?RFValue(46):RFValue(28)}}><IonIcon name={!eye?'eye-outline':'eye-off-outline'} style={styles.toggle}/></TouchableOpacity>}
        </View>
    )
}

const styles = StyleSheet.create({
    inpGrp:{
        paddingVertical: RFValue(8),position:'relative'
    },
    
    eye_wrap:{position:'absolute',right:13},
    toggle:{fontSize:RFValue(20),color:'#a9a9a9',backgroundColor:'#eee'}
})