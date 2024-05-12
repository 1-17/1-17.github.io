import translation from "./translation.js"

const setMetaData = () => {
  const newTitle = ` | ${translation.title}`

  document.querySelector("#title").textContent += newTitle
  document.querySelectorAll("[name='title']").forEach(title => title.content += newTitle)
  document.querySelectorAll("[name='description']").forEach(description => description.content = translation.meta.description)
  document.querySelector("[name='keywords']").content = translation.meta.keywords
}

export default setMetaData
