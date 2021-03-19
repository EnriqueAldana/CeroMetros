export default {

    generateNumberToken(min, max) {
        //console.log('min ', min);
        //console.log('max ',max);
        const num= Math.floor(Math.random() * (max+1-min) +min );
        //console.log('random ' , num);
        return num;
    }
};

