function onOpen() {

  const ui = SpreadsheetApp.getUi();

  ui.createMenu('🍉Create Document')
    .addItem('🚀Setup InvoiceNo', 'setupInvoiceNo') //global.gs
    .addSeparator()
    .addItem('🚀書類一括作成', 'createDocumentPDF')//function-main.gs
    .addSeparator()
    .addSubMenu(
      ui.createMenu("🥑個別作成")
        .addItem('🚁Invoice', 'createInvoice_') //function-main.gs
        .addItem('🚁CustomInvoice', 'createCustomInvoice_') //function-main.gs
        .addItem('🚁PackingList', 'createPackingList_') //function-main.gs
        .addItem('🚁搬入情報', 'createTransport_') //function-main.gs
    )
    .addSeparator()
    .addSubMenu(
      ui.createMenu("🍩URL更新")
        .addItem('🚑Invoice', 'updateInvoiceURL_') //function-main.gs
        .addItem('🚑CustomInvoice', 'updateCustomInvoiceURL_') //function-main.gs
        .addItem('🚑PackingList', 'updatePackingListURL_') //function-main.gs
        .addItem('🚑搬入情報', 'updateTransportURL_') //function-main.gs
    )
    .addToUi();

  ui.createMenu('🍺Gmail-DHL-freee')
    .addItem('🚀出荷処理一括実行', 'finalizeShipment')//function-main.gs
    .addSeparator()
    .addSubMenu(
      ui.createMenu("🥑個別実行")
        .addItem('🚁Gmail作成', 'creatDraftGmail_') //function-main.gs
        .addItem('🚁DHL連携', 'connectDHLSheet') //function-main.gs
        .addItem('🚁freee登録', 'registShipmentRecord') //function-main.gs
    )
    .addToUi();

}
