import { useState, createContext, useContext } from 'react'
import { GithubAuthProvider, signInWithPopup, signOut } from "firebase/auth";

import { auth } from '../services/firebase';
import { createUser, updateUser } from '../services/firebase/firestore/users';

import { useNavigate } from 'react-router-dom';


const formatUser = (rawUser) => {
    return {
        uid: rawUser.uid,
        email: rawUser.email,
        name: rawUser.displayName,
        provider: rawUser.providerData[0].providerId,
        photoUrl: rawUser.photoURL,
        token: rawUser.accessToken
    }
}

const useProvideAuth = () => {
    const [user, setUser] = useState(null)

    const navigate = useNavigate()

    const handleUser = async (rawUser) => {
        if(rawUser) {
            const user = formatUser(rawUser) 
            const { token, ...userWithoutToken } = user
            const createdUser = await createUser(user.uid, userWithoutToken)
            setUser(createdUser)
            return user
        } else {
            setUser(null)
            return false
        }
    }

    const signinWithGithub = async () => {
        const provider = new GithubAuthProvider()

        signInWithPopup(auth, provider)
            .then((userCredencial) => {
                const user = userCredencial.user     
                return handleUser(user)
            })
            .then(() => {
                navigate('/')
            })
            .catch(error => {
                console.log(error)
            })
    }

    const updateUserData = async (updatedData) => {
        try {
            const updatedUser = await updateUser(user.uid, updatedData)
            setUser(updatedUser)
        } catch (error) {
            console.log(error)
        }
    }

    const signout = () => {
        signOut(auth)
            .then(() => {
                handleUser(false)
                navigate('/')
            })
    }

    return {
        user,
        signinWithGithub,
        updateUserData,
        signout
    }
}

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const auth = useProvideAuth()

    return (
        <AuthContext.Provider value={auth}>
            { children }
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}