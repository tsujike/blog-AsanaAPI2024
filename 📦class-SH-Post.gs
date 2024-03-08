/** Postシートクラス */
class PostSheet {

  /** コンストラクタ */
  constructor() {
    this.sheetName = 'post';
    this.SPREADSHEET_ID = PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID');
    this.sheet = SpreadsheetApp.openById(this.SPREADSHEET_ID).getSheetByName(this.sheetName);
  }

  /** すべてのRecordsをオブジェクトレコーズで取得するメソッド
   * @return{Array} objArray
   */
  getPostSheetRecords() {
    const [header, ...records] = this.sheet.getDataRange().getValues();

    const objectRecords = records.map(record => {
      const obj = {};
      header.forEach((element, index) => obj[element] = record[index]);
      return obj;
    });

    return objectRecords;
  }


  /** starの付いていないレコードを取得し、postシートに貼り付けるメソッド */
  setRecordWithoutStar() {

    //Dataシートのインスタンス化と、starのついていないレコードを取得
    const d = new DataSheet();
    const records = d.getRecordWithoutStar();

    //ガード節
    if (records.length === 0) return '★無しレコードはありません';

    //2次元配列に戻す
    const recordsArray = records.map(record => Object.values(record));

    // 2行目から貼り付け
    this.sheet.getRange(2, 1, recordsArray.length, recordsArray[0].length).setValues(recordsArray);

    //starをつける
    d.setStarToDataSheetRecord();

    return '★無しレコードをpostシートに貼り付けました';
  }


  /** Asanaにタスクを登録する */
  postTaskToAsana() {
    //タスクの取得
    const records = this.getPostSheetRecords();


    //AsanaAPIのインスタンス化（未実装）
    const a = new CustomAsana();

    //タスクを登録する処理（未実装）
    records.map(record => a.createTask(record));

    //postシートをクリア
    this.sheetClear_();

    return 'Asanaにタスクを登録しました';
  }

  /** シートのクリア */
  sheetClear_() {
    const lastRow = this.sheet.getLastRow();
    const lastColumn = this.sheet.getLastColumn();
    const range = this.sheet.getRange(2, 1, lastRow, lastColumn);
    range.clear();
    return 'シートをクリアしました';
  }

}




/** TEST関数 */
function testPostSheet() {

  //Postシートのインスタンス化
  const p = new PostSheet();
  
  // starの付いていないレコードを取得し、postシートに貼り付ける
  console.log(p.setRecordWithoutStar());

  //全てのRecordsをオブジェクトレコーズで取得する
  const records = p.getPostSheetRecords();
  console.log(p.getPostSheetRecords());

  // Asanaにタスクを登録する（未実装）
  console.log(p.postTaskToAsana());

}


