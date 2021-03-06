const jwt = require('jsonwebtoken')
const shortid = require('shortid')
const secretKey = 'someVeryRandomStringThatNobodyCanGuess'

let generateToken = (data,cb)=>{

	try {
		let claims = {
			jwtid : shortid.generate(),
			iat : Date.now(),
			exp : Math.floor(Date.now()/1000 + (60*60*24)),
			sub : 'authToken',
			iss : 'followUp',
			data : data
		}
		let tokenDetails = {
			token : jwt.sign(claims, secretKey),
			tokenSecret : secretKey
		}
		cb(null, tokenDetails)
	} catch (err) {
		console.log(err)
		cb(err,null)
	}
}

let verifyClaim = (token, secretKey, cb) => {
	jwt.verify(token, secretKey, function(err,decoded){
		if(err){
			console.log('error while verify token');
			console.log(err);
			cb(err,null)
		} else {
			cb(null,decoded)
		}
	})
}

let verifyClaimWithoutSecret = (token, cb) => {
	jwt.verify(token, secretKey, function(err,decoded){
		if(err){
			console.log('error while verify token');
			console.log(err);
			cb(err,null)
		} else {
			cb(null,decoded)
		}
	})
}

module.exports = {
	generateToken : generateToken,
	verifyClaim : verifyClaim,
	verifyClaimWithoutSecret : verifyClaimWithoutSecret
}