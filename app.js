const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

var sQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  sQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(sQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (sQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'What is the traditional dessert you would eat at Christmas in England ?',
    answers: [
      { text: 'Pudding', correct: true },
      { text: 'Crumble', correct: false }
    ]
  },
  {
    question: 'How is the anthem of the United Kingdom called ?',
    answers: [
      { text: ' God save the Queen', correct: true },
      { text: ' The Star-Spangled Banner', correct: false },
      { text: ' Advance Australia Fair', correct: false },
    ]
  },
  {
    question: 'What are the nations composing the United Kingdom ?',
    answers: [
      { text: 'England, Ireland, Iceland and Scotland', correct: false },
      { text: 'England, Northern Ireland, Wales and Scotland', correct: true },
      { text: ' England, Scotland, Wales and Ireland', correct: false },
      { text: 'England and Scotland', correct: false },
    ]
  },
  {
    question: 'New York is also referred to as the :',
    answers: [
      { text: 'City of Angels', correct: false },
      { text: 'Big Apple', correct: true }
    ]
  }
]