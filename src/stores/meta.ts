import { defineStore } from 'pinia'

export const useMetaStore = defineStore('metaStore', () => {
  const title = 'MissBlue的个人博客'
  return {
    title
  }
})
