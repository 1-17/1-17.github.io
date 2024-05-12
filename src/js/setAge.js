import translation from "./translation.js"

const setAge = () => {
  const currentDate = new Date()
  const birthDate = new Date("1996-11-17")
  const noBirthdayYet = currentDate.getTime() < new Date(currentDate.getFullYear(), birthDate.getMonth(), birthDate.getDate()).getTime()
  const yearDifference = currentDate.getFullYear() - birthDate.getFullYear()
  let ageNumber = yearDifference
  
  if (noBirthdayYet) {
    ageNumber = yearDifference - 1
  }

  return `${ageNumber} ${translation.about.card.age.years}`
}

export default setAge()
