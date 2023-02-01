import { RFValue } from 'react-native-responsive-fontsize'
import Colors from '../constants/Colors'
export default {
    screen:{
        flex: 1,
        backgroundColor: Colors.bg,
        textAlign:'center',
        justifyContent: 'center'
    },
    page:{
        flex: 1,
        backgroundColor: Colors.grad1,
        padding: 20
    },
    page1:{flex:1,backgroundColor:Colors.grad1},
    heading:{
        color: Colors.textColor,
        fontSize: RFValue(25),
        textAlign: 'center',
        // fontWeight: 'bold'
    },
    ai_screen:{flex:1,alignItems:'center',justifyContent:'center'},
    homeBtns_wrap:{
        flexDirection: 'row',
        marginTop: 20,
        backgroundColor: Colors.faded,
        borderRadius: 15,
        overflow: 'hidden'
      },
      btn:{
        paddingVertical: 12,
        borderRadius: 15,
        width: '50%',
      },
      btn_text:{
        fontFamily: 'p5',
        textAlign:'center'
      },
      line:{height:1,marginVertical:5,backgroundColor:'#e9e9e9'},
      form_btn:{
        color: Colors.white,
        fontSize: RFValue(18),backgroundColor:Colors.blck,padding:RFValue(17),borderRadius:15,width:'100%',textAlign:'center',fontFamily:'p5'
    },
    tiny_btn:{backgroundColor:Colors.blck,color:Colors.white,paddingVertical:10,paddingHorizontal:20,borderRadius:12,fontFamily:'p6',marginTop:5,textAlign:'center'},
    form_btn1:{color: Colors.white,fontSize: RFValue(18),backgroundColor:Colors.blck,padding:RFValue(17),borderRadius:20,width:'100%',textAlign:'center',fontFamily:'p5'},
    label:{
        marginBottom: 5,
        fontSize: RFValue(12),
        marginLeft: 5
    },
    input:{
        padding: RFValue(16),
        color: Colors.primary,
        fontSize: RFValue(15),
        backgroundColor: '#eee',
        borderRadius: 15,
        borderWidth: 1
    },
}