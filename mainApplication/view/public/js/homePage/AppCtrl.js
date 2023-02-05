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
                
                /*plugins: [new confirmDatePlugin({
                    confirmText: "Create ",
                    showAlways: false,
                    theme: "light"
                })],*/
                onDayCreate: function(dObj, dStr, fp, dayElem){
                    // Utilize dayElem.dateObj, which is the corresponding Date
                    // console.log(dObj,dStr,fp,dayElem)
                    // dummy logic
                    const months = dataCtrl.fetchData('months')
                    const events = dataCtrl.fetchData('events')
                    const dayDateArray = dayElem.ariaLabel.split(',').join('').split(' ')
                    const month = `${months.indexOf(dayDateArray[0]) + 1 <= 9 ? '0' + (months.indexOf(dayDateArray[0]) + 1) : (months.indexOf(dayDateArray[0]) +1)}`
                    const dateCheck = `${dayDateArray[2]}-${month}-${dayDateArray[1] <= 9 ? '0'+dayDateArray[1] : dayDateArray[1]}`
                    console.log(events)
                    console.log(dateCheck)
                    if(events.includes(dateCheck)){
                        dayElem.innerHTML += "<span class='event'></span>";
                    }
                    },
                onClose: function(selectedDates,dateStr,instance){
                    console.log(dateStr)
                    console.log(instance)
                    uiCtrl.updateCalendarViewInformation(dateStr,appCtrl,dataCtrl)
                    // if(dateStr!==''){
                    //     dataCtrl.setNewCookingCalendarDate = dateStr
                    //     appCtrl.cookingCalendarDateActions(dataCtrl,uiCtrl,modalActionNewCookingCalendarDate,null)
                    // }
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
        console.log(newType)
        this.firstLevelModal = newType
    }
    get getFirstLevelType(){
        return this.firstLevelModal
    }
    get getFirstLevelModalTypes(){
        return this.firstLevelModalTypes
    }
    set setSecondLevelModalType(newType){
        console.log(newType)
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
        console.log(newState)
        this.appState = newState
    }
    get getAppStatesList() {
        return this.appStatesList
    }
}