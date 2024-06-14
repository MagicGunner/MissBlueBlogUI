import { createI18n } from 'vue-i18n'
import cookies from 'js-cookie'

function loadLocaleMessages(): Record<string, Record<string, Record<string, string>>> {
  const locales = import.meta.glob('../locales/languages/*.json', { eager: true })
  const messages: Record<string, Record<string, Record<string, string>>> = {}

  Object.keys(locales).forEach((key) => {
    const matched = key.match(/([A-Za-z0-9-_]+)\.json$/i)
    if (matched && matched.length > 1) {
      const locale = matched[1]
      messages[locale] = (locales[key] as any).default
    }
  })

  return messages
}

export const i18n = createI18n({
  legacy: true, // 设为true或者不设置
  allowComposition: true,
  locale: cookies.get('locale') ? String(cookies.get('locale')) : 'en',
  fallbackLocale: cookies.get('locale') ? String(cookies.get('locale')) : 'en',
  messages: loadLocaleMessages()
})
