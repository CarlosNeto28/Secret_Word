//CSS
import './App.css';


//React
import {useCallback,useEffect, useState} from 'react'


//data
import {wordsList} from './data/word'

//components
import StartScreen from './Components/StartScreen';
import Game from './Components/Game';
import GameOver from './Components/GameOver';

 
const stages = [
  {id:1, name:"start"},
  {id:2, name:"game"},
  {id:3, name:"end"},
  ]

  var guessesNumber = 3
function App() {
  const[gameStage, setGameStage] = useState(stages[0].name)
  const [words] = useState(wordsList)

  const [pickedWord, setPickedWord] = useState("")
  const [pickedCategory, setPickedcategory] = useState("")
  const [letters, setLetters] = useState([])

  const [guessedLetters, setGuessedLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [guesses, setGuesses] = useState(guessesNumber)
  const [score, setScore] = useState(0)

  const pickWordAndCategory = useCallback(()=>{
    //pick a random category

    //Object.keys porque as keys da wordList são objetos
    const categories = Object.keys(words)
    //length tá servindo pra pegar uma das keys em específico 
    const category = categories[Math.floor(Math.random()* Object.keys(categories).length)]

    

    //pick a random word

    const word = words[category][Math.floor(Math.random()* words[category].length)]
    //ficará words category porque no será um número x dependendo de qual categoria for pega
  
    return {word, category}
  }, [words])



//Start the game
 const startGame = useCallback(()=>{
  clearLettersStates()
    

    //pick word and category
   const {word, category} = pickWordAndCategory()

   //create an array of letters
    let wordLetters = word.split("")
    
    wordLetters = wordLetters.map((l)=>l.toLowerCase())
    //Para que não dê erro por conta de letras maiúsculas 
  
   //fill states
   setPickedWord(word)
   setPickedcategory(category)
   setLetters(wordLetters)
   setGameStage(stages[1].name)
 },[pickWordAndCategory])




//Verify and process the letter
const verifyLetter = (letter)=>{
 
 const normalizedLetter = letter.toLowerCase()

 //check if letter has already been utilized
  if(guessedLetters.includes(normalizedLetter)
  ||
  wrongLetters.includes(normalizedLetter))
  {
    return
  }
  //push guessed letter or remove a guess
  if(letters.includes(normalizedLetter)){
    setGuessedLetters((actualGuessedLetters)=>[
      ...actualGuessedLetters,
      normalizedLetter,

    ])
  }else{
    setWrongLetters((actualWrongLetters)=>[
      ...actualWrongLetters,
      normalizedLetter,

    ])

    setGuesses((actualGuesses)=> actualGuesses - 1) 

  }
  
}
  const clearLettersStates = ()=>{
    setGuessedLetters([])
    setWrongLetters([])

  }

  useEffect(()=>{

  if(guesses<=0){
    //reset all states
    clearLettersStates()

    setGameStage(stages[2].name)

  }

},[guesses])
//nos arrays é o que o use effect irá monitorar

//check win condition
useEffect(()=>{

  const uniqueLetters = [...new Set(letters)]
  //irá pegar o letters e tirar as letras que vierem repetidas

  //win condition
  if(guessedLetters.length === uniqueLetters.length){
    //add score
    setScore((actualScore)=>actualScore +=100)    

    //restart game with new word
    startGame()
  }

},[guessedLetters, letters, startGame])

//restarts the game
const retry = ()=>{
  setScore(0)
  setGuesses(guessesNumber)

  setGameStage(stages[0].name)
}

  return (
    <div className="App">
     {gameStage ==="start"&& <StartScreen startGame={startGame}/>}
     {gameStage ==="game"&& <Game
     //states
      verifyLetter={verifyLetter}
      pickedWord={pickedWord}
      pickedCategory={pickedCategory}
      letters={letters}
      guessedLetters={guessedLetters}
      wrongLetters={wrongLetters}
      guesses={guesses}
      score={score}
     />}
     {gameStage ==="end"&& <GameOver retry={retry} score={score}/>}
    </div>
  );
}

export default App;
