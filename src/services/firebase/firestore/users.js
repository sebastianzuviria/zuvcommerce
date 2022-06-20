import {
    getDoc,
    setDoc,
    updateDoc,
    doc
} from 'firebase/firestore'
import { db } from '..'


export const useUsers = () => {
    
    const createUser = async (uid, data) => {
        try {
            const userRef = doc(db, 'users', uid)
            await setDoc(userRef, data, { merge: true })
            const user = await getDoc(userRef)
            const userData = user.data()
            if(!userData.role) {
                updateUser(userData.uid, { role: 'user'})
            }
            
            return user.data()
        } catch (error) {
            console.log(error)
        }
    }
    
    const updateUser = async (uid, data) => {
        try {
            const userRef = doc(db, 'users', uid)
            await updateDoc(userRef, data)
            const user = await getDoc(userRef)
            return user.data()
        } catch (error) {
            console.log(error)
        }
    }

    return {
            createUser,
        updateUser
    }
}



