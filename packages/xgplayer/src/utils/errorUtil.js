
const Msg2Code = {
    'video decoder initialization failed' : 5107
}

export function transformErrorCode(errorCode, errorMsg){
    if(!errorMsg){
        return errorCode
    }
    const allMsgs = Object.keys(Msg2Code)
    for(let i = 0; i < allMsgs.length; i++){
        const msg = allMsgs[i]
        if(errorMsg.indexOf(msg) > -1){
            return Msg2Code[msg]
        }
    }
    return errorCode
}
