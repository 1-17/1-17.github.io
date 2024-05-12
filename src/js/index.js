import setMetaData from "./setMetaData.js"
import { initializeTranslation } from "./translation.js"
import scrollThroughSections from "./scrollThroughSections.js"
import setAge from "./setAge.js"

document.addEventListener("DOMContentLoaded", () => {
  setMetaData()
  initializeTranslation()
  scrollThroughSections()

  document.querySelector("#year").textContent = new Date().getFullYear()
  document.querySelector("#age").textContent = setAge
})
