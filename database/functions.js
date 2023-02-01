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
    let n = sp[1]
    let dt = `${sp[0]} ${months[n-1]}, ${sp[2]}`
    return dt
}
