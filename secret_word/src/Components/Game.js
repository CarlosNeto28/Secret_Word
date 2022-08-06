import './Game.css'
import { useState, useRef } from 'react'
const Game = ({verifyLetter, 
    pickedWord,
    pickedCategory,
    letters,
    guessedLetters,
    wrongLetters,
    guesses,
    score}) => {


        const [letter, setLetter] = useState("")
        const letterInputRef = useRef(null)
        //useRef serve para dar referência a algum elemento
        const handleSubmit= (e)=>{
            e.preventDefault()

            verifyLetter(letter)
            setLetter("")
            letterInputRef.current.focus()
            //com isso fará com que não perca o foco no input para digitar novas letras
        }
  return (
         <div className="game">
            <p className='points'>
                <span> pontuação: {score}</span>
            </p>
            <h1>Adivinhe a palavra</h1>
            <h3 className='tip'>
                Dica sobre a palavra: <span>{pickedCategory}</span>
            </h3>
            <p>Ainda restam {guesses} tentativas</p>
            <div className="wordContainer">
                {letters.map((letter, i)=>(guessedLetters.includes(letter)?
                (<span key={i} className='letter'>{letter}</span>)
                :
                (<span key={i} className='blankSquare'></span>)
                ))}
            </div>
            <div className="letterContainer">
                <p>Tente adivinhar uma letra</p>
                <form onSubmit={handleSubmit}>
                    <input 
                    type="text"
                    name='letter'
                    maxLength="1"
                    required
                    onChange={(e)=> setLetter(e.target.value)}
                    value={letter}
                    ref={letterInputRef}
                    
                        />
                    <button>Jogar!</button>
                </form>
                <div className="wrongLetters">
                    <p>Letras utilizadas</p>
                    {wrongLetters.map((letter, i)=>(<span key={i}>{letter},</span>))}
                </div>
            </div>
         </div>  
  )
}

export default Game