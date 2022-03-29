import React from "react"
import './Meme.css';
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

function Meme({isCompletedLoading, memes, startLoadingMemes, onSaveMeme}) {
    const [meme, setMeme] = React.useState({
        id: "61579",
        topText: "One Does Not Simply",
        bottomText: "Walk Into Mordor",
        imageUrl: "https://i.imgflip.com/1bij.jpg",
    })
    
    
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
        <main>
            <div className="form">
                <input 
                    type="text"
                    placeholder="Top text"
                    className="form--input"
                    name="topText"
                    value={meme.topText}
                    onChange={handleChange}
                />
                <input 
                    type="text"
                    placeholder="Bottom text"
                    className="form--input"
                    name="bottomText"
                    value={meme.bottomText}
                    onChange={handleChange}
                />
                {isCompletedLoading ? 
                <button 
                    className="form--button"
                    onClick={getMeme}
                >
                    Get a new meme image 🖼
                </button> :
                <p>Loading...</p>
                }
            </div>
            <div className="meme">
                <img src={meme.imageUrl} className="meme--image" />
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
        </main>
    )
}

const mapStateToProps = (state) => ({
    isCompletedLoading: getMemesLoading(state),
    memes: getMemes(state),
  });
  
  
  const mapDispatchToProps = (dispatch) => ({
    startLoadingMemes: () => dispatch(loadMemes()),
    onSaveMeme: (meme) => dispatch(saveMeme(meme)),
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(Meme);
  