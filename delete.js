function handleDelete(id) {
  grades.splice(id, 1)
  showGrades()
  inputGrade.disabled = false
  inputGrade.focus()
  if (grades.length > 1) {
    calcAvg()
  }
  updateN()
}