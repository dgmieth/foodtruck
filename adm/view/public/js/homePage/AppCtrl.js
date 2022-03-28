class AppCtrl {
    constructor() {
        //APP STATES
        this.appStatesList = {
            _INITIAL: 'INITIAL',
            _LOGGED: 'LOGGED',
            _NOTLOGGED: 'NOTLOGGED'
        }
        this.appState= this.appStatesList._INITIAL
        //APP FIRST MODAL LEVEL
        this.firstLevelModalTypes ={
            none: 'none',
            login: 'login',
            personalData: 'personalData',
            catering: 'catering',
            calendar: 'calendar'
        }
        this.firstLevelModal = this.firstLevelModalTypes.none
        //APP SECOND MODAL LEVEL
        this.secondLevelModalTypes ={
            none: 'none',
            pedidos:'pedidos',
            registration:'registration',
            senha:'senha',
            pagar:'pagar',
            recuperar:'recuperar'
        }
        this.secondLevelModal = this.secondLevelModalTypes.none
        //DNS


    }
    /*========================================================================================
    ========================================================================================
    ========================================================================================
                            LOAD EVENT LISTENERS
    ========================================================================================
    ========================================================================================
    ========================================================================================*/
    loginUser(info,dataCtrl,uiCtrl){
        var dataObj = {}
        var validate = 0
        for (let el of document.getElementsByName(info)){
            if(el.id==="email"){
                if(el.value === '' || el.value === null || el.value === undefined) {
                    validate +=1 
                }else {
                    dataObj.email = el.value
                }
            }else{
                if(el.value === '' || el.value === null || el.value === undefined) {
                    validate +=1 
                }else {
                    dataObj.password = el.value
                }
            }
        }
        if(validate>=1){
            uiCtrl.showHideAlert('alert-danger','Vc dever informar o email e a senha','show')
        }else{
            console.log(socketIoDNS)
            uiCtrl.showHideSpinner('show')
            fetch(`${socketIoDNS}/login/login`,{
                method: 'POST',
                headers: {
                    'Content-Type':'Application/json',
                    'Access-Control-Request-Method': 'POST',
                    'Access-Control-Request-Headers':'Content-Type'
                },
                body: JSON.stringify(dataObj)
            })
            .then((answer)=>{return answer.json()})
            .then((response)=>{
                // console.log(response)
                uiCtrl.showHideSpinner('hide')
                if(response.hasErrors){
                    console.log('inside')
                    uiCtrl.showHideAlert('alert-danger',response.msg,'show')
                }else{
                    uiCtrl.showModal('hide')
                    dataCtrl.isUserLogged(true,uiCtrl)
                    dataCtrl.setUser = response.data
                    this.configureNotifications(dataCtrl)
                }

            })
            .catch(err => {
                console.log(err)
                uiCtrl.showHideAlert('alert-danger',err)
            })
        }
        
    }
    requestRecoverPasswordEmail(info,dataCtrl,uiCtrl){
        // console.log(info)
        if(document.getElementsByName(info)[0].value==='' ||
        document.getElementsByName(info)[0].value===null ||
        document.getElementsByName(info)[0].value===undefined){
            uiCtrl.showHideAlert('alert-danger','Vc dever informar o email','show')
        }else{
            uiCtrl.showHideSpinner('show')
            fetch(`${socketIoDNS}/api/user/forgotPassword`,{
                method: 'POST',
                headers: {
                    'Content-Type':'Application/json',
                    'Access-Control-Request-Method': 'POST',
                    'Access-Control-Request-Headers':'Content-Type'
                },
                body: JSON.stringify({email: document.getElementsByName(info)[0].value})})
                .then((answer)=>{return answer.json()})
            .then((response)=>{
                // console.log(response)
                uiCtrl.showHideSpinner('hide')
                if(response.hasErrors){
                    console.log('inside')
                    uiCtrl.showHideAlert('alert-danger',response.msg,'show')
                }else{
                    uiCtrl.showHideSpinner('hide')
                    uiCtrl.showSecondLevelModal('hide')
                    uiCtrl.showModal('show')
                    uiCtrl.showHideAlert('alert-success',response.msg,'show')
                    // dataCtrl.isUserLogged(true,uiCtrl)
                    // dataCtrl.setUser = response.data
                }

            })
            .catch(err => {
                console.log(err)
                uiCtrl.showHideAlert('alert-danger',err)
            })
        }
    }
    registerUser(info,dataCtrl,uiCtrl){
        console.log(info)
        const requiredFields = ['email2','nome2','celular2','password2','passwordConfirmatioin2']
        var dataObj = {}
        var validate = 0
        for (let el of document.getElementsByName(info)){
            if(requiredFields.includes(el.id)){
                if(el.value === '' || el.value === null || el.value === undefined){
                    validate += 1
                }
            }
            switch (el.id) {
                case 'email2':
                    dataObj.email = el.value
                    break;
                case 'nome2':
                    dataObj.name = el.value
                    break;
                case 'celular2':
                    if(el.value.length<15){ validate += 1}
                    dataObj.phoneNumber = el.value.replace(/\D/ig,'')
                    break;
                case 'password2':
                    dataObj.password = el.value
                    break;
                case 'passwordConfirmatioin2':
                    dataObj.confirmPassword = el.value
                    break;
                case 'facebookUser2':
                    dataObj.facebookName = el.value === '' ? 'none' : el.value
                    break;
                case 'instagramUser2':
                    dataObj.instagramName = el.value === '' ? 'none' : el.value
                    break;
                default:
                    break;
            }
        }
        if(validate>=1){
            uiCtrl.showHideAlert('alert-danger','Vc dever informar o email, seu nome e seu celular. Criar uma senha de 3-20 caracteres e confirma-la.','show')
        }else{
            uiCtrl.showHideSpinner('show')
            fetch(`${socketIoDNS}/login/register`,{
                method: 'POST',
                headers: {
                    'Content-Type':'Application/json',
                    'Access-Control-Request-Method': 'POST',
                    'Access-Control-Request-Headers':'Content-Type'
                },
                body: JSON.stringify(dataObj)
            })
            .then((answer)=>{return answer.json()})
            .then((response)=>{
                // console.log(response)
                uiCtrl.showHideSpinner('hide')
                if(response.hasErrors){
                    console.log('inside')
                    uiCtrl.showHideAlert('alert-danger',response.msg,'show')
                }else{
                    uiCtrl.showModal('hide')
                    dataCtrl.isUserLogged(true,uiCtrl)
                    dataCtrl.setUser = response.data
                    this.configureNotifications(dataCtrl)
                }

            })
            .catch(err => {
                console.log(err)
                uiCtrl.showHideAlert('alert-danger',err)
            })
        }
    }
    updateUserInfo(info,dataCtrl,uiCtrl){
        // console.log(info)
        var obj = {}
        var validate = 0
        const token = dataCtrl.fetchData('user').token
        for(let el of document.getElementsByName(info)){
            switch (el.id) {
                case "field02":
                    if(el.value.length===0){     validate += 1
                    }else{ obj.name = el.value    }
                    break;
                case "field03":
                    if(el.value.length<15){validate += 1
                    }else{    obj.phoneNumber = el.value.replace(/\D/ig,'')   }
                    break;
                case "field04":
                    if(el.value.length===0){    obj.facebookName = 'none'
                    }else{    obj.facebookName = el.value  }
                    break;
                case "field05":
                    if(el.value.length===0){    obj.instagramName = 'none'
                    }else{    obj.instagramName = el.value }
                    break;
                default:
                    break;
            }
        }
        if(validate>0){
            uiCtrl.showHideAlert('alert-warning',"Voce precisa informa seu nome e um numero de celular valido",'show')
        }else{
            uiCtrl.showHideSpinner('show')
            obj.email = dataCtrl.fetchData('user').email
            obj.id = dataCtrl.fetchData('user').id
            console.log(obj)
        fetch(`${socketIoDNS}/api/user/updateInfo`,{
            method: 'POST',
            headers: {
                'Authorization':`Bearer ${token}`,
                'Content-Type':'Application/json',
                'Access-Control-Request-Method': 'POST',
                'Access-Control-Request-Headers':'Content-Type'
            },
            body: JSON.stringify(obj)})
        .then((answer)=>{return answer.json()})
        .then((response)=>{
            console.log(response)
            uiCtrl.showHideSpinner('hide')
            if(response.hasErrors){
                if(response.errorCode===4){
                    return uiCtrl.showHideAlert('alert-warning',response.msg,'show')    
                }
                uiCtrl.showHideAlert('alert-danger',response.msg,'show')
            }else{
                uiCtrl.showHideAlert('alert-success','Informacoes do usuario atualizadas!','show')
                dataCtrl.setUser = response.data
                uiCtrl.showSecondLevelModal('hide')
                uiCtrl.showModal('hide')
            }
        })
        .catch(err => {
            console.log(err)
            uiCtrl.showHideAlert('alert-danger',err)
        })
        }
    }
    updatePassword(info,dataCtrl,uiCtrl){
        console.log(info)
        var obj = {}
        var validate = 0
        const token = dataCtrl.fetchData('user').token
        for(let el of document.getElementsByName(info)){
            switch (el.id) {
                case "field11":
                    if(el.value.length<3 && el.value.length>20){     validate += 1
                    }else{ obj.currentPassword = el.value    }
                    break;
                case "field12":
                    if(el.value.length<3 && el.value.length>20){     validate += 1
                    }else{    obj.newPassword = el.value   }
                    break;
                case "field13":
                    if(el.value.length<3 && el.value.length>20){     validate += 1
                    }else{    obj.confirmPassword = el.value  }
                    break;
                default:
                    break;
            }
        }
        if(obj.confirmPassword!==obj.newPassword){ console.log('validou'); validate += 1 } 
        if(validate>0){
            uiCtrl.showHideAlert('alert-warning',"Voce precisa informar sua senha atual, escolher uma nova senha de 3 a 20 caracteres que deve conter pelo menos uma letra minuscula, uma letra maiuscula e um numero e confirmar esta nova senha",'show')
        }else{
            uiCtrl.showHideSpinner('show')
            obj.email = dataCtrl.fetchData('user').email
            obj.id = dataCtrl.fetchData('user').id
            console.log(obj)
        fetch(`${socketIoDNS}/api/user/changePassword`,{
            method: 'POST',
            headers: {
                'Authorization':`Bearer ${token}`,
                'Content-Type':'Application/json',
                'Access-Control-Request-Method': 'POST',
                'Access-Control-Request-Headers':'Content-Type'
            },
            body: JSON.stringify(obj)})
        .then((answer)=>{return answer.json()})
        .then((response)=>{
            console.log(response)
            uiCtrl.showHideSpinner('hide')
            if(response.hasErrors){
                if(response.errorCode===4){
                    return uiCtrl.showHideAlert('alert-warning',response.msg,'show')    
                }
                uiCtrl.showHideAlert('alert-danger',response.msg,'show')
            }else{
                uiCtrl.showHideAlert('alert-success',response.msg,'show')
                uiCtrl.showSecondLevelModal('hide')
                uiCtrl.showModal('hide')
            }
        })
        .catch(err => {
            console.log(err)
            uiCtrl.showHideAlert('alert-danger',err)
        })
        }
    }
    fetchEventsAndOrders(dataCtrl,uiCtrl){
        console.log('called')
        uiCtrl.showHideSpinner('show')
        const token = dataCtrl.fetchData('user').token
        // console.log()
        fetch(`${socketIoDNS}/api/cookingCalendar/activeCookingDateWithinNextTwelveMonths?email=${dataCtrl.fetchData('user').email}&id=${dataCtrl.fetchData('user').id}`,{
            method: 'GET',
            headers: {
                'Authorization':`Bearer ${token}`,
                'Content-type':'Application/json',
                'Access-Control-Request-Method': 'GET',
                'Access-Control-Request-Headers':'Content-Type'
            }
        })
        .then((answer)=>{return answer.json()})
        .then((response)=>{
            // console.log(response)
            uiCtrl.showHideSpinner('hide')
            if(response.hasErrors){
                if(response.errorCode===4){
                    return uiCtrl.showHideAlert('alert-warning',response.msg,'show')    
                }else if(response.errorCode===-1){
                    dataCtrl.isUserLogged(false,uiCtrl)
                    return uiCtrl.showHideAlert('alert-danger','Voce precisa logar novamente.','show')    
                }
                uiCtrl.showHideAlert('alert-danger',response.msg,'show')
            }else{
                // uiCtrl.showModal('hide')
                dataCtrl.setEvents = response.msg[0]
                dataCtrl.setOrders = response.msg[1]
                this.setFirstLevelModalType = this.getFirstLevelModalTypes.calendar;
                uiCtrl.showHideFirstLevelModals(this,dataCtrl);
                this.configureFlatPicker(uiCtrl,dataCtrl)
            }
        })
        .catch(err => {
            console.log(err)
            uiCtrl.showHideAlert('alert-danger',err)
        })
        
    }
    placeOrder(info,dataCtrl,uiCtrl){
        console.log('placeOrder')
        var qtty = []
        dataCtrl.fetchData('dishesArray').forEach(el => {
            qtty.push(parseInt(document.getElementsByName(info)[0].value))
        })
        fetch(`${socketIoDNS}/api/order/newOrder`,{
            method: 'POST',
            headers: {
                'Authorization':`Bearer ${dataCtrl.fetchData('user').token}`,
                'Content-Type':'Application/json',
                'Access-Control-Request-Method': 'POST',
                'Access-Control-Request-Headers':'Content-Type'
            },
            body: JSON.stringify({
                email: dataCtrl.fetchData('user').email,
                id: dataCtrl.fetchData('user').id,
                cookingDate_id: dataCtrl.fetchData('eventId'),
                dish_id: dataCtrl.fetchData('dishesArray'),
                dish_qtty:qtty,
                extras_id:[],
                extras_qtty:[]
            })})
        .then((answer)=>{return answer.json()})
        .then((response)=>{
            // console.log(response)
            uiCtrl.showHideSpinner('hide')
            if(response.hasErrors){
                if(response.errorCode===4){
                    return uiCtrl.showHideAlert('alert-warning',response.msg,'show')    
                }else if(response.errorCode===-1){
                    dataCtrl.isUserLogged(false,uiCtrl)
                    return uiCtrl.showHideAlert('alert-danger','Voce precisa logar novamente.','show')    
                }
                uiCtrl.showHideAlert('alert-danger',response.msg,'show')
            }else{
                uiCtrl.showHideAlert('alert-success',response.msg,'show')
                uiCtrl.showSecondLevelModal('hide')
                uiCtrl.showModal('hide')
            }
        })
        .catch(err => {
            console.log(err)
            uiCtrl.showHideAlert('alert-danger',err)
        })
    }
    deleteOrder(dataCtrl,uiCtrl){
        fetch(`${socketIoDNS}/api/order/deleteOrder`,{
            method: 'POST',
            headers: {
                'Authorization':`Bearer ${dataCtrl.fetchData('user').token}`,
                'Content-Type':'Application/json',
                'Access-Control-Request-Method': 'POST',
                'Access-Control-Request-Headers':'Content-Type'
            },
            body: JSON.stringify({
                email: dataCtrl.fetchData('user').email,
                id: dataCtrl.fetchData('user').id,
                order_id: dataCtrl.fetchData('orderId')
            })})
        .then((answer)=>{return answer.json()})
        .then((response)=>{
            // console.log(response)
            uiCtrl.showHideSpinner('hide')
            if(response.hasErrors){
                if(response.errorCode===4){
                    return uiCtrl.showHideAlert('alert-warning',response.msg,'show')    
                }else if(response.errorCode===-1){
                    dataCtrl.isUserLogged(false,uiCtrl)
                    return uiCtrl.showHideAlert('alert-danger','Voce precisa logar novamente.','show')    
                }
                uiCtrl.showHideAlert('alert-danger',response.msg,'show')
            }else{
                uiCtrl.showHideAlert('alert-success',response.msg,'show')
                uiCtrl.showSecondLevelModal('hide')
                uiCtrl.showModal('hide')
            }
        })
        .catch(err => {
            console.log(err)
            uiCtrl.showHideAlert('alert-danger',err)
        })
    }
    updateOrder(info,dataCtrl,uiCtrl){
        if(dataCtrl.fetchData('orderMealsQtty')===parseInt(document.getElementsByName(info)[0].value)){
            return uiCtrl.showHideAlert('alert-warning','Nao houve alteracao das informacoes. Nao houve atualizacao do pedido.','show')    
        }
        fetch(`${socketIoDNS}/api/order/updateOrder`,{
            method: 'POST',
            headers: {
                'Authorization':`Bearer ${dataCtrl.fetchData('user').token}`,
                'Content-Type':'Application/json',
                'Access-Control-Request-Method': 'POST',
                'Access-Control-Request-Headers':'Content-Type'
            },
            body: JSON.stringify({
                email: dataCtrl.fetchData('user').email,
                id: dataCtrl.fetchData('user').id,
                order_id: dataCtrl.fetchData('orderId'),
                new_qtty:parseInt(document.getElementsByName(info)[0].value)
            })})
        .then((answer)=>{return answer.json()})
        .then((response)=>{
            // console.log(response)
            uiCtrl.showHideSpinner('hide')
            if(response.hasErrors){
                if(response.errorCode===4){
                    return uiCtrl.showHideAlert('alert-warning',response.msg,'show')    
                }else if(response.errorCode===-1){
                    dataCtrl.isUserLogged(false,uiCtrl)
                    return uiCtrl.showHideAlert('alert-danger','Voce precisa logar novamente.','show')    
                }
                uiCtrl.showHideAlert('alert-danger',response.msg,'show')
            }else{
                uiCtrl.showHideAlert('alert-success',response.msg,'show')
                uiCtrl.showSecondLevelModal('hide')
                uiCtrl.showModal('hide')
            }
        })
        .catch(err => {
            console.log(err)
            uiCtrl.showHideAlert('alert-danger',err)
        })
    }
    deleteSelectedOrder(dataCtrl,uiCtrl){
        console.log(`deleteSElectedOrder`)
        // if(!req.body.order_id||!req.body.id||!req.body.cookingDate_id){
        uiCtrl.showHideSpinner('show')
        var obj = {}
        obj.order_id = dataCtrl.fetchData('orderId')
        obj.id = dataCtrl.fetchData('user').id
        obj.cookingDate_id = dataCtrl.fetchData('eventId')
        fetch(`${socketIoDNS}/api/order/cancelMadeToListOrder`,{
            method: 'POST',
            headers: {
                'Authorization':`Bearer ${dataCtrl.fetchData('user').token}`,
                'Content-Type':'Application/json',
                'Access-Control-Request-Method': 'POST',
                'Access-Control-Request-Headers':'Content-Type'
            },
            body: JSON.stringify(obj)})
        .then((answer)=>{return answer.json()})
        .then((response)=>{
            console.log(response)
            uiCtrl.showHideSpinner('hide')
            if(response.hasErrors){
                if(response.errorCode===4){
                    return uiCtrl.showHideAlert('alert-warning',response.msg,'show')    
                }else if(response.errorCode===-1){
                    dataCtrl.isUserLogged(false,uiCtrl)
                    uiCtrl.showSecondLevelModal('hide')
                    uiCtrl.showModal('hide')
                    return uiCtrl.showHideAlert('alert-danger','Voce precisa logar novamente.','show')    
                }
                uiCtrl.showHideAlert('alert-danger',response.msg,'show')
            }else{
                uiCtrl.showHideAlert('alert-success',response.msg,'show')
                uiCtrl.showSecondLevelModal('hide')
                uiCtrl.showModal('hide')
            }
        })
        .catch(err => {
            console.log(err)
            uiCtrl.showHideAlert('alert-danger',err)
        })
    }
    payOrder(info,dataCtrl,uiCtrl){
        var obj = {}
        var validate = 0
        for(let el of document.getElementsByName('formPagar')){
            switch (el.id) {
                case "pay01":
                    if(el.value.length<19){     validate += 1
                    }else{ obj.cardNumber = el.value.split(" ").join("")    }
                    break;
                case "pay02":
                    if(el.value.length<3){validate += 1
                    }else{    obj.cardCode = el.value    }
                    break;
                case "pay03":
                    if(el.value.length<2){validate += 1
                    }else{    obj.expirationDate = el.value   }
                    break;
                case "pay04":
                    if(el.value.length<4){validate += 1
                    }else{    obj.expirationDate = `${el.value}-${obj.expirationDate}`   }
                    break;
                default:
                    break;
            }
        }
        if(validate>0){
            uiCtrl.showHideAlert('alert-warning',"Voce deve informar o numero do cartao de credito com 16 digitos e o codigo verificador do cartao com no minimo tres digitos e selecionar a data de validade do cartao",'show')
        }else{
            uiCtrl.showHideSpinner('show')
            obj.order_id = dataCtrl.fetchData('orderId')
            obj.email = dataCtrl.fetchData('user').email
            obj.id = dataCtrl.fetchData('user').id
            obj.cookingDate_id = dataCtrl.fetchData('eventId')
            console.log(obj)
        fetch(`${socketIoDNS}/api/order/payOrder`,{
            method: 'POST',
            headers: {
                'Authorization':`Bearer ${dataCtrl.fetchData('user').token}`,
                'Content-Type':'Application/json',
                'Access-Control-Request-Method': 'POST',
                'Access-Control-Request-Headers':'Content-Type'
            },
            body: JSON.stringify(obj)})
        .then((answer)=>{return answer.json()})
        .then((response)=>{
            console.log(response)
            uiCtrl.showHideSpinner('hide')
            if(response.hasErrors){
                if(response.errorCode===4){
                    return uiCtrl.showHideAlert('alert-warning',response.msg,'show')    
                }else if(response.errorCode===-1){
                    dataCtrl.isUserLogged(false,uiCtrl)
                    uiCtrl.showSecondLevelModal('hide')
                    uiCtrl.showModal('hide')
                    return uiCtrl.showHideAlert('alert-danger','Voce precisa logar novamente.','show')    
                }
                uiCtrl.showHideAlert('alert-danger',response.msg,'show')
            }else{
                uiCtrl.showHideAlert('alert-success',response.msg,'show')
                uiCtrl.showSecondLevelModal('hide')
                uiCtrl.showModal('hide')
            }
        })
        .catch(err => {
            console.log(err)
            uiCtrl.showHideAlert('alert-danger',err)
        })
        }
    }
    cateringMessage(info,dataCtrl,uiCtrl){
        console.log(info)
        //email name  phoneNumber orderDescription
        var obj = {}
        var validate = 0
        for(let el of document.getElementsByName(info)){
            switch (el.id) {
                case "field01":
                    if(el.value.length===0){     validate += 1
                    }else{ obj.email = el.value    }
                    break;
                case "field02":
                    if(el.value.length===0){validate += 1
                    }else{    obj.name = el.value    }
                    break;
                case "field03":
                    if(el.value.length<15){validate += 1
                    }else{    obj.phoneNumber = el.value.replace(/\D/ig,'')   }
                    break;
                case "field04":
                    if(el.value.length===0){validate += 1
                    }else{    obj.orderDescription = el.value }
                    break;
                default:
                    break;
            }
        }
        if(validate>0){
            uiCtrl.showHideAlert('alert-warning',"Voce deve informar seu e-mail, seu nome, um numero de celular valido e a descricao da necessidade do seu evento",'show')
        }else{
            uiCtrl.showHideSpinner('show')
            console.log(obj)
        fetch(`${socketIoDNS}/api/catoring/saveContact`,{
            method: 'POST',
            headers: {
                'Content-Type':'Application/json',
                'Access-Control-Request-Method': 'POST',
                'Access-Control-Request-Headers':'Content-Type'
            },
            body: JSON.stringify(obj)})
        .then((answer)=>{return answer.json()})
        .then((response)=>{
            console.log(response)
            uiCtrl.showHideSpinner('hide')
            if(response.hasErrors){
                if(response.errorCode===4){
                    return uiCtrl.showHideAlert('alert-warning',response.msg,'show')    
                }
                uiCtrl.showHideAlert('alert-danger',response.msg,'show')
            }else{
                uiCtrl.showHideAlert('alert-success',response.msg,'show')
                uiCtrl.showSecondLevelModal('hide')
                uiCtrl.showModal('hide')
            }
        })
        .catch(err => {
            console.log(err)
            uiCtrl.showHideAlert('alert-danger',err)
        })
        }
    }
    logOut(dataCtrl,uiCtrl){
        dataCtrl.isUserLogged(false,uiCtrl)
        uiCtrl.showModal('hide')
        uiCtrl.showSecondLevelModal('hide')
    }
    /*========================================================================================
    ========================================================================================
    ========================================================================================
                            CONFIGURE CALENDAR
    ========================================================================================
    ========================================================================================
    ========================================================================================*/
    configureFlatPicker(uiCltr,dataCtrl){
        setTimeout(() => {
            const calendar = flatpickr(document.getElementById(uiCtrl.getIds.elementIds.calendar), {
                enableTime: false,
                dateFormat: "Y-m-d",
                weekNumbers: false,
                minDate: "today",
                
                position:"above center",
                
                onDayCreate: function(dObj, dStr, fp, dayElem){
                    const months = dataCtrl.fetchData('months')
                    const events = []
                    dataCtrl.fetchData('events').forEach(el =>{
                        events.push(el.cookingDate.split(' ')[0])
                    })
                    const dayDateArray = dayElem.ariaLabel.split(',').join('').split(' ')
                    const month = `${months.indexOf(dayDateArray[0]) + 1 <= 9 ? '0' + (months.indexOf(dayDateArray[0]) + 1) : (months.indexOf(dayDateArray[0]) +1)}`
                    const dateCheck = `${dayDateArray[2]}-${month}-${dayDateArray[1] <= 9 ? '0'+dayDateArray[1] : dayDateArray[1]}`
                    if(events.includes(dateCheck)){
                        dayElem.innerHTML += "<span class='event'></span>";
                    }
                    },
                onClose: function(selectedDates,dateStr,instance){
                    dataCtrl.setSelectedEventDate = dateStr
                    uiCtrl.updateCalendarViewInformation(dateStr,appCtrl,dataCtrl)
                }})
                console.log(calendar)
        }, 300);
    }
    /*========================================================================================
    ========================================================================================
    ========================================================================================
                            MODIFYING UI STATES
    ========================================================================================
    ========================================================================================
    ========================================================================================*/
    enableDisableInputs(formType,disableTrue=true){
        document.getElementsByName(formType).forEach(e=>{
            e.disabled = disableTrue
        })
    }
    showHideButtons(btnClass,showTrue=true){
        for(let i of document.getElementsByClassName(btnClass)){
            i.hidden = !i.hidden
        }
    }
    /*========================================================================================
    ========================================================================================
    ========================================================================================
                            SETTNG MODAL TYPES
    ========================================================================================
    ========================================================================================
    ========================================================================================*/
    set setFirstLevelModalType(newType){
        // console.log(newType)
        this.firstLevelModal = newType
    }
    get getFirstLevelType(){
        return this.firstLevelModal
    }
    get getFirstLevelModalTypes(){
        return this.firstLevelModalTypes
    }
    set setSecondLevelModalType(newType){
        // console.log(newType)
        this.secondLevelModal = newType
    }
    get getSecondLevelType(){
        return this.secondLevelModal
    }
    get getSecondLevelModalTypes(){
        return this.secondLevelModalTypes
    }
    /*========================================================================================
    ========================================================================================
    ========================================================================================
                            CHANGING APP STATE
    ========================================================================================
    ========================================================================================
    ========================================================================================*/
    set setAppState(newState){
        // console.log(newState)
        this.appState = newState
    }
    get getAppStatesList() {
        return this.appStatesList
    }
    /*========================================================================================
    ========================================================================================
    ========================================================================================
                            CONFIGURING NOTIFICATIONS
    ========================================================================================
    ========================================================================================
    ========================================================================================*/
    configureNotifications(dataCtrl){        
        console.log('configureNotifications')
        window.OneSignal.push(function () {
            // console.log('insideiniti')
            OneSignal.init({
                appId: "446792d9-94c1-4a16-b05d-aa79ff8b57e2"
                // Your other init settings
            });
        });
        window.OneSignal.push(function() {
            OneSignal.setExternalUserId(dataCtrl.fetchData('user').id);
            OneSignal.showSlidedownPrompt();
            OneSignal.showNativePrompt();
            OneSignal.registerForPushNotifications();

          });
    }
}