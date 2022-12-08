/**
 * This file will automatically be loaded by webpack and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import './index.css';
import "./pure-min.css";
import axios from "axios";

function setIntervalX(callback,delay,repetitions){
    var x=0;
    var intervalID = window.setInterval(()=>{
        callback();
        if(++x===repetitions){
            window.clearInterval(intervalID)
        }
    },delay);
}

function getData(city){
    axios.get(`https://weatherzapi.up.railway.app/api/weather/${city}`)
    .then(res=>{
        const sky=res.data.sky;
        let temp=res.data.temp;
        document.getElementById("winfo").innerHTML="";
        temp = temp.split("°")
        temp=Math.round((temp[0]-32)*5/9)
        temp = String(temp) + "°C"
        const tempD=document.createElement("h2");
        tempD.style.marginTop="0px";
        tempD.innerHTML=temp
        document.getElementById("winfo").appendChild(tempD);
        const skyD=document.createElement("h3");
        skyD.innerHTML=`sky: ${sky}`
        document.getElementById("winfo").appendChild(skyD); 
        console.log(sky,temp);
        const NOTIFICATION_TITLE = 'Weather Update'
        const NOTIFICATION_BODY = `\n City:${city} \n Temp:${temp} \n Sky:${sky}`

        new Notification(NOTIFICATION_TITLE, { body: NOTIFICATION_BODY ,icon:"./favicon.ico"})
        .onclick = () => {
            document.getElementById("winfo").innerHTML="";
            const tempD=document.createElement("h2");
            tempD.style.marginTop="0px";
            tempD.innerHTML=temp
            document.getElementById("winfo").appendChild(tempD);
            const skyD=document.createElement("h3");
            skyD.innerHTML=`sky: ${sky}`
            document.getElementById("winfo").appendChild(skyD); 
        }
        /* setIntervalX(()=>{
            const NOTIFICATION_TITLE = 'Weather Update'
            const NOTIFICATION_BODY = `Temp:${temp} \n Sky:${sky}`

            new Notification(NOTIFICATION_TITLE, { body: NOTIFICATION_BODY })
            .onclick = () => {
                document.getElementById("winfo").innerHTML="";
                const tempD=document.createElement("h2");
                tempD.style.marginTop="0px";
                tempD.innerHTML=temp
                document.getElementById("winfo").appendChild(tempD);
                const skyD=document.createElement("h3");
                skyD.innerHTML=`sky: ${sky}`
                document.getElementById("winfo").appendChild(skyD); 
            }
        },1800000,10) */
    })
}

window.addEventListener("DOMContentLoaded",()=>{

    document.getElementById("submit").addEventListener("click",()=>{
        const city = document.getElementById("cityn").value;
        getData(city);
    },false);
},false)



console.log('👋 This message is being logged by "renderer.js", included via webpack');
