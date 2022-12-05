import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import React,{ useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase-config';
import { getDoc,doc } from 'firebase/firestore';
import { db } from '../firebase-config';

export default function Login() {
  const navigate = useNavigate();
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [user, setUser] = useState({});

   
  const logIntoAcc = async () =>{
    const usuario = await signInWithEmailAndPassword(auth, email, password)
    navigate('/Main')
    setUser(usuario)
    const usuarioLogg = auth.currentUser
    localStorage.setItem('usuarioLogeado', JSON.stringify(usuarioLogg))
    const docRef = doc(db, "User", auth.currentUser.uid);
    const docSnap = await getDoc(docRef);
    console.log(docSnap.data())
    localStorage.setItem('tipoUsuario',JSON.stringify(docSnap.data().rol))
  }
  
  return (
    <section class="h-full gradient-form bg-gray-200 md:h-screen">
  <div class="container py-12 px-6 h-full">
    <div class="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
      <div class="xl:w-10/12">
        <div class="block bg-white shadow-lg rounded-lg">
          <div class="lg:flex lg:flex-wrap g-0">
            <div class="lg:w-6/12 px-4 md:px-0">
              <div class="md:p-12 md:mx-6">
                <div class="text-center">
                  <img
                    class="mx-auto w-48"
                    src="https://cdn-icons-png.flaticon.com/512/49/49215.png"
                    alt="logo"
                  />
                  <h4 class="text-xl font-semibold mt-1 mb-12 pb-1">Pelis BLOG</h4>
                </div>
                <form>
                  <p class="mb-4">Iniciar sesion</p>
                  <div class="mb-4">
                    <input
                      type="text"
                      class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      id="exampleFormControlInput1"
                      placeholder="Email"
                      onChange={(event) =>{
                        setEmail(event.target.value);
                      }}
                    />
                  </div>
                  <div class="mb-4">
                    <input
                      type="password"
                      class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      id="exampleFormControlInput1"
                      placeholder="Password"
                      onChange={(event) =>{
                        setPassword(event.target.value);
                      }}
                    />
                  </div>
                  <div class="text-center pt-1 mb-12 pb-1">
                    <button
                      class="inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                      type="button"
                      data-mdb-ripple="true"
                      data-mdb-ripple-color="light"
                      onClick={logIntoAcc}
                    >
                      Log in
                    </button>
                    <a class="text-gray-500" href="#!">Forgot password?</a>
                  </div>
                  <div class="flex items-center justify-between pb-6">
                    <p class="mb-0 mr-2">Don't have an account?</p>
                    <Link to={'/register'}>
                    <button
                      type="button"
                      class="inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                      data-mdb-ripple="true"
                      data-mdb-ripple-color="light"
                    >
                      Registrarse
                    </button>
                    </Link>
                  </div>
                </form>
              </div>
            </div>
            <div
              class="lg:w-6/12 flex items-center lg:rounded-r-lg rounded-b-lg lg:rounded-bl-none bg-gradient-to-tr from-slate-700 via-gray-400 to-gray-900"
            >
              <div class="text-white px-4 py-6 md:p-12 md:mx-6">
                <h4 class="text-xl font-semibold mb-6">La mejor web para concer las mejores peliculas</h4>
                <p class="text-sm">
                 Mas que un punto de reunion para los cinefilos, somos el mejor proyecto. Pasenos villavicencio :D
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
  )
}
