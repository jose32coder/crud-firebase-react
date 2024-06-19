import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import { collection, getDocs, getDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig/firebase';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal)


export const Show = () => {
    // configuracion de hooks
    const [products, setProducts] = useState([])
    // referencias a la db
    const productCollection = collection(db, 'products');
    // funcion para mostrar TODOS los documentos
    const getProducts = async () => {
        const data = await getDocs(productCollection);
        console.log(data.docs);

        setProducts(
            data.docs.map((doc) => ({...doc.data(), id:doc.id}))
        )
    }
    // funcion para eliminar un doc
    const deleteProduct = async (id) =>{
        const productDoc = doc(db, 'products', id);
        await deleteDoc(productDoc);
        getProducts()
    }

    // funcion de confirmacion para SweetAlert
    const deleteConfirm = async id => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "¡Si lo eliminas no puedes revertir este cambio!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "¡Si, borralo!"
          }).then((result) => {
            if (result.isConfirmed) {
                deleteProduct(id)
              Swal.fire({
                title: "¡Borrado!",
                text: "¡Se ha borrado exitosamente!.",
                icon: "success"
              });
            }
          });
    }
    // usamos useEffect
    useEffect (() =>{
        getProducts()
    }, [])
    // devolvemos vista de nuestro componente
  return (
    <div className='container'>
        <div className='row d-flex justify-content-center'>
            <div className="col-8">
                <div className="d-grid center gap-2">
                    <Link to={'/create'} className='btn btn-secondary mt-3 mb-4'>Create</Link>
                </div>
                <table className='table table-dark table:hover'>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Stock</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td>{product.description}</td>
                                <td>{product.stock}</td>
                                <td className='gap'>
                                    <Link to={`/edit/${product.id}`} className='btn btn-light me-2'><i className="fa-solid fa-pen"></i></Link>
                                    <button onClick={() => {deleteConfirm(product.id)}} className='btn btn-danger'><i className="fa-solid fa-trash"></i></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  )
}
