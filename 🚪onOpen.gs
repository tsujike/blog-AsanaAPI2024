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
    
}
