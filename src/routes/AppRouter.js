import { Routes, Route } from 'react-router-dom'

import ItemListContainer from 'components/ItemListContainer/ItemListContainer'
import ItemDetailContainer from 'components/ItemDetailContainer/ItemDetailContainer'
import Login from 'components/Login/Login'
import Profile from 'components/Profile/Profile'

import { useAuth } from 'context/AuthContext'
import ProtectedRoute from 'routes/components/ProtectedRoute/ProtectedRoute'
import PublicRoute from 'routes/components/PublicRoute/PublicRoute'


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
                <Route path='/cart' element={<h1>CART</h1>} />
            </Route>    
        </Routes>
    )
}

export default AppRouter