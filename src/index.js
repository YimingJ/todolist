import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

    let data = getData();
    let count = getCount();
    function getCount(){
        if(!window.localStorage){
            alert("浏览器支持localstorage");
        }else{
            let data=localStorage.getItem("count");
            if(!data){
                
                localStorage.setItem("count",1);
                return data;
            }
            return JSON.parse(data);
        }
    }
    function getData(){

    if(!window.localStorage){
        alert("浏览器支持localstorage");
    }else{
        let data=localStorage.getItem("data");
        if(!data){
            data = [{id: 0, text: 'welcome!!!',complete:false}];
            let dataStr = JSON.stringify(data);
            localStorage.setItem("data",dataStr);
            return data;
        }
        return JSON.parse(data);
    }
   }

ReactDOM.render(<App data = {data} count = {count}/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
