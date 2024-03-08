function onOpen() {

  const ui = SpreadsheetApp.getUi();

  ui.createMenu('🍉カスタムメニュー')
    .addItem('🚀postシートに転記する', 'transferTasoToPostSheet') //function-main.gs
    .addItem('🚀Asanaにタスクを登録する', 'createTaskToAsana')//function-main.gs
    .addItem('🚀Asanaのタスクを更新する（未実装）', 'putTaskToAsana')//function-main.gs
    .addToUi();

}
