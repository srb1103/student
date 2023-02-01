import {View, ActivityIndicator} from 'react-native'
import ReduxThunk from 'redux-thunk'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers} from 'redux'
import user from './store/reducer'
// import Login from './screens/Login';
import NavBar from './screens/NavBar';
import Home from './screens/Home'
import MainNav from './navigation/Navigation';
import { useFonts, Poppins_300Light, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold, Poppins_800ExtraBold } from "@expo-google-fonts/poppins";
import Style from './styles/Style';
import Colors from './constants/Colors';
import { createTable } from './database/sql';

createTable().then(()=>{console.log('table created')}).catch((err)=>console.log('error'))
const rootReducer = combineReducers({
  user: user
})
const store = createStore(rootReducer, applyMiddleware(ReduxThunk))
export default function App() {
  let [fontsLoaded] = useFonts({
    p3: Poppins_300Light,
    p4: Poppins_400Regular,
    p5: Poppins_500Medium,
    p6: Poppins_600SemiBold,
    p7: Poppins_700Bold,
    p8: Poppins_800ExtraBold,
  });
  if(!fontsLoaded){
    return(
      <View style={Style.screen}>
        <ActivityIndicator color={Colors.primary} size="large"/>
      </View>
    )
  }
  return (
    <Provider store={store}>
      <MainNav/>
    </Provider>
  );
}


