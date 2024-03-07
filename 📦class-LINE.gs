//LINE Business ID は tgrecords912@gmail.com / Tgglobal2015

class LINE {

  constructor() {
    this.LINE_ACCESSTOKEN_TG = PropertiesService.getScriptProperties().getProperty("LINE_ACCESSTOKEN_TG");
    // this.LINE_ACCESSTOKEN_DHL = PropertiesService.getScriptProperties().getProperty("LINE_ACCESSTOKEN_DHL");
    this.LINE_ACCESSTOKEN_NOTIFY = PropertiesService.getScriptProperties().getProperty("LINE_ACCESSTOKEN_NOTIFY");
    this.LINE_ACCESSTOKEN_NOTIFY_DHL = PropertiesService.getScriptProperties().getProperty("LINE_ACCESSTOKEN_NOTIFY_DHL");
  }

  // /** ブロードバンドメッセージforTG */
  // sendBroadbandMessage(message) {

  //   // アクセストークン
  //   const url = 'https://api.line.me/v2/bot/message/broadcast';
  //   const headers = {
  //     'Content-Type': 'application/json; charset=UTF-8',
  //     'Authorization': 'Bearer ' + this.LINE_ACCESSTOKEN_TG
  //   };

  //   //メッセージ送信内容
  //   const payload = JSON.stringify({
  //     'messages': [{
  //       'type': 'text',
  //       'text': message
  //     }]
  //   })

  //   const options = {
  //     'headers': headers,
  //     'method': 'post',
  //     'payload': payload
  //   };

  //   // 送信
  //   UrlFetchApp.fetch(url, options);
  //   return "メッセージを送信しました"

  // }


  // /** 個別ユーザーにPUSHメッセージ
  // * @param{string} メッセージオブジェクトのJSON
  // * @param{string} ユーザーID
  // */
  // sendUniquePushMessageForDHL(message) {

  //   const url = "https://api.line.me/v2/bot/message/push";
  //   const headers = {
  //     'Content-Type': 'application/json; charset=UTF-8',
  //     'Authorization': 'Bearer ' + this.LINE_ACCESSTOKEN_DHL,
  //   };

  //   const messageObject = [{
  //     'type': 'text',
  //     'text': message
  //   }];

  //   const userId = "Cc745eae480a04cb0b3ccbdc426291e27"; //DHL様グループLINE
  //   const payload = {
  //     'messages': messageObject,
  //     'to': userId
  //   };

  //   const options = {
  //     'headers': headers,
  //     'method': 'post',
  //     'payload': JSON.stringify(payload),
  //   };

  //   UrlFetchApp.fetch(url, options);
  //   return "メッセージを送信しました"

  // }

  /** LINE notify通知
  * @param{string} メッセージ
  */
  sendNotifyMessage(message) {
      
      const url = "https://notify-api.line.me/api/notify";
      const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + this.LINE_ACCESSTOKEN_NOTIFY,
      };
  
      const payload = {
        'message': message
      };
  
      const options = {
        'headers': headers,
        'method': 'post',
        'payload': payload,
      };
  
      UrlFetchApp.fetch(url, options);
      return "メッセージを送信しました"
  
    }


      /** LINE notify通知
  * @param{string} メッセージ
  */
  sendNotifyMessageDHL(message) {
      
    const url = "https://notify-api.line.me/api/notify";
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Bearer ' + this.LINE_ACCESSTOKEN_NOTIFY_DHL,
    };

    const payload = {
      'message': message
    };

    const options = {
      'headers': headers,
      'method': 'post',
      'payload': payload,
    };

    UrlFetchApp.fetch(url, options);
    return "メッセージを送信しました"

  }




}




/**
*  TEST用関数
*/
function testLINE() {

  const l = new LINE();
  const text = "テストです🚀"

  const messageObject = [{
    'type': 'text',
    'text': text
  }];


  // console.log(l.sendBroadbandMessage(messageObject));

  // console.log(l.sendUniquePushMessageForDHL(messageObject));

  // const userId = "Cc745eae480a04cb0b3ccbdc426291e27";
  // const userId = "Cb46d69784d127c6debd01af618f9e91d";

  // console.log(sendUniquePushMessage(messageObject,userId));

  // console.log(PropertiesService.getScriptProperties().getProperty("LINE_ACCESSTOKEN_DHL"));

  console.log(l.sendNotifyMessage(text));

  console.log(l.sendNotifyMessageDHL(text));
}


