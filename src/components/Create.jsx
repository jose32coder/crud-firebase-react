import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../firebaseConfig/firebase'



export const Create = () => {

    const [description, setDescription] = useState('');
    const [stock, setStock] = useState(0);
    const navigate = useNavigate()

    const onChange = (event) => {
        
    }

    const productsCollection = collection(db, 'products');

    const store = async (e) => {
        e.preventDefault()
        await addDoc(productsCollection, {description: description, stock: stock})
        navigate('/')
    }

    return (
        <div className='container'>
            <div className='row d-flex justify-content-center'>
                <div className="col-7">
                    <h1>Create Product</h1>
                    <form onSubmit={store}>
                        <div className='mb-3'>
                            <label className='form-label'>Description</label>
                            <input 
                                value={description}
                                type="text"
                                onChange={event => setDescription(event.target.value)}
                                className='form-control'   
                            />
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>Stock</label>
                            <input 
                                value={stock}
                                type="number"
                                onChange={event => setStock(event.target.value)}
                                className='form-control'   
                            />
                        </div>
                        <button type='submit' className='btn btn-primary'>Registrar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
