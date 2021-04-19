function uploadToYouTube(mp4_fileId) {
  var blob,mp4_fileId,part,requestResource,response;
  var options = {},snippet = {};

  /*
    You will need to create a new Google Cloud Platform (GCP) standard project and associate it with this Apps Script project-
    In the new code editor click the settings cog wheel and scroll down to:
    Google Cloud Platform (GCP) Project -

    You will need to configure the OAuth consent screen even if you are not publishing the code to be used by the public -
    
    If you do not have a Google Workspace account then you wont be able to set up the GCP project as "INTERNAL"
    but you can create the app in testing mode with approved test accounts in order to run it -
    Enable the Google Drive API and the YouTube API in the GCP project -
  */

  /*
    This code needs the file ID of the MP4 file in your Google Drive - 
    To get the file ID of an MP4 video file in Google Drive, right click the MP4 in your Google Drive
    and choose, "Get link"
    The link will look like this:
    https://drive.google.com/file/d/FILE_ID_IS_HERE/view?usp=sharing
    In the URL is the file ID

    You could also have the code look up the file by name and then get the file ID -
    Or you could even implement the Google Picker and have the user choose the file from their Google Drive -
  */

  options = {
    "method" : "get",
    "headers" : {"Authorization": "Bearer " + ScriptApp.getOAuthToken()},
    "muteHttpExceptions":true
  }
  
  mp4_fileId = mp4_fileId ? mp4_fileId : 'MP4_FILE_ID_HERE_IF_NOT_PASSED_IN';

  const url = `https://www.googleapis.com/drive/v3/files/` + mp4_fileId + `?alt=media`;
  response = UrlFetchApp.fetch(url, options);
  //Logger.log('response.getResponseCode(): ' + response.getResponseCode())

  if (response.getResponseCode() !== 200) {

    return;
  }
  
  blob = response.getBlob();
  //Logger.log('blob.getName(): ' + blob.getName())

  /*
  {"snippet":{
    "playlistId":"YOUR_PLAYLIST_ID",
    "position":0,
    "resourceId":{
      "kind":"youtube#video",
      "videoId":"abcdefg"
      }
    }
  }
  */

  /*
  {
  "snippet": {
    "title": "Summer vacation in California",
    "description": "Had fun surfing in Santa Cruz",
    "tags": ["surfing", "Santa Cruz"],
    "categoryId": "22"
  },
  "status": {
    "privacyStatus": "private"
  }
  }
  */
  
  requestResource = {};

  snippet.title = "AAA_Put_Title_Here";
  snippet.description = "Description of video goes here";
  snippet.categoryId = "22";

  options.snippet = snippet;
  options.status = {
      "privacyStatus": "private"
    }

  part = "snippet,status";//This correlates to the options

  //YouTube.Videos.insert(resource: Youtube_v3.Youtube.V3.Schema.Video, part: string[], mediaData: Blob, optionalArgs: Object)
  var response = YouTube.Videos.insert(requestResource, part, blob, options);

  if (!response || !response.kind) {//There was an error
    console.log("Error!")
  }
  
  //Logger.log('response: ' + response);

}
