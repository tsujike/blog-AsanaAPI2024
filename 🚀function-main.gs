function main() {
  //Javaの名残でmain関数を記述していますが意味はありません。
}


//以下、onOpenのカスタムメニュー構造に対応しています

/**
 * 🚀postシートに転記する関数
 */
function transferTasoToPostSheet() {
  //Postシートのインスタンス化
  const p = new PostSheet();

  // starの付いていないレコードを取得し、postシートに貼り付ける
  console.log(p.setRecordWithoutStar());

}


/**
 * 🚀Asanaにタスクを登録する関数
 */
function createTaskToAsana() {
  //Postシートのインスタンス化
  const p = new PostSheet();

  // Asanaにタスクを登録する（未実装）
  console.log(p.postTaskToAsana());

}


/**
 * 🚀Asanaのタスクを更新する関数（未実装）
 */
function putTaskToAsana() {
  // Asanaにタスクを登録する
  // console.log(p.postTaskToAsana());

}
