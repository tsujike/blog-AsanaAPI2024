class AsanaAPI {

    /** コンストラクタ */
    constructor() {
      this.accessToken = ACCESS_TOKEN;
      this.workspaceId = WORKSPACE_GID;
    }
  
    /** タスクを登録する */
    createTask(task) {
      const url = 'https://app.asana.com/api/1.0/tasks';
      const payload = {
        data: {
          workspace: this.workspaceId,
          memberships: [{'project': task['projectId'], 'section': task['sectionId']}],
          name: task['name'],
          notes: task['notes'],
          assignee: task['assignee'],
          tags: [task['tags'],task['tags']], 
          followers: [task['followersIds'],task['followersIds']]
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
  
  
  