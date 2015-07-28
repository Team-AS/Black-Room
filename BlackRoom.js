
/**
 * Black Room script
 * 
 * Copyright © Duduzzing
 * All rights deserved
 * 
 */

var SDCARD = android.os.Environment.getExternalStorageDirectory().getAbsolutePath();

var CTX = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();

var PECTX = CTX.createPackageContext("com.mojang.minecraftpe", android.content.Context.CONTEXT_IGNORE_SECURITY);

var tempScreenWidth = CTX.getWindowManager().getDefaultDisplay().getWidth();

var tempScreenHeight = CTX.getWindowManager().getDefaultDisplay().getHeight();

var screenWidth = Math.max( tempScreenWidth, tempScreenHeight);

var screenHeight = Math.min( tempScreenWidth, tempScreenHeight);

var FONT_PATH = SDCARD + "/Team-AS/Black-Room/minecraft.ttf"

var Bitmap = android.graphics.Bitmap;

var BitmapFactory = android.graphics.BitmapFactory;

var Button = android.widget.Button;

var Color = android.graphics.Color;

var Drawable = android.graphics.drawable;

var EditText = android.widget.EditText;

var Gravity = android.view.Gravity;

var GridLayout = android.widget.GridLayout;

var ImageView = android.widget.ImageView;

var LinearLayout = android.widget.LinearLayout;

var PopupWindow = android.widget.PopupWindow;

var Space = android.widget.Space;

var TextView = android.widget.TextView;

var View = android.view.View;


var peAssets = PECTX.getAssets();

var spritesheet = new BitmapFactory.decodeStream(peAssets.open("images/gui/spritesheet.png"));






//false면 모든 기능이 마비되도록 할 예정
//본 스크 제외 스크, 에드온, 모드 사용시 false

var isScriptActivated = true;







var blackRoom = {};



/**
 * Show the error in a dialog
 * use in try-catch
 */

blackRoom.error = function(e) {
	 
	 CTX.runOnUiThread(new java.lang.Runnable( {
		run: function(){
			try{    
  var dialog = new android.app.AlertDialog.Builder(CTX);
  
		var text = new EditText(CTX);
		
		text.setText(e + "\nLineNumber : " + e.lineNumber);
		
		var scroll = new android.widget.ScrollView(CTX);
		
		scroll.addView(text);
		
		dialog.setTitle("<Black Room> Error!");
		
		dialog.setView(scroll);
		
		dialog.setNegativeButton("Exit", null);
		
		dialog.setPositiveButton("Copy to clipboard",new android.content.DialogInterface.OnClickListener({onClick:function(){
			
			 CTX.getSystemService(android.content.Context.CLIPBOARD_SERVICE).setText(text.getText());
			 
			 android.widget.Toast.makeText(CTX,"Copied to clipboard", android.widget.Toast.LENGTH_LONG).show(); 
			 			
	 }}));
		dialog.create();
		dialog.show();
   }catch(e){
   	
   	print(e);
    }
    }}));
};



/**
 * 헤더파일(함수들을 담고있는 파일)을 읽어옵니다
 *
 * string headerPath
 * -헤더파일 경로
 *
 * return string
 * -읽어온 정보는 바로 eval필요
 */

function callHeaderFile( headerPath ){

  try{
    var file = java.io.File(SDCARD + headerPath);
    
    if(!file.exists())
      throw new Error(SDCARD+headerPath+" 경로에 헤더파일이 존재하지 않습니다");
    
    var fis = new java.io.FileInputStream(file);
    var isr = new java.io.InputStreamReader(fis);
    var br = new java.io.BufferedReader(isr);
    
    var arr = [];
    
    while(true){
      
      var str = br.readLine();
      if(str == null) break;
      arr.push(str);      
    
    }
    fis.close();
    isr.close();
    br.close();
    
    return arr.join(" ");
     
  } catch(e){
    
  blackRoom.error(e);
  
  }

}



//makeToast
//토스트 띄우는 함수

eval( callHeaderFile( "/Git/BlackRoom/header/makeToast.txt" ) );


//리소스 파일 다운로드 소스

eval( callHeaderFile( "/Git/BlackRoom/header/download.txt" ) );


//스크, 모드, 에드온 적용시 경고하는 소스

eval( callHeaderFile( "/Git/BlackRoom/header/getEnabledPatches.txt" ) );


//채팅관련 모든 함수

eval( callHeaderFile( "/Git/BlackRoom/header/chat.txt" ) );











//임시로 일단 만든 픽셀조정 함수
function dp(d){
	
return d;	
	
}


/**
 * Ninepatch image
 * 
 * String file
 * -the path
 * 
 *thk affogatoman
 * 
 *return drawable
 */

function ninepatch(file) {
  var br = new java.io.BufferedInputStream(new java.io.FileInputStream(new java.io.File(SDCARD, file)));

  return new Drawable.NinePatchDrawable.createFromStream(br, null);

};




/**
 * ClientMessage for BlackRoom script
 * 
 * String message
 * -may not be string though
 */

blackRoom.message = function(message) {

  clientMessage("<Black Room> " + message);

};







/**
 * Extract the given file to the directory
 *
 * orginal authors affogatoman, ChalkPE
 *
 * @param {String} file - zip 파일의 경로 혹은 파일 객체
 * @param {String} target - 압축을 풀 폴더의 경로
 */

blackRoom.unZip = function(file, target) {

 new java.lang.Thread(new java.lang.Runnable({
    run: function() { 	
    try{
        var zip = new java.util.zip.ZipFile(file);
        var elements = zip.entries();
        var element;
        
        var totalSize=0;
        var progress = 0;
        
        while(elements.hasMoreElements()) {
        totalSize += elements.nextElement().getSize();
        
        }
        
        var dialog;
        
        CTX.runOnUiThread(new java.lang.Runnable({
    run: function(){
      try{
        dialog = new android.app.ProgressDialog(CTX);
        dialog.setProgressStyle(android.app.ProgressDialog.STYLE_HORIZONTAL);
        dialog.setMax(totalSize);
        dialog.setTitle("맵 자동적용");
        dialog.setMessage("압축푸는 중...");
        dialog.setCancelable(false);
        dialog.show();
      } catch(e){
        blackRoom.error(e);
      }
    }
  }));
  
        elements = zip.entries();            
               
        new java.io.File(target).mkdirs();
        
        
        java.lang.Thread.sleep(2000);
        
        while(elements.hasMoreElements()) {
            element = elements.nextElement();
            
            CTX.runOnUiThread(new java.lang.Runnable({
    run: function(){
      try{
      	
      dialog.setMessage(element.getName()+" 압축 푸는 중...");
      	
      } catch(e){
        blackRoom.error(e);
      }
    }
  }));      
            try{
        
        var bis = null;
        
        
        var source = zip.getInputStream(element);
        
        var target2 = new java.io.File(target, element.getName())
         
            bis = new java.io.BufferedInputStream(source);
       
        if(element.isDirectory( ) ) {
        target2.mkdir();
        }
        else{
        	target2.getParentFile().mkdir();
        	 
        var bos = new java.io.BufferedOutputStream(new java.io.FileOutputStream(target2));
        
        var buf = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, 4096);
        var count = 0;
        
        while((count = bis.read(buf)) >= 0){
            bos.write(buf, 0, count);
            progress += count;
            dialog.setProgress(progress);
        }
        
        bis.close();
        bos.close();
     }           
        
    }catch(e){
blackRoom.error(e);        
    }

        }
        zip.close();        
                
        CTX.runOnUiThread(new java.lang.Runnable({
    run: function(){
      try{
      	
      dialog.dismiss();
      	
      } catch(e){
        blackRoom.error(e);
      }
    }
  }));      
        
        
        
    }catch(e){
        blackRoom.error(e);
    }
    }})).start();



};













/**
 * Set the dim amount of screen
 *
 * float howMuch
 * -dark(0.1) ~ bright(1.0)
 *
 */ 

blackRoom.screenDim = function(howMuch){
	
    	  var params = CTX.getWindow().getAttributes();  

params.alpha = howMuch;

CTX.runOnUiThread(new java.lang.Runnable({
      run: function() {
  
CTX.getWindow().setAttributes(params);  

}}));

};

/**
 * Set the brightness of screen
 *
 * float howMuch
 * -dark(0.1) ~ bright(1.0)
 *
 */
 
blackRoom.setBrightness = function(howMuch){
	
var params = CTX.getWindow().getAttributes();  

params.screenBrightness = howMuch;

CTX.runOnUiThread(new java.lang.Runnable({
      run: function() {
  
CTX.getWindow().setAttributes(params);  

}}));

};

/**
 * Vibrate phone
 * 
 * int howLong
 * -set how long will it vibrate in millisecond
 */

blackRoom.vibrate = function(howLong) {

  CTX.runOnUiThread(new java.lang.Runnable({
    run: function() {
      try {
        CTX.getSystemService(android.content.Context.VIBRATOR_SERVICE).vibrate(howLong);

      } catch(e) {
        blackRoom.error(e);
      }

    }
  }));

};


/**
 * Vibrate screen
 * 
 * int howLong
 * -set how long will the screen shake
 * 
 */

blackRoom.screenVibrate = function(howLong) {

try{
            
/*
var view = CTX.getWindow().getDecorView().findViewById(android.R.id.content);

var view = CTX.getWindow().getDecorView().getRootView()

var Animation = android.view.animation.Animation;

//var alphaAnimation = android.view.animation.AlphaAnimation(0.1,1.0);

var alphaAnimation = new android.view.animation.TranslateAnimation(0, 0, 50, 50);  


alphaAnimation.setDuration(howLong);  

alphaAnimation.setRepeatCount(Animation.INFINITE);  

alphaAnimation.setRepeatMode(Animation.REVERSE);  

view.startAnimation(alphaAnimation);    


*/

    	  
  var player = Player.getEntity();
  
  var time = new Date().getTime();
  
  var yaw = Entity.getYaw(player);
  var pitch = Entity.getPitch(player);
  
  new java.lang.Thread( new java.lang.Runnable( { run: function(){
  try{
 
    while(true){
      
      var rand1 = Math.floor(Math.random()*10)-5;	
      var rand2 = Math.floor(Math.random()*10)-5;	
	    	  
     Entity.setRot(player,yaw+rand1,pitch+rand2);
     java.lang.Thread.sleep(50);
      
      if(new Date().getTime() - time > howLong) {
      	break;
      }
    }
    } catch (e) {
blackRoom.error(e);	
}

 
  }})).start();


} catch (e) {
blackRoom.error(e);	
}


};








function useItem(x, y, z, I, b) {

  if(I==257){  
  try {

    var message = ["안녕 난 스티브야", "뭐 왜 뭘봐", "Lopadotemachoselachogaleokranioleipsanodrimhypotrimmatosilphioparaomelitokatakechymenokichlepikossyphophattoperisteralektryonoptekephalliokigklopeleiolagoiosiraiobaphetraganopterygon", "(동공지진)"];

    var cha = ["Steve", "Alex", "Steve", "Alex"];

    var point = [20, 25, 16, 25];

    var doVibrate = [false, false, false, true];

    var isLeft = [true, false, true, false];

    var color = [null, Color.WHITE, Color.YELLOW, Color.BLUE];

    var endFunc = [

    null, null, function() {
      
      blackRoom.screenVibrate(2000);
    },
    null

    ];

    var count = 0;

    CTX.runOnUiThread(new java.lang.Runnable({
      run: function() {

        var talk = blackRoom.prepareChat();

        //talkWin, character, message, point, isLeft, color, doVibrate, endFunc, count

        blackRoom.chat(talk, cha, message, point, isLeft, color, doVibrate, endFunc, count);

      }
    }));

  } catch(e) {
    blackRoom.error(e);
  }
  }


if(I==258){
blackRoom.screenDim(0.1);
  }
if(I==259){
blackRoom.screenDim(1.0);
  } 
if(I==260){
blackRoom.setBrightness(0.1);
}   


}

















 	
 	
 	
 	
 	
 	