import Login from '@/Pages/Auth/Login'
import Register from '@/Pages/Auth/Register'
import AdminLogin from '@/Pages/AdminAuth/AdminLogin'
import AdminRegister from '@/Pages/AdminAuth/AdminRegister'
import Home from '@/Pages/User/Home'
import About from '@/Pages/About'
import Contact from '@/Pages/Contact'
import Terms from '@/Pages/Terms'
import CourseDetail from '@/Pages/CourseDetail'
import Courses from '@/Pages/User/Courses'
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
import AdminSupport from '@/Pages/Admin/Support'
import CourseSection from '@/components/CourseSection'
import ForgotPassword from '@/Pages/Auth/ForgotPassword'
import ResetPassword from '@/Pages/Auth/ResetPassword'
// import ForgotPassword from '@/Pages/Auth/ForgotPassword'

const MainRoutes = () => {
  return (
   <Routes>

    <Route path='/' element={
        <ProtectedRoutes>
            <Home/>
        </ProtectedRoutes>
    }/>
    <Route path='/courses' element={<Courses/>} />
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
     <Route path='/terms' element={
        <ProtectedRoutes>
            <Terms/>
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
     <Route path='/contact' element={
        <ProtectedRoutes>
            <Contact/>
        </ProtectedRoutes>
    }/>
     <Route path='/courses' element={
        <ProtectedRoutes>
            <CourseSection/>
        </ProtectedRoutes>
    }/>
     <Route path='/about' element={
        <ProtectedRoutes>
            <About/>
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

        <Route path='/admin/support' element={
            <AdminProtectedRoutes>
                <AdminSupport />
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
                path='"/admin/dashboard/courses"'
                
                element={
                    <AdminProtectedRoutes>
                        <DasbhoardProducts />
                    </AdminProtectedRoutes>
                
            }
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
    {/* <Route path='/about' element={<About/>} />
    <Route path='/contact' element={<Contact/>} />
    <Route path='/terms' element={<Terms/>} /> */}
    {/* <Route path='/course/:id' element={<CourseDetail/>} /> */}
        <Route path='/admin/login' element={<AdminLogin/>} />
        <Route path='/admin/register' element={<AdminRegister/>} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
<Route path="/reset-password/:token" element={<ResetPassword />} />
   </Routes>
  )
}

export default MainRoutes