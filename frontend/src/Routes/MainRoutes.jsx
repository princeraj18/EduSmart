import Login from '@/Pages/Auth/Login'
import Register from '@/Pages/Auth/Register'
import AdminLogin from '@/Pages/AdminAuth/AdminLogin'
import AdminRegister from '@/Pages/AdminAuth/AdminRegister'
import Home from '@/Pages/User/Home'
import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { ProtectedRoutes } from './ProtectedRoute'
import SingleCourse from '@/Pages/User/SingleCourse'
import YourCourse from '@/Pages/User/YourCourse'
import SinglePurchasedCourse from '@/Pages/User/SinglePurchasedCourse'
import Dashboard from '@/Pages/Admin/Dashboard'
import DashboardAnalytics from '@/Pages/Admin/DashboardAnalytics'
import DasbhoardProducts from '@/Pages/Admin/DasbhoardProducts'
import CreateModule from '@/Pages/Admin/CreateModule'
import AdminProfile from '@/Pages/Admin/Profile'
import AdminHome from '@/Pages/Admin/AdminHome'
import AdminCreateCourse from '@/Pages/Admin/AdminCreateCourse'
import AdminProtectedRoutes from '@/Routes/AdminProtectedRoute'
import UserProfile from '@/Pages/User/Profile'
import Quiz from '@/Pages/User/Quiz'
import Cancel from '@/Pages/Admin/Cancel'
import PaymenSuccess from '@/Pages/Admin/PaymenSuccess'
import AdminPurchases from '@/Pages/Admin/AdminPurchases'

const MainRoutes = () => {
  return (
   <Routes>

    <Route path='/' element={
        <ProtectedRoutes>
            <Home/>
        </ProtectedRoutes>
    }/>
    <Route path='/cancel' element={
        <ProtectedRoutes>
            <Cancel/>
        </ProtectedRoutes>
    }/>
    <Route path='/purchase' element={
        <ProtectedRoutes>
            <PaymenSuccess/>
        </ProtectedRoutes>
    }/>
    <Route path='/singleCourse/:id' element={
        <ProtectedRoutes>
            <SingleCourse/>
        </ProtectedRoutes>
    }/>
    <Route path='/YourCourse' element={
        <ProtectedRoutes>
            <YourCourse/>
        </ProtectedRoutes>
    }/>
    <Route path='/YourCourse/:id' element={
        <ProtectedRoutes>
            <SinglePurchasedCourse/>
        </ProtectedRoutes>
    }/>
    <Route path='/quiz/:id' element={
        <ProtectedRoutes>
            <Quiz/>
        </ProtectedRoutes>
    }/>

    <Route path='/profile' element={
        <ProtectedRoutes>
            <UserProfile/>
        </ProtectedRoutes>
    }/>

        <Route path='/admin/profile' element={
                <AdminProtectedRoutes>
                        <AdminProfile/>
                </AdminProtectedRoutes>
        }/>

        <Route path='/admin/admin-home' element={
            <AdminProtectedRoutes>
                <AdminHome />
            </AdminProtectedRoutes>
        }/>

        <Route path='/admin/create-course' element={
            <AdminProtectedRoutes>
                <AdminCreateCourse />
            </AdminProtectedRoutes>
        }/>

        <Route path='/admin/purchases' element={
            <AdminProtectedRoutes>
                <AdminPurchases />
            </AdminProtectedRoutes>
        }/>

        <Route path='/admin/dashboard' element={
            <AdminProtectedRoutes>
                <Dashboard />
            </AdminProtectedRoutes>
        }>
            <Route
                index
                element={
                    <AdminProtectedRoutes>
                        <DashboardAnalytics />
                    </AdminProtectedRoutes>
                }
            />
            <Route
                path='courses'
                element={
                    <AdminProtectedRoutes>
                        <DasbhoardProducts />
                    </AdminProtectedRoutes>
                }
            />
            <Route
                path='dashboardProduct'
                element={<Navigate to="/admin/dashboard/courses" replace />}
            />
            <Route
                path='CourseModule/:id'
                element={
                    <AdminProtectedRoutes>
                        <CreateModule />
                    </AdminProtectedRoutes>
                }
            />
        </Route>
    <Route path='/login' element={<Login/>}/>
    <Route path='/register' element={<Register/>}/>
        <Route path='/admin/login' element={<AdminLogin/>} />
        <Route path='/admin/register' element={<AdminRegister/>} />
   </Routes>
  )
}

export default MainRoutes