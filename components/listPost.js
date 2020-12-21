import { getDataFromDoc, getDataFromDocs } from "../screens/utils.js"

export class ListPost extends HTMLElement{
    constructor(){
        super()
        this._shadowRoot=this.attachShadow({mode:'open'})
    }
    async connectedCallback(){
        const res=await firebase.firestore().collection('posts').where('isShow','==',true).get()
        this.listenCollectionChange()
        const listPost=getDataFromDocs(res)
        let html=''
        listPost.forEach(element=>{
            let imgSrc=(element.files && element.files.length>0)?element.files[0]: ''
            html+=`
        
            <post-item time="${element.createdAt}" author="${element.authorName}" content="${element.content}" img="${imgSrc}"></post-item>`
        })
        
        this._shadowRoot.innerHTML=`
        <div class="list-posts">${html}</div>
        `
    }
    listenCollectionChange(){
        let firstRun=true
        firebase.firestore().collection('posts').where('isShow','==',true).onSnapshot((snapShot)=>{
            if(firstRun){
                
                firstRun=false
                return
            }
            
        const docChange=snapShot.docChanges()
        for(const oneChange of docChange){
            //type =[added: them card isShow true//card false=>true, modified, removed: true=> false//delete]
            if(oneChange.type==='added'){
                console.log(getDataFromDoc(oneChange.doc))
                this.appendPostItem(getDataFromDoc(oneChange.doc))
            }
        }
        })
    }
    appendPostItem(data){
        const postItem=document.createElement('post-item')
        postItem.setAttribute('time',data.createdAt)
        postItem.setAttribute('author',data.authorName)
        postItem.setAttribute('content',data.content)
        const parent=this._shadowRoot.querySelector('.list-posts')
        parent.insertBefore(postItem,parent.firstChild)
    }
}
window.customElements.define('list-post',ListPost)