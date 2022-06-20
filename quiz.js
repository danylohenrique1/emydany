var quiz = document.getElementById('quiz')

var points = 0 //inicia a pontuação com 0
var answer = null
var Vnext = true
var color

//escreve na tela a pontuação
function writePoints(points) {
  var elPoints = document.getElementById('points')
  elPoints.textContent = 'Pontuação: ' + points
}

//cria o objeto com o metodo construtor
function Question(
  index,
  title,
  alternative1,
  alternative2,
  alternative3,
  alternative4,
  correctAlternative
) {
  this.index = index
  this.title = title[0].toUpperCase() + title.substring(1)
  this.alternative1 = alternative1
  this.alternative2 = alternative2
  this.alternative3 = alternative3
  this.alternative4 = alternative4
  this.correctAlternative = correctAlternative
  console.log(this.correctAlternative)

  if (answer != null && Vnext == false) {
    console.log(this.correctAlternative)
    receiveAlternative(this.correctAlternative)
  }

  if (Vnext == true) {
    writeDados(
      this.index,
      this.title,
      this.alternative1,
      this.alternative2,
      this.alternative3,
      this.alternative4
    )
  }
}
function Fcolor(opcao) {
  var elColor = document.getElementById(color)
  var elColorRadio = document.getElementById(color.substring(4).toLowerCase())
  var elNextColor = document.getElementById('next')

  var green
  if (opcao == 'green') {
    elColor.classList.add('green')
    elColorRadio.classList.add('greenRadio')
    elNextColor.classList.add('greenNext')
    green = true
  } else {
    elColor.classList.add('red')
    elColorRadio.classList.add('redRadio')
    elNextColor.classList.add('redNext')

    green = false
  }

  if (opcao == 'remove') {
    console.log(opcao)
    console.log('tem que remover')
    elColor.classList.remove('green')
    elColor.classList.remove('red')

    elColorRadio.classList.remove('greenRadio')
    elColorRadio.classList.remove('redRadio')

    elNextColor.classList.remove('greenNext')
    elNextColor.classList.remove('redNext')
  }
}

function receiveAlternative(alternativeCorrected) {
  color = 'TextAlternative' + answer.id.charAt(11)

  if (answer.id == alternativeCorrected) {
    points++
    writePoints(points)

    Fcolor('green')
  } else {
    Fcolor('red')
  }
}

//função encarregada de escrever os dados na tela.
//É ativada ao metodo construtor ser utilizado
function writeDados(
  index,
  title,
  alternative1,
  alternative2,
  alternative3,
  alternative4
) {
  var elIndex = document.getElementById('index')
  elIndex.textContent = index + '.'

  var elTitle = document.getElementById('question')
  elTitle.textContent = title

  var elAlternative1 = document.getElementById('TextAlternative1')
  elAlternative1.textContent = alternative1

  var elAlternative2 = document.getElementById('TextAlternative2')
  elAlternative2.textContent = alternative2

  var elAlternative3 = document.getElementById('TextAlternative3')
  elAlternative3.textContent = alternative3

  var elAlternative4 = document.getElementById('TextAlternative4')
  elAlternative4.textContent = alternative4
}

//inicia um objeto do metodo construtor de acordo com o index
//swith case é utilizado para que cada objeto seja iniciado no tempo certo
function passQuestion(index) {
  switch (index) {
    case 1:
      var question1 = new Question(
        1,
        'Melhor doce do mundo: ',
        'KitKat',
        'Paçoca',
        'Fini',
        'Bolete',
        'alternative2'
      )
      console.log(question1.correctAlternative)

      break

    case 2:
      var question2 = new Question(
        2,
        'Cor mais linda do mundo: ',
        'Azul',
        'Vermelho',
        'A dos seus olhos',
        'Verde',
        'alternative3'
      )
      break

    case 3:
      var question3 = new Question(
        3,
        'Lugar mais seguro do mundo:',
        'Seu abraço',
        'Bunker AntiBomba',
        'Torre dos vingadores',
        'Base militar',
        'alternative1'
      )

      break

    case 4:
      var question4 = new Question(
        4,
        'Cois mais linda do mundo: ',
        'Estatua da liberdade',
        'Seu sorriso',
        'Paisagem da natureza',
        'Bolsonaro fora da presidencia',
        'alternative2'
      )
      console.log(question4)

      break

    case 5:
      var question5 = new Question(
        5,
        'Melhor coisa do mundo: ',
        'Chuva, filme e pipoca',
        'Achar dinheiro que não lembrava que tinha',
        'Dormir até 12h',
        'Seu beijo',
        'alternative4'
      )

      break
  }
}

//inicia o index em 1
var index = 1
passQuestion(index) //passa o valor 1 do index para a função que inicia os objetos assim que a tela é carregada

//função que recebe a resposta do usuario, aumenta o index para que a proxima resposta seja exibida
function passaResposta() {
  answer = document.querySelector('input[name="alternative"]:checked')
  Vnext = false
  toggleButtons('passaResposta')
  passQuestion(index)
  index++
}

function next() {
  Vnext = true
  passQuestion(index)
  toggleButtons('next')

  Fcolor('remove')
  if (index == 6) {
    endGame()
  }
}

function toggleButtons(toggle) {
  var elAnswer = document.getElementById('aswer')
  var elNext = document.getElementById('next')

  elAnswer.classList.toggle('hidden')
  elNext.classList.toggle('hidden')
}

function endGame(params) {
  writePoints(points)

  var elForm = document.getElementById('form')
  elForm.classList.toggle('hidden')

  var elCongratulations = document.getElementById('congratulations')
  elCongratulations.classList.toggle('hidden')

  if (points >= 3) {
    elCongratulations.innerHTML = '<h1>' + 'Parabens pelo resultado' + '<h1>'
  } else {
    elCongratulations.innerHTML = '<h1>' + 'Que notinha mixuruca' + '<h1>'
  }
}
