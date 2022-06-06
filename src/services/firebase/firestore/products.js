import { db } from '..'
import {
    getDocs,
    query,
    collection,
    where,
    getDoc,
    doc
} from 'firebase/firestore'

export const useProducts = () => {
    const getProducts = (categoryId) => {
        return new Promise((resolve, reject) => {
            const collectionRef = categoryId 
                ? query(collection(db, 'products'), where('category', '==', categoryId))
                : collection(db, 'products')
    
            getDocs(collectionRef)
                .then(response => {
                    const products = response.docs.map(doc => {
                        return { id: doc.id, ...doc.data()}
                    })
                    resolve(products)
                })
                .catch(error => {
                    reject(error)
                })
        })
    }
    
    const getProductById = (productId) => {
        return new Promise((resolve, reject) => {
            const docRef = doc(db, 'products', productId)
    
            getDoc(docRef)
                .then(response => {
                    const product = { id: response.id, ...response.data()}
                    resolve(product)
                })
                .catch(error => {
                    reject(error)
                })
        })
    }

    return {
        getProducts,
        getProductById
    }
}