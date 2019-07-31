const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
const AWS = require('aws-sdk');
const request = require('request');
const jwkToPem = require('jwk-to-pem');
const jwt = require('jsonwebtoken');
global.fetch = require('node-fetch');

const poolData = {    
    UserPoolId : "",//here
    ClientId : ""//here
};

const pool_region = 'us-east-2';
 
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

module.exports = {
    Register(req, res) {
        var attributeList = [];

        const { name, email, password } = req.body

        attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({
            Name: "name",
            Value: name
        }));

        attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({
            Name: "email",
            Value: email
        }));

        userPool.signUp(email, password, attributeList, null, function(err, result) {
            if (err) {
                res.send(err)
                return;
            }

            cognitoUser = result.user

            res.send("username: " + cognitoUser.getUsername())

            return;
        });
    },

    Login(req, res) {
        
            const { email, password } = req.body

            var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
                Username : email,
                Password : password,
            });
        
            var userData = {
                Username : email,
                Pool : userPool
            };

            var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

            cognitoUser.authenticateUser(authenticationDetails, {
                onSuccess: function (result) {
                    res.send(
                        `access token: ${result.getAccessToken().getJwtToken()} <br> 
                        id token: ${result.getIdToken().getJwtToken()}
                        refresh token: ${result.getRefreshToken().getToken()}
                        `
                    )                    
                },
                onFailure: function(err) {
                    res.send(err)
                },
        
            });
        }
}