import { getItemLocalStorage } from "../screens/utils.js"

const style=`
#create-post{
    width:60%;
    margin:auto;
    margin-top:3vh;
    text-align:right;
}
#create-post textarea{
    width:100%;
    border:1px solid;
    outline:none;
    font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    font-size:15px;
    height:35vh;
}
#post{
    background-color:#4B708A;
    color:#fff;
    padding:10px 15px;
    border-radius:5px;
    font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    font-size:20px;
    width:100%;
    border:none;
    font-weight:400;
    margin:5px;
}
#post:hover{
    background-color:#0195A3;
}
`
class CreatePost extends HTMLElement{
    constructor(){
        super()
        this._shadowDom=this.attachShadow({mode:'open'})
    }
    connectedCallback(){
        this._shadowDom.innerHTML=`
        <style>${style}</style>
        <form id="create-post">
            <textarea name="content" rows="6"></textarea>
            <button id="post">Post</button>
        </form>`
        
        const postForm=this._shadowDom.getElementById('create-post')
        postForm.addEventListener('submit', (e) =>{
            e.preventDefault()
            const content=postForm.content.value
            
            if(content.trim()===''){
                alert ("Please input post content")
            }
            const user=getItemLocalStorage('currentUser')

            const data={
                createdBy: user.id,
                createdAt: new Date().toISOString(),
                content: content,
                comment: [],
                isShow:true,
                authorName:user.fullName


            }
            firebase.firestore().collection('posts').add(data)
            postForm.content.value=''

        })
        // //bam vao post, day len firebase created by id user created at content comment created name show
        // //date thanh string
        // new Date().toISOString()
        // //string thanh date
        // new Date('')
    }
}
window.customElements.define('create-post',CreatePost)