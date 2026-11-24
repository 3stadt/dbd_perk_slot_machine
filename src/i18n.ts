import { createI18n } from 'vue-i18n'

// shape of the JSON locale files: nested objects of message strings
interface MessageTree { [key: string]: string | MessageTree }
type LocaleMessages = Record<string, MessageTree>

function loadLocaleMessages (): LocaleMessages {
  const locales = import.meta.glob<{ default: MessageTree }>('./locales/*.json', { eager: true })
  const messages: LocaleMessages = {}
  for (const path in locales) {
    const matched = path.match(/([A-Za-z0-9-_]+)\./i)
    if (matched && matched.length > 1) {
      messages[matched[1]] = locales[path].default
    }
  }
  return messages
}

export default createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  // vue-i18n 8 didn't warn about HTML in messages; the hint text uses <br>
  warnHtmlMessage: false,
  messages: loadLocaleMessages()
})
