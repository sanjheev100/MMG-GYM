import React, { useEffect, useState, lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Footer, Header } from './components'
import { authen } from './firebase'
import { useDispatch } from 'react-redux'
import { currentUser } from './api/auth'
import UserRoute from './components/Routes/UserRoute'
import { Spinner } from 'react-bootstrap'

const Login = lazy(() => import('./pages/auth/Login'))
const Register = lazy(() => import('./pages/auth/Register'))
const RegisterComplete = lazy(() => import('./pages/auth/RegisterComplete'))
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword'))
const PasswordChange = lazy(() => import('./pages/user/PasswordChange'))
const AddCustomer = lazy(() => import('./pages/admin/AddCustomer'))
const PaidCustomers = lazy(() => import('./pages/admin/PaidCustomers'))
const AllCustomers = lazy(() => import('./pages/admin/AllCustomers'))
const UnpaidCustomers = lazy(() => import('./pages/admin/UnpaidCustomers'))
const GymManager = lazy(() => import('./pages/admin/GymManager.js'))
const NotFound = lazy(() => import('./pages/NotFound.js'))

const App = () => {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    const unSubscribe = authen.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult()
        // console.log(user)
        currentUser(idTokenResult.token)
          .then((res) => {
            setLoading(true)

            dispatch({
              type: 'LOGGED_IN_USER',
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            })
            setLoading(false)
          })
          .catch((error) => {
            toast.error(error, {
              position: 'top-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            })
            setLoading(false)
          })
      }
    })
    setLoading(false)

    return () => unSubscribe()
  }, [dispatch])

  return (
    <Suspense
      fallback={
        <div className='col text-center p-5'>
          <Spinner />
        </div>
      }
    >
      <Header />
      <ToastContainer />
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <main className='py-3'>
          <Routes>
            <Route exact path='/' element={<Login />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/register' element={<Register />} />
            <Route
              exact
              path='/register/complete'
              element={<RegisterComplete />}
            />
            <Route exact path='/forgot/password' element={<ForgotPassword />} />
            <Route path='*' element={<NotFound />} />

            {/* User Routes */}
            <Route element={<UserRoute />}>
              <Route exact path='/user/password' element={<PasswordChange />} />
              <Route exact path='/add/customer' element={<AddCustomer />} />
              <Route exact path='/allcustomers' element={<AllCustomers />} />
              <Route exact path='/Paidcustomers' element={<PaidCustomers />} />
              <Route
                exact
                path='/Unpaidcustomers'
                element={<UnpaidCustomers />}
              />
              <Route exact path='/GymManager' element={<GymManager />} />
            </Route>
          </Routes>
        </main>
      )}
      <Footer />
    </Suspense>
  )
}

export default App
