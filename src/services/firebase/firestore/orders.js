import { db } from '..'
import {
    getDocs,
    query,
    collection,
    where,
    Timestamp,
    writeBatch,
    addDoc,
    documentId
} from 'firebase/firestore'

import { useCart } from 'context/CartContext'
import { useAuth } from 'context/AuthContext'

export const useOrders = () => {
    const { user } = useAuth()
    const { cart, totalToPay } = useCart()

    const createOrder = async () => {
        try {
            const objOrder = {
                items: cart,
                buyer: {
                    uid: user.uid,
                    name: user.name,
                    email: user.email,
                    address: user.address,
                    phone: user.phone
                },
                total: totalToPay,
                date: Timestamp.fromDate(new Date())
            }

            const ids = cart.map(prod => prod.id)

            const batch = writeBatch(db)

            const productsRef = collection(db, 'products')

            const outOfStock = []
        
            const productsSnapshot = await getDocs(query(productsRef, where(documentId(), 'in', ids)))
            const { docs } = productsSnapshot
            
            docs.forEach(doc => {
                const dataDoc = doc.data()
                const prodQuantity = cart.find(prod => prod.id === doc.id)?.quantity

                if(dataDoc.stock >= prodQuantity) {
                    batch.update(doc.ref, { stock: dataDoc.stock - prodQuantity})
                } else {
                    outOfStock.push({ id: doc.id, ...dataDoc })
                }
            })

            if(outOfStock.length === 0) {
                const ordersRef = collection(db, 'orders')
                const orderAdded = await addDoc(ordersRef, objOrder)
                batch.commit()
                return { result: 'orderCreated', id: orderAdded.id }
            } else {
                return { result: 'outOfStockError', products: outOfStock }
            }
        } catch (error) {
            return error
        }
    }

    const getOrdersByUser = async (id) => {
        try {
            const ordersRef = collection(db, 'orders')

            const ordersSnapshot =  await getDocs(query(ordersRef, where('buyer.uid', '==', id)))
            const { docs } = ordersSnapshot

            const ordersFormatted = docs.map(doc => {
                return { id: doc.id, ...doc.data()}
            })

            return ordersFormatted
        } catch (error) {
            return error
        }
    }

    return {
        createOrder,
        getOrdersByUser
    }
}