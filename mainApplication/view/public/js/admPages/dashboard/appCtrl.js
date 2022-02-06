class AppCtrl {
    constructor() {
        this.appStatesList = {
            //states with no options
            _INITIAL: 'INITIAL',
            _INVITATIONCODE: 'INVITATIONCODE',
            _ORDERDELIVERY: 'ORDERDELIVERY',
            _LOGOUT: 'LOGOUT',
            //states with options
            _USERS: 'USERS',
            _MENU: 'MENU',
            _COOKINGCALENDAR: 'COOKINGCALENDAR',
            _DISH : 'DISH',
            _ORDERS: 'ORDERS',
            _MANAGEACCESS: 'MANAGEACCESS',
            _REPORTS: 'REPORTS',
            _CATORING: 'CATORING'
        }
        this.previousState = ''
        this.appState = this.appStatesList._INITIAL
        this.appSubStatesList = {
            _INITIAL: 'INITIAL',
            //USER SUB STATES
            _ACTIVEUSERS: 'ACTIVEUSERS',
            _EXCLUDEDUSERS: 'EXCLUDEDUSERS',
            _INVITATIONCODE: 'INVITATIONCODE',
            //COOKING CALENDAR SUB STATES
            _ACTIVEDATES: 'ACTIVEDATES',
            _FINISHEDDATES: 'FINISHEDDATES',
            _EXCLUDEDDATES: 'EXCLUDEDDATES',
            //DISH SUB STATES
            _ACTIVEDISHES: 'ACTIVEDISHES',
            _EXCLUDEDDISHES: 'EXCLUDEDDISHES',
            //ORDER SUB STATES
            _ACTIVEORDERS: 'ACTIVEORDERS',
            _FINISHEDORDERS: 'FINISHEDORDERS',
            _EXCLUDEDORDERS: 'EXCLUDEDORDERS',
            _ORDERDELIVERY: 'ORDERDELIVERY',
            _INACTIVEORDERS: 'INACTIVEORDERS',
            //CATORING
            _UNREADMESSAGES: 'UNREADMESSAGES',
            _ARCHIVEDMESSAGES: 'ARCHIVEDMESSAGES',
            _EXCLUDEDMESSAGES: 'EXCLUDEDMESSAGES'
        }
        this.previousSubState = ''
        this.sideBarShowing = false
        this.optionsSideBarShowing = false
        this.searchModeOn = false
        this.appSubState = this.appSubStatesList._INITIAL
        this.cookingDateModal = null
        //SCROLL LISTENER
        this.scrollPosition = 0
    }
//=================================================================================================
//=================================================================================================
//=================================================================================================
//*************************************************************************************************
//
//
//                                        FETCH DATA
//
//
//*************************************************************************************************
//=================================================================================================
//=================================================================================================
//=================================================================================================
    fetchJWToken(dataCtrl){
        fetch('/auth/fetchJWToken')
        .then(answer => { 
            if(answer.redirected){ return window.location.href = answer.url }
            return answer.json()})
        .then(response => {
            if(!response.hasErros){
                dataCtrl.setToken = response.data
                this.socketIOConnect(dataCtrl,uiCtrl)
            }
        })
        .catch(err => {
            console.log(err)
            uiCtrl.showHideAlert(`alert-danger`,err,'show')
        })
    }
//=================================================================================================
//USER APP STATE ==================================================================================
//=================================================================================================
//FETCH DATA FOR USERS APP STATE
    fetchUsers(dataCtrl,uiCtrl){
        return new Promise((resolve,reject)=>{
            fetch(`/services/allUsers`,{redirect:'follow'})
            .then(answer => { 
                console.log(answer)
                if(answer.status===401){
                    uiCtrl.showHideAlert(`alert-warning`,'User has no access to fetch users from database','show')
                }else if(answer.redirected){
                    return window.location.href = answer.url
                }else{
                    answer.json()
                    .then(response => {
                        if(!response.hasErros){
                            dataCtrl.setUsers = response
                            resolve(true)
                        }else{
                            uiCtrl.showHideAlert(`alert-danger`,response.msg,'show')
                            reject(false)    
                        } })
                    .catch(err => {
                        console.log(err)
                        uiCtrl.showHideAlert(`alert-danger`,err,'show')
                        reject(false)
                    })}})})
    }
    generateInvitationCode(uiCtrl,email,resultsWrapperElementId,messageWrapperId,inputFieldId){
        if(email===''){
            return uiCtrl.showHideAlert(`alert-danger`,'You must inform a valid e-mail address','show')
        }
        const obj = {email: email.toLowerCase()}
        console.log(obj)
        fetch('/services/invitationCode',{
            method: 'POST',
            headers: {'Content-type':'application/json'},
            body: JSON.stringify(obj)})
        .then(answer => { 
            if(answer.status===401){
                uiCtrl.showHideUserModal(null,null,'hide',null)
                uiCtrl.showHideAlert(`alert-warning`,'User has no access to create invitation codes','show')    
            }else if(answer.redirected){return window.location.href = answer.url 
            }else{
                answer.json()
                .then(response => {
                    if(!response.hasErros){
                        document.getElementById(inputFieldId).value = response.data.code
                        document.getElementById(messageWrapperId).innerHTML = `Hi!
                        We've just generated your invitation code to create your accont in the KungfuBBQ app. 
                        Please, make sure to use this code <b>${response.data.code}</b> and this email <b>${response.data.email}</b> when registering.
                        Thanks!`
                        document.getElementById(resultsWrapperElementId).style.display = 'block'
                    }else{
                        uiCtrl.showHideAlert(`alert-danger`,response.msg,'show')    
                    }
                })
                .catch(err => {
                    console.log(err)
                    uiCtrl.showHideUserModal(null,null,'hide',null)
                    uiCtrl.showHideAlert(`alert-danger`,err,'show') })
            }})
    }
    sendNotification(dataCtrl,uiCtrl,data){
        return new Promise((resolve,reject)=>{
            fetch('/services/sendNotification',{
                method: 'POST',
                headers: {'Content-type':'application/json'},
                body: JSON.stringify(data)})
            .then(answer => { 
                if(answer.status===401){
                    uiCtrl.showHideUserModal(null,null,'hide',null)
                    uiCtrl.showHideAlert(`alert-warning`,'User has no access to notify users','show')    
                }else if(answer.redirected){ return window.location.href = answer.url 
                }else{
                    answer.json()
                    .then(response => {
                        resolve(true)
                        if(!response.hasErrors){ return uiCtrl.showHideAlert(`alert-primary`,response.msg,'show') }
                        uiCtrl.showHideAlert(`alert-danger`,response.msg,'show')
                    })
                    .catch(err => {
                        reject(false)
                        console.log(err)
                        uiCtrl.showHideAlert(`alert-danger`,err.msg,'show')
                    })
                }})})
    }
//support functions
    commonFunctionsUserAfterPostUpdate(successMsg,dataCtrl,uiCtrl){
        this.fetchUsers(dataCtrl,uiCtrl)
        .then(value => {
            uiCtrl.changeUIInterfaceAccordingToAppSubState(dataCtrl,this)
        })
        .catch(err => {console.log('error fetchUsers')})
        uiCtrl.showHideUserModal(null,null,'hide',null)
    }
//=================================================================================================
//COOKING DATES APP STATE =========================================================================
//=================================================================================================
//FETCH DATA FOR USERS COOKING STATE
    fetchCookingDates(dataCtrl,uiCtrl){
        return new Promise((resolve,reject) => {
            fetch('/services/allCookingCalendar')
            .then(answer => { 
                if(answer.status===401){
                    uiCtrl.showHideUserModal(null,null,'hide',null)
                    uiCtrl.showHideAlert(`alert-warning`,'User has no access to fetch cooking dates from database','show')    
                }else if(answer.redirected){return window.location.href = answer.url
                }else{
                    answer.json()
                    .then(response => {
                        if(!response.hasErros){
                            dataCtrl.setCookingCalendarStatus = response.data.cookingCalendarStatus
                            dataCtrl.setCookingCalendar = response.data.cookigCalendar
                            resolve(true)
                        }else{
                            uiCtrl.showHideAlert(`alert-danger`,response.msg,'show')    
                            reject(false)
                        }
                    })
                    .catch(err => {
                        console.log(err)
                        uiCtrl.showHideUserModal(null,null,'hide',null)
                        uiCtrl.showHideAlert(`alert-danger`,err,'show')
                        reject(false)})   
                }})})
    }
    updateCookingDateInformation(dataCtrl,uiCtrl,dataObj){
        return new Promise((resolve,reject)=> {
            fetch('/services/updateCookingCalendarDate', {
                method: 'POST',
                headers: {'Content-type':'application/json'},
                body: JSON.stringify(dataObj) })
            .then(answer => {  
                if(answer.status===401){
                    uiCtrl.showHideUserModal(null,null,'hide',null)
                    uiCtrl.showHideAlert(`alert-warning`,'User has no access to update cooking dates','show')    
                }else if(answer.redirected){return window.location.href = answer.url
                }else{
                    answer.json()
                    .then(response => {
                        console.log(response)
                        if(!response.hasErrors){
                            uiCtrl.showHideAlert(`alert-info`,response.data,'show')
                            this.fetchCookingDates(dataCtrl,uiCtrl)
                            .then(value => { resolve(true) })
                            .catch(err => {  reject(false) })
                        }else{
                            uiCtrl.showHideUserModal(null,null,'hide',null)
                            uiCtrl.showHideAlert(`alert-danger`,response.msg,'show')
                            this.fetchCookingDates(dataCtrl,uiCtrl)
                            .then(value => { resolve(true) })
                            .catch(err => {  reject(false) })
                        }})
                    .catch(err => {
                        console.log(err)
                        uiCtrl.showHideUserModal(null,null,'hide',null)
                        uiCtrl.showHideAlert(`alert-danger`,err,'show')
                        reject(false)})
                }})})
    }
    createNewCookingCalendarDate(dataCtrl,uiCtrl,dataObj){
        return new Promise((resolve,reject)=>{
            fetch('/services/newCookingDate', {
                method: 'POST',
                headers: {'Content-type':'application/json'},
                body: JSON.stringify(dataObj)})
            .then(answer => {  
                if(answer.status===401){
                    uiCtrl.showHideUserModal(null,null,'hide',null)
                    uiCtrl.showHideAlert(`alert-warning`,'User has no access to create new cooking date','show')    
                }else if(answer.redirected){return window.location.href = answer.url
                }else{
                    answer.json()
                    .then(response => {
                        console.log(response)
                        if(!response.hasErrors){
                            this.fetchCookingDates(dataCtrl,uiCtrl)
                            .then(value => { resolve(true) })
                            .catch(err => { reject(false) })
                        }else{
                            uiCtrl.showHideUserModal(null,null,'hide',null)
                            uiCtrl.showHideAlert(`alert-danger`,response.msg,'show')    
                            reject(false)
                        }})
                    .catch(err => {
                        console.log(err)
                        uiCtrl.showHideUserModal(null,null,'hide',null)
                        uiCtrl.showHideAlert(`alert-danger`,err,'show')
                        reject(false)})   
                    }})})
    }
    deleteCookingCalendarDate(dataCtrl,uiCtrl,dataObj){
        return new Promise((resolve,reject)=>{
            fetch('/services/deleteCookingCalendarDate', {
                method: 'POST',
                headers: {'Content-type':'application/json'},
                body: JSON.stringify(dataObj)})
            .then(answer => {  
                if(answer.status===401){
                    uiCtrl.showHideUserModal(null,null,'hide',null)
                    uiCtrl.showHideAlert(`alert-warning`,'User has no access to delete cooking dates','show')    
                }else if(answer.redirected){return window.location.href = answer.url
                }else{
                    answer.json()
                    .then(response => {
                        if(!response.hasErrors){
                            this.fetchCookingDates(dataCtrl,uiCtrl)
                            .then(value => { resolve(true)})
                            .catch(err => { reject(false) })
                        } })
                    .catch(err => {
                        console.log(err)
                        uiCtrl.showHideUserModal(null,null,'hide',null)
                        uiCtrl.showHideAlert(`alert-danger`,err,'show')
                        reject(false)})
                }})})
    }
    openToOrders(dataCtrl,uiCtrl,dataObj){
        return new Promise((resolve,reject)=>{
            fetch('/services/openToOrders', {
                method: 'POST',
                headers: { 'Content-type':'application/json'},
                body: JSON.stringify(dataObj)})
            .then(answer => {  
                if(answer.status===401){
                    uiCtrl.showHideUserModal(null,null,'hide',null)
                    uiCtrl.showHideAlert(`alert-warning`,'User has no access to open cooking dates to orders','show')    
                }else if(answer.redirected){return window.location.href = answer.url
                }else{
                    answer.json()
                    .then(response => {
                        if(!response.hasErrors){
                            this.fetchCookingDates(dataCtrl,uiCtrl)
                            .then(value => { resolve(true)})
                            .catch(err => { reject(false) })
                        }})
                    .catch(err => {
                        console.log(err)
                        uiCtrl.showHideUserModal(null,null,'hide',null)
                        uiCtrl.showHideAlert(`alert-danger`,err,'show')
                        reject(false)})
                }})})
    }
    closeToOrders(dataCtrl,uiCtrl,dataObj){
        return new Promise((resolve,reject)=>{
            fetch('/services/closeToOrders', {
                method: 'POST',
                headers: {'Content-type':'application/json'},
                body: JSON.stringify(dataObj)})
            .then(answer => {  
                if(answer.status===401){
                    uiCtrl.showHideUserModal(null,null,'hide',null)
                    uiCtrl.showHideAlert(`alert-warning`,'User has no access to close cooking dates to orders','show')    
                }else if(answer.redirected){return window.location.href = answer.url
                }else{
                    answer.json()
                    .then(response => {
                        if(!response.hasErrors){
                            this.fetchCookingDates(dataCtrl,uiCtrl)
                            .then(value => {resolve(true)})
                            .catch(err => {reject(false)})
                        }})
                    .catch(err => {
                        console.log(err)
                        uiCtrl.showHideUserModal(null,null,'hide',null)
                        uiCtrl.showHideAlert(`alert-danger`,err,'show')
                        reject(false)})
                }})})
    }
    firstAlert(dataCtr,uiCtrl,dataObj){
        return new Promise((resolve,reject)=>{
            fetch('/services/firstAlert', {
                method: 'POST',
                headers: {'Content-type':'application/json'},
                body: JSON.stringify(dataObj)
            })
            .then(answer => {  
                if(answer.status===401){
                    uiCtrl.showHideUserModal(null,null,'hide',null)
                    uiCtrl.showHideAlert(`alert-warning`,'User has no access to set cooking dates cooking capacity','show')    
                }else if(answer.redirected){return window.location.href = answer.url
                }else{
                    answer.json()
                    .then(response => {
                        if(!response.hasErrors){
                            this.fetchCookingDates(dataCtrl,uiCtrl)
                            .then(value => {resolve(true)})
                            .catch(err => {reject(false)})
                        }})
                    .catch(err => {
                        console.log(err)
                        uiCtrl.showHideUserModal(null,null,'hide',null)
                        uiCtrl.showHideAlert(`alert-danger`,err,'show')
                        reject(false)})
                }})})
    }
    secondAlert(dataCtrl,uiCtrl,body){
        return new Promise((resolve,reject)=>{
            fetch('/services/secondAlert', {
                method: 'POST',
                headers: {'Content-type':'application/json'},
                body: JSON.stringify(body)
            })
            .then(answer => {  
                if(answer.status===401){
                    uiCtrl.showHideUserModal(null,null,'hide',null)
                    uiCtrl.showHideAlert(`alert-warning`,'User has no access to set start delivery','show')    
                }else if(answer.redirected){return window.location.href = answer.url
                }else{
                    answer.json()
                    .then(response => {
                        if(!response.hasErrors){
                            this.fetchCookingDates(dataCtrl,uiCtrl)
                            .then(value => {resolve(true)})
                            .catch(err => {reject(false)})
                        }})
                    .catch(err => {
                        console.log(err)
                        uiCtrl.showHideUserModal(null,null,'hide',null)
                        uiCtrl.showHideAlert(`alert-danger`,err,'show')
                        reject(false)})
                }})})
    }
//=================================================================================================
//ORDER APP STATE =================================================================================
//=================================================================================================
//FETCH ALL ORDERS FOR ACTIVE/FINISHED COOKING DATES
    fetchOrdersForActiveFinishedCookingDates(dataCtrl,uiCtrl){
        return new Promise((resolve,reject)=>{
            fetch('/services/fetchOrdersForActiveFinishedCookingDates')
            .then(answer => {
                console.log('called =====================================')
                if(answer.status===401){
                    uiCtrl.showHideUserModal(null,null,'hide',null)
                    uiCtrl.showHideAlert(`alert-warning`,'User has no access to fetch orders from database','show')    
                }else if(answer.redirected){ return window.location.href = answer.url 
                }else{
                    answer.json()
                    .then(response => {
                        if(!response.hasErrors){
                            dataCtrl.setOders = response.data
                            resolve(true)
                        }else{
                            reject(false)
                        }})
                    .catch(err => {
                        console.log(err)
                        uiCtrl.showHideUserModal(null,null,'hide',null)
                        uiCtrl.showHideAlert(`alert-danger`,err,'show')
                        reject(false)})
                }})})
    }
    deleteOrder(dataCtrl,uiCtrl,dataObj){
        return new Promise((resolve,reject)=>{
            fetch('/services/deleteOrder',{
                method: 'POST',
                headers: {'Content-type':'application/json'},
                body: JSON.stringify(dataObj)})
            .then(answer => {
                if(answer.status===401){
                    uiCtrl.showHideUserModal(null,null,'hide',null)
                    uiCtrl.showHideAlert(`alert-warning`,'User has no access to delete orders','show')    
                }else if(answer.redirected){ return window.location.href = answer.url 
                }else{
                    answer.json()
                    .then(response => {
                        if(!response.hasErrors){
                            dataCtrl.setOders = response.data                    
                            resolve(true)
                        }else{
                            reject(false)
                        }})
                    .catch(err => {
                        console.log(err)
                        uiCtrl.showHideUserModal(null,null,'hide',null)
                        uiCtrl.showHideAlert(`alert-danger`,err,'show')
                        reject(false)})
                }})})
    }
    deliverOrder(dataCtrl,uiCtrl,dataObj){
        return new Promise((resolve,reject)=>{
            fetch('/services/deliverOrder',{
                method: 'POST',
                headers: {'Content-type':'application/json' },
                body: JSON.stringify(dataObj)})
            .then(answer => {
                if(answer.status===401){
                    uiCtrl.showHideUserModal(null,null,'hide',null)
                    uiCtrl.showHideAlert(`alert-warning`,'User has no access to deliver orders','show')    
                }else if(answer.redirected){ return window.location.href = answer.url 
                }else{
                    answer.json()
                    .then(response => {
                        if(!response.hasErrors){
                            dataCtrl.setOders = response.data                    
                            resolve(true)
                        }else{
                            reject(false)
                        }})
                    .catch(err => {
                        console.log(err)
                        uiCtrl.showHideUserModal(null,null,'hide',null)
                        uiCtrl.showHideAlert(`alert-danger`,err,'show')
                        reject(false)})   
                }})})
    }
//=================================================================================================
//DISHES APP STATE =================================================================================
//=================================================================================================
//FETCH ALL ACTIVE DISHES
    fetchAllDishes(dataCtrl,uiCtrl){
        return new Promise ((resolve,reject)=> {
            fetch('/services/fetchAllDishes')
            .then(answer => {  
                if(answer.status===401){
                    uiCtrl.showHideUserModal(null,null,'hide',null)
                    uiCtrl.showHideAlert(`alert-warning`,'User has no access to fetch dishes from database','show')    
                }else if(answer.redirected){ return window.location.href = answer.url 
                }else {
                    answer.json()
                    .then(response => {
                        if(!response.hasErrors){
                            dataCtrl.setDishes = response.data
                            resolve(true)
                        }
                        reject(false)})
                    .catch(err => {
                        console.log(err)
                        uiCtrl.showHideUserModal(null,null,'hide',null)
                        uiCtrl.showHideAlert(`alert-danger`,err,'show')
                        reject(false)})   
                }})})
    }
    postNewDish(dataCtrl,uiCtrl,dataObj){
        return new Promise((resolve,reject)=> {
            fetch('/services/newDish', {
                method: 'POST',
                headers: {'Content-type':'application/json'},
                body: JSON.stringify(dataObj)})
            .then(answer => {  
                if(answer.status===401){
                    uiCtrl.showHideUserModal(null,null,'hide',null)
                    uiCtrl.showHideAlert(`alert-warning`,'User has no access create new dish','show')    
                }else if(answer.redirected){ return window.location.href = answer.url 
                }else{
                    answer.json()
                    .then(response => {
                        if(!response.hasErrors){
                            dataCtrl.setDishes = response.data
                            resolve(true)
                        }
                        reject(false)})
                    .catch(err => {
                        console.log(err)
                        uiCtrl.showHideUserModal(null,null,'hide',null)
                        uiCtrl.showHideAlert(`alert-danger`,err,'show')
                        reject(false)})
                }})})
    }
    editDish(dataCtrl,uiCtrl,dataObj){
        return new Promise((resolve,reject)=> {
            fetch('/services/editDish', {
                method: 'POST',
                headers: {'Content-type':'application/json' },
                body: JSON.stringify(dataObj)})
            .then(answer => { 
                if(answer.status===401){
                    uiCtrl.showHideUserModal(null,null,'hide',null)
                    uiCtrl.showHideAlert(`alert-warning`,'User has no access edit dishes','show')    
                }else if(answer.redirected){ return window.location.href = answer.url 
                }else{
                    answer.json()
                    .then(response => {
                        if(!response.hasErrors){
                            dataCtrl.setDishes = response.data
                            resolve(true)
                        }else{
                            reject(false)
                        }})
                    .catch(err => {
                        console.log(err)
                        uiCtrl.showHideUserModal(null,null,'hide',null)
                        uiCtrl.showHideAlert(`alert-danger`,err,'show')
                        reject(false)})   
                }})})
    }
    deleteDish(dataCtrl,uiCtrl,dataObj){
        return new Promise((resolve,reject)=> {
            fetch('/services/deleteDish', {
                method: 'POST',
                headers: {'Content-type':'application/json' },
                body: JSON.stringify(dataObj) })
            .then(answer => {  
                if(answer.status===401){
                    uiCtrl.showHideUserModal(null,null,'hide',null)
                    uiCtrl.showHideAlert(`alert-warning`,'User has no access delete dishes','show')    
                }else if(answer.redirected){ return window.location.href = answer.url 
                }else{
                    answer.json()
                    .then(response => {
                        if(!response.hasErrors){
                            dataCtrl.setDishes = response.data
                            resolve(true)
                        }else{
                            uiCtrl.showHideAlert(`alert-danger`,response.msg,'show')
                            reject(false)
                        } })
                    .catch(err => {
                        console.log(err)
                        uiCtrl.showHideUserModal(null,null,'hide',null)
                        uiCtrl.showHideAlert(`alert-danger`,err,'show')
                        reject(false)})   
                }})})
    }
//=================================================================================================
//CATORING APP STATE ==============================================================================
//=================================================================================================
//FETCH ALL CATORING MESSAGES
    fetchAllMessages(dataCtrl,uiCtrl){
        return new Promise((resolve,reject)=> {
            fetch('/services/fetchAllMessages')
            .then(answer => {
                if(answer.status===401){
                    uiCtrl.showHideUserModal(null,null,'hide',null)
                    uiCtrl.showHideAlert(`alert-warning`,'User has no access to fetch catering messages','show')    
                }else if(answer.redirected){ return window.location.href = answer.url 
                }else{
                    answer.json()
                    .then(response => {
                        if(!response.hasErrors){
                            dataCtrl.setCatoringMsg = response.data
                            resolve(true)
                        }else{
                            reject(false)
                        }})
                    .catch(err => {
                        console.log(err)
                        uiCtrl.showHideUserModal(null,null,'hide',null)
                        uiCtrl.showHideAlert(`alert-danger`,err,'show')
                        reject(false)})   
                }})})
    }
//READ MESSAGE
    readMessage(dataCtrl,uiCtrl,dataObj){
        return new Promise((resolve,reject)=> {
            fetch('/services/readMessage', {
                method: 'POST',
                headers: {'Content-type':'application/json'},
                body: JSON.stringify(dataObj)})
            .then(answer => {  
                if(answer.redirected){ return window.location.href = answer.url }
                return answer.json()})
            .then(response => {
                if(!response.hasErrors){
                    resolve(true)
                }else{
                    reject(false)
                }})
            .catch(err => {
                console.log(err)
                uiCtrl.showHideUserModal(null,null,'hide',null)
                uiCtrl.showHideAlert(`alert-danger`,err,'show')
                reject(false)
            })})
    }
//DELETE MESSAGE
    deleteMessage(dataCtrl,uiCtrl,dataObj){
        return new Promise((resolve,reject)=> {
            fetch('/services/deleteMessage', {
                method: 'POST',
                headers: {'Content-type':'application/json'},
                body: JSON.stringify(dataObj)})
            .then(answer => {  
                if(answer.status===401){
                    uiCtrl.showHideUserModal(null,null,'hide',null)
                    uiCtrl.showHideAlert(`alert-warning`,'User has no access to delete messages','show')    
                }else if(answer.redirected){ return window.location.href = answer.url 
                }else{
                    answer.json()
                    .then(response => {
                        console.log(response)
                        if(!response.hasErrors){
                            resolve(true)
                        }else{
                            reject(false)
                        }})
                    .catch(err => {
                        console.log(err)
                        uiCtrl.showHideUserModal(null,null,'hide',null)
                        uiCtrl.showHideAlert(`alert-danger`,err,'show')
                        reject(false)})
                }})})
    }
//ARCHIVE MESSAGE
    archiveMessage(dataCtrl,uiCtrl,dataObj){
        return new Promise((resolve,reject)=> {
            fetch('/services/archiveMessage', {
                method: 'POST',
                headers: {'Content-type':'application/json'},
                body: JSON.stringify(dataObj)})
            .then(answer => {  
                if(answer.status===401){
                    uiCtrl.showHideUserModal(null,null,'hide',null)
                    uiCtrl.showHideAlert(`alert-warning`,'User has no access to archive messages','show')    
                }else if(answer.redirected){ return window.location.href = answer.url 
                }else{
                    answer.json()
                    .then(response => {
                        if(!response.hasErrors){
                            resolve(true)
                        }else{
                            reject(false)
                        }})
                    .catch(err => {
                        console.log(err)
                        uiCtrl.showHideUserModal(null,null,'hide',null)
                        uiCtrl.showHideAlert(`alert-danger`,err,'show')
                        reject(false)})
                }})})
    }
//=================================================================================================
//=================================================================================================
//=================================================================================================
//*************************************************************************************************
//
//
//                                        APP STATE
//
//
//*************************************************************************************************
//=================================================================================================
//=================================================================================================
//=================================================================================================
// LOAD EVENT LISTENERS
// APP STATE
    loadAppStateEventListeners(dataCtrl,uiCtrl){
        const appStateIds = uiCtrl.getIDs().sidebar.btns
        document.getElementById(appStateIds.invitationCode).addEventListener('click',(e)=>{
            uiCtrl.showHideSpinner('show')
            this.setAppState = this.getAppStatesList._INVITATIONCODE
            this.setAppSubState = this.getAppSubStatesList._INITIAL
            uiCtrl.changeUIInterfaceAccordingToAppState(dataCtrl,this)
            uiCtrl.showHideSpinner('hide')
            this.toggleSidebar(null,uiCtrl)  
        })
        document.getElementById(appStateIds.orderDelivery).addEventListener('click',(e)=>{
            uiCtrl.showHideSpinner('show')
            this.previousState = this.getAppState
            this.setAppState = this.getAppStatesList._ORDERDELIVERY
            this.setAppSubState = this.getAppSubStatesList._INITIAL
            this.fetchOrdersForActiveFinishedCookingDates(dataCtrl,uiCtrl)
            .then(value => {
                this.fetchCookingDates(dataCtrl,uiCtrl)
                .then(value=> {
                    this.fetchUsers(dataCtrl,uiCtrl)
                    .then(value => {
                        uiCtrl.showHideSpinner('hide')
                        uiCtrl.changeUIInterfaceAccordingToAppState(dataCtrl,this)
                        uiCtrl.changeUIInterfaceAccordingToAppSubState(dataCtrl,this)
                    })
                    .catch(err => {
                        uiCtrl.showHideSpinner('hide')
                        console.log('error fetchUsers')})
                })
                .catch(err => {
                    uiCtrl.showHideSpinner('hide')
                    console.log('error fetchOrdersForActiveFinishedCookingDates')})
            })
            .catch(err => {
                uiCtrl.showHideSpinner('hide')
                console.log('error fetchCookingDates') })
            this.toggleSidebar(null,uiCtrl)
        })
        document.getElementById(appStateIds.users).addEventListener('click',(e)=>{
            uiCtrl.showHideSpinner('show')
            this.setAppState = this.getAppStatesList._USERS
            uiCtrl.changeUIInterfaceAccordingToAppState(dataCtrl,this)
            this.setAppSubState = this.getAppSubStatesList._ACTIVEUSERS
            this.fetchUsers(dataCtrl,uiCtrl)
            .then(value => {
                uiCtrl.showHideSpinner('hide')
                uiCtrl.changeUIInterfaceAccordingToAppSubState(dataCtrl,this)
            })
            .catch(err => {
                uiCtrl.showHideSpinner('hide')
                console.log('error fetchUsers->',err)})
            this.toggleSidebar(null,uiCtrl)
        })
        document.getElementById(appStateIds.dish).addEventListener('click',(e)=>{
            uiCtrl.showHideSpinner('show')
            this.setAppState = this.getAppStatesList._DISH
            this.fetchAllDishes(dataCtrl,uiCtrl)
            .then(value => {
                uiCtrl.showHideSpinner('hide')
                uiCtrl.changeUIInterfaceAccordingToAppState(dataCtrl,this)
                this.setAppSubState = this.getAppSubStatesList._ACTIVEDISHES
                uiCtrl.changeUIInterfaceAccordingToAppSubState(dataCtrl,this)
            })
            .catch(err => {
                uiCtrl.showHideSpinner('hide')
                console.log('error fetchAllDishes',err)})
            this.toggleSidebar(null,uiCtrl)
        })
        document.getElementById(appStateIds.cookingCalendar).addEventListener('click',(e)=>{
            uiCtrl.showHideSpinner('show')
            this.setAppState = this.getAppStatesList._COOKINGCALENDAR
            uiCtrl.changeUIInterfaceAccordingToAppState(dataCtrl,this)
            this.setAppSubState = this.getAppSubStatesList._ACTIVEDATES
            this.fetchCookingDates(dataCtrl,uiCtrl)
            .then(value => {
                uiCtrl.showHideSpinner('hide')
                uiCtrl.changeUIInterfaceAccordingToAppSubState(dataCtrl,this)
            })
            .catch(err => {
                uiCtrl.showHideSpinner('hide')
                console.log('error fetchCookingDates', err) })
            this.toggleSidebar(null,uiCtrl)
        })
        document.getElementById(appStateIds.orders).addEventListener('click',(e)=>{
            uiCtrl.showHideSpinner('show')
            this.setAppState = this.getAppStatesList._ORDERS
            uiCtrl.changeUIInterfaceAccordingToAppState(dataCtrl,this)
            this.setAppSubState = this.getAppSubStatesList._ACTIVEORDERS
            this.fetchOrdersForActiveFinishedCookingDates(dataCtrl,uiCtrl)
            .then(value => {
                this.fetchCookingDates(dataCtrl,uiCtrl)
                .then(value=> {
                    this.fetchUsers(dataCtrl,uiCtrl)
                    .then(value => {
                        uiCtrl.showHideSpinner('hide')
                        uiCtrl.changeUIInterfaceAccordingToAppSubState(dataCtrl,this)
                    })
                    .catch(err => {
                        uiCtrl.showHideSpinner('hide')
                        console.log('error fetchUsers', err)})
                })
                .catch(err => {
                    uiCtrl.showHideSpinner('hide')
                    console.log('error fetchOrdersForActiveFinishedCookingDates')})
            })
            .catch(err => {
                uiCtrl.showHideSpinner('hide')
                console.log('error fetchCookingDates') })
            this.toggleSidebar(null,uiCtrl)
        })
        document.getElementById(appStateIds.catorStateBtn).addEventListener('click',(e)=>{
            uiCtrl.showHideSpinner('show')
            this.setAppState = this.getAppStatesList._CATORING
            this.setAppSubState = this.getAppSubStatesList._UNREADMESSAGES
            this.fetchAllMessages(dataCtrl,uiCtrl)
            .then(value => {
                uiCtrl.showHideSpinner('hide')
                uiCtrl.changeUIInterfaceAccordingToAppState(dataCtrl,this)
                uiCtrl.changeUIInterfaceAccordingToAppSubState(dataCtrl,this)
            })
            .catch(err => {
                uiCtrl.showHideSpinner('hide')
                console.log('error fetchAllMessages')})
            this.toggleSidebar(null,uiCtrl)
        })
        document.getElementById(appStateIds.reports).addEventListener('click',(e)=>{
            uiCtrl.showHideSpinner('show')
            this.setAppState = this.getAppStatesList._REPORTS
            this.setAppSubState = this.getAppSubStatesList._INITIAL
            uiCtrl.changeUIInterfaceAccordingToAppState(dataCtrl,this)
            this.toggleSidebar(null,uiCtrl)
            uiCtrl.showHideSpinner('hide')
        })
        document.getElementById(appStateIds.manageAccess).addEventListener('click',(e)=>{
            uiCtrl.showHideSpinner('show')
            this.setAppState = this.getAppStatesList._MANAGEACCESS
            this.setAppSubState = this.getAppSubStatesList._INITIAL
            this.fetchUsers(dataCtrl,uiCtrl)
            .then(value => {
                uiCtrl.showHideSpinner('hide')
                uiCtrl.changeUIInterfaceAccordingToAppState(dataCtrl,this)
            })
            .catch(err => {
                uiCtrl.showHideSpinner('hide')
                console.log('error fetchUsers')})
            this.toggleSidebar(null,uiCtrl)
        })
        document.getElementById(appStateIds.logout).addEventListener('click', (e)=>{
            this.setAppState = this.getAppStatesList._LOGOUT
            this.logout(uiCtrl)
        })
    }
//=================================================================================================
//=================================================================================================
//=================================================================================================
//*************************************************************************************************
//
//
//                                        APP SUB STATE
//
//
//*************************************************************************************************
//=================================================================================================
//=================================================================================================
//=================================================================================================
    loadAppSubStateListeners(dataCtrl, uiCtrl){
        const subBtnsIds = uiCtrl.getIDs().optionbar.btns

        //USER SUB STATES
        if(this.getAppState===this.getAppStatesList._USERS){
            function moduleUserSubState(appCtrl,uiCtrl,userSubState){
                appCtrl.toggleOptionsbar(null,uiCtrl)
                appCtrl.setAppSubState = userSubState
                uiCtrl.changeUIInterfaceAccordingToAppSubState(dataCtrl,appCtrl)
            }
            document.getElementById(subBtnsIds.btnOne).addEventListener('click',(e)=>{
                moduleUserSubState(this,uiCtrl,this.getAppSubStatesList._ACTIVEUSERS)
            })
            document.getElementById(subBtnsIds.btnTwo).addEventListener('click',(e)=>{
                moduleUserSubState(this,uiCtrl,this.getAppSubStatesList._EXCLUDEDUSERS)
            })
            document.getElementById(subBtnsIds.btnThree).addEventListener('click',(e)=>{
                moduleUserSubState(this,uiCtrl,this.getAppSubStatesList._INVITATIONCODE)
            })
        }

        //COOKING CALENDAR SUB STATES
        if(this.getAppState===this.getAppStatesList._COOKINGCALENDAR){
            function moduleCookingCalendarSubState(appCtrl,uiCtrl,userSubState){
                appCtrl.toggleOptionsbar(null,uiCtrl)
                appCtrl.setAppSubState = userSubState
                uiCtrl.changeUIInterfaceAccordingToAppSubState(dataCtrl,appCtrl)
            }
            document.getElementById(subBtnsIds.btnOne).addEventListener('click',(e)=>{
                moduleCookingCalendarSubState(this,uiCtrl,this.getAppSubStatesList._ACTIVEDATES)
            })
            document.getElementById(subBtnsIds.btnTwo).addEventListener('click',(e)=>{
                moduleCookingCalendarSubState(this,uiCtrl,this.getAppSubStatesList._FINISHEDDATES)
            })
            document.getElementById(subBtnsIds.btnThree).addEventListener('click',(e)=>{
                moduleCookingCalendarSubState(this,uiCtrl,this.getAppSubStatesList._EXCLUDEDDATES)
            })
        }

        //DISH SUB STATES
        if(this.getAppState===this.getAppStatesList._DISH){
            function moduleDishSubState(appCtrl,uiCtrl,userSubState){
                appCtrl.toggleOptionsbar(null,uiCtrl)
                appCtrl.setAppSubState = userSubState
                uiCtrl.changeUIInterfaceAccordingToAppSubState(dataCtrl,appCtrl)
            }
            document.getElementById(subBtnsIds.btnOne).addEventListener('click',(e)=>{
                moduleDishSubState(this,uiCtrl,this.getAppSubStatesList._ACTIVEDISHES)
            })
            document.getElementById(subBtnsIds.btnTwo).addEventListener('click',(e)=>{
                moduleDishSubState(this,uiCtrl,this.getAppSubStatesList._EXCLUDEDDISHES)
            })
        }

        //ORDER SUB STATES
        if(this.getAppState===this.getAppStatesList._ORDERS){
            function orderSubState(appCtrl,uiCtrl,userSubState){
                appCtrl.toggleOptionsbar(null,uiCtrl)
                appCtrl.setPreviousSubState = appCtrl.getAppSubState
                appCtrl.setAppSubState = userSubState
                uiCtrl.changeUIInterfaceAccordingToAppSubState(dataCtrl,appCtrl)
            }
            document.getElementById(subBtnsIds.btnOne).addEventListener('click',(e)=>{
                orderSubState(this,uiCtrl,this.getAppSubStatesList._ACTIVEORDERS)
            })
            document.getElementById(subBtnsIds.btnTwo).addEventListener('click',(e)=>{
                orderSubState(this,uiCtrl,this.getAppSubStatesList._FINISHEDORDERS)
            })
            document.getElementById(subBtnsIds.btnThree).addEventListener('click',(e)=>{
                orderSubState(this,uiCtrl,this.getAppSubStatesList._EXCLUDEDORDERS)
            })
            document.getElementById(subBtnsIds.btnFour).addEventListener('click',(e)=>{
                orderSubState(this,uiCtrl,this.getAppSubStatesList._ORDERDELIVERY)
            })
            document.getElementById(subBtnsIds.btnFive).addEventListener('click',(e)=>{
                orderSubState(this,uiCtrl,this.getAppSubStatesList._INACTIVEORDERS)
            })
        }

        //CATORING SUB STATES
        if(this.getAppState===this.getAppStatesList._CATORING){
            function moduleCatoringSubState(appCtrl,uiCtrl,userSubState){
                appCtrl.toggleOptionsbar(null,uiCtrl)
                appCtrl.setAppSubState = userSubState
                uiCtrl.changeUIInterfaceAccordingToAppSubState(dataCtrl,appCtrl)
            }
            document.getElementById(subBtnsIds.btnOne).addEventListener('click',(e)=>{
                moduleCatoringSubState(this,uiCtrl,this.getAppSubStatesList._UNREADMESSAGES)
            })
            document.getElementById(subBtnsIds.btnTwo).addEventListener('click',(e)=>{
                moduleCatoringSubState(this,uiCtrl,this.getAppSubStatesList._ARCHIVEDMESSAGES)
            })
            document.getElementById(subBtnsIds.btnThree).addEventListener('click',(e)=>{
                moduleCatoringSubState(this,uiCtrl,this.getAppSubStatesList._EXCLUDEDMESSAGES)
            })
        }
    }
//=================================================================================================
//=================================================================================================
//=================================================================================================
//*************************************************************************************************
//
//
//                                APP SUB STATE ACTIONS
//
//
//*************************************************************************************************
//=================================================================================================
//=================================================================================================
//=================================================================================================
// APP STATE =====>>>>> USER
    //checks which actions is being received from the onclick button inside user row line
    userActions(dataCtrl,uiCtrl,modalAction,element){
        const modalActions = uiCtrl.getIDs().modalActions.user
        const modalTypes =uiCtrl.getIDs().modalTypes.user
        const btnAction = uiCtrl.getIDs().modal.btnAction
        //EVENT LISTNERERS =====================================================
        function loadEventListeners(dataCtrl,uiCtrl,appCtrl,modalAction,element){
            if(modalAction===modalActions.edit){
                document.getElementById(btnAction).addEventListener('click',(e)=>{
                    uiCtrl.showHideSpinner('show')
                    const dataObj = {}
                    const formId = uiCtrl.getIDs().form
                    for(let e of document.getElementById(formId)){
                        dataObj[`${e.name}`] = e.value
                    }
                    fetch('/services/editedUserInfo',{
                        method: 'POST',
                        headers: {'Content-type':'application/json'},
                        body: JSON.stringify(dataObj)})
                    .then(answer => {  
                        console.log('===========================================')
                        console.log(answer)
                        uiCtrl.showHideSpinner('hide')
                        if(answer.status===401){
                            uiCtrl.showHideUserModal(null,null,'hide',null)
                            uiCtrl.showHideAlert(`alert-warning`,'User has not access to update user info','show')
                        }else if(answer.redirected){ return window.location.href = answer.url 
                        }else{
                            answer.json()
                            .then(response => {
                                console.log(response)
                                if(!response.hasErros){ return appCtrl.commonFunctionsUserAfterPostUpdate(response.msg,dataCtrl,uiCtrl)}
                                uiCtrl.showHideAlert(`alert-danger`,response.msg,'show')})
                            .catch(err => {
                                console.log(err)
                                uiCtrl.showHideUserModal(null,null,'hide',null)
                                uiCtrl.showHideAlert(`alert-danger`,err,'show')})                                
                            }})})
            }
            if(modalAction===modalActions.delete){
                document.getElementById(btnAction).addEventListener('click',(e)=>{
                    uiCtrl.showHideSpinner('show')
                    const dataObj = {}
                    const formId = uiCtrl.getIDs().form
                    for(let e of document.getElementById(formId)){
                        dataObj[`${e.name}`] = e.value
                    }
                    fetch('/services/deleteUserById',{
                        method: 'POST',
                        headers: {'Content-type':'application/json'},
                        body: JSON.stringify(dataObj)})
                    .then(answer => { 
                        uiCtrl.showHideSpinner('hide')
                        if(answer.status===401){
                            uiCtrl.showHideUserModal(null,null,'hide',null)
                            uiCtrl.showHideAlert(`alert-warning`,'User has no access to delete users','show')    
                        }else if(answer.redirected){ return window.location.href = answer.url 
                        }else{
                            return answer.json()
                            .then(response => {
                                console.log(response)
                                if(!response.hasErros){ return appCtrl.commonFunctionsUserAfterPostUpdate(response.msg,dataCtrl,uiCtrl) }
                                uiCtrl.showHideAlert(`alert-danger`,response.msg,'show')})
                            .catch(err => {
                                console.log(err)
                                uiCtrl.showHideSpinner('hide')
                                uiCtrl.showHideUserModal(null,null,'hide',null)
                                uiCtrl.showHideAlert(`alert-danger`,err,'show')})
                        }})})
            }
            if(modalAction===modalActions.notify){
                document.getElementById(btnAction).addEventListener('click',(e)=>{
                    uiCtrl.showHideSpinner('show')
                    const dataObj = {}
                    const formId = uiCtrl.getIDs().form
                    for(let e of document.getElementById(formId)){
                        console.log(e)
                        dataObj[`${e.name}`] = e.value
                    }
                    appCtrl.sendNotification(dataCtrl,uiCtrl,dataObj)
                    .then(value=>{
                        uiCtrl.showHideSpinner('hide')
                        uiCtrl.showHideUserModal(null,null,'hide',null)
                    })
                    .catch(err=>{
                        console.log('userModals - sendNotification',err);
                        uiCtrl.showHideSpinner('hide')
                        uiCtrl.showHideUserModal(null,null,'hide',null)})
                })
            }
        }
        //ACTIONS START =========================================================
        if(modalAction===modalActions.viewDetails){
            uiCtrl.showHideUserModal(dataCtrl,this,'show',parseInt(element.id.split('-')[1]),modalTypes.viewDetails)
        }
        if(modalAction===modalActions.edit){
            uiCtrl.showHideUserModal(dataCtrl,this,'show',parseInt(element.id.split('-')[1]),modalTypes.edit)
            loadEventListeners(dataCtrl,uiCtrl,this,modalAction,element)
        }
        if(modalAction===modalActions.delete){
            uiCtrl.showHideUserModal(dataCtrl,this,'show',parseInt(element.id.split('-')[1]),modalTypes.delete)
            loadEventListeners(dataCtrl,uiCtrl,this,modalAction,element)
        }
        if(modalAction===modalActions.notify){
            uiCtrl.showHideUserModal(dataCtrl,this,'show',parseInt(element.id.split('-')[1]),modalTypes.notify)
            loadEventListeners(dataCtrl,uiCtrl,this,modalAction,element)
        }
    }
    //copy invitation code information
    copy(){
        const el = document.createElement('textarea');
        el.value = document.getElementById('returnMsgWithCode').textContent;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        alert(`Text copied to clipboard`)
        document.body.removeChild(el);
    }
    copyCodeOnly(){
        const el = document.createElement('textarea');
        el.value = document.getElementById('code').value;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        alert(`Code copied to clipboard`)
        document.body.removeChild(el);
    }
    
//=================================================================================================
//*************************************************************************************************
// APP STATE =====>>>>> COOKING DATE 
//lists orders for each cooking date
    cookingCalendarDateActions(dataCtrl,uiCtrl,action,element){
        const modalActions = uiCtrl.getIDs().modalActions.cookingDate
        const modalTypes = uiCtrl.getIDs().modalTypes.cookingDate
        const btnAction = uiCtrl.getIDs().modal.btnAction
        const btnAction2 = uiCtrl.getIDs().modal.btnAction2
        const appCtrl = this
        this.cookingDateModal = (action===modalActions.newDish ? this.cookingDateModal : null)
        // if(action!==modalActions.edit && action!==modalActions.newDish){
        //     dataCtrl.clearTempSelectedData()
        // }
        //=================================================
        //actions insideEventListners =====================
        //=================================================
        function loadListenersForBtnAction(modalAction){
            function commonActions(){
                uiCtrl.changeUIInterfaceAccordingToAppSubState(dataCtrl, appCtrl)
                uiCtrl.showHideCookingCalendarModal(null,null,'hide',null,null)
                uiCtrl.showHideSpinner('hide')
            }
            if(modalAction===modalActions.delete){
                document.getElementById(btnAction).addEventListener('click',(e)=>{
                    uiCtrl.showHideSpinner('show')
                    appCtrl.deleteCookingCalendarDate(dataCtrl,uiCtrl,{cookingDate: element.id.split('-')[1]})
                    .then(value => { commonActions()})
                    .catch(err => { console.log('error deleteCookingCalendarDate',err);uiCtrl.showHideSpinner('hide')})
                })
            }else if(modalAction===modalActions.openToOrders){
                console.log('listener open to order')
                document.getElementById(btnAction).addEventListener('click',(e)=>{
                    uiCtrl.showHideSpinner('show')
                    appCtrl.openToOrders(dataCtrl,uiCtrl,{cookingDate: element.id.split('-')[1]})
                    .then(value => { commonActions()})
                    .catch(err => { console.log('error openToOrders',err);uiCtrl.showHideSpinner('hide')})
                })
            }else if(modalAction===modalActions.closeToOrders){
                document.getElementById(btnAction).addEventListener('click',(e)=>{
                    uiCtrl.showHideSpinner('show')
                    appCtrl.closeToOrders(dataCtrl,uiCtrl,{cookingDate: element.id.split('-')[1]})
                    .then(value => { commonActions()})
                    .catch(err => { console.log('error closeToOrders',err);uiCtrl.showHideSpinner('hide')})
                })
            }else if(modalAction===modalActions.firstAlert){
                document.getElementById(btnAction).addEventListener('click',(e)=>{
                    const formName = uiCtrl.getIDs().formsNames.firstAlertInfo
                    const form = document.getElementsByName(formName)[0]
                    const cdId = document.getElementById(modalTypes.firstAlert).innerText
                    if(form.value===''||form.value===null){
                        return uiCtrl.showHideAlert('alert-danger','You <strong>must</strong> inform the <strong>how many meals</strong> will be cooked on this cooking calendar date.','show')
                    }else {
                        uiCtrl.showHideSpinner('show')
                        appCtrl.firstAlert(dataCtrl,uiCtrl,{numberMeals: parseInt(form.value), cookingDateId: parseInt(cdId)})
                        .then(val => {
                            // uiCtrl.changeUIInterfaceAccordingToAppState(dataCtrl,appCtrl)
                            commonActions()})
                        .catch(err => {console.log('error firstAlert',err);uiCtrl.showHideSpinner('hide')})
                    }})
            }else if(modalAction===modalActions.secondAlert){
                document.getElementById(btnAction).addEventListener('click',(e)=>{
                    uiCtrl.showHideSpinner('show')
                    const cdId = parseInt(document.getElementById(modalTypes.secondAlert).innerText)
                    appCtrl.secondAlert(dataCtrl,uiCtrl,{cookingDateId:cdId})
                    .then(value => {
                        uiCtrl.showHideAlert('alert-success','Pickup alert <strong>sent</strong>','show')
                        commonActions()})
                    .catch(err => {console.log('error secondAlert',err);uiCtrl.showHideSpinner('hide') })
                    })
            }else if(modalAction===modalActions.gameOver){
                uiCtrl.showHideAlert('alert-warning','All possible actions for this cooking calendar date have beeing completed.','show')
            }else if(modalAction===modalActions.edit){
                document.getElementById(btnAction).addEventListener('click',(e)=>{
                    var dataObj = {}
                    const cookingCalendarInfo = document.getElementsByName(uiCtrl.getIDs().formsNames.cookingCalendarInfo)
                    var msg = ''
                    const selectedDishes = dataCtrl.returnData('selectedDishes')
                    for(let info of cookingCalendarInfo){
                        const value = info.value
                        const id = info.id
                        if(id===uiCtrl.getIDs().inputs.cookingCalendarDate.street &&
                        (value===''||value===null)){
                            msg = `${msg}You MUST inform the name of the street. `
                        }
                        if(id===uiCtrl.getIDs().inputs.cookingCalendarDate.city &&
                        (value===''||value===null)){
                            msg = `${msg}You MUST inform the name of the city. `
                        }
                        if(id===uiCtrl.getIDs().inputs.cookingCalendarDate.state &&
                        (value===''||value===null)){
                            msg = `${msg}You MUST choose a state. `
                        }
                        dataObj[info.id] = info.value
                    }
                    if(selectedDishes.length===0){
                        msg = `${msg}You MUST select at least ONE dish.`
                    }else{
                        dataObj.dishes = selectedDishes
                        dataObj.cookingDateId = dataCtrl.returnData('tempSelectedData').id.split('-')[1]
                    }
                    if(msg!==''){
                        return uiCtrl.showHideAlert(`alert-danger`,msg,'show')
                    }else {
                        uiCtrl.showHideAlert(null,null,'hide')
                    }
                    uiCtrl.showHideSpinner('show')
                    appCtrl.updateCookingDateInformation(dataCtrl,uiCtrl,dataObj)
                    .then(value => {
                        uiCtrl.changeUIInterfaceAccordingToAppSubState(dataCtrl,appCtrl)
                        uiCtrl.showHideCookingCalendarModal(null,null,'hide',null,null)
                        uiCtrl.showHideSpinner('hide')
                    })
                    .catch(err => {console.log('error updateCookingDateInformation',err);uiCtrl.showHideSpinner('hide')})
                })
            }else if(modalAction===modalActions.newCookingCalendar){
                appCtrl.createNewCookingCalendarDate(dataCtrl,uiCtrl,{newDate: dataCtrl.returnData('newCookingCalendarDate')})
                .then(value => { uiCtrl.changeUIInterfaceAccordingToAppSubState(dataCtrl,appCtrl) })
                .catch(err => { console.log('error createNewCookingCalendarDate')})
            }else if(modalAction===modalActions.sendToAll){
                document.getElementById(btnAction).addEventListener('click',(e)=>{
                    const cdId = parseInt(document.getElementById('cookingDateId').value)
                    const msg = document.getElementById('messageToUser').value
                    console.log(cdId,msg)
                    fetch('/services/sendNotifToAll', {
                        method: 'POST',
                        headers: {'Content-type':'application/json'},
                        body: JSON.stringify({cookingDateId: cdId, msgToUser: msg})})
                .then(answer => {  
                    if(answer.status===401){
                        uiCtrl.showHideUserModal(null,null,'hide',null)
                        uiCtrl.showHideAlert(`alert-warning`,'User does not have permission to send notification to all or to all paid','show')    
                    }else if(answer.redirected){ return window.location.href = answer.url 
                    }else{
                        answer.json()
                        .then(response => {
                            uiCtrl.showHideOrderModal(null,null,'hide',null)
                            uiCtrl.showHideSpinner('hide')
                            if(!response.hasErros){
                                uiCtrl.showHideAlert(`alert-info`,response.msg,'show')
                            }else{
                                uiCtrl.showHideAlert(`alert-danger`,response.msg,'show')}})
                        .catch(err => {
                            console.log('orderModals - sendToAll',err);
                            uiCtrl.showHideSpinner('hide')
                            uiCtrl.showHideOrderModal(null,null,'hide',null)})

                    }})})
            }
        }
        //=================================================
        //modal types =====================================
        //=================================================
        if(action===modalActions.listOrders){
            uiCtrl.showHideSpinner('show')
            this.fetchOrdersForActiveFinishedCookingDates(dataCtrl,uiCtrl)
            .then(value=> {
                //uiCtrl.changeUIInterfaceAccordingToAppState(dataCtrl,this)
                //uiCtrl.changeUIInterfaceAccordingToAppSubState(dataCtrl,this)
                uiCtrl.showHideCookingCalendarModal(dataCtrl,appCtrl,'show',parseInt(element.id.split(`-`)[1]),modalTypes.listOrders)
                uiCtrl.showHideSpinner('hide')
            })
            .catch(err => { console.log('error fetchOrdersForActiveFinishedCookingDates', err);uiCtrl.showHideSpinner('hide')})
        }
        if(action===modalActions.sendToAll){
            uiCtrl.showHideCookingCalendarModal(dataCtrl,appCtrl,'show',parseInt(element.id.split(`-`)[1]),modalTypes.sendToAll)
            loadListenersForBtnAction(modalActions.sendToAll)
        }
        if(action===modalActions.edit){
            console.log('cookingDate editAction called')
            uiCtrl.showHideSpinner('show')
            dataCtrl.setTempSelectedData = element
            appCtrl.fetchAllDishes(dataCtrl,uiCtrl)
            .then(value => {
                console.log(element)
                uiCtrl.showHideCookingCalendarModal(dataCtrl,appCtrl,'show',parseInt(element.id.split(`-`)[1]),modalTypes.edit)
                loadListenersForBtnAction(modalActions.edit)
                uiCtrl.showHideSpinner('hide')
            })
            .catch(err => {console.log('error fetchAllDishes',err);uiCtrl.showHideSpinner('hide')})
        }
        if(action===modalActions.viewDetails){
            uiCtrl.showHideCookingCalendarModal(dataCtrl,appCtrl,'show',parseInt(element.id.split(`-`)[1]),modalTypes.viewDetails)
            loadListenersForBtnAction(modalActions.viewDetails)
        }
        if(action===modalActions.newDish){
            console.log(element)
            this.cookingDateModal = element
            uiCtrl.showHideCookingCalendarModal(dataCtrl,appCtrl,'show',parseInt(element.id.split(`-`)[1]),modalTypes.newDish)
        }
        if(action===modalActions.openToOrders){
            uiCtrl.showHideCookingCalendarModal(dataCtrl,appCtrl,'show',parseInt(element.id.split(`-`)[1]),modalTypes.openToOrders)
            loadListenersForBtnAction(modalActions.openToOrders)
        }
        if(action===modalActions.closeToOrders){
            uiCtrl.showHideCookingCalendarModal(dataCtrl,appCtrl,'show',parseInt(element.id.split(`-`)[1]),modalTypes.closeToOrders)
            loadListenersForBtnAction(modalActions.closeToOrders)
        }
        if(action===modalActions.firstAlert){
            uiCtrl.showHideCookingCalendarModal(dataCtrl,appCtrl,'show',parseInt(element.id.split(`-`)[1]),modalTypes.firstAlert)
            loadListenersForBtnAction(modalActions.firstAlert)
        }
        if(action===modalActions.secondAlert){
            uiCtrl.showHideCookingCalendarModal(dataCtrl,appCtrl,'show',parseInt(element.id.split(`-`)[1]),modalTypes.secondAlert)
            loadListenersForBtnAction(modalActions.secondAlert)
        }
        if(action===modalActions.gameOver){
            loadListenersForBtnAction(modalActions.gameOver)
        }

        if(action===modalActions.delete){
            uiCtrl.showHideCookingCalendarModal(dataCtrl,appCtrl,'show',parseInt(element.id.split(`-`)[1]),modalTypes.delete)
            loadListenersForBtnAction(modalActions.delete)
        }
        if(action===modalActions.hide){
            uiCtrl.showHideCookingCalendarModal(dataCtrl,appCtrl,'show',parseInt(element.id.split(`-`)[1]),modalTypes.hide)
        }

        if(action===modalActions.newCookingCalendar){

            loadListenersForBtnAction(modalActions.newCookingCalendar)
        }
    }
    // loadDishesSelectionCheckBoxes(dataCtrl,uiCtrl,className){
    //     var checkBoxes = document.getElementsByClassName(className)
    //     // for(let box of checkBoxes){
    //     //     box.addEventListener('click',(e)=>{
    //     //         console.log(e.id)
    //     //         console.log(e.path)
    //     //         console.log(e.target)
    //     //         const id = parseInt(e.path[1].id.split('-')[1])
    //     //         if(e.path[1].classList.contains('selectedBG')){
    //     //             e.path[1].classList.remove('selectedBG')
    //     //             dataCtrl.removeSelectedDish(id)
    //     //         }else{
    //     //             e.path[1].classList.add('selectedBG')
    //     //             dataCtrl.setSelectedDishes = id
    //     //         }
    //     //     })
    //     // }
    // }
//=================================================================================================
//*************************************************************************************************
// APP STATE =====>>>>> DISH
    //lists orders for each dish
    dishActions(dataCtrl,uiCtrl,action,element){
        console.log('dishActions->', action, element)
        const modalActions = uiCtrl.getIDs().modalActions.dish
        const cookingDateEditAction = uiCtrl.getIDs().modalActions.cookingDate.edit
        const modalTypes = uiCtrl.getIDs().modalTypes.dish
        const btnAction = uiCtrl.getIDs().modal.btnAction
        const btnAction2 = uiCtrl.getIDs().modal.btnAction2
        const formGroupName = uiCtrl.getIDs().formsNames.editDishInfo
        function creatingNewDish(uiCtrl,appCtrl,cookingDate = true){
            console.log('dishActions-> new dish2')
            var dataObj = {}
            const newDishInfoArray = document.getElementsByName(uiCtrl.getIDs().formsNames.newDishInfo)
            //--------------------------------------------------
            //BEGIN VALIDATION ---------------------------------
            var msg = ''
            for(let info of newDishInfoArray){
                if(info.id===uiCtrl.getIDs().inputs.dishes.ids.name){
                    if(info.value===''||info.value===null){
                        msg = `${msg}You MUST inform the name of the dish. `
                    }
                }
                if(info.id===uiCtrl.getIDs().inputs.dishes.ids.price){
                    if(info.value===''||info.value===null){
                        msg = `${msg}You MUST inform the price of the dish. `
                    }
                }
                dataObj[`${info.id}`] = info.value === '' ||  info.value === null ? null : info.value
            }
            if(msg!==``){
                //uiCtrl.showHideCookingCalendarModal(null,null,'hide',null,null)
                //uiCtrl.showHideUserModal(null,null,'hide',null,null)
                return uiCtrl.showHideAlert(`alert-danger`,msg,'show')
            }
            //END VALIDATION -----------------------------------
            //--------------------------------------------------
            //BEGIN POST NEW DISH  -----------------------------
            uiCtrl.showHideSpinner('show')
            appCtrl.postNewDish(dataCtrl,uiCtrl,dataObj)
            .then(value => {
                uiCtrl.showHideSpinner('hide')
                uiCtrl.changeUIInterfaceAccordingToAppSubState(dataCtrl,appCtrl)
                console.log(cookingDate)
                if(cookingDate){
                    dataCtrl.setTempSelectedData = element
                    console.log(appCtrl.cookingDateModal)
                    return appCtrl.cookingCalendarDateActions(dataCtrl,uiCtrl,uiCtrl.getIDs().modalActions.cookingDate.edit,appCtrl.cookingDateModal)
                }else{
                    //uiCtrl.showHideUserModal(null,null,'hide',null,null)
                    //appCtrl.cookingCalendarDateActions(dataCtrl,uiCtrl,cookingDateEditAction,element)
                    uiCtrl.showHideDishModal(null,null,'hide',null,null)
                }
            })
            .catch(err => {console.log('error postNewDish',err);uiCtrl.showHideSpinner('hide')})
            //END POST NEW DISH  -------------------------------
            //--------------------------------------------------
        }

        //--------------------------------------------------
        //BEGIN EVENT LISTENERS ----------------------------
        function loadEventListeners(dataCtrl,uiCtrl,appCtrl,action,element){
            if(action===modalActions.newDish){
                console.log('dishActions-> new dish1')
                document.getElementById(btnAction).addEventListener('click',(e)=> {
                    creatingNewDish(uiCtrl,appCtrl,false)
                })
            }
            if(action===modalActions.edit){
                document.getElementById(btnAction).addEventListener('click',(e)=> {
                    var dataObj = {}
                    for (let e of document.getElementsByName(formGroupName)) {
                        if(e.id===uiCtrl.getIDs().inputs.dishes.ids.id){
                            dataObj[`${e.id}`] = parseInt(e.value)
                        }else {
                            dataObj[`${e.id}`] = e.value
                        }
                    }
                    console.log(dataObj)
                    const validation = dataCtrl.returnData('dishes').filter(dish => {
                        if(dish.id === dataObj[uiCtrl.getIDs().inputs.dishes.ids.id] &&
                        dish.price === dataObj[uiCtrl.getIDs().inputs.dishes.ids.price] &&
                        dish.ingredients === dataObj[uiCtrl.getIDs().inputs.dishes.ids.ingredients] &&
                        dish.description === dataObj[uiCtrl.getIDs().inputs.dishes.ids.description] ){
                            return true
                        }
                    })
                    if(validation.length > 0){
                        uiCtrl.showHideDishModal(null,null,'hide',null,null)
                        uiCtrl.showHideAlert('alert-warning','No information was changed','show')
                    }else{
                        uiCtrl.showHideSpinner('show')
                        appCtrl.editDish(dataCtrl,uiCtrl,dataObj)
                        .then(value => {
                            uiCtrl.showHideSpinner('hide')
                            uiCtrl.changeUIInterfaceAccordingToAppSubState(dataCtrl,appCtrl)
                            uiCtrl.showHideDishModal(null,null,'hide',null,null)
                        })
                        .catch(err => {console.log('error editDish',err);uiCtrl.showHideSpinner('hide')})
                    }
                })
            }    
            if(action===modalActions.delete){
                document.getElementById(btnAction).addEventListener('click',(e)=> {
                    uiCtrl.showHideSpinner('show')
                    appCtrl.deleteDish(dataCtrl,uiCtrl,{
                        dishId: parseInt(element.id.split('-')[1])
                    })
                    .then(value => {
                        uiCtrl.showHideSpinner('hide')
                        uiCtrl.changeUIInterfaceAccordingToAppSubState(dataCtrl,appCtrl)
                        uiCtrl.showHideDishModal(null,null,'hide',null,null)
                    })
                    .catch(err => {console.log('error deleteDish',err);uiCtrl.showHideSpinner('hide');uiCtrl.showHideDishModal(null,null,'hide',null,null)})
                })
            }
        }
        //END EVENT LISTENERS ------------------------------
        //--------------------------------------------------

        //--------------------------------------------------
        //BEGIN ACTIONS ------------------------------------
        if(action===modalActions.newDish){
            console.log('dishActions-> new dish3')
            if(this.appState===this.appStatesList._COOKINGCALENDAR){
                return creatingNewDish(uiCtrl,this,true)
            }
            uiCtrl.showHideDishModal(dataCtrl,this,'show',null,modalTypes.newDish)
            loadEventListeners(dataCtrl,uiCtrl,this,modalActions.newDish,element)
        }
        if(action===modalActions.viewDetails){
            uiCtrl.showHideDishModal(dataCtrl,this,'show',element.id.split('-')[1],modalTypes.viewDetails)
            //loadEventListeners(dataCtrl,uiCtrl,this,modalActions.edit,element)
        }
        if(action===modalActions.edit){
            uiCtrl.showHideDishModal(dataCtrl,this,'show',element.id.split('-')[1],modalTypes.edit)
            loadEventListeners(dataCtrl,uiCtrl,this,modalActions.edit,element)
        }
        if(action===modalActions.delete){
            uiCtrl.showHideDishModal(dataCtrl,this,'show',element.id.split('-')[1],modalTypes.delete)
            loadEventListeners(dataCtrl,uiCtrl,this,modalActions.delete,element)
        }
        //END ACTIONS ---------------------------------------
        //--------------------------------------------------
    }
//=================================================================================================
//*************************************************************************************************
// APP STATE =====>>>>> ORDERS
    orderActions(dataCtrl,uiCtrl,action,element){
        const modalActions = uiCtrl.getIDs().modalActions.order
        const modalTypes = uiCtrl.getIDs().modalTypes.order
        const btnAction = uiCtrl.getIDs().modal.btnAction
        const btnAction2 = uiCtrl.getIDs().modal.btnAction2
        const formGroupName = uiCtrl.getIDs().formsNames.editDishInfo
        //=================================
        //EVENT LISTENERS =================
        function loadEventListeners(dataCtrl,uiCtrl,appCtrl,action,element){
            function commonActions(){
                uiCtrl.changeUIInterfaceAccordingToAppState(dataCtrl,appCtrl)
                uiCtrl.changeUIInterfaceAccordingToAppSubState(dataCtrl,appCtrl)
                uiCtrl.showHideOrderModal(null,null,'hide',null,null)
            }
            if(action===modalActions.delete){
                document.getElementById(btnAction).addEventListener('click',(e)=>{
                    appCtrl.deleteOrder(dataCtrl,uiCtrl,{orderId: parseInt(element.id.split('-')[1])})
                    .then(valeu => { commonActions() })
                    .catch(err => {console.log('error deleteOrder',err)})
                })
            }
            if(action===modalActions.deliver){
                console.log('--> action - deliver')
                document.getElementById(btnAction).addEventListener('click',(e)=>{
                    appCtrl.deliverOrder(dataCtrl,uiCtrl,{orderId: parseInt(element.id.split('-')[1])})
                    .then(value => {commonActions()})
                    .catch(err => {console.log('error deliverOrder')})
                })
            }
            if(action===modalActions.notify){
                document.getElementById(btnAction).addEventListener('click',(e)=>{
                    uiCtrl.showHideSpinner('show')
                    const dataObj = {}
                    const formId = uiCtrl.getIDs().form
                    for(let e of document.getElementById(formId)){
                        console.log(e)
                        dataObj[`${e.name}`] = e.value
                    }
                    appCtrl.sendNotification(dataCtrl,uiCtrl,dataObj)
                    .then(value=>{
                        uiCtrl.showHideSpinner('hide')
                        uiCtrl.showHideOrderModal(null,null,'hide',null)
                    })
                    .catch(err=>{
                        console.log('orderModals - sendNotification',err);
                        uiCtrl.showHideSpinner('hide')
                        uiCtrl.showHideOrderModal(null,null,'hide',null)})
                })
            }
            if(action===modalActions.reimburse){
                document.getElementById(btnAction).addEventListener('click',(e)=>{
                    uiCtrl.showHideSpinner('show')
                    fetch('/services/reimburse',{
                        method: 'POST',
                        headers: {'Content-type':'application/json'},
                        body: JSON.stringify({orderId: parseInt(element.id.split('-')[1])})})
                    .then(answer => {  
                        if(answer.redirected){ return window.location.href = answer.url }
                        return answer.json()})
                    .then(response => {
                        if(!response.hasErros){
                            uiCtrl.showHideAlert(`alert-info`,`Order reimbursed`,'show')
                            appCtrl.fetchOrdersForActiveFinishedCookingDates(dataCtrl,uiCtrl)
                            .then(value => {
                                uiCtrl.showHideSpinner('hide')
                                uiCtrl.changeUIInterfaceAccordingToAppSubState(dataCtrl,appCtrl)
                                uiCtrl.showHideOrderModal(null,null,'hide',null)
                            })
                            .catch(err => {console.log('orderModl fetchUsers ->',err);uiCtrl.showHideSpinner('show');uiCtrl.showHideOrderModal(null,null,'hide',null)})
                        }else{
                            uiCtrl.showHideSpinner('hide')
                            uiCtrl.showHideAlert(`alert-danger`,response.msg,'show')}})
                    .catch(err => {
                        console.log('orderModals - sendNotification',err);
                        uiCtrl.showHideSpinner('hide')
                        uiCtrl.showHideOrderModal(null,null,'hide',null)
                    })       
                })
            }
        }
        //=================================
        //ACTIONS==========================
        if(action===modalActions.viewDetails){
            uiCtrl.showHideOrderModal(dataCtrl,this,'show',parseInt(element.id.split('-')[1]),modalTypes.viewDetails)
        }
        if(action===modalActions.delete){
            uiCtrl.showHideOrderModal(dataCtrl,this,'show',parseInt(element.id.split('-')[1]),modalTypes.delete)
            loadEventListeners(dataCtrl,uiCtrl,this,modalActions.delete,element)
        }
        if(action===modalActions.deliver){
            console.log(element.id)
            uiCtrl.showHideOrderModal(dataCtrl,this,'show',parseInt(element.id.split('-')[1]),modalTypes.deliver)
            loadEventListeners(dataCtrl,uiCtrl,this,modalActions.deliver,element)
        }
        if(action===modalActions.notify){
            uiCtrl.showHideOrderModal(dataCtrl,this,'show',parseInt(element.id.split('-')[1]),modalTypes.notify)
            loadEventListeners(dataCtrl,uiCtrl,this,modalActions.notify,element)
        }
        if(action===modalActions.reimburse){
            uiCtrl.showHideOrderModal(dataCtrl,this,'show',parseInt(element.id.split('-')[1]),modalTypes.reimburse)
            loadEventListeners(dataCtrl,uiCtrl,this,modalActions.reimburse,element)
        }
    }
//=================================================================================================
//*************************************************************************************************
// APP STATE =====>>>>> CATORING
catoringActions(dataCtrl,uiCtrl,action,element){
    const modalActions = uiCtrl.getIDs().modalActions.catoring
    const modalTypes = uiCtrl.getIDs().modalTypes.catoring
    const btnAction = uiCtrl.getIDs().modal.btnAction
    const btnAction2 = uiCtrl.getIDs().modal.btnAction2
    //=================================
    //EVENT LISTENERS =================
    function loadEventListeners(dataCtrl,uiCtrl,appCtrl,action,element){
        var msgId = parseInt(element.id.split('-')[1])
        if(action===modalActions.archive){
            console.log('archive --')
            document.getElementById(btnAction).addEventListener('click',(e)=>{
                console.log(e.target)
                appCtrl.archiveMessage(dataCtrl,uiCtrl,{messageId:msgId})
                .then(value => {
                    appCtrl.fetchAllMessages(dataCtrl,uiCtrl)
                    .then(value => {
                        uiCtrl.changeUIInterfaceAccordingToAppSubState(dataCtrl,appCtrl)
                        uiCtrl.showHideOrderModal(null,null,'hide',null,null)
                    })
                    .catch(err => {console.log('error fetchAllMessages')})
                })
                .catch(value => {console.log('error archiveMessage')})
            })
        }
        if(action===modalActions.delete){
            console.log('delete --')
            document.getElementById(btnAction).addEventListener('click',(e)=>{
                console.log(e.target)
                appCtrl.deleteMessage(dataCtrl,uiCtrl,{messageId:msgId})
                .then(value => {
                    appCtrl.fetchAllMessages(dataCtrl,uiCtrl)
                    .then(value => {
                        uiCtrl.changeUIInterfaceAccordingToAppSubState(dataCtrl,appCtrl)
                        uiCtrl.showHideOrderModal(null,null,'hide',null,null)
                    })
                    .catch(err=> { console.log('error fetchAllMessages')})})
                .catch(value => {console.log('error deleteMessage')})
            })
        }
    }
    //=================================
    //ACTIONS==========================
    if(action===modalActions.read){
        console.log(element.id)
        var msgId = parseInt(element.id.split('-')[1])
        dataCtrl.returnData('activeMsgs').filter(reg => {
            console.log(msgId)
            if(reg.id===msgId&&reg.read===0){
                this.readMessage(dataCtrl,uiCtrl,{messageId:msgId})
                .then(value => {
                    this.fetchAllMessages(dataCtrl,uiCtrl)
                    .then(value => {
                        uiCtrl.changeUIInterfaceAccordingToAppSubState(dataCtrl,this)
                        return uiCtrl.showHideCatoringModal(dataCtrl,this,'show',parseInt(element.id.split('-')[1]),modalTypes.read)
                    })
                    .catch(err => {console.log('error fetchAllMessages')})
                })
                .catch(value => {console.log('error readMessage')})
            }
        })
        uiCtrl.showHideCatoringModal(dataCtrl,this,'show',parseInt(element.id.split('-')[1]),modalTypes.read)
    }
    if(action===modalActions.archive){
        uiCtrl.showHideCatoringModal(dataCtrl,this,'show',parseInt(element.id.split('-')[1]),modalTypes.archive)
        loadEventListeners(dataCtrl,uiCtrl,this,modalActions.archive,element)
    }
    if(action===modalActions.delete){
        uiCtrl.showHideCatoringModal(dataCtrl,this,'show',parseInt(element.id.split('-')[1]),modalTypes.delete)
        loadEventListeners(dataCtrl,uiCtrl,this,modalActions.delete,element)
    }
}
//=================================================================================================
//*************************************************************************************************
// APP STATE =====>>>>> MANAGE ACCESS
manageAccessActions(dataCtrl,uiCtrl,action,element){
    const modalActions = uiCtrl.getIDs().modalActions.manageAccess
    const modalTypes = uiCtrl.getIDs().modalTypes.manageAccess
    const btnAction = uiCtrl.getIDs().modal.btnAction
    const btnAction2 = uiCtrl.getIDs().modal.btnAction2
    function loadEventListenersMA(dataCtrl,uiCtrl,appCtrl,action,element){
        if(action===modalActions.manageAccess){
            document.getElementById(btnAction).addEventListener('click',(e)=>{
                console.log('updateAccess')
                const original = dataCtrl.returnData('originalAccesses')
                const modified = dataCtrl.returnData('modifiedAccesses')
                var insertAccess = []
                var deleteAccess = []
                modified.some(x => {
                    if(!original.includes(x)){
                        insertAccess.push(x)
                    }
                })
                original.some(x => {
                    if(!modified.includes(x)){
                        deleteAccess.push(x)
                    }
                })
                console.log(insertAccess.length)
                console.log(deleteAccess.length)
                if(insertAccess.length===0 && deleteAccess.length===0){
                    return uiCtrl.showHideAlert('alert-danger','No accesses changed for this user','show')
                }
                uiCtrl.showHideSpinner('show')
                fetch('/services/updateUserAccesses',{
                    method: 'POST',
                    headers: {'Content-type':'application/json'},
                    body: JSON.stringify({
                        insertAccesses: insertAccess,
                        deleteAccesses: deleteAccess,
                        userId: dataCtrl.returnData('tempSelectedData')
                    })})
                .then(answer => { 
                    console.log('updateAccess =====================================')
                    console.log(answer.status)
                    if(answer.status===401){
                        uiCtrl.showHideSpinner('hide')
                        uiCtrl.showHideUserModal(null,null,'hide',null)
                        uiCtrl.showHideAlert(`alert-warning`,'User has no access to delete users','show')    
                    }else if(answer.redirected){ return window.location.href = answer.url 
                    }else{
                        answer.json()
                        .then(response => {
                            if(!response.hasErros){
                                appCtrl.fetchUsers(dataCtrl,uiCtrl)
                                .then(value => {
                                    uiCtrl.showHideSpinner('hide')
                                    uiCtrl.showHideUserModal(null,null,'hide',null)
                                })
                                .catch(err => {console.log('error fetchUsers',err);uiCtrl.showHideSpinner('hide')})
                            }else{
                                uiCtrl.showHideAlert(`alert-danger`,response.msg,'show')    
                                reject(false)
                            }
                        })
                        .catch(err => {
                            console.log(`updateUserAccesses ->`,err)
                            uiCtrl.showHideSpinner('hide')
                            uiCtrl.showHideUserModal(null,null,'hide',null)
                            uiCtrl.showHideAlert(`alert-danger`,err,'show')
                            reject(false)
                        })}})})
        }
    }

    if(action===modalActions.manageAccess){
        uiCtrl.showHideManageAccessModal(dataCtrl,this,'show',parseInt(element.id.split('-')[1]),modalTypes.manageAccess)
        loadEventListenersMA(dataCtrl,uiCtrl,this,action,element)
    }
}
//=================================================================================================
//*************************************************************************************************
// APP STATE =====>>>>> LOGOUT
    logout(uiCtrl){
        fetch('/auth/logoutDeveloper')
            .then(answer => {
                if(answer.redirected){
                    window.location.href = answer.url
                }else{
                    uiCtrl.showHideAlert('alert-danger','Log-out unsuccessfull!')
                }
            })
            .catch(err => {
                console.log(err)
                uiCtrl.showHideAlert('alert-danger','Log-out unsuccessfull!')
            })
    }
//=================================================================================================
//=================================================================================================
//=================================================================================================
//*************************************************************************************************
//
//
//                                        SEARCH MODE
//
//
//*************************************************************************************************
//=================================================================================================
//=================================================================================================
//=================================================================================================
    loadSearchEventListeners(dataCtrl, uiCtrl){
        const searchBox = document.getElementById(uiCtrl.getIDs().searchInput.input)
        searchBox.addEventListener('focus',(e)=>{
            this.appSearchMode(true)
        })
        searchBox.addEventListener('input',(e)=>{
            if(e.target.value===''){
                this.appSearchMode(false)
                e.target.value = null
                uiCtrl.changeUIInterfaceAccordingToAppState(dataCtrl,this)
                uiCtrl.changeUIInterfaceAccordingToAppSubState(dataCtrl,this)
                return
            }else{
                const regex = new RegExp(e.target.value.toLowerCase(),'ig')
                uiCtrl.changeUISearchModeOn(dataCtrl,this,regex)
            }
        })
    }
//TOGGLE SEARCH MODE
    appSearchMode(trueFalse){
        this.searchModeOn = trueFalse
    }
//=================================================================================================
//=================================================================================================
//=================================================================================================
//*************************************************************************************************
//
//
//                                THIRD PARTY FRAMEWORKS
//
//
//*************************************************************************************************
//=================================================================================================
//=================================================================================================
//=================================================================================================
    showDatePicker(dataCtrl,uiCtrl){
        const btnId = uiCtrl.getIDs().addNewCookingCalendarDate
        const modalActionNewCookingCalendarDate = uiCtrl.getIDs().modalActions.cookingDate.newCookingCalendar
        const appCtrl = this
        flatpickr(document.getElementById(btnId), {
            enableTime: true,
            dateFormat: "Y-m-d H:i",
            weekNumbers: true,
            minDate: "today",
            plugins: [new confirmDatePlugin({
                confirmText: "Create ",
                showAlways: false,
                theme: "light"
            })],
            onClose: function(selectedDates,dateStr,instance){
                console.log(dateStr)
                console.log(instance)
                if(dateStr!==''){
                    dataCtrl.setNewCookingCalendarDate = dateStr
                    appCtrl.cookingCalendarDateActions(dataCtrl,uiCtrl,modalActionNewCookingCalendarDate,null)
                }
            }});
    }
    socketIOConnect(dataCtrl,uiCtrl){
        console.log(socketIoDNS)
        let socket = io(socketIoDNS, {
            extraHeaders: {
                Authorization: `Bearer ${dataCtrl.returnData('token')}`
            },
            transports: ["websocket"],
            withCredentials: true
          })
          socket.on('connect', ()=>{
            console.log('ioConnection -> connect')
          })
          socket.onerror = function(e){
            console.log('ioConnection -> error -> ')
            console.log(e.data)
          }
          socket.on(`customer`,(msg)=>{
            console.log(msg)
            if(this.appState===this.appStatesList._USERS){
                this.fetchUsers(dataCtrl,uiCtrl)
                .then(value => {
                    uiCtrl.changeUIInterfaceAccordingToAppState(dataCtrl,this)
                    uiCtrl.changeUIInterfaceAccordingToAppSubState(dataCtrl,this)})
                .catch(err => {
                    uiCtrl.showHideAlert(`alert-danger`,'Not possible to retrieve users from server','show')})}
          })
          socket.on(`order`,(msg)=>{
            console.log(msg)
            if(this.appState===this.appStatesList._COOKINGCALENDAR ||
                this.appState===this.appStatesList._ORDERS){
                    this.fetchOrdersForActiveFinishedCookingDates(dataCtrl,uiCtrl)
                    .then(value => {
                        this.fetchCookingDates(dataCtrl,uiCtrl)
                        .then(value => {
                            this.fetchUsers(dataCtrl,uiCtrl)
                            .then(value => {
                                uiCtrl.changeUIInterfaceAccordingToAppState(dataCtrl,this)
                                uiCtrl.changeUIInterfaceAccordingToAppSubState(dataCtrl,this)})
                            .catch(err => {console.log('error fetchOrdersForActiveFinishedCookingDates')})})
                        .catch(err => { console.log('error fetchCookingDates') })})
                    .catch(err => {console.log('error fetchUsers')})}
            })
          socket.on(`catering`,(msg)=>{
            console.log(msg)
            if(this.appState===this.appStatesList._CATORING){
                this.fetchAllMessages(dataCtrl,uiCtrl)
                .then(value => {
                    console.log('catoring_IOSOCKET')
                    uiCtrl.changeUIInterfaceAccordingToAppSubState(dataCtrl,this)})
                .catch(value => {console.log('error fetchAllMessages')})}
          })
    }
//=================================================================================================
//=================================================================================================
//=================================================================================================
//*************************************************************************************************
//
//
//                                APP STATES MANAGEMENT
//
//
//*************************************************************************************************
//=================================================================================================
//=================================================================================================
//=================================================================================================
    set setAppState(state){
        this.scrollPosition = 0
        this.appState = state
    }
    get getAppState(){
        return this.appState
    }
    get getAppStatesList(){
        return this.appStatesList
    }
    set setPreviousState(state){
        this.previousState = state
    }
    get getPreviousState() {
        return this.previousState
    }
//=================================================================================================
//=================================================================================================
//=================================================================================================
//*************************************************************************************************
//
//
//                                APP SUB STATES MANAGEMENT
//
//
//*************************************************************************************************
//=================================================================================================
//=================================================================================================
//=================================================================================================
    set setAppSubState(subState){
        this.scrollPosition = 0
        this.appSubState = subState
    }
    get getAppSubState(){
        return this.appSubState
    }
    get getAppSubStatesList(){
        return this.appSubStatesList
    }
    set setPreviousSubState(subState){
        this.previousSubState = subState
    }
    get getPreviousSubState() {
        return this.previousSubState
    }
//=================================================================================================
//=================================================================================================
//=================================================================================================
//*************************************************************************************************
//
//
//                                APP GENERAL FUNCTIONS
//
//
//*************************************************************************************************
//=================================================================================================
//=================================================================================================
//=================================================================================================
    toggleSidebar(ref,uiCtrl){
        const id = uiCtrl.getIDs().sidebar.div
        document.getElementById(id).classList.toggle('active');
        this.sideBarShowing = !this.sideBarShowing
    }
    toggleOptionsbar(ref,uiCtrl){
        const id = uiCtrl.getIDs().optionbar.div
        const zIndex = document.getElementById(id).style.zIndex
        document.getElementById(id).style.zIndex = zIndex === '9' ? '10' : '9'
        //document.getElementById(id).style.transition = 'z-index 1s'
        document.getElementById(id).classList.toggle('active');
        this.optionsSideBarShowing = !this.optionsSideBarShowing
    }
    setScrollPosition(pos){
        this.scrollPosition = pos
    }
    getScrollPosition(){
        return this.scrollPosition
    }
}