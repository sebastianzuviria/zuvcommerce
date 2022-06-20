import { useState, useEffect, createContext, useContext } from 'react'
import { GithubAuthProvider, signInWithPopup, signOut, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";

import { useCart } from 'context/CartContext';

import { auth } from 'services/firebase';
import { useUsers } from 'services/firebase/firestore/users';

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

    const { clearCart } = useCart()

    const { createUser, updateUser } = useUsers()

    const handleUser = async (rawUser, provider) => {
        if(rawUser) {
            const user = formatUser(rawUser, provider) 
            const { token, ...userWithoutToken } = user
            let createdUser
            if(provider !== 'password') {
                createdUser = await createUser(user.uid, userWithoutToken)
            } else {
                createdUser = await createUser(user.uid, userWithoutToken.email)
            }
            setUser(createdUser)
            return user
        } else {
            setUser(null)
            return false
        }
    }

    const signin = (email, password, callback) => {
        return signInWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                const user = userCredential.user;
                const userData = await handleUser(user)
                callback()
                return userData
            })
            .catch((error) => {
                console.log(error)
            });
    }

    const signinWithGithub = async (callback) => {
        const provider = new GithubAuthProvider()

        signInWithPopup(auth, provider)
            .then(async (userCredencial) => {
                const user = userCredencial.user 
                const userData = await handleUser(user)  
                callback()
                return userData
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
                clearCart()
                navigate('/')
            })
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, handleUser)

        return () => unsubscribe()
    }, []) //eslint-disable-line

    return {
        user,
        signin,
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