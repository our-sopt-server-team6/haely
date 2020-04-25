let isMomHappy = true;
let phone = {
    brand : 'Samsung',
    color : 'black'
};

var willIGetNewPhone = new Promise((resolve, reject) =>{
    setTimeout(() =>{
        if(isMomHappy){
            resolve(console.log(phone));
        }
        else{
            //console.log('Mom is not happy');
            reject(new Error('mom is not happy'));
        }
    }, 1000);
});