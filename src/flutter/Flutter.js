import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "./Flutter.css";
import { io } from 'socket.io-client';
import {
    getFlutterSettings
  } from "../selectors";
import {
    saveSettingsFlutter,
  } from "../actions";

  const isOnline = true;
  const flutter = isOnline ? "https://clientsystem.net/flutter" : "http://localhost:8000/flutter";
  const socket = io(flutter);


function Flutter({onSaveSettingsFlutter, settings}) {
  
    const [startFlutter, setStartFlutter] = useState(false);
    React.useEffect(()=>{
        
         socket.on('connect', ()=>{socket.emit("connectReact", settings); console.log("connected")});
    //     socket.on('connect_error', ()=>{
    //       setTimeout(()=>socket.connect(),5000)
    //     })
    //    //socket.on('flutter-save-settings', saveSettingsFlutter(data));
    //    //socket.on('flutter-get-settings', socket.emit("send-settings-flutter", settings));
        socket.on('startFlutter', (data)=>{
            console.log("start flutter");
            setStartFlutter(true);
         });
         socket.on('saveSettings', (data) => {onSaveSettingsFlutter(data)});
    //    socket.emit("sendToFlutter", "Hello Flutter!");
       
    //    //socket.on('time', (data)=>setTime(data))
    //    //socket.on('disconnect',()=>setTime('server disconnected'))
     
     },[])
    

    
    return (
    <>
        <main-flutter>
            <h1>Flutter Frontend</h1>
            
            <p className="instructions-flutter">When your turn press 'Roll' dice the one right of the 4-6 dices in row. 3 rolls and if you want to hold/unhold one dice click on it. 
            Choose the result you like most. On top of game board (1-6) for 'Ordinary' game the rule is 3 of each gives total 63 as sum gives bonus. Chat is between playing players only. To play new game or abort current
            click on settings button right corner and join/create new game. If player aborts game it is shown in black playfield for player and the game continues for the others.
            One player can only join one game at a time. If you create a game type already offered you will join that game instead. To test multiplayer you can open this webpage in several tabs each will connect as new player.
            <br />4-6 (depending on game mode) dices of same value gives Yatzy.<br />Boardanimation can be turned on/off in settings 'General' tab and there is also an option for changing language.</p>
            
            {startFlutter && <iframe width={window.innerWidth / 2} height={window.innerHeight / 2} src={flutter}/>}

            <h2>Video of system showing multiplatform game with Unity 3d plugin</h2>
            <p className="instructions-flutter">The video is  from december 2021 and the program has been upgraded but roughly the same.</p>
            <iframe src="https://www.youtube.com/embed/IE9bFjeJQHQ" width={window.innerWidth / 4} height={window.innerHeight / 4} frameborder="0" allowfullscreen/>
            <br /><br /><br />

            <p className="instructions-flutter">Demonstration of React and Flutter integration on the web platform. The flutter client communicates with the react client through
            socket.io and uses ip address as indentifier. This communication is always availible since both React and Flutter are hosted by the (same) server.<br />Saving settings
            in the flutter app is done by the react localstorage (one handshake between react and server before starting flutter to get relative connection. 
            It could happen but almost improbable that 2 clients start at same time different computers using same ip getting mixed up. That would really not be a serious problem anyway.). 
            Therefore updating the client will not change settings and no need for cookies.</p>
        </main-flutter>
    </>
    );
};
// {id !== "" && <iframe width={window.innerWidth / 2} height={window.innerHeight / 2} src={"http://localhost:8000/flutter?reactId=" + socket.id}/>}
            
const mapStateToProps = (state) => ({
    settings: getFlutterSettings(state),
});
  
  
const mapDispatchToProps = (dispatch) => ({
    onSaveSettingsFlutter: (settings) => dispatch(saveSettingsFlutter(settings)),
});
  
export default connect(mapStateToProps, mapDispatchToProps)(Flutter);
