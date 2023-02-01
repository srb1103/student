import * as SQLite from 'expo-sqlite'
const db = SQLite.openDatabase('database.db')

export const createTable = ()=>{
    const promise = new Promise((resolve,reject)=>{
        db.transaction(tx=>{
            tx.executeSql(`create table if not exists user (id INTEGER PRIMARY KEY NOT NULL, userID TEXT NOT NULL,name TEXT NOT NULL, phone TEXT NOT NULL, email TEXT NOT NULL, guardian TEXT NOT NULL, address TEXT NOT NULL, rollNo TEXT NOT NULL,admissionNo TEXT NOT NULL,instituteID TEXT NOT NULL,img TEXT NOT NULL,classId TEXT NOT NULL)`,
                [],
                ()=>{
                    resolve()
                },
                (_,err)=>{
                    reject(err)
                }
            )
        })
    })
    return promise
}
export const deleteUser = ()=>{
    const promise = new Promise((resolve,reject)=>{
        db.transaction(tx=>{
            tx.executeSql(`drop table user`,
            [],
            ()=>{
                resolve()
            },
            (_,err)=>{
                reject(err)
            })
        })
    })
    return promise
}
export const findUserID = ()=>{
    const promise = new Promise((resolve,reject)=>{
        db.transaction(tx=>{
            tx.executeSql(`select * from user`,
            [],
            (_,result)=>{resolve(result)},
            (_,err)=>{reject(err)}
            )
        })
    })
    return promise
}
export const updateUserDetail = (t)=>{
    let {id,name,phone,email,guardian,instituteID,address,classId,img_url,rollNo,admissionNo} = t
    const promise = new Promise((resolve,reject)=>{
        db.transaction(tx=>{
            tx.executeSql(`insert into user (userID,name,phone,email,guardian,instituteID,address,classId,img,rollNo,admissionNo) values (?,?,?,?,?,?,?,?,?,?,?)`,
            [id,name,phone,email,guardian,instituteID,address,classId,img_url,rollNo,admissionNo],
            ()=>{resolve()},
            (_,err)=>{reject(err)}
            )
        })
    })
    return promise
}

export const updateImg = (url)=>{
    let promise = new Promise((resolve,reject)=>{
        db.transaction(tx=>{
            tx.executeSql(`update user set img = ${url} where id = 1`,
                [],
                ()=>{resolve()},
                (_,err)=>{reject(err)}
            )
        })
    })
    return promise
}