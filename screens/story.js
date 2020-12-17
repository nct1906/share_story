const style=`
<style>

</style>`

export class StoryScreen extends HTMLElement{
    constructor(){
        super()
        this._shadowDom=this.attachShadow({mode:'open'})
    }
    connectedCallback(){
        this._shadowDom.innerHTML=`
        ${style}
        <story-header></story-header>
        <create-post></create-post>
        <list-post>hello</list-post>
        
        `       
}
}
window.customElements.define('story-screen',StoryScreen)