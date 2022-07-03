var HOST = location.origin.replace(/^http/, 'ws')
var logstat = 0;
            var thebalance = 0;
            var ws = new WebSocket(HOST);
            var thesaddress = "";
            var nft_id = "";
            var el;
            var idnft;
            ws.onmessage = function (event) {
            var fromserver = JSON.parse(event.data);
            if(fromserver["type"] == "transdata"){
                console.log('received: '+fromserver["saddress"]);
                let br = document.createElement("br")
                document.getElementById("checkaja").innerHTML += "Transaction Timestamp: "+fromserver["timestamps"]+"Source Wallet Address: "+fromserver["saddress"]+"Destination Wallet Address: "+fromserver["daddress"]+"Transfer Amounts: "+fromserver["tamount"]+"Transfer Hash: "+fromserver["newhash"]+"<br>";
                cekbalance();
              }
              if(fromserver["type"] == "formtrans"){
                console.log('received: '+fromserver["message"]);
                document.getElementById("placenya").innerHTML = fromserver["message"];
              }
              if(fromserver["type"] == "balancelog"){
                console.log('received: '+fromserver["message"]);
                thebalance = fromserver["message"];
                document.getElementById("pcoinamount").innerHTML = "Your Balances on Your Wallet: "+fromserver["message"]+" Pcoin";
              }
              if(fromserver["type"] == "nftload"){
                idnft = fromserver["nft_ids"];
                console.log('received: '+fromserver["message"]);
                document.getElementById("products").innerHTML = fromserver["message"];
              }
              if(fromserver["type"] == "nftdetail"){
                nft_id = fromserver["nft_id"];
                console.log('received: '+fromserver["message"]);
                document.getElementById("products").innerHTML = fromserver["message"];
                cektopbid();
              }
              if(fromserver["type"] == "idtoclient"){
                console.log('received: '+fromserver["message"]);
                document.getElementById("products").innerHTML += "<br>Congrats your transaction completed The ID of this Asset: "+fromserver["message"];
              }
              if(fromserver["type"] == "cektopbid"){
                console.log('received: '+fromserver["message"]);
                document.getElementById("topbid").innerHTML = fromserver["message"];
              }
              if(fromserver["type"] == "transnft"){
                console.log('received: '+fromserver["message"]);
                cekbalance();
                if (nft_id != ""){
                  cekbalance();
                  cektopbid();
                }
              }
              if(fromserver["type"] == "nfttrans"){
                console.log('received: '+fromserver["message"]);
                document.getElementById("products").innerHTML = fromserver["message"];
              }
            }
            const delacc = () =>{
                localStorage.removeItem("nftacc");
                document.getElementById("checkaja").innerHTML = "Data removed you can show it";
            }
            const transferNow = () =>{
                let transpack = {
                type: "transdata",
                saddress: thesaddress,
                daddress: document.getElementById("daddress").value,
                tamount: document.getElementById("tamount").value,
                balance: thebalance,
                };
                ws.send(JSON.stringify(transpack));
            }
            function getSaddress(obj, uname, upass){
              return obj.filter(
                function(obj) {
                  return obj.nftuname == uname && obj.nftupass == upass;
                }
              );
            }

            const logaja = () =>{
              var nftacc = localStorage.getItem('nftacc');
              if (nftacc == null || nftacc == ""){
                document.getElementById("checkaja").innerHTML ="There is no account in your local";
                }
                else if(nftacc != null && nftacc != ""){
                    var acc = JSON.parse(nftacc);
                    var obj = acc["accounts"];
                    thesaddress = getSaddress(obj, document.getElementById("nftuname"), document.getElementById("nftupass"));
                    let logpack = {
                    type: "lognft",
                    saddress: thesaddress,
                    };
                    ws.send(JSON.stringify(logpack));
                    logstat = 1;
                }
               
            }
            const cekbalance = () =>{
                if(logstat == 1){
                  let logpack = {
                  type: "cekbalance",
                  saddress: thesaddress,
                  };
                  ws.send(JSON.stringify(logpack));
                }
                
            }
            const cektopbid = () =>{
                if(logstat == 1){
                  let logpack = {
                  type: "cektopbid",
                  targetnft_id: nft_id,
                  };
                  ws.send(JSON.stringify(logpack));
                }
                
            }
            const buyPge = (thenft_id) =>{
                document.getElementById("products").innerHTML = "Loading NFT Data...";
                document.getElementById("topbid").innerHTML = "Top Bidder should shown in here"
                var sendid  = thenft_id;
                nft_id = idnft[sendid];
                let logpack = {
                type: "nftdetail",
                targetnft_id: nft_id,
                };
                ws.send(JSON.stringify(logpack));
            }
            const bidPro = () =>{
                var bidamount = document.getElementById("bid_amount").value;
                let logpack = {
                type: "bidnft",
                saddress: thesaddress,
                targetnft_id: nft_id,
                balance: thebalance,
                bid_amount: bidamount,
                };
                ws.send(JSON.stringify(logpack));
            }
            const listmynft = () =>{
                document.getElementById("products").innerHTML = "Loading your transactions...";
                document.getElementById("topbid").innerHTML = "";
                let logpack = {
                type: "nfttrans",
                saddress: thesaddress,
                };
                ws.send(JSON.stringify(logpack));
            }
            const home = () =>{
                document.getElementById("products").innerHTML = "Loading NFT Data...";
                document.getElementById("topbid").innerHTML = "";
                let logpack = {
                type: "home"
                };
                ws.send(JSON.stringify(logpack));
            }