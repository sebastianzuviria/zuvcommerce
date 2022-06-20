import { Routes, Route, Navigate } from 'react-router-dom'

import ItemListContainer from 'components/ItemListContainer/ItemListContainer'
import ItemDetailContainer from 'components/ItemDetailContainer/ItemDetailContainer'
import Login from 'components/Login/Login'
import Profile from 'components/Profile/Profile'
import Cart from 'components/Cart/Cart'
import OrdersList from '../components/OrdersList/OrdersList'

import { useAuth } from 'context/AuthContext'
import ProtectedRoute from 'routes/components/ProtectedRoute/ProtectedRoute'
import PublicRoute from 'routes/components/PublicRoute/PublicRoute'
import BackOfficeRoute from './components/BackOfficeRoute/BackOfficeRoute'
import ItemsManagerContainer from 'components/ItemsManagerContainer/ItemsManagerContainer'
import ItemForm from 'components/ItemForm/ItemForm'


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
                <Route path='/profile/:userId' element={<Profile />} />
                <Route path='/profile/:userId/orders' element={<OrdersList />} />
                <Route path='/cart' element={<Cart />} />
            </Route>

            <Route path='/backoffice/' element={<BackOfficeRoute user={user}/>}>
              <Route path='products/' element={<ItemsManagerContainer />} />
              <Route path='products/create' element={<ItemForm />} />
              <Route path='products/:productId/edit' element={<ItemForm />} />
              <Route path='users/' element={<h1>Products manager</h1>} />
            </Route> 

            <Route path='*' element={<Navigate to='/'/>} />
        </Routes>
    )
}

export default AppRouter