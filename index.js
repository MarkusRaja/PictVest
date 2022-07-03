const express = require('express')
const Moralis = require('moralis/node')
var MongoClient = require('mongodb').MongoClient;
const SHA256 = require('crypto-js/sha256')
const path = require('path')
var http = require('http')
const WebSocket = require('ws')
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');
const PORT = process.env.PORT || 3000
const INDEX = '/index.html';
const INDEX2 = '/createwallet.html';
const WALLETINFO = '/walletinfo.html';
const NOWEBSOC = '/nowebsoc.html';
const CREATENFT = '/createnft.html';
const NFTSHOP = '/nftshop.html';
const SCRIPT = '/script.js';
const PTRANS = '/ptrans.html';
const REGACC = '/regisnft.html';
const MORALISTEST = '/moralistest.html';
const fs = require('fs');
var appindex;
const uri = "mongodb+srv://pictvest:presuniv2020@thecluster.q4bel.mongodb.net";
var datastr;
var userws;
function createAja(){
  let keygen = new EC('secp256k1').genKeyPair();
  return [keygen.getPrivate("hex"), keygen.getPublic("hex")];
}
    async function main(hash){
        var myobj = {index: 0,
          prevaddress: '0',
          timestamps: '1644157704475',
          walletname: "Wallet 1",
          balance: 100,
          waddress: "16fff643f8151e212d11d5b9b6370b3d8a907a0a8c63b72ee9a914841d91bc6d"};
        try{
            let mc = await MongoClient.connect(uri);
            var dbo = await mc.db("pcoin");
            var colle = await dbo.collection("pwallet").insertOne(myobj);
            colle.close();
            mc.close();
            
          }
          catch(err){
          
          }
        }
        async function moralisaja(inptest){
          try{
            await Moralis.start({ serverUrl, appId, masterKey });

            const Monster = Moralis.Object.extend("Monster");
            const monster = new Monster();

            monster.set("theinput", inptest);

            await monster.save();
            
          }
          catch(err){
          
          }
          
        }
        async function moralisshow(ws){
          try{
            await Moralis.start({ serverUrl, appId, masterKey });
            const Monster = Moralis.Object.extend("Monster");
            const query = new Moralis.Query("Monster");

            const results = await query.find();
            let transpack = {
              type: "moralisshow",
              message: results
              };
            ws.send(JSON.stringify(transpack));
            
          }
          catch(err){
          
          }
          
        }
        async function showaddress(ws){
          try{
            await Moralis.start({ serverUrl, appId, moralisSecret });
            const web3 = await Moralis.enableWeb3();
            const options = {
              chain: "mumbai",
              addresses: "0x4F415c765dbd638C5c6964aAb77027fec34E9801",
            };
            const tokenMetadata = await Moralis.Web3API.token.getTokenMetadata(options);
            
            let transpack = {
              type: "showprice",
              message: tokenMetadata
              };
            ws.send(JSON.stringify(transpack));
            
          }
          catch(err){
          console.log(err);
          }
          
        }
        
        async function insWall(newwalletname, newpvtaddress, newpbkey){
          var myobj = {
            walletname: newwalletname,
            pvtaddress: newpvtaddress,
            pbkey: newpbkey};
          try{
              let mc = await MongoClient.connect(uri);
              var dbo = await mc.db("pcoin");
              var colle = await dbo.collection("pwallet").insertOne(myobj);
              colle.close();
              mc.close();
              
            }
            catch(err){
            
            }
          }
          async function insNft(newnft_id, nextTimestamp, newnftname, spb, newasset_id, newasset_url, newasset_color, newasset_desc, newasset_bid, newsellername){
            var myobj = {
              nft_id: newnft_id,
              timestamp: nextTimestamp,
              nft_name: newnftname,
              seller: spb,
              asset_id: newasset_id,
              url: newasset_url,
              color: newasset_color,
              description: newasset_desc,
              bid: newasset_bid,
              sellername: newsellername};
            try{
                let mc = await MongoClient.connect(uri);
                var dbo = await mc.db("nft");
                var colle = await dbo.collection("product").insertOne(myobj);
                colle.close();
                mc.close();
                
              }
              catch(err){
              
              }
            }
          async function insTrans(newindex, newprevhash, newtimestamps, newsaddress, newdaddress, newtamount, newhash){
            var myobj = {index: newindex,
              prevhash: newprevhash,
              timestamps: newtimestamps,
              saddress: newsaddress,
              daddress: newdaddress,
              tamount: newtamount,
              hash: newhash};
            try{
                let mc = await MongoClient.connect(uri);
                var dbo = await mc.db("pcoin");
                var colle = await dbo.collection("ptransaction").insertOne(myobj);
                colle.close();
                mc.close();
                
              }
              catch(err){
              
              }
            }
            async function insTransnft(newindex, newprevhash, newtimestamps, newsaddress, newdaddress, newbid_amount, newhash, newnft_id, newasset_id, newtwallethash){
              var myobj = {index: newindex,
                prevhash: newprevhash,
                timestamps: newtimestamps,
                seller: newdaddress,
                buyer: newsaddress,
                nft_id: newnft_id,
                asset_id: newasset_id,
                bid_amount: newbid_amount,
                twallethash: newtwallethash,
                hash: newhash};
              try{
                  let mc = await MongoClient.connect(uri);
                  var dbo = await mc.db("nft");
                  var colle = await dbo.collection("transaction").insertOne(myobj);
                  colle.close();
                  mc.close();
                  
                }
                catch(err){
                
                }
              }
  // function getData(){
  //   MongoClient.connect(uri, function(err, db) {
  //       if (err) throw err;
  //       var dbo = db.db("pcoin");
  //       dbo.collection("pwallet").find({}).toArray(function(err, result) {
  //         if (err) throw err;
  //         datastr = JSON.stringify(result);
  //         db.close();
  //       });
  //     });
  // }
    class Block {
      constructor(index, previousHash, timestamp, data, hash) {
          this.index = index;
          this.previousHash = previousHash.toString();
          this.timestamp = timestamp;
          this.data = data;
          this.hash = hash.toString();
      }
  }
  var getGenesisBlock = () => {
      return new Block(0, "0", 1465154705, "genesis block!!", "816534932c2b7154836da6afc367695e6337db8a921823784c14378abed4f7d7");
  };
    var calculateHash = (index, previousHash, timestamp, data) => {
      return SHA256(index + previousHash + timestamp + data).toString();
  };
    var calculatetHash = (index, previousHash, timestamp, saddress, daddress, tamount) => {
      return SHA256(index + previousHash + timestamp + saddress + daddress + tamount).toString();
  };
  var calculatenftHash = (nftname, spb, timestamp, asset_id, asset_url, asset_color, asset_desc, sellername) => {
    return SHA256(nftname + spb + timestamp + asset_id + asset_url + asset_color + asset_desc + sellername).toString();
};
var calculatetnftHash = (index, previousHash, timestamp, saddress, daddress, bid_amount, nft_id, asset_id, twallethash) => {
  return SHA256(index + previousHash + timestamp + saddress + daddress + bid_amount + nft_id + asset_id + twallethash).toString();
};
  var calculatePcoin = (thepvtaddress, ws, msgtype) => {
    var balance = 100;
    var samount = 0;
    var damount = 0;
    var cek = 0;
    var iniloh = MongoClient.connect(uri, function(err, db) {
      cek = 1;
      if (err) throw err;
      var dbo = db.db("pcoin");
      var s1 = dbo.collection("pwallet").find({pvtaddress: thepvtaddress}).toArray(function(err, result) {
        if (err) throw err;
        var lgn = result.length;
        console.log("source are "+lgn);
        if (lgn>0){
         var spb = result[lgn-1]["pbkey"];
            var s2 = dbo.collection("ptransaction").find({saddress: spb}).toArray(function(err, result1) {
              if (err) throw err;
              var lgn1 = result1.length;
              if (lgn1>0){
                for(var i = 0; i < lgn1; i++){
                  samount += result1[i]["tamount"];
                }
                balance -= samount;
                
                  var s3 = dbo.collection("ptransaction").find({daddress: spb}).toArray(function(err, result2) {
                    if (err) throw err;
                    var lgn2 = result2.length;
                    if (lgn2>0){
                      for(var i = 0; i < lgn2; i++){
                        damount += result2[i]["tamount"];
                      }
                      balance += damount;
                      var walletpack = {
                        type: msgtype,
                        message: balance,
                        };
                      ws.send(JSON.stringify(walletpack));
                      return balance;
                    }
                    else{
                      
                        var s4 = dbo.collection("ptransaction").find({daddress: spb}).toArray(function(err, result2) {
                          if (err) throw err;
                          var lgn2 = result2.length;
                          if (lgn2>0){
                            for(var i = 0; i < lgn2; i++){
                              damount += result2[i]["tamount"];
                            }
                            balance += damount;
                            var walletpack = {
                              type: msgtype,
                              message: balance,
                              };
                            ws.send(JSON.stringify(walletpack));
                            return balance;
                          }
                          else{
                            var walletpack = {
                              type: msgtype,
                              message: balance,
                              };
                            ws.send(JSON.stringify(walletpack));
                            return balance;
                          }
                          //console.log(result);
                          db.close();
                        });
                        return s4;
                      
                    }
                    //console.log(result);
                    db.close();
                  });
                  return s3;
                
                
              }
              else{
                
                  var s5 = dbo.collection("ptransaction").find({daddress: spb}).toArray(function(err, result2) {
                    if (err) throw err;
                    var lgn2 = result2.length;
                    if (lgn2>0){
                      for(var i = 0; i < lgn2; i++){
                        damount += result2[i]["tamount"];
                      }
                      balance += damount;
                      var walletpack = {
                        type: msgtype,
                        message: balance,
                        };
                      ws.send(JSON.stringify(walletpack));
                      return balance;
                    }
                    else{
                      var walletpack = {
                        type: msgtype,
                        message: balance,
                        };
                      ws.send(JSON.stringify(walletpack));
                      return balance;
                    }
                    db.close();
                  });
                  return s5;
                
              }
              
              //console.log(result);
              db.close();
            });
            return s2;
          
        }
        //console.log(result);
        db.close();
      });
      return s1;
      
    });
    return iniloh;
    // return 0;
};
var listNft = (ws, msgtype) => {
  MongoClient.connect(uri, function(err, db) {
    if (err) throw err;
    var dbo = db.db("nft");
    dbo.collection("product").find({}).toArray(function(err, result) {
      if (err) throw err;
      var lgn = result.length;
      if (lgn>0){
        var divnft = "";
        var idarray = [];
        for(var i = 0; i < lgn; i++){
          var nft_id = result[i]["nft_id"];
          idarray[i] = nft_id;
          var nft_name = result[i]["nft_name"];
          var seller = result[i]["seller"];
          var url = result[i]["url"];
          var bid = result[i]["bid"];
          var nft_id = result[i]["nft_id"];
          var sellername = result[i]["sellername"];
          divnft += '<h3>NFT name: '+nft_name+'</h3><p>Seller name: '+sellername+'</p><img id = "asset_img" src="'+url+'"><h2>Start Bid: '+bid+' Pcoin</h2><input type="button" onclick="buyPge('+i+');" value="More Detail Here"><br><br>';
        }
        var nftload = {
          type: msgtype,
          nft_ids: idarray,
          message: divnft,
          };
        ws.send(JSON.stringify(nftload));
      }
      
      //console.log(result);
      db.close();
    });
  });
}
var listNftT = (ws, msgtype, thebuyer) => {
  MongoClient.connect(uri, function(err, db) {
    if (err) throw err;
    var dbo = db.db("nft");
    dbo.collection("transaction").find({buyer: thebuyer}).toArray(function(err, result) {
      if (err) throw err;
      var lgn = result.length;
      if (lgn>0){
        var divnft = "";
        var idarray = [];
        for(var i = 0; i < lgn; i++){
          var order_id = result[i]["hash"];
          var nft_id = result[i]["nft_id"];
          var asset_id = result[i]["asset_id"];
          var seller = result[i]["seller"];
          var bid_amount = result[i]["bid_amount"];
          var twallet_id = result[i]["twallethash"];
          divnft += '<h3>Order ID: '+order_id+'</h3><p>NFT ID: '+nft_id+'</p><p>Seller Address (Public Address): '+seller+'</p><p>Transaction Wallet ID: '+twallet_id+'</p><p>You Bid: '+bid_amount+' Pcoin</p><p>The Asset ID: '+asset_id+'</p><br><br>';
        }
        var nftload = {
          type: msgtype,
          message: divnft,
          };
        ws.send(JSON.stringify(nftload));
      }
      
      //console.log(result);
      db.close();
    });
  });
}
  const app = express()
  
  .get('/walletinfo', function (req, res) {
    res.sendFile(WALLETINFO, { root: __dirname })
  })
  .get('/createnft', function (req, res) {
    res.sendFile(CREATENFT, { root: __dirname })
  })
  .get('/create-wallet', function (req, res) {
    res.sendFile(INDEX2, { root: __dirname })
  })
  .get('/nftshop', function (req, res) {
    res.sendFile(NFTSHOP, { root: __dirname })
  })
  .get('/cobain', function (req, res) {
    res.sendFile(NOWEBSOC, { root: __dirname })
    
  })
  .post('/cobain1', function (req, res) {
    res.sendFile(NOWEBSOC, { root: __dirname })
  })
  .get('/createacc', function (req, res) {
    res.sendFile(REGACC, { root: __dirname })
  })
  .get('/ptrans', function (req, res) {
    res.sendFile(PTRANS, { root: __dirname })
  })
  .get('/moralistest', function (req, res) {
    res.sendFile(MORALISTEST, { root: __dirname })
  })
  
  .use((req, res) =>{ res.sendFile(INDEX, { root: __dirname })
});
  
  var httpaja = http.createServer(app)
const wss = new WebSocket.Server({ server: httpaja, path:"/"});
wss.on('connection', (ws) => {
  
    console.log('Client connected');
    ws.on("message", (message) =>{
    var fromclient = JSON.parse(message);
    //var hash = calculateHash(getGenesisBlock().index + 1, getGenesisBlock().hash, nextTimestamp, getGenesisBlock().data);
    //main();
    if(fromclient["type"] == "transdata"){
      var saddress = fromclient["saddress"];
      var daddress = fromclient["daddress"];
      var ptransactiondata = fromclient["ptransaction"];
      var lgnptrans = ptransactiondata.length;
      var tamount = parseInt(fromclient["tamount"]);
      var balance = parseInt(fromclient["balance"]);
      // let transpack = {
      //   type: "transdata",
      //   saddress: saddress+"<br>",
      //   daddress: daddress+"<br>",
      //   tamount: tamount+"<br>",
      //   };
      if (balance<tamount){
        console.log("not enough");
      }
      else{
        if (ptransactiondata == "nothing"){
          MongoClient.connect(uri, function(err, db) {
            if (err) throw err;
            var dbo = db.db("pcoin");
            dbo.collection("pwallet").find({pvtaddress: saddress}).toArray(function(err, result) {
              if (err) throw err;
              var lgn = result.length;
              console.log("source are "+lgn);
              if (lgn>0){
                var spb = result[lgn-1]["pbkey"];
                
                MongoClient.connect(uri, function(err, db) {
                  if (err) throw err;
                  var dbo = db.db("pcoin");
                  dbo.collection("pwallet").find({pbkey: daddress}).toArray(function(err, result1) {
                    if (err) throw err;
                    var lgn1 = result1.length;
                    if (lgn1>0){
                      MongoClient.connect(uri, function(err, db) {
                        if (err) throw err;
                        var dbo = db.db("pcoin");
                        dbo.collection("ptransaction").find({}).toArray(function(err, result) {
                          if (err) throw err;
                          var lgn = result.length;
                          var index = result[lgn-1]["index"];
                          var prevhash = result[lgn-1]["prevhash"];
                          var nextTimestamp = Date.now();
                          var hash = result[lgn-1]["hash"];
                          var addtrans = calculatetHash(index + 1, hash, nextTimestamp, spb, daddress, tamount);
                          insTrans(index+1, hash, nextTimestamp.toString(), spb, daddress, tamount, addtrans);
                          console.log("destination are "+lgn1);
                          wss.clients.forEach((client) => {
                            let transpack = {
                              type: "transdata",
                              timestamps: nextTimestamp+"<br>",
                              saddress: spb+"<br>",
                              daddress: daddress+"<br>",
                              tamount: tamount+" Pcoin<br>",
                              newhash: addtrans+"<br>",
                              };
                            client.send(JSON.stringify(transpack));
                          })
                          
                          //console.log(result);
                          db.close();
                        });
                      });
                      
                    }
                    //console.log(result);
                    db.close();
                  });
                });
              }
              //console.log(result);
              db.close();
            });
          });
          
        }
        else if(ptransactiondata != "nothing"){
          MongoClient.connect(uri, function(err, db) {
            if (err) throw err;
            var dbo = db.db("pcoin");
            dbo.collection("pwallet").find({pvtaddress: saddress}).toArray(function(err, result) {
              if (err) throw err;
              var lgn = result.length;
              console.log("From not nothing source are "+lgn);
              if (lgn>0){
                var spb = result[lgn-1]["pbkey"];
                console.log("lgn dapat");
                MongoClient.connect(uri, function(err, db) {
                  if (err) throw err;
                  var dbo = db.db("pcoin");
                  dbo.collection("pwallet").find({pbkey: daddress}).toArray(function(err, result1) {
                    if (err) throw err;
                    var lgn1 = result1.length;
                    if (lgn1>0){
                      MongoClient.connect(uri, function(err, db) {
                        if (err) throw err;
                        var dbo = db.db("pcoin");
                        dbo.collection("ptransaction").find({}).toArray(function(err, result) {
                          if (err) throw err;
                          var lgn = result.length;
                          if (ptransactiondata[lgnptrans-1]["hash"] == result[lgn-1]["hash"]){
                            var index = result[lgn-1]["index"];
                            var prevhash = result[lgn-1]["prevhash"];
                            var nextTimestamp = Date.now();
                            var hash = result[lgn-1]["hash"];
                            var addtrans = calculatetHash(index + 1, hash, nextTimestamp, spb, daddress, tamount);
                            insTrans(index+1, hash, nextTimestamp.toString(), spb, daddress, tamount, addtrans);
                            console.log("destination are "+lgn1);
                            wss.clients.forEach((client) => {
                              let transpack = {
                                type: "transdata",
                                timestamps: nextTimestamp+"<br>",
                                saddress: spb+"<br>",
                                daddress: daddress+"<br>",
                                tamount: tamount+" Pcoin<br>",
                                newhash: addtrans+"<br>",
                                };
                              client.send(JSON.stringify(transpack));
                            })
                          }
                          
                          //console.log(result);
                          db.close();
                        });
                      });
                      
                    }
                    //console.log(result);
                    db.close();
                  });
                });
              }
              //console.log(result);
              db.close();
            });
          });
        }
        
      }
        
      
    }
    else if(fromclient["type"] == "getspdata"){
      MongoClient.connect(uri, function(err, db4) {
        if (err) throw err;
        var dbo = db4.db("pcoin");
        dbo.collection("ptransaction").find({}).toArray(function(err, result4) {
          if (err) throw err;
          console.log("get sp running");
          var lgn4 = result4.length;
          if (lgn4>0){
            
            var walletpack = {
              type: "replaceptrans",
              ptrans: result4,
              };
            ws.send(JSON.stringify(walletpack));
          }
          
          console.log("until the end");
          db4.close();
        });
      });
      
    }
    else if(fromclient["type"] == "walletdata"){
      console.log('received: '+fromclient["message"]);
      var newWall = createAja();
      insWall(fromclient["message"], newWall[0], newWall[1]);
      var walletpack = {
        type: "walletdata",
        message: "New Wallet Name: "+fromclient["message"]+"<br>New Private Address: "+newWall[0]+"<br>New Public Address: "+newWall[1],
        };
      ws.send(JSON.stringify(walletpack));
        
    }
    else if(fromclient["type"] == "walletinfo"){
      var thewaddress = fromclient["message"];
      console.log('received: '+fromclient["message"]);
      var nilainya = calculatePcoin(thewaddress, ws, "walletinfo");
      console.log(nilainya);
      
    }
    else if(fromclient["type"] == "logpack"){
      console.log(wss.clients.size+" user connected");
      var thewaddress = fromclient["saddress"];
      console.log('received: '+fromclient["saddress"]);
      MongoClient.connect(uri, function(err, db3) {
        if (err) throw err;
        var dbo = db3.db("pcoin");
        dbo.collection("ptransaction").find({}).toArray(function(err, result3) {
          if (err) throw err;
          var lgn3 = result3.length;
          if (lgn3>0){
            
            var walletpack = {
              type: "logcheck",
              ptrans: result3,
              };
            ws.send(JSON.stringify(walletpack));
          }
          
          //console.log(result);
          db3.close();
        });
      });
      // var nilainya = calculatePcoin(thewaddress, ws, "walletinfo");
      MongoClient.connect(uri, function(err, db) {
        if (err) throw err;
        var dbo = db.db("pcoin");
        dbo.collection("pwallet").find({pvtaddress: thewaddress}).toArray(function(err, result) {
          if (err) throw err;
          var lgn = result.length;
          if (lgn>0){
            var formnya = '<h1>Pcoin Transfers</h1><p>Welcome '+result[lgn-1]["walletname"]+'<br>You are Logined at (Public Key): '+result[lgn-1]["pbkey"]+'</p><form><h2 id="pcoinamount">Please Wait a moment we trying calculate your amount...</h2><label>Destination Wallet Address (Public Address)</label><br><input type="text" id="daddress"><br><label>Transfer Amount in Pcoin</label><br><input type="text" id="tamount"><br><input type="button" onclick="transferNow()" value="Transfer Now"></form>';
            var walletpack = {
              type: "formtrans",
              message: formnya,
              };
            ws.send(JSON.stringify(walletpack));
            calculatePcoin(thewaddress, ws, "balancelog");
          }
          
          //console.log(result);
          db.close();
        });
      });
      
    }
    else if(fromclient["type"] == "cekbalance"){
      var thewaddress = fromclient["saddress"];
      console.log('received: '+fromclient["saddress"]);
      // var nilainya = calculatePcoin(thewaddress, ws, "walletinfo");
      calculatePcoin(thewaddress, ws, "balancelog");
      
    }
    else if(fromclient["type"] == "nftdata"){
      var nftname = fromclient["nftname"];
      var thewaddress = fromclient["saddress"];
      var asset_id = fromclient["asset_id"];
      var asset_url = fromclient["asset_url"];
      var asset_color = fromclient["asset_color"];
      var asset_desc = fromclient["asset_desc"];
      var asset_bid = fromclient["asset_bid"];
      console.log('received: '+fromclient["saddress"]);
      MongoClient.connect(uri, function(err, db) {
        if (err) throw err;
        var dbo = db.db("pcoin");
        dbo.collection("pwallet").find({pvtaddress: thewaddress}).toArray(function(err, result) {
          if (err) throw err;
          var lgn = result.length;
          console.log("Wallet found "+lgn);
          if (lgn>0){
            var spb = result[lgn-1]["pbkey"];
            var sellername = result[lgn-1]["walletname"];
            var nextTimestamp = Date.now();
            var nft_id = calculatenftHash(nftname, spb, nextTimestamp,asset_id, asset_url, asset_color, asset_desc, sellername);
            insNft(nft_id, nextTimestamp.toString(), nftname, spb, asset_id, asset_url, asset_color, asset_desc, asset_bid, sellername);
          }
          //console.log(result);
          db.close();
        });
      });
      
    }
    else if(fromclient["type"] == "lognft"){
      var thewaddress = fromclient["saddress"];
      console.log('received: '+fromclient["saddress"]);
      
      // var nilainya = calculatePcoin(thewaddress, ws, "walletinfo");
      MongoClient.connect(uri, function(err, db) {
        if (err) throw err;
        var dbo = db.db("pcoin");
        dbo.collection("pwallet").find({pvtaddress: thewaddress}).toArray(function(err, result) {
          if (err) throw err;
          var lgn = result.length;
          if (lgn>0){
            var formnya = '<h1>PICTVEST</h1><p>Welcome '+result[lgn-1]["walletname"]+'<br>You are Logined at (Public Key): '+result[lgn-1]["pbkey"]+'<br><a href="./createnft">Add your Creation HERE</a></p><form><h2 id="pcoinamount">Please Wait a moment we trying calculate your amount...</h2><input type="button" onclick="home()" value="HOME"><input type="button" style = "margin-left: 2%;" onclick="listmynft()" value="Your Transaction List"><div id="products">Loading Product..</div><div id="stats"></div><div id="topbid"></div>';
            var walletpack = {
              type: "formtrans",
              message: formnya,
              };
            ws.send(JSON.stringify(walletpack));
            calculatePcoin(thewaddress, ws, "balancelog");
            listNft(ws, "nftload");
          }
          
          //console.log(result);
          db.close();
        });
      });
      
    }
    else if(fromclient["type"] == "nftdetail"){
      var thenft_id = fromclient["targetnft_id"];
      console.log('received: '+fromclient["targetnft_id"]);
      // var nilainya = calculatePcoin(thewaddress, ws, "walletinfo");
      MongoClient.connect(uri, function(err, db) {
        if (err) throw err;
        var dbo = db.db("nft");
        dbo.collection("product").find({nft_id: thenft_id}).toArray(function(err, result) {
          if (err) throw err;
          var lgn = result.length;
          if (lgn>0){
          var timestamp = result[lgn-1]["timestamp"];
          var nft_name = result[lgn-1]["nft_name"];
          var seller = result[lgn-1]["seller"];
          var url = result[lgn-1]["url"];
          var bid = result[lgn-1]["bid"];
          var sellername = result[lgn-1]["sellername"];
          var color = result[lgn-1]["color"];
          var timestamp = result[lgn-1]["timestamp"];
          var description = result[lgn-1]["description"];
          var divnft = '<h3>NFT name: '+nft_name+'</h3><img id = "asset_img" src="'+url+'"><p>NFT Color: '+color+'</p><p>NFT Timestamp: '+timestamp+'</p><p>NFT Description: '+description+'</p><p>Seller Wallet Address(Public Address): '+seller+'</p><p>Seller name: '+sellername+'</p><p>Start Price: '+bid+' Pcoin</p><h4>How Many Do You Want to Buy ?</h4><input type="number" id="bid_amount"><input type="button" onclick="bidPro()" value="Buy Now">';
            var nftdetail = {
              type: "nftdetail",
              nft_id: thenft_id,
              message: divnft,
              };
            ws.send(JSON.stringify(nftdetail));
          }
          
          //console.log(result);
          db.close();
        });
      });
      
    }
    else if(fromclient["type"] == "bidnft"){
      var saddress = fromclient["saddress"];
      var thenft_id = fromclient["targetnft_id"];
      var bid_amount = parseFloat(fromclient["bid_amount"]);
      var balance = parseFloat(fromclient["balance"]);
      // let transpack = {
      //   type: "transdata",
      //   saddress: saddress+"<br>",
      //   daddress: daddress+"<br>",
      //   tamount: tamount+"<br>",
      //   };
      if (balance<bid_amount){
        console.log("not enough");
      }
      else{
        MongoClient.connect(uri, function(err, db) {
          if (err) throw err;
          var dbo = db.db("pcoin");
          dbo.collection("pwallet").find({pvtaddress: saddress}).toArray(function(err, result) {
            if (err) throw err;
            var lgn = result.length;
            console.log("source are "+lgn);
            if (lgn>0){
              var spb = result[lgn-1]["pbkey"];
              MongoClient.connect(uri, function(err, db2) {
                if (err) throw err;
                var dbo2 = db2.db("nft");
                dbo2.collection("product").find({nft_id: thenft_id}).toArray(function(err, result2) {
                  if (err) throw err;
                  var lgn2 = result2.length;
                  console.log("destination are "+lgn);
                  if (lgn2>0){
                    var spbdes = result2[lgn2-1]["seller"];
                    var bid = result2[lgn2-1]["bid"];
                    var asset_id = result2[lgn2-1]["asset_id"];
                    if (bid_amount >= bid){
                      MongoClient.connect(uri, function(err, db) {
                        if (err) throw err;
                        var dbo = db.db("pcoin");
                        dbo.collection("pwallet").find({pbkey: spbdes}).toArray(function(err, result1) {
                          if (err) throw err;
                          var lgn1 = result1.length;
                          console.log("insertion");
                          if (lgn1>0){
                            MongoClient.connect(uri, function(err, dbhold) {
                              if (err) throw err;
                              var dbo = dbhold.db("nft");
                              dbo.collection("transaction").find({nft_id: thenft_id}).toArray(function(err, resulthold) {
                                if (err) throw err;
                                var lgnhold = resulthold.length;
                                var sharepro = lgnhold+1;
                                var profit = bid_amount/sharepro;
                                
                                MongoClient.connect(uri, function(err, db) {
                                  if (err) throw err;
                                  var dbo = db.db("pcoin");
                                  dbo.collection("ptransaction").find({}).toArray(function(err, result) {
                                    if (err) throw err;
                                    var lgn = result.length;
                                    var index = result[lgn-1]["index"];
                                    var tempindex = 1;
                                    
                                    
                                    var hash = result[lgn-1]["hash"];
                                    var prevhash = hash;
                                    if(lgnhold > 0){
                                      for(var i = 0; i < sharepro; i++){
                                        if(i != sharepro - 1){
                                          var holder = resulthold[i]["buyer"];
                                          var nextTimestamp = Date.now();
                                              var addtrans = calculatetHash(index + tempindex, prevhash, nextTimestamp, spb, holder, bid_amount);
                                              insTrans(index+tempindex, prevhash, nextTimestamp.toString(), spb, holder, profit, addtrans);
                                              tempindex += 1;
                                              prevhash = addtrans;
                                              //console.log(result);
                                        }
                                        else if(i == sharepro - 1){
                                          var nextTimestamp = Date.now();
                                          var addtrans = calculatetHash(index + tempindex, prevhash, nextTimestamp, spb, spbdes, bid_amount);
                                          insTrans(index+tempindex, prevhash, nextTimestamp.toString(), spb, spbdes, profit, addtrans);
                                          MongoClient.connect(uri, function(err, db) {
                                            if (err) throw err;
                                            var dbo = db.db("nft");
                                            dbo.collection("transaction").find({}).toArray(function(err, result3) {
                                              if (err) throw err;
                                              var lgn3 = result3.length;
                                              if (lgn3 == 0){
                                                var addtransnft = calculatetnftHash(0, "0", nextTimestamp, spb, spbdes, bid_amount, thenft_id, asset_id, addtrans);
                                                insTransnft(0, "0", nextTimestamp, spb, spbdes, bid_amount, addtransnft, thenft_id, asset_id, addtrans);
                                                console.log("destination are "+lgn1);
                                                wss.clients.forEach((client) => {
                                                  let transpack = {
                                                    type: "transnft",
                                                    message: 1
                                                    };
                                                  client.send(JSON.stringify(transpack));
                                                })
                                                let idtoclient = {
                                                  type: "idtoclient",
                                                  message: asset_id
                                                  };
                                                ws.send(JSON.stringify(idtoclient));
                                                if(bid_amount>bid){
                                                  MongoClient.connect(uri, function(err, db) {
                                                    if (err) throw err;
                                                    var dbo = db.db("nft");
                                                    var myquery = { nft_id: thenft_id };
                                                    var newvalues = { $set: {bid: bid_amount} };
                                                    dbo.collection("product").updateOne(myquery, newvalues, function(err, res) {
                                                      if (err) throw err;
                                                      console.log("start bid increased");
                                                      db.close();
                                                    });
                                                  });
                                                }
                                              }
                                              else{
                                                var index3 = result3[lgn3-1]["index"];
                                              // var prevhash3 = result[lgn3-1]["prevhash"];
                                              var hash3 = result3[lgn3-1]["hash"];
                                              var addtransnft = calculatetnftHash(index3 + 1, hash3, nextTimestamp, spb, spbdes, bid_amount, thenft_id, asset_id, addtrans);
                                              insTransnft(index3 + 1, hash3, nextTimestamp, spb, spbdes, bid_amount, addtransnft, thenft_id, asset_id, addtrans);
                                              console.log("destination are "+lgn1);
                                              wss.clients.forEach((client) => {
                                                let transpack = {
                                                  type: "transnft",
                                                  message: 1
                                                  };
                                                client.send(JSON.stringify(transpack));
                                              })
                                              let idtoclient = {
                                                type: "idtoclient",
                                                message: asset_id
                                                };
                                              ws.send(JSON.stringify(idtoclient));
                                              if(bid_amount>bid){
                                                MongoClient.connect(uri, function(err, db) {
                                                  if (err) throw err;
                                                  var dbo = db.db("nft");
                                                  var myquery = { nft_id: thenft_id };
                                                  var newvalues = { $set: {bid: bid_amount} };
                                                  dbo.collection("product").updateOne(myquery, newvalues, function(err, res) {
                                                    if (err) throw err;
                                                    console.log("start bid increased");
                                                    db.close();
                                                  });
                                                });
                                              }
                                              }
                                              
                                              //console.log(result);
                                              db.close();
                                            });
                                          });
                                        }
                                      }
                                    }
                                    if(lgnhold == 0){
                                      var nextTimestamp = Date.now();
                                          var addtrans = calculatetHash(index + tempindex, prevhash, nextTimestamp, spb, spbdes, bid_amount);
                                          insTrans(index+tempindex, prevhash, nextTimestamp.toString(), spb, spbdes, profit, addtrans);
                                          MongoClient.connect(uri, function(err, db) {
                                            if (err) throw err;
                                            var dbo = db.db("nft");
                                            dbo.collection("transaction").find({}).toArray(function(err, result3) {
                                              if (err) throw err;
                                              var lgn3 = result3.length;
                                              if (lgn3 == 0){
                                                var addtransnft = calculatetnftHash(0, "0", nextTimestamp, spb, spbdes, bid_amount, thenft_id, asset_id, addtrans);
                                                insTransnft(0, "0", nextTimestamp, spb, spbdes, bid_amount, addtransnft, thenft_id, asset_id, addtrans);
                                                console.log("destination are "+lgn1);
                                                wss.clients.forEach((client) => {
                                                  let transpack = {
                                                    type: "transnft",
                                                    message: 1
                                                    };
                                                  client.send(JSON.stringify(transpack));
                                                })
                                                let idtoclient = {
                                                  type: "idtoclient",
                                                  message: asset_id
                                                  };
                                                ws.send(JSON.stringify(idtoclient));
                                                if(bid_amount>bid){
                                                  MongoClient.connect(uri, function(err, db) {
                                                    if (err) throw err;
                                                    var dbo = db.db("nft");
                                                    var myquery = { nft_id: thenft_id };
                                                    var newvalues = { $set: {bid: bid_amount} };
                                                    dbo.collection("product").updateOne(myquery, newvalues, function(err, res) {
                                                      if (err) throw err;
                                                      console.log("start bid increased");
                                                      db.close();
                                                    });
                                                  });
                                                }
                                              }
                                              else{
                                                var index3 = result3[lgn3-1]["index"];
                                              // var prevhash3 = result[lgn3-1]["prevhash"];
                                              var hash3 = result3[lgn3-1]["hash"];
                                              var addtransnft = calculatetnftHash(index3 + 1, hash3, nextTimestamp, spb, spbdes, bid_amount, thenft_id, asset_id, addtrans);
                                              insTransnft(index3 + 1, hash3, nextTimestamp, spb, spbdes, bid_amount, addtransnft, thenft_id, asset_id, addtrans);
                                              console.log("destination are "+lgn1);
                                              wss.clients.forEach((client) => {
                                                let transpack = {
                                                  type: "transnft",
                                                  message: 1
                                                  };
                                                client.send(JSON.stringify(transpack));
                                              })
                                              let idtoclient = {
                                                type: "idtoclient",
                                                message: asset_id
                                                };
                                              ws.send(JSON.stringify(idtoclient));
                                              if(bid_amount>bid){
                                                MongoClient.connect(uri, function(err, db) {
                                                  if (err) throw err;
                                                  var dbo = db.db("nft");
                                                  var myquery = { nft_id: thenft_id };
                                                  var newvalues = { $set: {bid: bid_amount} };
                                                  dbo.collection("product").updateOne(myquery, newvalues, function(err, res) {
                                                    if (err) throw err;
                                                    console.log("start bid increased");
                                                    db.close();
                                                  });
                                                });
                                              }
                                              }
                                              
                                              //console.log(result);
                                              db.close();
                                            });
                                          });
                                    }
                                    //console.log(result);
                                    db.close();
                                  });
                                });
                                  
                                
                                
                                //console.log(result);
                                dbhold.close();
                              });
                            });
                            
                            
                          }
                          //console.log(result);
                          db.close();
                        });
                      });
                    }
                    
                  }
                });
                db.close();
              });     
              
            }
            //console.log(result);
            db.close();
          });
        });
      }
        
      
    }
    else if(fromclient["type"] == "cektopbid"){
      var thenft_id = fromclient["targetnft_id"];
      console.log('received: '+fromclient["targetnft_id"]);
      MongoClient.connect(uri, function(err, db) {
        if (err) throw err;
        var dbo = db.db("nft");
        var mysort = { bid_amount: -1 };
        dbo.collection("transaction").find({nft_id: thenft_id}).sort(mysort).toArray(function(err, result) {
          if (err) throw err;
          var lgn = result.length;
          console.log("Listing Top Holder");
          if (lgn>0){
            var divtopbid = "<h3>Top Holder List</h3><table><tr><th>Public Address</th><th>Bid Amount</th><th>Timestamps</th></tr>";
            for(var i = 0; i < lgn; i++){
              var buyer = result[i]["buyer"];
              var timestamps = result[i]["timestamps"];
              var bid_amount = result[i]["bid_amount"];
              divtopbid += '<tr><td>'+buyer+'</td><td>'+bid_amount+'</td><td>'+timestamps+'</td></tr>';
            }
            divtopbid += '</table>';
            let transpack = {
              type: "cektopbid",
              message: divtopbid
              };
            ws.send(JSON.stringify(transpack));
          }
          //console.log(result);
          db.close();
        });
      });
      
    }
    else if(fromclient["type"] == "nfttrans"){
      var saddress = fromclient["saddress"];
      console.log('received: '+fromclient["saddress"]);
      MongoClient.connect(uri, function(err, db) {
        if (err) throw err;
        var dbo = db.db("pcoin");
        var mysort = { bid_amount: -1 };
        dbo.collection("pwallet").find({pvtaddress: saddress}).sort(mysort).toArray(function(err, result) {
          if (err) throw err;
          var lgn = result.length;
          console.log("Find trans");
          if (lgn>0){
            var pbkey = result[lgn-1]["pbkey"];
            listNftT(ws, "nfttrans", pbkey);
          }
          //console.log(result);
          db.close();
        });
      });
      
    }
    else if(fromclient["type"] == "home"){
      console.log('Home');
      listNft(ws, "nftload");
      
    }
    else if(fromclient["type"] == "moralistest"){
      moralisaja(fromclient["message"]);
      
    }
    else if(fromclient["type"] == "moralisshow"){
      moralisshow(ws);
      
    }
    else if(fromclient["type"] == "showprice"){
      showaddress(ws);
      
    }
  })
  setInterval(() => {
    ws.ping();
  }, 1000);
  
});
httpaja.listen(PORT);
// var server = http.createServer(app)
// const socket = new WebSocket(server)
// socket.on('connection', (ws) => {
//   ws.send("connected");
//   const id = uuidv4();
//   const color = Math.floor(Math.random() * 360);
//   const metadata = { id, color };

//   clients.set(ws, metadata);
//   ws.on('message', (messageAsString) => {
//     const message = JSON.parse(messageAsString);
//     const metadata = clients.get(ws);

//     message.sender = metadata.id;
//     message.color = metadata.color;
//     const outbound = JSON.stringify(message);

//     [...clients.keys()].forEach((client) => {
//       client.send(outbound);
//     });
//   });
//   ws.on("close", () => {
//     clients.delete(ws);
//   });
// });
// function uuidv4() {
//   return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
//     var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
//     return v.toString(16);
//   });
// }
// console.log("wss up");

//server.listen(PORT);
