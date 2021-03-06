import {
    lazy
} from 'react'

// // 懒加载
const Cv = lazy(() => import('../containers/Cv/Cv'))
const Blog = lazy(() => import('../containers/Blog/Blog'))
const Detail = lazy(() => import('../containers/Detail/Detail'))
const Message = lazy(() => import('../containers/Message/Message'))

// 直接加载
// import Cv from '../views/Cv/Cv'
// import Blog from '../views/Blog/Blog'
// import Detail from '../views/Detail/Detail'
// import Comments from '../views/Comments/Comments'
// import NotFound from '../views/NotFound/NotFound.jsx'


const routers = [{
        path: '/',
        exact: true,
        component: Blog
    },
    {
        path: '/cv',
        exact: false,
        component: Cv
    },
    {
        path: '/blog',
        exact: false,
        component: Blog
    },
    {
        path: '/message',
        exact: false,
        component: Message
    },
    {
        path: '/detail',
        exact: false,
        component: Detail
    }
]

export default routers