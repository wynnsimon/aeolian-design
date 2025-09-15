// router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import App from '../App.vue'
import calendar from '../view/calendar.vue'
import canvasTable from '../view/canvasTable.vue'
import checkbox from '../view/checkbox.vue'
import collapse from '../view/collapse.vue'
import editor from '../view/editor.vue'
import form from '../view/form.vue'
import input from '../view/input.vue'
import message from '../view/message.vue'
import onlineExcel from '../view/onlineExcel.vue'
import tooltip from '../view/tooltip.vue'
import tree from '../view/tree.vue'
import upload from '../view/upload.vue'
import virtualList from '../view/virtualList.vue'
import signature from '../view/signature.vue'
import DrawingBoard from '../view/drawingBoard.vue'

const routes = [
  {
    path: '/',
    component: App,
    children: [
      {
        path: '/calendar',
        name: 'Calendar',
        component: calendar
      },
      {
        path: '/canvas-table',
        name: 'CanvasTable',
        component: canvasTable
      },
      {
        path: '/checkbox',
        name: 'Checkbox',
        component: checkbox
      },
      {
        path: '/collapse',
        name: 'Collapse',
        component: collapse
      },
      {
        path: '/editor',
        name: 'Editor',
        component: editor
      },
      {
        path: '/form',
        name: 'Form',
        component: form
      },
      {
        path: '/input',
        name: 'Input',
        component: input
      },
      {
        path: '/message',
        name: 'Message',
        component: message
      },
      {
        path: '/online-excel',
        name: 'OnlineExcel',
        component: onlineExcel
      },
      {
        path: '/tooltip',
        name: 'Tooltip',
        component: tooltip
      },
      {
        path: '/tree',
        name: 'Tree',
        component: tree
      },
      {
        path: '/upload',
        name: 'Upload',
        component: upload
      },
      {
        path: '/virtual-list',
        name: 'VirtualList',
        component: virtualList
      },
      {
        path: '/signature',
        name: 'Signature',
        component: signature
      },
      {
        path: '/drawing-board',
        name: 'DrawingBoard',
        component: DrawingBoard
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router