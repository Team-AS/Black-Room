
/**
 * Download file from internet
 * 
 * String url
 * -the url that contains file to download
 * 
 * String path
 * -the path to download file (sdcard path included already)
 */
 
blackRoom.download = function(url, path, endFunc) {
  new java.lang.Thread(new java.lang.Runnable({
    run: function() {
      try {
        var file = new java.io.File(SDCARD, path);
        if (file.exists()) {

          return;

        }

        if (!file.getParentFile().exists()) {

          file.getParentFile().mkdirs();

        }

        var URL = new java.net.URL(url);
        var urlConn = URL.openConnection();
        urlConn.connect();
        var total = urlConn.getContentLength();
        var bis = new java.io.BufferedInputStream(URL.openStream());
        var bos = new java.io.BufferedOutputStream(new java.io.FileOutputStream(file));

        var downloadDialog;

        CTX.runOnUiThread(new java.lang.Runnable({
          run: function() {
            try {

              downloadDialog = new android.app.ProgressDialog(CTX);

              downloadDialog.setProgressStyle(android.app.ProgressDialog.STYLE_HORIZONTAL);
              downloadDialog.setMax(total);
              downloadDialog.setTitle("Resource file downloading");
              downloadDialog.setMessage("downloading..");
              downloadDialog.setCancelable(true);
              downloadDialog.show();
            } catch(e) {
              blackRoom.error(e);
            }

          }
        }));

        var data = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, 1024);
        var count;
        var downloadProgress = 0;

        while ((count = bis.read(data)) != -1) {
          java.lang.Thread.sleep(1);
          bos.write(data, 0, count);
          downloadProgress += count;

          CTX.runOnUiThread(new java.lang.Runnable({
            run: function() {
              downloadDialog.setProgress(downloadProgress);
            }
          }));
        }
        urlConn.disconnect();
        bos.flush();
        bos.close();
        bis.close();
        CTX.runOnUiThread(new java.lang.Runnable({
          run: function() {
            try {
              downloadDialog.dismiss();
            } catch(e) {
              blackRoom.error(e);
            }
          }
        }));
        
        
	 CTX.runOnUiThread(new java.lang.Runnable( {
		run: function(){
			try{    
        var dialog = new android.app.AlertDialog.Builder(CTX);
        dialog.setTitle("<Black Room> " +file.getName() + " 다운로드 완료" );	        
		     dialog.setNegativeButton("나가기", null); 
		     dialog.create();
		     dialog.show();
		     
		     } catch(e) {
        blackRoom.error(e);        
      }
      }}));
      
      
      
      } catch(e) {
        blackRoom.error(e);
      } finally{
      	 if(endFunc != undefined)
      endFunc();
      	
      	}
    }
  })).start();
};




blackRoom.download( "https://raw.githubusercontent.com/Team-AS/Black-Room/master/Zombie.png" ,"/Team-AS/Black-Room/Alex.png");

blackRoom.download( "https://raw.githubusercontent.com/Team-AS/Black-Room/master/Skeleton.png" ,"/Team-AS/Black-Room/Steve.png");

blackRoom.download( "https://raw.githubusercontent.com/Team-AS/Black-Room/master/minecraft.ttf","/Team-AS/Black-Room/minecraft.ttf");

blackRoom.download( "https://raw.githubusercontent.com/Team-AS/Black-Room/master/talking.9.png","/Team-AS/Black-Room/talking.9.png");

/*
blackRoom.download(
"https://github.com/Team-AS/Black-Room/raw/master/TestWorld.zip",
"/Team-AS/Black-Room/testMap.zip",
function(){
	blackRoom.unZip(
SDCARD+"/Team-AS/Black-Room/testMap.zip",
SDCARD+"/games/com.mojang/minecraftWorlds");
});

*/