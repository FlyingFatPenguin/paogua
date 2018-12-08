import Vue from 'vue'
import Router from 'vue-router'
import Home from'../pages/Home/Home.vue'
import Person from'../pages/Person/Person.vue'
import Release from'../pages/Release/Release.vue'
import Classify from '../pages/Release/components/Classify.vue'
import Detail from "../pages/detail.vue"
import Filter from "../pages/Filter/Filter.vue"
import MyCollect from "../pages/Person/MyCollect.vue"
import MyRelease from "../pages/Person/MyRelease"
Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/home',
      component:Home,
      name:'home',
      meta: {
        rank: 1
      }
    },
    {
      path: '/person',
      component:Person,
      meta: {
        rank: 1
      }
    },
    {
      path: '/release',
      component:Release,
      name:'release',
      meta: {
            keepAlive: true,
            rank: 2
      }
    },
    {
      path: '/',
      redirect:'/home'
    },
    {
      path: '/classify',
      component: Classify,
      meta: {
        rank: 3
      }
    },
    {
      path: '/detail/:id',
      name:'detail',
      component: Detail,
      meta: {
        rank: 999
      }
    },
    {
      path: '/filter/:classify/:code',
      name: 'filter',
      component: Filter,
    },
    {
      path: '/myCollect',
      component: MyCollect
    },
    {
      path:'/myRelease',
      name:'myRelease',
      component: MyRelease,
      meta: {
        rank: 1
      }
    }
  ]
})
