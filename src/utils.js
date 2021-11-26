function ConfigId(length){
    var result = '';
    var characters = 'ASDFADSFDASFADFADSFfadsfadfadsfad465432132456';
    var charactersLength = characters.length;
    for( var i = 0; i< length; i++){
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
    
}

module.exports = ConfigId;