import { Routes, Route } from 'react-router-dom'

import ItemListContainer from '../components/ItemListContainer/ItemListContainer'
import Login from '../components/Login/Login'
import Profile from '../components/Profile/Profile'
import ItemDetailContainer from '../components/ItemDetailContainer/ItemDetailContainer'

import { useAuth } from '../context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import PublicRoute from './components/PublicRoute/PublicRoute'


const AppRouter = () => {
    const { user } = useAuth()

    return (
        <Routes>
            <Route path='/' element={<ItemListContainer />} />
            <Route path='/detail/:productId' element={<ItemDetailContainer />} />
            <Route element={<PublicRoute user={user} redirectPath='/profile'/>}>
                <Route path='/login' element={<Login />} />
            </Route>
            <Route element={<ProtectedRoute user={user}/>}>
                <Route path='/profile' element={<Profile />} />
            </Route>    
        </Routes>
    )
}

export default AppRouter