import React,{useEffect,useState} from 'react'
import{ActivityIndicator,Text,View,StatusBar} from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import Home from '../screens/Home'
import Results from '../screens/Results_home'
import Result from '../screens/Results'
import TimeTable from '../screens/Timetable_home'
import Profile from '../screens/Profile'
import Assignments from '../screens/Assignments_home'
import Assignment_view from '../screens/Assignment_view'
import NavBar from '../screens/NavBar'
import Notifications_home from '../screens/Notifications_home'
import Notification from '../screens/Notification'
import Attendance_home from '../screens/Attendance_home'
import Attendance from '../screens/Attendance'
import Attendance_semester from '../screens/Attendance_semester'
import Courses_home from '../screens/Courses'
import Course from '../screens/Course'
import { useDispatch, useSelector } from 'react-redux'
import { createTable, findUserID } from '../database/sql'
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import Login from '../screens/Login'
import { usrCr } from '../database/firebase-config'
import { LG_full } from '../components/LG'
import Colors from '../constants/Colors'
import { setUserAction } from '../store/action'
import Result_session from '../screens/Result_session'
import ChangePassword from '../screens/Change_password'
import Leave_home from '../screens/Leave_home'
import App_form from '../screens/Application_form'
import Application from '../screens/Application'
import { RFValue } from 'react-native-responsive-fontsize'
import HW_home from '../screens/HW_home'
import HW_view from '../screens/HW_view'
import Loader from '../components/Loading'
import Inq_form from '../screens/Inquiry_form'
import Inquiry from '../screens/Inquiry'
import Inquiry_home from '../screens/Inquiries'

const HomeStack = createStackNavigator()
const ResultStack = createStackNavigator()
const AMStack = createStackNavigator()
const AttendanceStack = createStackNavigator()
const ProfileStack = createStackNavigator()
const HWStack = createStackNavigator()
const InqStack = createStackNavigator()
const DrawerStack = createDrawerNavigator()

const HomeNav = ()=>(
    <HomeStack.Navigator
        screenOptions={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}>
        <HomeStack.Screen name="home" component={Home} options={()=>({headerShown: false})}/>
        <HomeStack.Screen name="notes" component={Notifications_home} options={()=>({headerShown: false})}/>
        <HomeStack.Screen name="notification" component={Notification} options={()=>({headerShown: false})}/>
        <HomeStack.Screen name="courses" component={Courses_home} options={()=>({headerShown: false})}/>
        <HomeStack.Screen name="course_view" component={Course} options={()=>({headerShown: false})}/>
        <HomeStack.Screen name="tt_main" component={TimeTable} options={()=>({headerShown: false})}/>

    </HomeStack.Navigator>
)
const HWNav = ()=>(
    <HWStack.Navigator
        screenOptions={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}>
        <HWStack.Screen name="hw_home" component={HW_home} options={()=>({headerShown: false})}/>
        <HWStack.Screen name="hw_view" component={HW_view} options={()=>({headerShown: false})}/>
    </HWStack.Navigator>
)
const ResultsNav = ()=>(
    <ResultStack.Navigator
        screenOptions={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}>
        <ResultStack.Screen name="results" component={Results} options={()=>({headerShown: false})}/>
        <ResultStack.Screen name="result-session" component={Result_session} options={()=>({headerShown: false})}/>
        <ResultStack.Screen name="result" component={Result} options={()=>({headerShown: false})}/>
    </ResultStack.Navigator>
)
const Attendance_nav = ()=>(
    <AttendanceStack.Navigator
        screenOptions={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}>
        <AttendanceStack.Screen name="attendance_home" component={Attendance_home} options={()=>({headerShown: false})}/>
        <AttendanceStack.Screen name="attendance_semester" component={Attendance_semester} options={()=>({headerShown: false})}/>
        <AttendanceStack.Screen name="attendance_view" component={Attendance} options={()=>({headerShown: false})}/>
    </AttendanceStack.Navigator>
)
const AMNav = ()=>(
    <AMStack.Navigator
        screenOptions={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}>
        <AMStack.Screen name="assignments" component={Assignments} options={()=>({headerShown: false})}/>
        <AMStack.Screen name="assignment_view" component={Assignment_view} options={()=>({headerShown: false})}/>
    </AMStack.Navigator>
)
const ProfNav = ()=>(
    <ProfileStack.Navigator
        screenOptions={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}>
        <ProfileStack.Screen name='profile_main' component={Profile} options={()=>({headerShown:false})}/>
        <ProfileStack.Screen name='change_password' component={ChangePassword} options={()=>({headerShown:false})}/>
        <ProfileStack.Screen name='applications' component={Leave_home} options={()=>({headerShown:false})}/>
        <ProfileStack.Screen name='application' component={Application} options={()=>({headerShown:false})}/>
        <ProfileStack.Screen name='app_form' component={App_form} options={()=>({headerShown:false})}/>
    </ProfileStack.Navigator>
)
const InqNav = ()=>(
    <InqStack.Navigator
        screenOptions={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}>
        <InqStack.Screen name='inquiries' component={Inquiry_home} options={()=>({headerShown:false})}/>
        <InqStack.Screen name='inquiry' component={Inquiry} options={()=>({headerShown:false})}/>
        <InqStack.Screen name='inq_form' component={Inq_form} options={()=>({headerShown:false})}/>
    </InqStack.Navigator>
)

function Nav(){
    return(
        <DrawerStack.Navigator drawerContent={props => <NavBar {...props}/>}>
            <DrawerStack.Screen name="homepage" component={HomeNav} options={()=>({headerShown: false})}/>
            <DrawerStack.Screen name="res" component={ResultsNav} options={()=>({headerShown:false})}/>
            <DrawerStack.Screen name="assign" component={AMNav} options={()=>({headerShown:false})}/>
            <DrawerStack.Screen name="attendance" component={Attendance_nav} options={()=>({headerShown:false})}/>
            <DrawerStack.Screen name="profile" component={ProfNav} options={()=>({headerShown:false})}/>
            <DrawerStack.Screen name="homework" component={HWNav} options={()=>({headerShown:false})}/>
            <DrawerStack.Screen name="inq" component={InqNav} options={()=>({headerShown:false})}/>
        </DrawerStack.Navigator>
    )
}
export default function MainNav(){
    let [loading,setLoading] = useState(true)
    let {Email,Password} = usrCr
    let auth = getAuth()
    const authenticate = async ()=>{
        await signInWithEmailAndPassword(auth, Email, Password)
    }
    let dispatch = useDispatch()
    const update = (data)=>{
        dispatch(setUserAction(data)).then(()=>setLoading(false)).catch(err=>console.log(err))
    }
    const check_user = async ()=>{
        try{
            let uid = await findUserID()
            auth.onAuthStateChanged(user=>{
                if(!user){
                    authenticate();
                }
            })
            if(uid.rows.length > 0){
                let data = uid.rows._array[0]
                if(data.userID){
                    let id = data.userID
                    data.id = id
                    data.img_url = data.img
                    update(data)
                }
            }else{setLoading(false);console.log('empty sql')}
        }catch(err){console.log(err);setLoading(false)}
    }
    const UID = useSelector(state=>state.user.user_detail.id)
    useEffect(()=>{
        check_user();
    },[])
    if(loading){
        return <Loader/>
    }
    return (
        <NavigationContainer>
            {UID ? <Nav/> : <Login/>}
        </NavigationContainer>
    )
}