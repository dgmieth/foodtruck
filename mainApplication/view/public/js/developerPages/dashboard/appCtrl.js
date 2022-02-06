class AppCtrl {
    constructor() {
        this.appStatesList = {
            _INITIAL: 'INITIAL',
            _USERINFO: 'USERINFO',
            _HOURSWORK: 'HOURSWORK',
            _LOGOUT: 'LOGOUT'
        }
        this.appState = this.appStatesList._INITIAL

        this.appSubStatesList = {
            _INITIAL: 'INITIAL',
            _CHANGEPASSWROD: 'CHANGEPASSWORD',
            _TESTE: 'TESTE'
        }
        this.appSubState = this.appSubStatesList._INITIAL
    }
//=================================================================================================
//=================================================================================================
//=================================================================================================
//=================================================================================================
//=================================================================================================
//FETCHING DATA
fetchDevelopingResults(dataCtrl,uiCtrl){
    fetch(`/services/developingInformation`)
    .then(answer => { return answer.json()})
    .then(response => {
        console.log(response)
        dataCtrl.setDevelopingRegisters(response)
        uiCtrl.changeUIInterfaceAccordingToAppState(dataCtrl,this)
        this.loadHoursWorkBtnEventListeners(dataCtrl,uiCtrl)
        this.checkIfRegistersHasOpenedRegister(dataCtrl,uiCtrl)
    })
    .catch(err => {
        console.log(err)
        uiCtrl.showHideAlert(`alert-danger`,err,'show')
    })
    }
//=================================================================================================
//=================================================================================================
//=================================================================================================
//=================================================================================================
//=================================================================================================
// LOAD EVENT LISTENERS
    loadAppStateEventListeners(dataCtrl,uiCtrl){
        const appStateIds = uiCtrl.getIDs().sidebar.btns
        document.getElementById(appStateIds.userInfo).addEventListener('click',(e)=>{
            this.setAppState(this.getAppStatesList._USERINFO)
            this.setAppSubState(this.getAppStatesList._INITIAL)
            uiCtrl.changeActiveAppStateButton(e.target)
            uiCtrl.changeUIInterfaceAccordingToAppState(dataCtrl,this)
            this.toggleSidebar(null,uiCtrl)
            this.loadUserBtnsEventListeners(dataCtrl,uiCtrl)
        })
        document.getElementById(appStateIds.hoursWork).addEventListener('click',(e)=>{
            this.setAppState(this.getAppStatesList._HOURSWORK)
            this.setAppSubState(this.getAppStatesList._INITIAL)
            uiCtrl.changeActiveAppStateButton(e.target)
            this.fetchDevelopingResults(dataCtrl,uiCtrl)
            this.toggleSidebar(null,uiCtrl)
        })
        document.getElementById(appStateIds.logout).addEventListener('click', (e)=>{
            this.logout(uiCtrl)
        })
    }
    loadUserBtnsEventListeners(dataCtrl,uiCtrl){
        const userBtns = uiCtrl.getIDs().user.btnsIDs
        for(let id in userBtns){
            document.getElementById(userBtns[id]).addEventListener('click',(e)=> {
                switch (userBtns[id]) {
                    case "changePassword":
                        const ids = uiCtrl.getIDs().user.forms.btns
                        this.setAppSubState(this.getAppSubStatesList._CHANGEPASSWROD)
                        uiCtrl.changeUIInterfaceAccordingToAppSubState(dataCtrl,this)
                        uiCtrl.changeActiveAppSubStateButton(e.target)
                        document.getElementById(ids.submit).addEventListener('click',(e)=> {
                            uiCtrl.showHideSpinner(`show`)
                            fetch('/services/updateDeveloper', {
                                method: `POST`,
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    updateType: 'password',
                                    passwordOld: document.getElementById('passwordOld').value,
                                    passwordNew: document.getElementById('passwordNew').value,
                                    passwordNewConfirm: document.getElementById('passwordNewConfirm').value
                                })
                            })
                            .then(answer => { return answer.json() })
                            .then(response => {
                                uiCtrl.showHideSpinner(`hide`)
                                console.log(response)
                                if(response.success){
                                    alert(response.success)
                                    this.setAppSubState(this.getAppSubStatesList._INITIAL)
                                    uiCtrl.changeUIInterfaceAccordingToAppSubState(dataCtrl,this)
                                }else if(response.error){
                                    uiCtrl.showHideAlert('alert-danger',`Message: ${response.error}`,'show')
                                }
                            })
                            .catch(err => {
                                console.log(err)
                                uiCtrl.showHideSpinner(`hide`)
                                uiCtrl.showHideAlert('alert-danger',`Message: ${err}`,'show')
                            })
                        })
                        document.getElementById(ids.cancel).addEventListener('click',(e)=> {
                            this.setAppSubState(this.getAppSubStatesList._INITIAL)
                            uiCtrl.changeUIInterfaceAccordingToAppSubState(dataCtrl,this)
                        })
                        break;
                    case "teste":
                        this.setAppSubState(this.getAppSubStatesList._TESTE)
                        uiCtrl.changeUIInterfaceAccordingToAppSubState(dataCtrl,this)
                        uiCtrl.changeActiveAppSubStateButton(e.target)
                        break;
                    default:
                        break;
                }
                
            })
        }
    }
    loadHoursWorkBtnEventListeners(dataCtrl,uiCtrl){
        const hoursWorkBtns = uiCtrl.getIDs().hoursWork.btns
        const data = dataCtrl.returnData('developingRegisters')
        
        document.getElementById(hoursWorkBtns.register).addEventListener('click',(e)=> {
            if(!data.hasOpenedRegister){
                uiCtrl.showHideSpinner(`show`)
                fetch('/services/postStartEndDeveloping', {
                    method: `POST`,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({postType: 'start'})
                })
                .then(answer => { return answer.json()})
                .then(response => {
                    console.log(response)
                    uiCtrl.showHideSpinner(`hide`)
                    if(response.success){
                        uiCtrl.showHideAlert(`alert-success`,response.success,'show')
                    }else if(response.error){
                        uiCtrl.showHideAlert(`alert-danger`,response.error,'show')
                    }
                    this.fetchDevelopingResults(dataCtrl,uiCtrl)
                })
                .catch(err=>{
                    console.log(err)
                    uiCtrl.showHideSpinner(`hide`)
                    uiCtrl.showHideAlert(`alert-danger`,err,'show')
                })
            }else{
                uiCtrl.showHideModalToInsertInformation(`show`)
            }
        })
    }
//=================================================================================================
//=================================================================================================
//=================================================================================================
//=================================================================================================
//=================================================================================================
//SUB FUNCTIONS
    checkIfRegistersHasOpenedRegister(dataCtrl,uiCtrl){
        const data = dataCtrl.returnData('developingRegisters')
        if(data.hasOpenedRegister){
            document.getElementById(uiCtrl.getIDs().hoursWork.btns.register).innerText = `End`
        }else{
            document.getElementById(uiCtrl.getIDs().hoursWork.btns.register).innerText = `Start`
        }
    }
    sendPostToFinishWork(dataCtrl,uiCtrl){
        const developmentDetails = document.getElementById(uiCtrl.getIDs().modal.textArea).value
        uiCtrl.showHideModalToInsertInformation(`hide`)
        fetch('/services/postStartEndDeveloping', {
            method: `POST`,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({postType: 'end',
            developmentDetails: developmentDetails})
        })
        .then(answer => { return answer.json()})
        .then(response => {
            console.log(response)
            if(response.success){
                uiCtrl.showHideAlert(`alert-success`,response.success,'show')
            }else if(response.error){
                uiCtrl.showHideAlert(`alert-danger`,response.error,'show')
            }
            this.fetchDevelopingResults(dataCtrl,uiCtrl)
        })
        .catch(err=>{
            console.log(err)
            uiCtrl.showHideAlert(`alert-danger`,err,'show')
        })
    }
    logout(uiCtrl){
        fetch('/auth/logoutDeveloper')
            .then(answer => {
                console.log(answer)
                if(answer.redirected){
                    window.location.href = answer.url
                }else{
                    uiCtrl.showHideAlert('alert-danger','Log-out unsuccessfull!','show')
                }
            })
            .catch(err => {
                console.log(err)
                uiCtrl.showHideAlert('alert-danger','Log-out unsuccessfull!','show')
            })
    }
//=================================================================================================
//=================================================================================================
//=================================================================================================
//=================================================================================================
//=================================================================================================
//APP STATE
    setAppState(state){
        this.appState = state
    }
    get getAppState(){
        return this.appState
    }
    get getAppStatesList(){
        return this.appStatesList
    }
//=================================================================================================
//=================================================================================================
//=================================================================================================
//=================================================================================================
//=================================================================================================
//APP SUBSTATE
    setAppSubState(subState){
        this.appSubState = subState
    }
    get getAppSubState(){
        return this.appSubState
    }
    get getAppSubStatesList(){
        return this.appSubStatesList
    }
//=================================================================================================
//=================================================================================================
//=================================================================================================
//=================================================================================================
//=================================================================================================
//TOGGLE SIDEBARD
    toggleSidebar(ref,uiCtrl){
        const id = uiCtrl.getIDs().sidebar.div
        document.getElementById(id).classList.toggle('active');
    }
}