import React from "react";
import { connect } from "react-redux";
import { initBricks, moveBrick, setGameSize } from "../actions";
import { getBricks, getGameSize, getCodes, getIsLoadingCodes, getIsCompletedLoadingCodes } from "../selectors";
import { loadCodes } from "../thunks";
import Brick from "./Brick";
import Confetti from "react-confetti";
import { CSSTransition } from "react-transition-group";
import '../App.css';
import './BrickGame.css';
import { Dropdown, DropdownGen, DropdownTxt } from "../components/Dropdown";
import { Highlighter } from "../components/Highlighter";
import * as themes from "react-syntax-highlighter/dist/esm/styles/hljs";
import * as languages from "react-syntax-highlighter/dist/esm/languages/hljs";


const defaultLanguage = `${"javascript" || Object.keys(languages).sort()[0]}`;
const defaultTheme = `${"sunburst" || Object.keys(themes).sort()[0]}`;
const gameModes = [2, 3, 4, 5];

function BrickGame({bricks, gameSize, onInitBricks, onMoveBrick, onSetGameSize, codes, onLoadCodes, isLoadingCodes, isCompletedLoadingCodes}) {
  const [language, setLanguage] = React.useState(defaultLanguage);
  const [theme, setTheme] = React.useState(defaultTheme);
  const [showCode, setShowCode] = React.useState(false);
  const [codeFile, setCodeFile] = React.useState('BrickGame.js');

  React.useEffect(async ()  =>  {
    onInitBricks(allNewBricks());
    if (!isLoadingCodes) {
      onLoadCodes(['https://raw.githubusercontent.com/jesseburstrom/proj/master/src/brickgame/BrickGame.js', 
      'https://raw.githubusercontent.com/jesseburstrom/proj/master/src/brickgame/Brick.js', 
      'https://raw.githubusercontent.com/jesseburstrom/proj/master/src/brickgame/BrickGame.css']);
    }
    
  }, [gameSize]);

  function isWon() {
    let isWon = true;
    for (let i = 0; i < bricks.length - 1; i++) {
      isWon = isWon && bricks[i].value === i + 1;
    }
    return isWon;
  }

  // Can create non-solvable shuffle (actually exactly 50% of times), better way is shuffleBricks
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));   
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function shuffleBricks(array) {
    var deltaX, deltaY, zeroBrick, swapCandidate;
    for (let i = 0; i < 1000; i++) {
      zeroBrick = array.indexOf(0);
      // Brute force search for movable brick given zeroBrick to simplify programming, goes quick enough anyway
      do {
        swapCandidate = Math.floor(Math.random() * array.length);
        deltaX = Math.abs((zeroBrick % gameSize) - (swapCandidate % gameSize));
        deltaY = Math.abs(Math.floor(zeroBrick / gameSize) - Math.floor(swapCandidate / gameSize));
      } while (deltaX + deltaY !== 1)
      // now swapCandidate is valid
      [array[zeroBrick], array[swapCandidate]] = [array[swapCandidate], array[zeroBrick]];
    }
    return array;
  }



  function allNewBricks() {
    const newBricks = [];
    const startBricks = [...Array(gameSize * gameSize).keys()].map(num => num == gameSize * gameSize - 1 ? 0 : num + 1);
    const shuffledBricks = shuffleBricks(startBricks);
    
    for (let i = 0; i < gameSize * gameSize; i++) {
      newBricks.push({
        id: i,
        value: shuffledBricks[i],
        // x-position 0-gameSize-1, y-position 0-gameSize-1
        xPos: i % gameSize,
        yPos: Math.floor(i / gameSize),
        animationClass: "",
      });
    }
    return {gameSize: gameSize, data: newBricks};
  }

  const brickElements = bricks.length > 0 ? bricks.map((brick) => {
    return (
      <CSSTransition
        key={brick.id}
        in={bricks[brick.id].value > 0}
        timeout={300}
        classNames={brick.animationClass}
      >
        <Brick value={brick.value} moveBrick={() => onMoveBrick(brick.id)} />
      </CSSTransition>
    );
  }) : null;

  const style = {
    gridTemplate: `auto auto / repeat(${gameSize}, 1fr)`,
  };
  
  return (
    <>
    {isWon() && <Confetti />}
    <div className="PanelsBox">
      <div className="main">
        
        <h1 className="title">{gameSize*gameSize-1} Game</h1>
        <p className="instructions">
          Click on brick next to empty square to move. When 1-{gameSize*gameSize-1} is aligned from
          top left to bottom right you have won (Confetti Prize!).
        </p>
        <div className="brick-container" style={style}>{brickElements}</div>
        
        <div className="ControlsBox">
        <p>Game Size:</p>
          <DropdownGen
                selected= {gameModes.indexOf(gameSize)}
                onChange={(e) => onSetGameSize(gameModes[e.target.value])}
                data={gameModes.map(mode => mode.toString() + "x" + mode.toString())}
          />
          <button
            className="shuffle-bricks"
            onClick={() => {
              onInitBricks(allNewBricks());
            }}
          >
            Shuffle
          </button>
        </div>
      </div>
      
      <button className="ShowCodeButton"
       onClick={(e) => setShowCode(prev=>!prev)}>{showCode ? "Hide Code" : "Show Code"}</button>
      {!isCompletedLoadingCodes ? <p>Loading Codes...</p> :
        showCode && 
        <>   
          <div className="ControlsBox">
          File
            <DropdownTxt
                selected={codeFile}
                onChange={(e) => setCodeFile(e.target.value)}
                data={['BrickGame.js', 'Brick.js', 'BrickGame.css']}
            />
            Color Templates
            <Dropdown
                defaultTheme={defaultTheme}
                onChange={(e) => setTheme(e.target.value)}
                data={{irBlack:themes.irBlack, sunburst:themes.sunburst, stackoverflowLight:themes.stackoverflowLight, isblEditorLight:themes.isblEditorLight}}
            />
           
            </div>
            
          <div className="CodeBox">
          
            <Highlighter language={language} theme={themes[theme]}>
              {codes.find(code => code.file === codeFile).code}
            </Highlighter>
          </div>
        </>
      }
    </div>
    </>
  );
}

const mapStateToProps = state => ({
  bricks: getBricks(state),
  gameSize: getGameSize(state),
  codes: getCodes(state),
  isCompletedLoadingCodes: getIsCompletedLoadingCodes(state),
  isLoadingCodes: getIsLoadingCodes(state),
});

const mapDispatchToProps = dispatch => ({
  onInitBricks: bricks => dispatch(initBricks(bricks)),
  onMoveBrick: id => dispatch(moveBrick(id)),
  onSetGameSize: gameSize => dispatch(setGameSize(gameSize)),
  onLoadCodes: (codeUrls) => dispatch(loadCodes(codeUrls)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BrickGame);
