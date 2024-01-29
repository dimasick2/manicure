// document.addEventListener('onload', function(){



    let btn = document.querySelector('.button')
    btn.addEventListener('click', function(){
       
        let email = document.getElementById('email')
        let pass = document.getElementById('password')
        if(pass.value=='123'){
            window.location.href='page.html'
       
        }else{
            alert('не верный логин или пароль')
        }
    })
    
// })


