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
updateN()

function updateN(){
  nGrade.innerText = `${grades.length+1}ª`
  if (grades.length < 2) {
    btnCalcAvg.disabled = true
  }
  
 
}

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
    divAvg.classList.add('toggle')

  }
  ulGrades.innerHTML = '<ul></ul>'
  grades.forEach((grade, idx)=> {
    let li = document.createElement('li')
    li.innerHTML = `${idx+1}ª Nota: <u>${grade}</u> <span class="delete">Remover</span>`
    li.id =  `grade${idx+1}`
    li.addEventListener('click', ()=> handleDelete(idx))
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
    updateN()
  }
  else {
    divErr.classList.remove('toggle')
    pErr.innerText = 'Nota Inválida'
  }
}


function showAvg() {
  let message = ''
  divAvg.classList.remove('toggle')
  pAvg.innerHTML = `<strong>Sua média é: ${avg.toFixed(2)}</strong>`
  if (avg > 6) {
    pAvg.classList.add('blue')
    message = 'Aprovado!'
  }
  else {
    pAvg.classList.add('red')
    message = 'Reprovado!'
  }
  setTimeout(()=> {
      pAvg.innerHTML += `<br>Você foi ${message}`
    }, 1000)
  
}

function calcAvg(){
  let avgInner = 0
  inputGrade.disabled = true
  btnCalcAvg.disabled = true
  btnReset.disabled = false
  grades.forEach(grade=> {
    avgInner += grade
  })
  avgInner /= grades.length
  
  avg = avgInner
  showAvg()
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