//使い方
//2024/03/09 Kenny
//Github https://github.com/tsujike/blog-AsanaAPI2024

function setPropertyStore() {

    //プロパティストアの選択
    const properties = PropertiesService.getScriptProperties();

    const ASANA_ACCESSTOKEN = "あなたのアクセストークン";
    properties.setProperty('ASANA_ACCESSTOKEN', ASANA_ACCESSTOKEN);

    const WORKSPACE_GID = "あなたのワークスペースID";
    properties.setProperty('WORKSPACE_GID', WORKSPACE_GID);

    const SPREADSHEET_ID = "あなたのスプレッドシートID";
    properties.setProperty('SPREADSHEET_ID', SPREADSHEET_ID);
}