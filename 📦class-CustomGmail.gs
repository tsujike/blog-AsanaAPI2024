/** クラスCustomGmail */
class CustomGmail {

  /** コンストラクタ
    * @param{array} Dataシートの1レコ―ドobjectRecord[0] //1件しかないはず
    */
  constructor() {
    const properties = PropertiesService.getScriptProperties();
    this.INVOICE_NO = properties.getProperty('INVOICE_NO');
    this.CONSIGNEE_CODE = properties.getProperty('CONSIGNEE_CODE');
    this.CONSIGNEE_NAME = properties.getProperty('CONSIGNEE_NAME');
    this.CUSTOMER_CODE = properties.getProperty('CUSTOMER_CODE');
  }


  /** subjectを生成するメソッド */
  createSubject_() {
    const yusyutubi = new InvoiceSheet().getYusyutubi_();
    const destination = new CustomersSheet().getDestinationByCode(this.CONSIGNEE_CODE)
    const mailTitle = `[${yusyutubi}] Flight to ${destination}[${this.CONSIGNEE_NAME}]`;
    return mailTitle;
  }

  /** MailBodyを生成するメソッド */
  createMailBody_() {

    const properties = PropertiesService.getScriptProperties();
    const invoiceNo = properties.getProperty('INVOICE_NO');
    const userName = Session.getActiveUser().getUsername();
    const userEmail = Session.getActiveUser().getEmail();

    const invoiceUrl = properties.getProperty('INVOICE_URL');
    const customInvoiceUrl = properties.getProperty('CUSTOMINVOICE_URL');
    const packingListUrl = properties.getProperty('PACKINGLIST_URL');

    const cooUrl = "";
    const healthUrl = "";

    const awbNo = new DHLSheet().getAWBNumberByInvoiceNo(invoiceNo);

    const mailBody = `Dear All<br><br>

Please refer to the following URLs for documents related to our upcoming shipment:

<ul>
  <li>Invoice No :${invoiceNo}</li>
  <li><a href="${invoiceUrl}">Invoice URL</a></li>
  <li><a href="${customInvoiceUrl}">CutomInvoice URL</a></li>
  <li><a href="${packingListUrl}">PackingList URL</a></li>
  <li>Certificate of Origin URL:${cooUrl} *on Attachment</li>
  <li>Health Certificate URL:${healthUrl} *on Attachment</li>
</ul>

AWB No. ${awbNo}<br><br>

To Mr.Oue(DHL)<br>
Upon receipt of the AWB, please respond with a copy of the AWB and notify me of the AWB No. by email. <br>
Also, kindly ensure that the phrase "KEEP CHILLED AT ALL TIMES" is indicated on the AWB.<br>
If there are any changes to the AWB No., <u>please notify the updated one to the Consignee in the next email.</u><br>
<br>
Thank you for your attention to these matters.<br>
<br>
Best Regards<br>
----------------------------------------------------<br>
<br>
${userName}<br>
${userEmail}<br>
<br>
TG GLOBAL CO.LTD.(http://tg-global.asia)<br>
3-11, Nishi11chome, Kita30jo, Kitaku, Sapporo,<br>
Hokkaido, JAPAN 001-0030<br>
<br>
T:+81 11 299-2308 F: +81 11 299-2338<br>
----------------------------------------------------<br>
  `;

    return mailBody;
  }


  /** TGメンバーのアドレスを文字列で返すメソッド
   * @return{string} members
   */
  getTgMemmberMailAddress_() {
   const members = [
    'kenzo@jugani-japan.com',
    'tera@jugani-japan.com',
    'yuta@jugani-japan.com',
    'vivian@jugani-japan.com',
    'kou.japan88@gmail.com'
   ]
    return members.join(',');
  }

    /** DHLメンバーのアドレスを文字列で返すメソッド
   * @return{string} members
   */
    getDHLMemmberMailAddress_() {
      const members = [
       'suguru.oue@dhl.com',
       'Shinsuke.Oura@dhl.com',
       'nonoka.ishihara@dhl.com',
      ]
       return members.join(',');
     }

  /** cc用のオブジェクト作成メソッド  */
  getOptions_() {
    const options = {
      cc: `${this.getTgMemmberMailAddress_()},${this.getDHLMemmberMailAddress_()}`,
      htmlBody:this.createMailBody_()
    }
    return options
  }

  /** Mail下書きメソッド  */
  draftGmail() {
    const to = new CustomersSheet().getRecipientByCode(this.CONSIGNEE_CODE)
    GmailApp.createDraft(to, this.createSubject_(), this.createMailBody_(), this.getOptions_());
    return 'メール下書きを作成しました';
  }

}


/** テスト関数*/
function testCustomGmail() {

  const properties = PropertiesService.getScriptProperties();
  const INVOICE_NO = "FWS230414";
  properties.setProperty('INVOICE_NO', INVOICE_NO);

  //CustomGmailのインスタンス化
  const cg = new CustomGmail();
  console.log(cg.CONSIGNEE_CODE);
  console.log(cg.CONSIGNEE_NAME);
  console.log(cg.CUSTOMER_CODE);

  //TGメンバーのアドレスを文字列で返すメソッド
  console.log(cg.getTgMemmberMailAddress_());

  //DHLメンバーのアドレスを文字列で返すメソッド
  console.log(cg.getDHLMemmberMailAddress_());

  //subjectを生成するメソッド
  console.log(cg.createSubject_());

  //MailBodyを生成するメソッド
  console.log(cg.createMailBody_());

  //optionsを生成するメソッド
  console.log(cg.getOptions_());

  //メールの下書き
  cg.draftGmail();
}