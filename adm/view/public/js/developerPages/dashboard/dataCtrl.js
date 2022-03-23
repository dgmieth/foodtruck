class DataCtrl {
    constructor() {
        this.developingRegisters = {
            hasOpenedRegister: null,
            registers: [],
            time: {
                hours: 0,
                mins: 0,
                secs: 0
            }
        }
    }
//=================================================================================================
//=================================================================================================
//=================================================================================================
//=================================================================================================
//=================================================================================================
// SET DATA 
    setDevelopingRegisters(data){
        this.developingRegisters.hasOpenedRegister = data.hasOpenedRegister
        data.registers.forEach(reg => {
            if(reg.statedAt!==``&&reg.startedAt!==null&&reg.startedAt!==`null`){
                //reg.startedAt = `${reg.startedAt.split('T')[0]} ${reg.startedAt.split('T')[1].split('.')[0]}`
                reg.startedAt = reg.startedAt
            }else{
                reg.startedAt = ``
            }
            if(reg.endedAt!==``&&reg.endedAt!==null&&reg.endedAt!==`null`){
                //reg.endedAt = `${reg.endedAt.split('T')[0]} ${reg.endedAt.split('T')[1].split('.')[0]}`
                reg.endedAt = reg.endedAt
            }else{
                reg.endedAt = ``
            }
            if(reg.developmentDetails!==``&&reg.developmentDetails!=null&&reg.developmentDetails!==`null`){
                reg.developmentDetails = reg.developmentDetails
            }else{
                reg.developmentDetails = ''
            }
        })
        this.developingRegisters.registers = data.registers
        this.developingRegisters.time = data.time
    }
//=================================================================================================
//=================================================================================================
//=================================================================================================
//=================================================================================================
//=================================================================================================
// RETURN DATA 
    returnData(selectionText){
       if(selectionText='developingRegisters'){
           return this.developingRegisters
       }
    }
}