import axios from 'axios'

export const writeDepositResultToServer = async (address, amount) => {
    try{
        const res = await axios.post(`deposit`, {
            address: address,
            amount: amount
        });
        console.log("deposit result: ", res)
        if(res.data === "success") {
            return true
        }
        return false
    }
    catch(e){
        return false        
    }
}

export const withdraw = async (address, amount) => {
    try{
        const res = await axios.post(`withdraw`, {
            address: address,
            amount: amount
        });
        console.log("withdraw result: ", res)
        return res.data
    }
    catch(e){
        console.log(e)
        return {status: "failed"}        
    }
}