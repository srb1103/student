import { DELETE_APPLICATION, LOGOUT, NEW_APPLICATION, SET_USER, UPDATE_IMG,SET_DATA,NEW_INQUIRY,DELETE_INQUIRY,SET_RESPONSE,ADD_ASSIGNMENT,ADD_NOTIF, ADD_HOMEWORK, SET_APPRES } from "./action"

let initialState = {
    user_detail:{
        id:'',
        name:'',
        admissionNo:'',
        rollNo:'',
        instituteID:'',
        classId:'',
        address:'',
        phone:'',
        email:'',
        guardian:'',
        img:'',
    },
    class_name:'',
    attendance:[],
    results:[],
    notifications:[],
    timetable:[],
    courses:[],
    teachers:[],
    assignments:[],
    applications:[],
    iType:'',
    iToken:null,
    session:{id:'',name:''},
    iSessions:[],
    homework:[],
    inquiries:[]
}

export default (state=initialState,action)=>{
    switch (action.type){
        case SET_USER:
            let {id,name,phone,email,guardian,instituteID,address,classId,img_url,rollNo,admissionNo} = action.user
            let user = {id,name,admissionNo,rollNo,instituteID,classId,address,phone,email,guardian,img:img_url}
            let {itype,session,sessions,iToken} = action
            let obj = {id:session.id,name:session.title}
            return{...state,user_detail:user,session:obj,iType:itype,iSessions:sessions,iToken}
        case SET_DATA:
            user = state.user_detail
            rollNo = user.rollNo
            let {class_name,subjects,assn,teachers,periods,announcements,attendance,results,applications,homework,inquiries} = action
            let attn_array = []
            let res_array = []
            let apps = []
            let inqs = []
            applications.forEach(a=>{
                let {id,subject,message,status,date,application} = a
                let obj = {id,subject,message,status,date,application}
                apps.push(obj)
            })
            inquiries.forEach(a=>{
                let {id,title,inquiry,response,date,subjectID,status,sender} = a
                let obj = {id,title,inquiry,response,date,subjectID,status,sender}
                inqs.push(obj)
            })
            attendance.forEach(a=>{
                let {date,attendance,classID} = a
                let l = subjects.filter(e=>e.id == classID)
                if(l.length>0){
                    let at = JSON.parse(attendance)
                    let st = at.find(e=>e.rollNo == rollNo)
                    let status = 'absent'
                    if(st){status = st.attendance}
                    let obj = {date,status,subject:classID}
                    attn_array.push(obj)
                }
            })
            results.forEach(a=>{
                let {date,examDate,marksType,maxMarks,session,subjectID,title,type,result} = a
                let l = subjects.filter(e=>e.id == subjectID)
                if(l.length>0 && result){
                    let at = JSON.parse(result)
                    let st = at.find(e=>e.rollNo == rollNo)
                    let marks = 'absent'
                    if(st){marks = st.marks}
                    let obj = {date,examDate,marksType,maxMarks,session,subjectID,title,type,marks}
                    res_array.push(obj)
                }
            })
            return{...state,class_name,courses:subjects,assignments:assn,teachers,timetable:periods,notifications:announcements,attendance:attn_array,results:res_array,applications:apps,homework,inquiries:inqs}
        case UPDATE_IMG:
            let url = action.url
            user = state.user_detail
            user.img = url
            return{...state,user_detail:user}
        case LOGOUT:
            return{
                user_detail:{
                    id:'',
                    name:'',
                    admissionNo:'',
                    rollNo:'',
                    instituteID:'',
                    classId:'',
                    address:'',
                    phone:'',
                    email:'',
                    guardian:'',
                    img:'',
                },
                class_name:'',
                attendance:[],
                results:[],
                notifications:[],
                timetable:[],
                courses:[],
                teachers:[],
                assignments:[]
            }
        case DELETE_APPLICATION:
            id = action.id
            let app_list = state.applications.filter(e=>e.id !== id)
            return{...state,applications:app_list}
        case NEW_APPLICATION:
            app_list = state.applications
            let appl = action.data
            app_list = app_list.concat(appl)
            return{...state,applications:app_list}
        case DELETE_INQUIRY:
            id = action.id
            app_list = state.inquiries.filter(e=>e.id !== id)
            return{...state,inquiries:app_list}
        case NEW_INQUIRY:
            app_list = state.inquiries
            appl = action.data
            app_list = app_list.concat(appl)
            return{...state,inquiries:app_list}
        case ADD_NOTIF:
            let notif = action.data
            let notifs = state.notifications
            let isThere = notifs.find(e=>e.id == notif.id)
            if(!isThere){
                notifs = notifs.concat(notif)
            }
            return{...state,notifications:notifs}
        case ADD_ASSIGNMENT:
            notif = action.data
            notifs = state.assignments
            isThere = notifs.find(e=>e.id == notif.id)
            if(!isThere){
                notifs = notifs.concat(notif)
            }
            return{...state,assignments:notifs}
        case ADD_HOMEWORK:
            notif = action.data
            notifs = state.homework
            isThere = notifs.find(e=>e.id == notif.id)
            if(!isThere){
                notifs = notifs.concat(notif)
            }
            return{...state,homework:notifs}
        case SET_RESPONSE:
            let res = action.data
            id = res.id
            let {message} = res
            app_list = state.inquiries
            let ind = app_list.findIndex(e=>e.id == id)
            app_list[ind].response = message
            app_list[ind].status = 'responded'
            return{...state,inquiries:app_list}
        case SET_APPRES:
            res = action.data
            app_list = state.applications
            let {status} = res
            message = res.message
            id = res.id
            ind = app_list.findIndex(e=>e.id == id)
            app_list[ind].messsage = message
            app_list[ind].status = status
            return {...state,applications:app_list}
    }
    return state
}