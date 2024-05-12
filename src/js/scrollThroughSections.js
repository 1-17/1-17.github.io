const scrollThroughSections = () => {
  const sections = document.querySelectorAll("section")
  let currentSectionIndex = 0

  const scrollToNextSection = () => {
    if (currentSectionIndex < sections.length - 1) {
      currentSectionIndex++
      sections[currentSectionIndex].scrollIntoView()
    }
  }

  const scrollToPreviousSection = () => {
    if (currentSectionIndex > 0) {
      currentSectionIndex--
      sections[currentSectionIndex].scrollIntoView()
    }
  }

  if (window.scrollY !== 0) {
    window.scrollTo({ top: 0 })
  }

  document.addEventListener("wheel", (e) => {
    if (e.deltaY > 0) {
      scrollToNextSection()
      return
    }
    
    scrollToPreviousSection()
  })

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      scrollToNextSection()
    }

    if (e.key === "ArrowUp") {
      e.preventDefault()
      scrollToPreviousSection()
    }
  })
}

export default scrollThroughSections
