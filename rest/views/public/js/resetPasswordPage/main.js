document.getElementById('submitBtn').addEventListener('click',(e)=>{
    const password = document.getElementsByName('password')[0].value
    const confirmPassword = document.getElementsByName('confirmPassword')[0].value
    console.log(password,confirmPassword)
    var message = ''
    if(password===''||password===null){
        message = 'Voce deve informar uma senha.'
    }
    if(confirmPassword===''||confirmPassword===null){
        message = `${message} Voce deveer confirmar a senha.`
    }
    if(password!==confirmPassword){
        message = `${message} Senha e confirmacao de senha devem ser iguals!`
    }
    if(password.length<3||password.length>20||confirmPassword.length<3||confirmPassword.length>20){
        message = `${message} Senha e confirmacao de senha devem conter no minimo 3 e no maximo 20 caracteres`
    }
    if(message!==''){
        alert(message)
        return
    }
    const dataObj = {
        password: password,
        confirmPassword: confirmPassword,
        email: document.getElementsByName('email')[0].value
    }
    console.log(dataObj)
    console.log(JSON.stringify(dataObj))
    fetch(`/api/User/resetPassword`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${document.getElementsByName('token')[0].value}`
        },
        body: JSON.stringify(dataObj)
    })
    .then(answer => {
        return answer.json()
    })
    .then(response => {
        console.log(response)
        if(!response.hasErrors){
            document.getElementById(`mainForm`).style.display = `none`
            document.getElementById(`successPage`).style.display = `block`
        }else {
            document.getElementById(`errors`).innerHTML = response.msg
            document.getElementById(`alert`).style.display = `block`
        }
    })
    .catch(err => {
        console.log(err)
    })

})