export const SET_USER = 'SET_USER'
export const UPDATE_IMG = 'UPDATE_IMG'
export const LOGOUT = 'LOGOUT'
export const DELETE_APPLICATION = 'DELETE_APPLICATION'
export const NEW_APPLICATION = 'NEW_APPLICATION'
export const DELETE_INQUIRY = 'DELETE_INQUIRY'
export const NEW_INQUIRY = 'NEW_INQUIRY'
export const SET_DATA = 'SET_DATA'
export const ADD_NOTIF = 'ADD_NOTIF'
export const ADD_ASSIGNMENT = 'ADD_ASSIGNMENT'
export const SET_RESPONSE = 'SET_RESPONSE'
export const SET_APPRES = 'SET_APPRES'
export const ADD_HOMEWORK = 'ADD_HOMEWORK'
import { fetch_data } from "../database/functions"

export const setUserAction = (user)=>{
    return async dispatch=>{
        try{
            let iid = user.instituteID
            let institutions = await fetch_data('institutions')
            let sessions = await fetch_data('sessions')
            let it = institutions.find(e=>e.iid == iid)
            let sesID = it.sessionID
            let type = it.type
            let iToken = it.pushToken
            let s = sessions.filter(e=>e.instituteID == iid)
            let session = sessions.find(e=>e.id == sesID && e.instituteID == iid)
            dispatch({type:SET_USER,user,itype:type,session,sessions:s,iToken})
        }catch(err){console.log(err)}
    }
}
export const setUserData = (iid,clsID,sesID,userID)=>{
    return async dispatch=>{
        try{
            let all_classes = await fetch_data('classes')
            let subjects = await fetch_data('subjects')
            let assignments = await fetch_data('assignments')
            let attendance = await fetch_data('attendance')
            let results = await fetch_data('results')
            let chapters = await fetch_data('chapters')
            let topics = await fetch_data('topics')
            let teachers = await fetch_data('teachers')
            let timetable = await fetch_data('timetable')
            let applications = await fetch_data('applications')
            let homework = await fetch_data('homework')
            let inquiries = await fetch_data('inquiries')
            let ann_a = await fetch_data('admin-announcements')
            let ann_t = await fetch_data('teacher-announcements')
            teachers = teachers.filter(e=>e.instituteID == iid)
            applications = applications.filter(e=>e.instituteID == iid && e.session == sesID && e.studentID == userID)
            attendance = attendance.filter(e=>e.instituteID == iid && e.session == sesID)
            homework = homework.filter(e=>e.instituteID == iid && e.session == sesID)
            inquiries = inquiries.filter(e=>e.instituteID == iid && e.session == sesID)
            results = results.filter(e=>e.instituteID == iid)
            let announcements = []
            ann_a = ann_a.filter(e=>e.instituteID == iid && e.session == sesID && (e.to == 'Students' || e.to == 'Everyone'))
            ann_a.forEach(a=>{
                let obj = {text:a.text,title:a.title,date:a.date,by:'Admin'}
                announcements.push(obj)
            })
            ann_t = ann_t.filter(e=>e.instituteID == iid && e.session == sesID && e.classes.includes(clsID))
            ann_t.forEach(a=>{
                let t = teachers.find(e=>e.id == a.teacherID).name
                let obj = {text:a.text,title:a.title,date:a.date,by:t}
                announcements.push(obj)
            })
            chapters = chapters.filter(e=>e.instituteID == iid)
            topics = topics.filter(e=>e.instituteID == iid)
            timetable = timetable.filter(e=>e.instituteID == iid && e.class_id == clsID && e.session == sesID)
            assignments = assignments.filter(e=>e.iid == iid && e.session == sesID)
            all_classes = all_classes.filter(e=>e.instituteID == iid)
            let class_name = all_classes.find(e=>e.id == clsID)
            let clsName = class_name ? class_name.name : ''
            subjects = subjects.filter(e=>e.instituteID == iid)
            let sub_array = []
            subjects.forEach(s=>{
                let cls = s.class_id
                let i = cls.findIndex(c=>c === clsID)
                let i1 = sub_array.findIndex(a=>a.id === s.id)
                if(i > -1 && i1 === -1){
                    let {id,name} = s
                    let chaps = []
                    let chap_array = chapters.filter(t=>t.subjectID === id)
                    chap_array.sort(function(a,b){
                        let c1 = a.count
                        let c2 = b.count
                        return c1 - c2
                    })
                    chap_array.forEach(c=>{
                        let {count,name} = c
                        let top = topics.filter(e=>e.chapterID === c.id)
                        top.sort(function(a,b){
                            let t1 = a.count
                            let t2 = b.count
                            return t1 - t2
                        })
                        let obj = {id:c.id,count,name,topics:top}
                        chaps.push(obj)
                    })
                    let obj = {id,name,class_name:clsName,class_id:clsID,chapters:chaps}
                    sub_array.push(obj)
                }
            })
            let assn = []
            sub_array.forEach(s=>{
                let a = assignments.filter(e=>e.subjectID == s.id)
                assn=assn.concat(a)
            })
            let sub = sub_array
            let periods = [{day:'Monday',subjects:[]},{day:'Tuesday',subjects:[]},{day:'Wednesday',subjects:[]},{day:'Thursday',subjects:[]},{day:'Friday',subjects:[]},{day:'Saturday',subjects:[]},]
            timetable.forEach(p=>{
                let {period,time,days,subjects} = p
                days.forEach(d=>{
                    if(d.subject){
                        let day = d.name
                        let subID = d.subject
                        let tchr_array = subjects.find(s=>s.subjectID == subID)
                        let tchrID = tchr_array.teacher
                        let substitute = tchr_array.substitute
                        let subj = sub.find(e=>e.id == subID)
                        let pr = periods.find(p=>p.day == day)
                        pr.subjects.push({period,time,subjectID:subj,teacherID:tchrID,substitute})
                    }
                })
            })
            dispatch({type:SET_DATA,class_name:clsName,subjects:sub_array,assn,teachers,periods,announcements,attendance,results,applications,homework,inquiries})
        }catch(err){console.log(err)}
    }
}
export const updateImgUrl = (url)=>{
    return async dispatch=>{
        dispatch({type:UPDATE_IMG,url})
    }
}
export const logOut = ()=>{
    return async dispatch=>{
        dispatch({type:LOGOUT})
    }
}
export const deleteApplication = id=>{
    return async dispatch=>{
        dispatch({type:DELETE_APPLICATION,id})
    }
}
export const addApplication = (data)=>{
    return async dispatch=>{
        dispatch({type:NEW_APPLICATION,data})
    }
}
export const deleteInquiry = id=>{
    return async dispatch=>{
        dispatch({type:DELETE_INQUIRY,id})
    }
}
export const addInquiry = (data)=>{
    return async dispatch=>{
        dispatch({type:NEW_INQUIRY,data})
    }
}
export const addNotif = (data)=>{
    return async dispatch=>{
        dispatch({type:ADD_NOTIF,data})
    }
}
export const addAssignment = (data)=>{
    return async dispatch=>{
        dispatch({type:ADD_ASSIGNMENT,data})
    }
}
export const addHomework = (data)=>{
    return async dispatch=>{
        dispatch({type:ADD_HOMEWORK,data})
    }
}
export const setResponse = (data)=>{
    return async dispatch=>{
        dispatch({type:SET_RESPONSE,data})
    }
}
export const setAppRes = (data)=>{
    return async dispatch=>{
        dispatch({type:SET_APPRES,data})
    }
}