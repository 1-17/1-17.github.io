import enUS from "../locales/en-us.js"
import ptBR from "../locales/pt-br.js"

const translations = {
  en: enUS,
  pt: ptBR,
  navigator: undefined
}
translations.navigator = translations[navigator.language.split("-")[0]]

const fallbackTranslation = translations.en
const translation = translations.navigator || fallbackTranslation

export const initializeTranslation = () => {
  const translationIdSelector = "."
  const translationIdSeparator = "_"

  Array.from(document.querySelectorAll("[data-translation]")).filter(element => {
    const translationId = element.dataset.translation
    const isTranslationIdEmpty = !translationId || translationId.trim() === ""
    const isTranslationIdInvalid = !isTranslationIdEmpty && !translationId.match(`^[a-z${translationIdSelector}${translationIdSeparator}]+$`)

    switch (true) {
      case isTranslationIdEmpty:
        console.error(`Missing translation identifier for${element.id ? ` '${element.id}.'` : `:\n${element.outerHTML}`}`)
        break
      
      case isTranslationIdInvalid:
        console.error(`Invalid translation identifier '${translationId}' for${element.id ? ` '${element.id}.'` : `:\n${element.outerHTML}`}. It must include only lowercase letters, '${translationIdSelector}' as selector and '${translationIdSeparator}' as separator.`)
        break
      
      default:
        return element
    }
  }).forEach(element => {
    const translationId = element.dataset.translation
    const nestedTranslationId = translationId.split(translationIdSelector)
    const selectedTranslationText = nestedTranslationId.reduce((acc, key) => acc && acc[key], translation)
    const fallbackTranslationText = nestedTranslationId.reduce((acc, key) => acc && acc[key], fallbackTranslation)

    if (!selectedTranslationText && fallbackTranslationText) {
      console.error(`Missing selected translation for '${translationId}'.`)
    }

    if (!fallbackTranslationText) {
      throw new Error(`Missing translation for '${translationId}'.`)
    }

    element.textContent = selectedTranslationText || fallbackTranslationText
  })

  document.querySelectorAll("section").forEach(section => {
    if (!section.id.startsWith("project_")) {
      if (!translation[section.id]) {
        console.error(`Section: Missing translation for '${section.id}' section.`)
        return
      }
    
      const ariaLabel = translation[section.id].label || translation[section.id].title
      section.setAttribute("aria-label", ariaLabel)
      return
    }
  
    if (!section.getAttribute("aria-labelledby")) {
      console.error(`Section: Missing label for '${section.id}' section.`)
    }
  })
  document.querySelector("#chrome_logo").alt = translation.home.logo
  document.querySelector("#card").setAttribute("aria-label", translation.about.card.label)
  document.querySelector("#card_avatar").alt = translation.about.card.avatar
  document.querySelector("#card_star").alt = translation.about.card.star
  document.querySelector("#card_cross").alt = translation.about.card.cross
  document.querySelector("#card_newspaper").alt = translation.about.card.newspaper
  document.querySelector("#card_information_list").setAttribute("aria-label", translation.about.card.list)
  document.querySelector("#education_courses_list").setAttribute("aria-label", translation.education.list)
  document.querySelector("#contact_links").setAttribute("aria-label", translation.contact_links)
  document.querySelector("#project_techs").setAttribute("aria-label", translation.projects.techs)
  document.querySelector("#project_nav").setAttribute("aria-label", translation.projects.buttons.label)
}

export default translation
