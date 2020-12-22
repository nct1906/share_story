const style=`
    <style>
          
    *{
        margin:00;
        padding:00;
    }
    .list-posts{
        margin:5vh auto;
        width:60%;
        
       
    }
    html{
        font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
        font-size:15px;
        
    }
    .author-name{
        font-weight:600;
        font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    font-size:20px;
    }
    .time{
        font-size:12px;
        color:#222222;
        font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
   
    }
    .post-item{
        border-radius:10px;
        border:1px solid #162737;
        padding:2vw;
        font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    
        
    }
    .image img{
       height:20vh
       
    }
    </style>
    `
import {convertDate} from '../screens/utils.js'
export class PostItem extends HTMLElement{
    constructor(){
        super()
        this._shadowRoot=this.attachShadow({mode:'open'})

    }
    connectedCallback(){
    this.author=this.getAttribute('author')
    this.time=convertDate(this.getAttribute('time'))
    this.content=this.getAttribute('content')
    this.img=this.getAttribute('img')
    const imgElm=this.img  ? `<div class="image"><img src="${this.img}"></div>`: ''
    
    this._shadowRoot.innerHTML=`
    ${style}
    <div class="list-posts">
        <div class="post-item">
            <div class="author-name">${this.author}</div>
            <div class="time">${this.time}</div>
            ${imgElm}
            <br>
            <div class="content">
               ${this.content}
            </div>
        </div>
    </div>
    `
    }
    

}
window.customElements.define('post-item',PostItem)