const btn =document.querySelector('.button');
const massageError =document.querySelector('.err');

const email =document.getElementById('email');



btn.addEventListener('click', login)
function login(e){
    e.preventDefault()
    if(email.value==''){
        alert('заполните все поля')
    }else{

        const userdata={
            email:email.value,
           
        }

        async function sendToServer(){
            const data =await request('/api/adduser', 'POST', userdata)
                
            if(data){
                // console.log(data.massage)
                massageError.innerHTML=data.massage
                email.value=''
    
                
            }
        }
        sendToServer()
       

    }
    

   
   
  
}


async function request(url, method='GET', data=null ){
    

    try {
        const headers={}
        let body;
        if(data){
            headers['Content-Type']='application/json'
            body = JSON.stringify(data)
        }
        const response= await fetch(url,{
            method,
            headers,
            body

        })
        return await response.json()
    } catch (error) {
        console.log('err')
    }
}



let accessBtn=document.getElementsByClassName('btn');
// console.log(accessBtn)

for (let item of accessBtn) {
    
    item.addEventListener('click',changingAccess )
}



async function  changingAccess(e){
    e.preventDefault()
    // console.log(e.target.getAttribute('data-id') )

    const userId={
        idUserAcces:e.target.getAttribute('data-id'),
        current:e.target.innerHTML
       
    }

    const accessUserId =await request('/api/adduser', 'PUT',userId )
                
    if(accessUserId){
        // console.log(data.massage)
        // massageError.innerHTML=data.massage
        // email.value=''
        e.target.innerHTML = accessUserId.massage

        
    }
}
