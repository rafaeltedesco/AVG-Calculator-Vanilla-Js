var nGrade = document.querySelector('#nGrade')

var grades = []
var avg = null
var btnAvg = document.querySelector('#btnCalcAvg')
var btnReset = document.querySelector('#btnReset')
var divGrades = document.querySelector('#divGrades')
var btnAddGrade = document.querySelector('#btnAddGrade')
var ulGrades = document.querySelector('#ulGrades')
var divAvg = document.querySelector('#divAvg')
var pAvg = document.querySelector('#pAvg')
var registering = false
var inputGrade = document.querySelector('#grade')
var divErr = document.querySelector('#divErr')
var pErr = document.querySelector('#pErr')


inputGrade.addEventListener('change', function() {
  if (this.value && !registering) {
    toggleBtn(btnAddGrade)
  }
  else if (!this.value) {
    toggleBtn(btnAddGrade)
  }
})


function toggleBtn(btn) {
  btn.disabled = !btn.disabled
  if (btn.id == 'btnAddGrade') { registering = !registering 
  }
}

function checkGrade(grade) {
  return grade >= 0 && grade <= 10 ? grade : null
}

function getGrade() {
  return checkGrade(parseFloat(inputGrade.value))
}

function showGrades() {
  if (!grades.length) {
    divGrades.classList.add('toggle')
  }
  if (grades.length == 1) {
    divGrades.classList.remove('toggle')
  }
  ulGrades.innerHTML = '<ul></ul>'
  grades.forEach(grade=> {
    let li = document.createElement('li')
    li.innerHTML = grade + `<span id="grade${grade}>X</span>`
    ulGrades.appendChild(li)    
  })
}

function addGrade(){
  let grade = getGrade()
  if (grade) {
    if (!divErr.classList.contains('toggle')) {
      divErr.classList.add('toggle')
      pErr.innerText = ''
    }
    grades.push(grade)
    inputGrade.value=''
    inputGrade.focus()
    toggleBtn(btnAddGrade)
    if (grades.length == 2) {
      toggleBtn(btnCalcAvg)
    }
    showGrades()
  }
  else {
    divErr.classList.remove('toggle')
    pErr.innerText = 'Nota Inválida'
  }
}


function showAvg() {
  divAvg.classList.remove('toggle')
  pAvg.innerText = `Sua média é: ${avg.toFixed(2)}`
}

function calcAvg(){
  inputGrade.disabled = true
  grades.forEach(grade=> {
    avg += grade
  })
  avg /= grades.length
  showAvg()
  toggleBtn(btnCalcAvg)
  toggleBtn(btnReset)
  
}

function reset() {
  toggleBtn(btnReset)
  grades = []
  avg = 0
  divAvg.classList.add('toggle')
  pAvg.innerText = ''
  inputGrade.disabled = false
  inputGrade.focus()
  showGrades()

}