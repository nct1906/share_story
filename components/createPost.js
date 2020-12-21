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
#post,input{
    background-color:#4B708A;
    color:#fff;
    padding:10px 15px;
    border-radius:5px;
    font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    font-size:20px;
    
    border:none;
    font-weight:400;
    margin:5px;
}
#post:hover{
    background-color:#0195A3;
}
`
import {uploadFileToStorage} from '../screens/utils.js'
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
            <input type="file" name="file">
            <button id="post">Post</button>
        </form>`
        
        const postForm=this._shadowDom.getElementById('create-post')
        postForm.addEventListener('submit', async (e) =>{
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
            const res=await firebase.firestore().collection('posts').add(data)
            const img=postForm.file.files
            postForm.content.value=''
            if (img.length>0){
                const image=img[0]
                const url = await uploadFileToStorage(image)
                this.updateListFile(url,res.id)
            }

        })
        // //bam vao post, day len firebase created by id user created at content comment created name show
        // //date thanh string
        // new Date().toISOString()
        // //string thanh date
        // new Date('')
    }
    updateListFile(url,id){
        const dataUpdate={
            files:firebase.firestore.FieldValue.arrayUnion(url)
        }
        firebase.firestore().collection('posts').doc(id).update(dataUpdate)
    }
}
window.customElements.define('create-post',CreatePost)