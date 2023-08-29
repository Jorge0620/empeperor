import { popup } from './gameActions'

export const copyTextToClipboard = async (value) => {
    // var dummy = document.createElement('input')
    // document.body.appendChild(dummy);
    // dummy.value = value;
    // dummy.select();
    console.log("copied value: ", value)
    if ('clipboard' in navigator) {
        await navigator.clipboard.writeText(value);
    }
    else {
        document.execCommand('copy', true, value);
    }
    
    popup("copied!!")
    //document.body.removeChild(dummy);
}