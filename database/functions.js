import {db} from './firebase-config'
import {collection,getDocs} from 'firebase/firestore'

export async function fetch_data(table){
    let users = []
    await getDocs(collection(db,table)).then(docSnap=>{
        docSnap.forEach((doc)=>{
            users.push({...doc.data(), id:doc.id})
        })
    })
    return users
}

export function setNum(date){
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    let sp = date.split('-')
    if(sp.length == 3){
        let n = sp[1]
        let dt = `${sp[0]} ${months[n-1]}, ${sp[2]}`
        return dt
    }else{
        return date
    }
    
}
export function makeDate(date){
    let d = date.split('-')
    let day = d[0]
    let month = d[1]
    let year = d[2]
    if(day<9){day = `0${day}`}
    if(month<9){month = `0${month}`}
    return new Date(`${year}-${month}-${day}`)
}
