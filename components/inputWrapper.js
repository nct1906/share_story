const style=`
.error{
    
}
#input-main{
    border: 1px solid white 5px;
    padding:12px
}
input{
   
    margin-top:10px;
    font-family:serif;
    box-sizing:border-box;
    
}
`
class InputWrapper extends HTMLElement{
    constructor(){
        super()
        this._shadowRoot=this.attachShadow({mode:'open'})

    }
    connectedCallback(){
        this.type=this.getAttribute('type')
        this.placeholder=this.getAttribute('placeholder')
        this.error=this.getAttribute('error')||''
        this._shadowRoot.innerHTML=`
            <style>
            ${style}
            </style>
            <div>
               
                <input id="input-main" type="${this.type}" placeholder="${this.placeholder}">

                
                <div class="error">${this.error}</div>
            </div>
        `
    }
    static get observedAttributes(){
        return ['error']
    }
    attributeChangedCallback(name, oldValue,newValue){
        if(name='error'){
            this._shadowRoot.querySelector('.error').innerHTML=newValue
        }
    }
    //getter
    get value(){
        const value=this._shadowRoot.getElementById('input-main').value
        return value
    }

}
window.customElements.define('input-wrapper',InputWrapper)