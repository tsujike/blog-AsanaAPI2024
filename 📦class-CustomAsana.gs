/** クラスCustomAsana */
class CustomAsana {

  /** コンストラクタ */
  constructor() {
    this.accessToken = PropertiesService.getScriptProperties().getProperty("ASANA_ACCESSTOKEN");
    this.workspaceId = PropertiesService.getScriptProperties().getProperty("WORKSPACE_GID");
  }

  /** タスクを登録する */
  createTask(task) {
    const url = 'https://app.asana.com/api/1.0/tasks';

    // Project と Section のペアを配列にまとめる
    const projectSections = [
      { project: task['project1'], section: task['section1'] },
      { project: task['project2'], section: task['section2'] },
      { project: task['project3'], section: task['section3'] }, //必要に応じて追加
    ];

    // 無効なエントリーを除外し、memberships を構築
    const memberships = projectSections.filter(ps => ps.project && ps.section);

    const payload = {
      data: {
        workspace: this.workspaceId,
        name: task['name'],
        notes: task['notes'],
        assignee: task['assignee'],
        tags: task['tags'],
        followers: task['followersIds'] ? [task['followersIds']] : [],
        memberships: memberships
      }
    };


    const options = {
      method: 'post',
      contentType: 'application/json',
      headers: {
        'Authorization': 'Bearer ' + this.accessToken
      },
      payload: JSON.stringify(payload),
      muteHttpExceptions: true
    };
    try {
      const response = UrlFetchApp.fetch(url, options);
      const jsonResponse = JSON.parse(response.getContentText());
      console.log(jsonResponse);
    } catch (e) {
      console.log("Exception when calling API: " + e.toString());
    }
  }
}


/** テスト関数 */
function testCustomAsana() {

  //CustomAsanaのインスタンス化
  const a = new CustomAsana();

    //タスクの登録
    const task = {
      project1: 'プロジェクトID',
      section1: 'セクションID',
      name: 'タスクの名前',
      notes: 'タスクの内容',
      assignee: 'me',
      tags: ['あなたのタグGID','あなたのタグGID'],
      followersIds: 'コレボレーターのGID'
    };
  a.createTask(task);
}