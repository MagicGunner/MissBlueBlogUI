import type { App } from 'vue'

// register globally
export const registerSvgIcon = async (app: App): Promise<void> => {
  const SvgIcon = (await import('@/components/SvgIcon/index.vue')).default
  app.component('svg-icon', SvgIcon)
  const req = import.meta.glob('./svg/*.svg', { eager: true }) as Record<string, any>
  for (const key in req) {
    const component = req[key].default
    app.component(component.name, component)
  }
}
