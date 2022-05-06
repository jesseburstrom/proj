import React from "react"
import './Logger.css';
import { connect } from "react-redux";
import {
    getMemes,
    getMemesLoading,
  } from "../selectors";
import {
loadMemes,
} from "../thunks";
import {
saveMeme,
} from "../actions";

function Logger({isCompletedLoading, memes, startLoadingMemes, onSaveMeme}) {
    const [log, setLog] = React.useState([]);


    React.useEffect(() => {
        startLoadingMemes();
    }, [])

    function getMeme() {        
        onSaveMeme(meme);
        const randomNumber = Math.floor(Math.random() * memes.length)

        setMeme(memes[randomNumber]);
    }

    function handleChange(event) {
        const {name, value} = event.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }

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

const mapStateToProps = (state) => ({
    isCompletedLoading: getMemesLoading(state),
    memes: getMemes(state),
  });
  
  
  const mapDispatchToProps = (dispatch) => ({
    startLoadingMemes: () => dispatch(loadMemes()),
    onSaveMeme: (meme) => dispatch(saveMeme(meme)),
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(Logger);
  