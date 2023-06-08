import { Component } from "vue"
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

export enum PagePathEnum {
  HOME = "/",
  PAGES = "/pages",
  PAGE = "/page",
  HEADER_FOOTER_MANAGER = "/header-footer-manager",
}
export enum PageNameEnum {
  HOME = "home",
  PAGES = "pages",
  PAGE = "page",
  HEADER_FOOTER_MANAGER = "header-footer-manager"
}
export enum PageTitleEnum {
  HOME = "Home",
  PAGES = "Pages",
  PAGE = "Page",
  HEADER_FOOTER_MANAGER = "Header & Footer Manager"
}

export class Route {
  path: string
  name: string
  component: Promise<Component> | (() => Promise<Component>)
  constructor(
    path: string,
    name: string,
    component: Promise<Component> | (() => Promise<Component>),
  ) {
    this.path = path
    this.name = name
    this.component = component
  }
}


// ROUTES
export const routes = [
  new Route(PagePathEnum.HOME, PageNameEnum.HOME, HomeView),
  new Route(PagePathEnum.PAGES, PageNameEnum.PAGES, () => import('../views/PagesList.vue')),
  new Route(PagePathEnum.PAGE, PageNameEnum.PAGE, () => import('../views/PageDetail.vue')),
  new Route(PagePathEnum.HEADER_FOOTER_MANAGER, PageNameEnum.HEADER_FOOTER_MANAGER, () => import('../views/HeaderFooterManager.vue')),
]


// ROUTER
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
