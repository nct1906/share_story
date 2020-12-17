import './screens/utils.js'
import './screens/register.js'
import './components/header.js'
import './components/createPost.js'
import './components/listPost.js'
import './components/postItem.js'
import './components/inputWrapper.js'
import {getItemLocalStorage} from './screens/utils.js'
import './screens/story.js'
async function checkAuthen() {
    const user=getItemLocalStorage('currentUser')
    if(user){
        const res=await firebase.firestore().collection('users').where('email','==',user.email).where('password','==',user.password).get()
        if(res.empty){
            redirect('login')
        }
        else{
            redirect('story')
        }
    }
    else{
        redirect('register')
    }
}
checkAuthen()
export function redirect(screenName){
    if (screenName==='register'){
        document.getElementById("demo").innerHTML ='<register-screen></register-screen>'
    }
    else if (screenName==='login'){
        document.getElementById("demo").innerHTML ='<login-screen></login-screen'
    }
    else if (screenName==='story'){
        document.getElementById("demo").innerHTML ='<story-screen></story-screen>'
    }
}