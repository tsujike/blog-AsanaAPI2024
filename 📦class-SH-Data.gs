/** Dataシートクラス */
class DataSheet {

  /** コンストラクタ */
  constructor() {
    this.sheetName = 'Data';
    this.SPREADSHEET_ID = PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID');
    this.sheet = SpreadsheetApp.openById(this.SPREADSHEET_ID).getSheetByName(this.sheetName);
  }

  /** すべてのRecordsをオブジェクトレコーズで取得するメソッド
   * @return{Array} objArray
   */
  getDataSheetRecords() {
    const [header, ...records] = this.sheet.getDataRange().getValues();

    const objectRecords = records.map(record => {
      const obj = {};
      header.forEach((element, index) => obj[element] = record[index]);
      return obj;
    });

    return objectRecords;
  }


  /** starのついていないRecordだけを取得するメソッド */
  getRecordWithoutStar() {
    const records = this.getDataSheetRecords().filter(record => record['star'] !== '★');
    return records;
  }


  /** recordをSTAR済みにしてDataシートを更新するメソッド */
  setStarToDataSheetRecord() {

    //すべてのrecordsを取得してスターを付けてDataシートに貼り付ける
    const objectRecords = this.getDataSheetRecords();
    const withoutStarRecords = objectRecords.filter(record => record['star'] !== '★');
    withoutStarRecords.map(record => {
      record['star'] = '★';
      return record;
    });

    this.setAllRecords_(objectRecords);
    return "Dataシートに引数を渡しました";
  }


  /** 受け取ったオブジェクトレコーズをシートに上書きする 
    * @param{Array} objectRecords
    */
  setAllRecords_(objectRecords) {

    //2次元配列に戻して貼り付け
    const records = objectRecords.map(record => Object.values(record));
    this.sheet.getRange(2, 1, records.length, records[0].length).setValues(records);
    return 'Dataシートに書き込み完了しました';
  }


  /** シートのクリア(単独で走らせたら危ないので、必ずプライベート化して、setAllRecords()などに組み込む) */
  sheetClear_() {
    const lastRow = this.sheet.getLastRow();
    const lastColumn = this.sheet.getLastColumn();
    const range = this.sheet.getRange(2, 1, lastRow, lastColumn);
    range.clear();
    return 'シートをクリアしました';
  }


}



/** TEST関数 */
function testDataSheet() {

  //Dataシートの・・・
  const d = new DataSheet();

  //全てのRecordsをdictsMapsで取得する
  const records = d.getDataSheetRecords();
  // console.log(d.getDataSheetRecords());

  //starのついていないRecordだけをobjectRecordsで取得する（1件のはず）
  const record = d.getRecordWithoutStar();
  // console.log(d.getRecordWithoutStar());

  // すべてのRecordsにStarをつけて更新するメソッド
  console.log(d.setStarToDataSheetRecord());

  //シートのクリア sheetClear()　単独では呼ばない
  // console.log(d.sheetClear_());

}