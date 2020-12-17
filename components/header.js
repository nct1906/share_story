import {redirect} from '../index.js'
const style=`
i,img,button{
    width:5vw;
   height:5vw;
   
       }
  
   div{
       display:flex;
       justify-content:space-between
       }
   .container{
       background-color:#4B708A;
       align-items: center;
       height:5vw;
       padding:0 5vw;
       
   }
   .logo{
       align-items: center;
   }
   *{
       margin:00;
       padding:00;
   }
   .brand{
       font-size:4rem;
       color:white;
       font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif
   }
   .fa, .logo{
       font-size:5vw;
       color:white
   }
   .btn{
       background-color: transparent;
       border:none;
       cursor: pointer;
       padding-left: 2vw;
       outline:none;
       
   }
  
`
export class StoryHeader extends HTMLElement{
    constructor(){
        super()
        this._shadowDom=this.attachShadow({mode:'open'})
    }
    connectedCallback(){
        this._shadowDom.innerHTML=`
        <link rel="preconnect" href="https://fonts.gstatic.com">
        
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <style>${style}</style>
        <div class="container">
            <div class="logo">
                <i class="fa fa-globe" aria-hidden="true"></i>
    
            <h1 class="brand">Share Story</h1>
            </div>
            <div class="user-info">
            <div>
                <i class="fa fa-user button" aria-hidden="true"></i>
            
            <button class="btn" ><i id="btn" class="fa fa-sign-out" aria-hidden="true"></i></button>
            </div>
            </div>
            </div>
        `
     
        const btn=this._shadowDom.getElementById('btn')
        
        btn.addEventListener('click',() => redirect('login'))
        
        
       
       
        
}
}
window.customElements.define('story-header',StoryHeader)