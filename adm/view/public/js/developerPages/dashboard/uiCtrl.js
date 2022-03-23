class UICtrl {
    constructor() {
        this.alert = {
            alert: 'alert',
            text: 'text'
        }
        this.spinner = {
            spinner: 'main-content-spinner'
        }
        this.sidebar = {
            div: 'sidebar-wrapper',
            btns: {
                userInfo: 'user-information-btn',
                hoursWork: 'work-hours-btn',
                logout: 'logout-btn'
            }
        }
        this.modal = {
            div: 'modalDiv',
            title: 'modalDivTitle',
            body: 'modalBody',
            textArea: 'modalTextArea'
        }
        this.mainContent = {
            div: 'main-content-wrapper'
        }
        this.user = {
            div: '',
            btnsTexts: {
                changePassword: 'Change password',
                teste: 'Teste'
            },
            btnsIDs: {
                changePassword: `changePassword`,
                teste: 'teste'
            },
            forms: {
                changePassword: `changePassword`,
                btns: {
                    submit: `form-changePassword-submit`,
                    cancel: `form-changePassword-cancel`
                }
            }
        }
        this.hoursWork = {
            btns: {
                register: 'registerStartEnd'
            }
        }
        this.classes = {
            subState: 'subState'
        }
        this.subStateOptionsWrapper = 'sub-state-options-wrapper'
    }
//=================================================================================================
//=================================================================================================
//=================================================================================================
//=================================================================================================
//=================================================================================================
// CHANGE UI INTERFACE ACCORDING TO APP STATE AND SUBSTATE
    changeUIInterfaceAccordingToAppState(dataCtrl,appCtrl){
        if(appCtrl.getAppState===appCtrl.getAppStatesList._USERINFO){
            document.getElementById(this.mainContent.div).innerHTML = `
            <div class=".container-fluid w-100 mx-auto-my-auto text-center" style="height:13%!important;padding: 5px 5px;overflow-y:auto;padding-left:15px!important">
                <div class="d-flex justify-content-center flex-wrap w-100">
                    <div class="align-self-center" style="padding:5px!important">
                        <button id="${this.user.btnsIDs.changePassword}" class="btn btn-secondary ${this.classes.subState}">${this.user.btnsTexts.changePassword}</button>
                    </div>
                    <!-- <div class="align-self-center" style="padding:5px!important">
                        <button id="${this.user.btnsIDs.teste}" class="btn btn-secondary ${this.classes.subState}">${this.user.btnsTexts.teste}</button>
                    </div> -->
                </div>
            </div>
            <div id="${this.subStateOptionsWrapper}" class=".container-fluid w-100 mx-auto-my-auto text-center" style="height:85%!important;padding: 5px 5px;overflow-y:auto;">
            </div>
            `
        }else if (appCtrl.getAppState===appCtrl.getAppStatesList._HOURSWORK){
            const data = dataCtrl.returnData(`developingRegisters`)
            var innerTBody = ''
            console.log(data)
            if(data.registers.length>0){
                data.registers.forEach(reg => {
                    innerTBody = `${innerTBody}
                        <tr>
                            <td style="width: 25%!important;">${reg.startedAt}</th>
                            <td style="width: 25%!important;">${reg.endedAt}</th>
                            <td style="width: 50%!important;">${reg.developmentDetails}</th>
                        </tr>
                    `
                })
            }
            document.getElementById(this.mainContent.div).innerHTML = `
            <style>
                thead { position: sticky; top: 0; background-color:white; z-index:1;}
            </style>
            <div class=".container-fluid h-100 my-auto mx-auto text-center" style="width: 90%!important;">
                <div class=".container-fluid w-100 my-auto mx-auto text-center" style="height: 78%!important;padding-top:40px!important;">
                    <div class=".container-fluid w-100 my-auto mx-auto text-center h-100" style="overflow-y:auto;">
                        <table class="table table-striped table-hover table-sm">
                            <thead>
                                <tr>
                                    <th style="width: 25%!important;">Start</th>
                                    <th style="width: 25%!important;">End</th>
                                    <th style="width: 50%!important;">Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${innerTBody}
                            </tbody>
                        </table>
                    </div>
                    <div class=".container-fluid w-100 my-auto mx-auto text-center" style="height: 5%!important;padding-top:10px">
                        <button id="${this.hoursWork.btns.register}" class="btn btn-primary">Register</button>
                    </div>
                    <div class=".container-fluid w-100 my-auto mx-auto text-center" style="height: 5%!important;margin-top:30px!important">
                        <div class="d-flex justify-content-center flex-wrap">
                            <div class="align-self-center"><strong>Total developing time: </strong>
                                    ${data.time.hours} hours 
                                    ${data.time.mins} minutes 
                                    ${data.time.secs} seconds
                            </div>
                        </div
                    </div>
                </div>
            </div>
            `
            
        }
    }
    changeUIInterfaceAccordingToAppSubState(dataCtrl,appCtrl){
        if(appCtrl.getAppSubState===appCtrl.getAppSubStatesList._INITIAL){
            document.getElementById(this.subStateOptionsWrapper).innerHTML = ``
            return
        }
        if(appCtrl.getAppSubState===appCtrl.getAppSubStatesList._CHANGEPASSWROD){
            document.getElementById(this.subStateOptionsWrapper).innerHTML = `
            <div class="form">
                <div class=".container-fluid w-100" style="height: 15px!important;"></div>
                <div class=".container-fluid w-100" style="height: 15px!important;"></div>
                <div class=".container-fluid mx-auto my-auto w-75">
                    <input max placeholder="Current password" id="passwordOld" class="w-100" type="password" maxlength="8" required>
                </div>
                <div class=".container-fluid w-100" style="height: 15px!important;"></div>
                <div class=".container-fluid mx-auto my-auto w-75">
                    <input placeholder="New password" id="passwordNew" class="w-100" type="password" maxlength="8"  required>
                </div>
                <div class=".container-fluid w-100" style="height: 15px!important;"></div>
                <div class=".container-fluid mx-auto my-auto w-75">
                    <input placeholder="Confirm new password" id="passwordNewConfirm" class="w-100" type="password" maxlength="8"  required>
                </div>
                <div class=".container-fluid w-100" style="height: 15px!important;"></div>
                <div class=".container-fluid w-100" style="height: 15px!important;"></div>
                <button id="${this.user.forms.btns.cancel}" type="button" class="btn btn-danger">Cancel</button>
                <button id="${this.user.forms.btns.submit}" type="button" class="btn btn-primary">Change</button>
                <div class=".container-fluid w-100" style="height: 15px!important;"></div>
                <div class=".container-fluid w-100" style="height: 15px!important;"></div>
            </div>
            `
        }
    }
//=================================================================================================
//=================================================================================================
//=================================================================================================
//=================================================================================================
//=================================================================================================
// APP STATE BUTTONS ACTIVE CLASS
    changeActiveAppStateButton(btn){
        for (let btn of document.getElementsByClassName('item active')){
            btn.classList.remove('active')
        }
        btn.classList.add('active')
    }
    changeActiveAppSubStateButton(btn){
        for (let btn of document.getElementsByClassName(`${this.classes.subState} active`)){
            btn.classList.remove('active')
        }
        btn.classList.add('active')
    }
//=================================================================================================
//=================================================================================================
//=================================================================================================
//=================================================================================================
//=================================================================================================
// SHOW HIDE MODAL TO INSERT INFORMATION
    showHideModalToInsertInformation(show_hide){
        if(show_hide===`show`){
            document.getElementById(this.modal.title).innerHTML = `What was done today?`
            document.getElementById(this.modal.body).innerHTML = `
            <textarea id=${this.modal.textArea} class="w-100 h-100 text-left mx-auto my-auto"></textarea>
            `
        }
        $(`#${this.modal.div}`).modal(show_hide)
    }    
//=================================================================================================
//=================================================================================================
//=================================================================================================
//=================================================================================================
//=================================================================================================
// SHOW OR HIDE ALERT
showHideAlert(alertClass,text,show_hide){
    const alertsIds = this.getIDs().alert
    this.showHideSpinner('hide')
    function clearAlert(){
        document.getElementById(alertsIds.alert).style.zIndex = 0
        document.getElementById(alertsIds.text).innerHTML = ``
        document.getElementById(alertsIds.alert).classList.remove('alert-success','alert-danger','alert-warning','alert-primary', 'alert-secondary', 'alert-info', 'alert-light','alert-dark','show')
    }
    if(clearTimeout(this.timeOutVar)){
        clearAlert()
    }
    if(show_hide===`hide`){
        return clearAlert()  
    }
    if(show_hide==='show'){
        const alertsIds = this.getIDs().alert
        clearAlert()
        document.getElementById(alertsIds.alert).style.zIndex = 99999
        document.getElementById(alertsIds.text).innerHTML = `${text}`
        document.getElementById(alertsIds.alert).classList.add(alertClass, 'show')
    }
    this.timeOutVar = setTimeout(() => {
         clearAlert()
    }, 3000);
}
//=================================================================================================
//=================================================================================================
//=================================================================================================
//=================================================================================================
//=================================================================================================
//RETURN UI IDS
    getIDs(){
        return this
    }
//=================================================================================================
//=================================================================================================
//=================================================================================================
//*************************************************************************************************
//
//
//                                      SPINNER UI
//
//
//*************************************************************************************************
//=================================================================================================
//=================================================================================================
//=================================================================================================
    showHideSpinner(show_hide){
        if(show_hide===`show`){
            document.getElementById(this.spinner.spinner).style.zIndex = 99998
            document.getElementById(this.spinner.spinner).style.display = 'block'
        }else{
            document.getElementById(this.spinner.spinner).style.zIndex = 0
            document.getElementById(this.spinner.spinner).style.display = 'none'
        }
    }
}