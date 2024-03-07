function main() {

}


//onOpenのカスタムメニュー構造に対応しています
/**
 * 🚀書類一括作成する関数
 */
function createDocumentPDF() {

  const INVOICE_NO = PropertiesService.getScriptProperties().getProperty('INVOICE_NO');

  //LINE通知する
  let message = `【輸出】${INVOICE_NO}:書類を作成します⭐しばらくお待ちください`;
  new LINE().sendNotifyMessage(message);
  console.log(message);

  //Invoiceシートを作成する
  createInvoice_();  //サブ関数に記述
  Utilities.sleep(3000);

  //CustomInvoiceシートを作成する
  createCustomInvoice_();//サブ関数に記述
  Utilities.sleep(3000);

  //PackingListシートを作成する
  createPackingList_();//サブ関数に記述
  Utilities.sleep(3000);

  //Transportシートを作成する
  createTransport_();//サブ関数に記述
  Utilities.sleep(3000);

  //LINE通知する
  message = `【輸出】${INVOICE_NO}:出荷用のすべての書類が作成されました🍡`;
  new LINE().sendNotifyMessage(message);
  console.log(message);

  //🦀🦀🦀ここから下はカスタムメニューには非表示🦀🦀🦀
  //Shipment_Recordシートを作成する
  createShipment_Record();//サブ関数に記述

  //[外部]TradingHListoryシートを作成する
  createTradingHistorySheet();//サブ関数に記述

}





/** 🦀🦀🦀サブ関数🦀🦀🦀 */

/** Invoiceシートを作成する関数 */
function createInvoice_() {

  //INVOICE_NO
  const INVOICE_NO = PropertiesService.getScriptProperties().getProperty('INVOICE_NO');

  //Invoice用の明細行を取得する
  const i = new InvoiceSheet();
  const invoiceRecords = i.getInvoiceRecords();

  //Invoiceシートに貼り付ける
  i.setValuesToSheet(invoiceRecords);

  //ヘッダーをDHLシートと連携する
  i.setDHLtoHeader_();

  //blobを指定フォルダに保存する
  i.saveInvoiceBlobandGetUrl();

  //DHLシートに反映する
  new DHLSheet().setDocumentURLByInvoiceNo(INVOICE_NO);

  //LINE通知する
  const message = `【輸出】${INVOICE_NO}:インボイスが作成されました🍡`;
  new LINE().sendNotifyMessage(message);
  console.log(message);
}


/** CustomInvoiceシートを作成する関数 */
function createCustomInvoice_() {

  //CustomInvoice用の明細行を取得する
  const c = new CustomInvoiceSheet();
  const cusotmInvoiceRecords = c.getCustomInvoiceRecords();

  //CustomInvoiceシートに貼り付ける
  c.setValuesToSheet(cusotmInvoiceRecords);

  //blobを指定フォルダに保存する
  c.saveCustomInvoiceBlobandGetUrl();

  //LINE通知する
  const invoiceNo = PropertiesService.getScriptProperties().getProperty('INVOICE_NO');
  console.log(new LINE().sendNotifyMessage(`【輸出】${invoiceNo}:カスタムインボイスが作成されました🍡`));
  console.log(`【輸出】${invoiceNo}:カスタムインボイスが作成されました🍡`);
}


/** PackingListシートを作成する関数 */
function createPackingList_() {

  //PackingList用の明細行を取得する
  const p = new PackingListSheet();
  const PackingListRecords = p.getPackingListRecords();

  //PackingListシートに貼り付ける
  p.setValuesToSheet(PackingListRecords);

  //blobを指定フォルダに保存する
  p.savePackingListBlobandGetUrl();

  //LINE通知する
  const invoiceNo = PropertiesService.getScriptProperties().getProperty('INVOICE_NO');

  const message = `【輸出】${invoiceNo}:パッキングリストが作成されました🍡`;
  new LINE().sendNotifyMessage(message);
  console.log(message);
}


/** Transportシートを作成する関数 */
function createTransport_() {

  //Transport用の明細行を取得する
  const t = new TransportSheet();
  const TransportRecords = t.getTransportRecords();

  //Transportシートに貼り付ける
  t.setValuesToSheet(TransportRecords);

  //blobを指定フォルダに保存する
  t.saveTransportBlobandGetUrl();

  //LINE通知する
  const invoiceNo = PropertiesService.getScriptProperties().getProperty('INVOICE_NO');

  const message = `【輸出】${invoiceNo}:搬入情報が作成されました🍡`;
  new LINE().sendNotifyMessage(message);
  console.log(message);
}


/** Shipment_Recordシートを作成する関数 */
function createShipment_Record() {

  //Shipment_Record用の明細行をappendRow()する
  new ShipmentRecordSheet().appendRowToSheet();

  //LINE通知する
  const invoiceNo = PropertiesService.getScriptProperties().getProperty('INVOICE_NO');
  const message = `【輸出】${invoiceNo}:輸出履歴が追加されました🍡`;
  new LINE().sendNotifyMessage(message);
  console.log(message);
}


/** [外部]TradingHistryシートを作成する関数 */
function createTradingHistorySheet() {

  //TradingHistoryシートに貼り付ける
  new TradingHistorySheet().appendRowShipmentRecordToSheet();
  console.log(`【輸出】TradingHistoryに追加されました🍡`);
}

/** 🦀🦀🦀サブ関数ここまで🦀🦀🦀 */





/** 🦀🦀🦀サブメニュー（🍩URL更新に対応） 🦀🦀🦀 */
function updateInvoiceURL_() {
  new InvoiceSheet().saveInvoiceBlobandGetUrl();
}

function updateCustomInvoiceURL_() {
  new CustomInvoiceSheet().saveCustomInvoiceBlobandGetUrl();
}

function updatePackingListURL_() {
  new PackingListSheet().savePackingListBlobandGetUrl();
}

function updateTransportURL_() {
  new TransportSheet().saveTransportBlobandGetUrl();
}

/** 🦀🦀🦀サブメニューここまで🦀🦀🦀 */





/**
 * 🚀Finalize（Sub Menuを一括実行）関数
 */
function finalizeShipment() {

  //インボイスNoを取得
  const invoiceNo = PropertiesService.getScriptProperties().getProperty('INVOICE_NO');

  //Gmail下書き作成
  creatDraftGmail();//サブ関数に記述
  Utilities.sleep(1000);

  //DHLシートへの連携
  connectDHLSheet();//サブ関数に記述
  Utilities.sleep(1000);

  //freee登録用データ作成
  registShipmentRecord();//サブ関数に記述

  //LINE通知
  const message = `【輸出】${invoiceNo}:輸出記録を登録しました🍺営業用ダッシュボードを確認してください。出荷お疲れ様でした`;
  new LINE().sendNotifyMessage(message);
  console.log(message);

}



/** 🦀🦀🦀サブ関数🦀🦀🦀 */
/** Gmailを作成する関数 */
function creatDraftGmail() {
  const INVOICE_NO = PropertiesService.getScriptProperties().getProperty('INVOICE_NO');

  //Gmailの下書きを作成する
  new CustomGmail().draftGmail();

  //LINE通知
  const message = `【輸出】${INVOICE_NO}:Gmail下書きが作成されました🎉`;
  new LINE().sendNotifyMessage(message);
  console.log(message);
}

/** DHLシートに連携する関数 */
function connectDHLSheet() {
  const INVOICE_NO = PropertiesService.getScriptProperties().getProperty('INVOICE_NO');

  //DHLシートに連携する
  new DHLSheet().setDocumentURLByInvoiceNo(INVOICE_NO);

  //LINE通知
  const message = `【INV No:${INVOICE_NO}】各ドキュメントURLがフライト情報共有シートに出力されました🎉
  
  https://docs.google.com/spreadsheets/d/15rhIJupgjlgsqRkqZPbMZK_wNPbhTTYvwNJsVu_mIEo/edit#gid=0`;
  new LINE().sendNotifyMessageDHL(message)
  console.log(message);
}

/** 出荷記録を登録する */
function registShipmentRecord() {

  // ここに処理を記述してください

}
/** 🦀🦀🦀サブ関数ここまで🦀🦀🦀 */










/** 取引登録シートを作成する関数
 * @param{void} 
 * @return{void} なし
 */
function createRegisterTrading_() {

  //次の宿題

}
//test関数
function testcreateRegisterTrading() {
  createRegisterTrading_();
}

