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

  const isOnline = false;
  const flutter = isOnline ? "https://clientsystem.net" : "http://127.0.0.1:8000";
  console.log(flutter);
//   let socket = io.connect(flutter,{ // [1] Important as fuck 
//       reconnectionDelay: 1000,
//       reconnection:true,
//       reconnectionAttempts: 10,
//       transports: ['websocket'],
//       agent: false, // [2] Please don't set this to true
//       upgrade: false,
//       rejectUnauthorized: false
//    });
  const width = 0.6;
  var socket;
function Flutter({onSaveSettingsFlutter, settings}) {
  
    const [startFlutter, setStartFlutter] = useState(false);

    React.useEffect(()=>{
    socket = io(flutter , { transports: ['websocket'] });
    socket.on('connect', ()=>{console.log("connected"); socket.emit("connectReact", settings);});
    socket.on('startFlutter', (data)=>{
       console.log("start flutter");
       setStartFlutter(true);
    });
    socket.on('saveSettings', (data) => {console.log("save settings"); onSaveSettingsFlutter(data)});

    //     socket.on('connect_error', ()=>{
    //       setTimeout(()=>socket.connect(),5000)
    //     })
    //    //socket.on('flutter-save-settings', saveSettingsFlutter(data));
    //    //socket.on('flutter-get-settings', socket.emit("send-settings-flutter", settings));
    //    socket.emit("sendToFlutter", "Hello Flutter!");
       
    //    //socket.on('time', (data)=>setTime(data))
    //    //socket.on('disconnect',()=>setTime('server disconnected'))
     // 
     },[])
     



    
    return (
    <>
        <main-flutter>
            <h1>Flutter Frontend</h1>
            
            <p className="instructions-flutter"> This demo is made in Flutter with Unity plugin and works also on mobile phones and tablets. Though for small screens one can use clientsystem.net/flutter to skip the web part. Chat is between playing players only. To play new game or abort current
            click on settings button left corner and join/create new game. If player aborts game it is shown in black playfield for player and the game continues for the others.
            One player can only join one game at a time. If you create a game type already offered you will join that game instead. To test multiplayer you can open this webpage in several tabs each will connect as new player.
            <br />Boardanimation can be turned on/off in settings 'General' tab and there is also an option for changing language.</p>
            
            {startFlutter && <iframe width={window.innerWidth * width} height={window.innerWidth * width * 9 / 16} src={flutter + '/flutter'}/>}

            <h2>Video of system showing multiplatform game with Unity 3d plugin</h2>
            <p className="instructions-flutter">The video is  from december 2021 and the program has been upgraded but roughly the same.</p>
            <iframe src="https://www.youtube.com/embed/IE9bFjeJQHQ" width={window.innerWidth / 4} height={window.innerHeight / 4} frameborder="0" allowfullscreen/>
            <br /><br /><br />

            <p className="instructions-flutter">Demonstration of React and Flutter integration on the web platform. The flutter client communicates with the react client through
            socket.io and uses ip address as indentifier. This communication is always availible since both React and Flutter are hosted by the (same) server.<br />Saving settings
            in the flutter app is done by the react localstorage (one handshake between react and server before starting flutter to get relative connection. 
            It could happen but almost improbable that 2 clients start at same time different computers using same ip getting mixed up. That would really not be a serious problem anyway.). 
            Therefore updating the client will not change settings and no need for cookies. Now half a year later Unity works on web and therefore in practice on all platforms with Flutter as well!</p>
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
