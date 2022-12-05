import { sendEmailVerification } from 'firebase/auth'
import React from 'react'
import Navbar from '../components/Navbar'
import { useState,useEffect } from 'react'
import { sendPasswordResetEmail } from 'firebase/auth'
import { getAuth } from 'firebase/auth'
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import {db } from '../firebase-config';
import {setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword} from 'firebase/auth';

export default function Profile() {

  const auth = getAuth();
  const [user, setUser] = useState({})
  const [tipoRol, setTipoRol] = useState('')
  const [document, setDocument] = useState([])
  const [emailAdd, setemailAdd] = useState('')
  const [passwordAdd, setpasswordAdd] = useState('')
  const [rolAdd, setRolAdd] = useState('')
  

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('usuarioLogeado')))
    setTipoRol(JSON.parse(localStorage.getItem('tipoUsuario')))
  }
  , [])


  const getDocument = async () => {
    const querySnapshot = await getDocs(collection(db, "User"));
    let document = [];
    querySnapshot.forEach((doc) => {
      document.push({...doc.data() ,id: doc.id});
    });
    setDocument(document)
    }
    useEffect(() => {
      getDocument()
    }, [])
    
 
  
  const emailVerification = ( )=>{
      sendEmailVerification(auth.currentUser)
      .then(
          alert('Correo de Verificacion enviado!')
      )
  }

  const deleteDocument = async (id) =>{
    const userDoc = doc(db,"User", id)
    await deleteDoc(userDoc)
    getDocument()
  }

  var email= user.email;
  var rol = tipoRol;
  const triggerResetEmail = async () => {
    await sendPasswordResetEmail(auth, email);
    console.log("Password reset email sent")
  }

  const registerAdd = async () => {
    try {
      const user = await createUserWithEmailAndPassword(auth, emailAdd, passwordAdd)
      console.log(user.user.uid)
      const docuRef= doc(db, `User/${user.user.uid}`)
      setDoc(docuRef,{correo:emailAdd, rol:rolAdd})
      console.log('creado en bd')
      
    }catch(error){
      console.log(error)
    }
  }
  return (
    <div>
    <Navbar></Navbar>
    <div className=" w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 ">
      <div className="flex justify-end px-4 pt-4">
      </div>
      <div className="flex flex-col items-center pb-10">
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{`Bienvenido! ${user.email}`}</h5>
        <div className="flex mt-4 space-x-3 md:mt-6">
          {
            user.emailVerified  ? 
            <a className='text-green-500 text-5xl'>cuenta verificada</a>
          :
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={emailVerification}>
            Verificar Correo
          </button>
          }
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={triggerResetEmail}>
            Cambiar Contrasena
          </button>
        </div>
      </div>
    </div>
    {
      rol === 'admin' ?
      <div>
        
        <h1 className='text-yellow-300 text-5xl'>Add user</h1>
        <h1 className='text-5xl'>Email</h1>
      <input
              type="text"
              className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="exampleFormControlInput"
              placeholder="Email address"
              onChange={(event) =>{
                setemailAdd(event.target.value);
              }}
            />
            <h1 className='text-5xl'>Contrasena</h1>
            <input
              type="text"
              className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="exampleFormControlInput"
              placeholder="Password"
              onChange={(event) =>{
                setpasswordAdd(event.target.value);
              }}
            />
            <h1 className='text-5xl'>Rol</h1>
             <input
              type="text"
              className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="exampleFormControlInput"
              placeholder="Rol"
              onChange={(event) =>{
                setRolAdd(event.target.value);
              }}
            />
            <button
              type="button"
              className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
             onClick={registerAdd}
            >Registrar</button>
            </div>
            :
            <p>hola</p>
    }
    {
      rol === 'admin' ? 
      <div className="flex flex-col">
<div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
  <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
    <div className="overflow-hidden">
      <table className="min-w-full">
        <thead className="border-b">
          <tr>
            <th scope="col" className=" font-medium px-6 py-4 text-left text-5xl text-red-600">
              id
            </th>
            <th scope="col" className=" font-medium px-6 py-4 text-left text-5xl text-red-600">
              Email
            </th>
            <th scope="col" className=" font-medium px-6 py-4 text-left text-5xl text-red-600">
              Rol
            </th>
            <th scope="col" className=" font-medium px-6 py-4 text-left text-5xl text-red-600">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {
           document.map((user,index)=>{
            return(
              <tr className="bg-white border-b">
              <td className="text-3xl px-6 py-4 whitespace-nowrap text-sm font-medium text-red-900">{user.id}</td>
              <td className="text-3xl text-gray-900 font-light px-6 py-4 whitespace-nowrap ">
                {user.correo}
              </td>
              <td className="text-3xl text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {user.rol}
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full" onClick={()=> {deleteDocument(user.id)}}>
                  <img src="https://cdn-icons-png.flaticon.com/512/3405/3405244.png" className="mr-3 h-6 sm:h-9"/>
                  </button>
                  
              </td>
            </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  </div>
</div>
</div>
      : <p>No eres admn</p>
    }
  </div>

    )
}


