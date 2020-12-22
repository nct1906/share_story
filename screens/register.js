import {getDataFromDocs, getOneDocument} from './utils.js'
const style=`
.register-container{
    width:100vw;
    height:100vh;
    background: url('https://miro.medium.com/max/11730/0*ihTZPO4iffJ8n69_');
    background-size:cover;
    display:flex;
    justify-content:flex-end;
}
#register-form{
    width:30%;
    height:100vh;
    padding:3vw 5vh;
    background-color:#00626F;
    color:white;
    text-align:center
    
   
}
h1{
    text-align:center;
    font-family:serif;
    font-size:50px;
}
button{
    background-color:#00ABB5;
    color:white;
    border-radius:5px;
    padding:10px 15px;
    font-size:20px;
    margin:30px;
    font-family:serif;
    border:1px solid white;

}
@media only screen and (max-width: 768px) {
    #register-form{
        width:100%!important;
        
        
       
    }
  }
`


import {redirect} from '../index.js'
import {saveToLocalStorage} from './utils.js'
export class RegisterScreen extends HTMLElement{
    constructor(){
        super()
        this._shadowRoot=this.attachShadow({mode:'open'})
    }
    connectedCallback(){
        this._shadowRoot.innerHTML=`
        <style>${style}</style>
        <div class="register-container">
        <form id="register-form">
            <h1>Sign Up</h1>
           
            <input-wrapper type="text"id="first-name" placeholder="First Name">
            </input-wrapper>
            <input-wrapper type="text" id="last-name" placeholder="Last Name">
            </input-wrapper>
            
            <input-wrapper type="text" id="email" placeholder="Email">
            </input-wrapper>
            <input-wrapper type="password" id="password" placeholder="Password">
            </input-wrapper>
            <input-wrapper type="password" id="confirm-password" placeholder="Confirm Password">
            </input-wrapper>
            <button><strong>Register</strong></button>
            <a id="redirect">Already have an account? Login</a>
            
        </form>
        </div>
        `
        const registerForm=this._shadowRoot.getElementById('register-form')
        registerForm.addEventListener('submit',async (e)=>{
            e.preventDefault()
            const firstName=this._shadowRoot.getElementById('first-name').value
            const lastName=this._shadowRoot.getElementById('last-name').value
            const email=this._shadowRoot.getElementById('email').value
            const password=this._shadowRoot.getElementById('password').value
            const confirmPassword=this._shadowRoot.getElementById('confirm-password').value
            let isValid=true
            if (firstName.trim()===''){
                isValid=false
                this.setError('first-name','Please put first name')
                
            }
            if (lastName.trim()===''){
                isValid=false
                this.setError('last-name','Please put last name')
                
            }
            if (email.trim()===''){
                isValid=false
                this.setError('email','Please put email')
                
            }
            if (password.trim()===''){
                isValid=false
                this.setError('password','Please put password')
                
            }
            if (confirmPassword.trim()===''){
                isValid=false
                this.setError('confirm-password','Please put confirm password')
                
            }
            if (password!==confirmPassword){
                isValid=false
                this.setError('confirm-password','Password did not match')
                
            }
            const user={
                fullName:firstName+' '+lastName,
                email:email,
                password:CryptoJS.MD5(password).toString()
            }
            if(!isValid){
                return
            }
            const check=await this.checkEmailExist(email)
            //if email ton tai roi, tra ra true
            if(check){
                
                alert("email da duoc dang ky")
            }
            else{
                firebase.firestore().collection('users').add(user)
                alert("dang ky thanh cong")
                router.navigate('/login');
            }
        })
        this._shadowRoot.getElementById('redirect').addEventListener('click',()=>router.navigate('login'))
       
    }
         setError(id,message) {
        
        this._shadowRoot.getElementById(id).setAttribute('error',message)
    }
    async checkEmailExist(email){
        const res=await firebase.firestore().collection('users').where('email','==',email).get()
        
        
        return !res.empty
    }
}
window.customElements.define('register-screen',RegisterScreen)
export class LogInScreen extends HTMLElement{
    constructor(){
        super()
        this._shadowRoot=this.attachShadow({mode:'open'})
    }
    connectedCallback(){
        this._shadowRoot.innerHTML=`
        <style>${style}</style>
        <div class="register-container">
        <form id="register-form">
            <h1>Log In</h1>
           
            
            <input-wrapper type="text" id="email" placeholder="Email">
            </input-wrapper>
            <input-wrapper type="password" id="password" placeholder="Password">
            </input-wrapper>
            
            <button><strong>Log In</strong></button>
            <a id="redirect">Don't have an account? Register</a>
            
        </form>
        </div>
        `
        const registerForm=this._shadowRoot.getElementById('register-form')
        registerForm.addEventListener('submit',async (e)=>{
            e.preventDefault()
            
            const email=this._shadowRoot.getElementById('email').value
            let password=this._shadowRoot.getElementById('password').value
            password=CryptoJS.MD5(password).toString()
            let isValid=true
            
            if (email.trim()===''){
                isValid=false
                this.setError('email','Please put email')
                
            }
            if (password.trim()===''){
                isValid=false
                this.setError('password','Please put password')
                
            }
           
     
        
            if(!isValid){
                return
            }
            
            const check=await this.checkEmailExist(email,password)
            //if email ton tai roi, tra ra true
            
            if(!check.empty){
                alert ("Log in successful")
                
                saveToLocalStorage('currentUser',getDataFromDocs(check)[0])
                router.navigate('/story');
            }
            else{
                
                alert("Email not signed up or Password Incorrect")
                router.navigate('/register');
            }
        })
        this._shadowRoot.getElementById('redirect').addEventListener('click',()=>router.navigate('/register'));
       
    }
         setError(id,message) {
        
        this._shadowRoot.getElementById(id).setAttribute('error',message)
    }
    async checkEmailExist(email,password){
        console.log('hello')
        const res=await firebase.firestore().collection('users').where('email','==',email).where('password','==',password).get()
        
        return res
    }
    
    
}
window.customElements.define('login-screen',LogInScreen)