import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import Colors from '../constants/Colors'
import IonIcon from 'react-native-vector-icons/Ionicons'
import { RFValue } from 'react-native-responsive-fontsize'

export default function NavItem(props) {
    const {icon, text, fun} = props
    return (
        <TouchableOpacity style={styles.navList} activeOpacity={.7} onPress={fun}>
           <View style={styles.navLeft}>
                <IonIcon name={icon} style={[styles.navText, styles.nl_icon]}></IonIcon>
                <Text style={styles.navText}>{text}</Text>
            </View>
            <IonIcon name="chevron-forward-outline" color={Colors.textColor} style={styles.navText}></IonIcon>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    navList:{
        paddingVertical: 17,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#F5F5F5'
    },
    navLeft:{
        flexDirection: 'row'
    },
    navText:{
        color: '#767676',
        fontSize: RFValue(14),
        fontFamily: 'p5'
    },
    nl_icon:{
        marginTop: 2,
        marginRight: 7,
        fontSize: RFValue(14),
        color: Colors.primary
    }
})
