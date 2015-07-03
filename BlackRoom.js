
/**
 * Black Room script
 * 
 * Copyright © Duduzzing
 * All rights deserved
 * 
 */

var SDCARD = android.os.Environment.getExternalStorageDirectory();

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



var gui = {};

/**
 * Ninepactch image
 * 
 * String file
 * -the path
 * 
 *thk affogatoman
 * 
 *return drawable
 */

gui.ninepatch = function(file) {
  var br = new java.io.BufferedInputStream(new java.io.FileInputStream(new java.io.File(SDCARD, file)));

  return new Drawable.NinePatchDrawable.createFromStream(br, null);

};

var blackRoom = {};


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
 * Download file from internet
 * 
 * String url
 * -the url that contains file to download
 * 
 * String path
 * -the path to download file (sdcard path included already)
 */
 
blackRoom.download = function(url, path) {
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
      }
    }
  })).start();
};




blackRoom.download( "https://raw.githubusercontent.com/Team-AS/Black-Room/master/Zombie.png" ,"/Team-AS/Black-Room/Zombie.png");

blackRoom.download( "https://raw.githubusercontent.com/Team-AS/Black-Room/master/Skeleton.png" ,"/Team-AS/Black-Room/Skeleton.png");

blackRoom.download( "https://raw.githubusercontent.com/Team-AS/Black-Room/master/minecraft.ttf","/Team-AS/Black-Room/minecraft.ttf");






/**
 * Get the face bitmap for chatting by name
 * 
 * String name
 * -the character's name
 * 
 * return bitmap
 */

blackRoom.getFaceByName = function(name) {
  var path = SDCARD + "/Team-AS/Black-Room/" + name + ".png";

  if (java.io.File(path).exists()) {

    return BitmapFactory.decodeFile(path);

  } else {

    throw new Error("No image exists in: " + path);

  }

};

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
 * (testing)
 * 
 * int howLong
 * -set how long will the screen shake
 * 
 */

blackRoom.screenVibrate = function(howlong) {
  
  var player = Player.getEntity();
  
  var time = new Date().getTime();
  
  new java.lang.Thread( new java.lang.Runnable( { run: function()){
  
    while(true){
      Entity.setVelX(player, 0.2);
      Entity.setVelZ(player, 0.2);
      Entity.setVelX(player, -0.2);
      Entity.setVelZ(player, -0.2);
      Entity.setVelX(player, -0.2);
      Entity.setVelX(player, 0.2);
      Entity.setVelZ(player, 0.2);
      Entity.setVelX(player, -0.2);
      
      if(new Date().getTime() - time > howLong) {
      	break;
      }
      
    }
 
  }})).start();
  
};

/**
 * Prepare PopupWindows for chat
 * 
 * return PopupWindow (obj)
 */

blackRoom.prepareChat = function() {

try{
  
  //this speed should be 0, but 10 for just now
  ModPE.setGameSpeed(10);
  
 var imageView1 = new ImageView(CTX);

  var personWindow1 = new PopupWindow(imageView1, screenWidth / 4, screenHeight / 2);
  personWindow1.setBackgroundDrawable(new Drawable.ColorDrawable(Color.TRANSPARENT));

  personWindow1.showAtLocation(CTX.getWindow().getDecorView(), Gravity.LEFT | Gravity.CENTER, 0, 0);

  var imageView2 = new ImageView(CTX);

  var personWindow2 = new PopupWindow(imageView2, screenWidth / 4, screenHeight / 2);
  personWindow2.setBackgroundDrawable(new Drawable.ColorDrawable(Color.TRANSPARENT));

  personWindow2.showAtLocation(CTX.getWindow().getDecorView(), Gravity.RIGHT | Gravity.CENTER, 0, 0);
  
  var nameBitmap = BitmapFactory.decodeFile(SDCARD+"/Download/talking_name.9.png");
  
  var nWid = nameBitmap.getWidth();
  var nHei = nameBitmap.getHeight();

  var name1 = new Button(CTX);
  
  name1.setTextSize(20);
  
  name1.setTextColor(Color.BLACK);

  name1.setBackgroundDrawable(new Drawable.ColorDrawable(Color.TRANSPARENT));
  
  var nameWindow1 = new PopupWindow(name1, nWid, nHei);
  
  nameWindow1.setBackgroundDrawable(new Drawable.ColorDrawable(Color.TRANSPARENT));
  
  nameWindow1.showAtLocation(CTX.getWindow().getDecorView(), Gravity.LEFT | Gravity.CENTER, 0, 70);

  var name2 = new Button(CTX);
  
  name2.setTextSize(20)
  
  name2.setTextColor(Color.BLACK);

  name2.setBackgroundDrawable(new Drawable.ColorDrawable(Color.TRANSPARENT));
    
  var nameWindow2 = new PopupWindow(name2, nWid, nHei);
  
  nameWindow2.setBackgroundDrawable(new Drawable.ColorDrawable(Color.TRANSPARENT));
  
  nameWindow2.showAtLocation(CTX.getWindow().getDecorView(), Gravity.RIGHT | Gravity.CENTER, 0, 70);

  var screen = new Button(CTX);
  
  screen.setBackgroundDrawable(new Drawable.ColorDrawable(Color.TRANSPARENT));

  var talkWindow = new PopupWindow(screen,screenWidth, screenHeight / 3);

  talkWindow.setBackgroundDrawable(gui.ninepatch("/Download/talking.9.png"));

  talkWindow.showAtLocation(CTX.getWindow().getDecorView(), Gravity.CENTER | Gravity.BOTTOM, 0, 0);

  
  var arrowBitmap = new Bitmap.createScaledBitmap( new Bitmap.createBitmap(spritesheet,38,11,8,4), 32, 14, false);
  
  var arrowWindow = new PopupWindow(32*2,14*2);
  
  arrowWindow.setBackgroundDrawable(new Drawable.ColorDrawable(Color.WHITE));

  //arrowWindow.setBackgroundDrawable(new Drawable.BitmapDrawable(arrowBitmap));

  arrowWindow.showAtLocation(CTX.getWindow().getDecorView(), Gravity.CENTER | Gravity.TOP, -20, 0);


  var obj = {

    talkWindow: talkWindow,
    nameWindow1: nameWindow1,
    nameWindow2: nameWindow2,
    personWindow1: personWindow1,
    personWindow2: personWindow2,
    arrowWindow: arrowWindow

  };

  return obj;
} catch(e) {
	
  blackRoom.error(e);	
	
}
};

/**
 * The Chatting function
 * 
 * Object talkWin
 * -prepareChat
 * 
 * String[] character
 * -defines which character is speaking (name)
 * 
 * Sring[] message
 * -the talking
 * 
 * Int[] point
 * -font size
 * 
 * Bool[] doVibrate
 * -true = virate when talk
 * 
 * Bool[] isLeft
 * -true = face is on the left side
 * 
 * function[]/null endFunc
 * -function that execute when the talking is done
 * 
 * int count
 * -the index for each arries
 * -put 0 when it's the beginning of chat
 */

blackRoom.chat = function(talkWin, character, message, point, isLeft, color, doVibrate, endFunc, count) {

  try {

    var person1 = talkWin.personWindow1.getContentView();

    var person2 = talkWin.personWindow2.getContentView();
    
    var name1 = talkWin.nameWindow1.getContentView();
   
    var name2 = talkWin.nameWindow2.getContentView();
    
    var letter = message[count].split("");
    var currentChat = letter[0];
    var letterCount = 0;
    var isChatOver = false;

    var screen = talkWin.talkWindow.getContentView();

    screen.setText(currentChat);

    screen.setGravity(Gravity.LEFT);

    screen.setBackgroundDrawable(new Drawable.ColorDrawable(Color.TRANSPARENT));

    screen.setShadowLayer(1 / Math.pow(10, 10), 4, 4, Color.parseColor("#424142"));

    screen.setTextSize(android.util.TypedValue.COMPLEX_UNIT_PX, point[count]);

    screen.setTypeface(android.graphics.Typeface.createFromFile(FONT_PATH));

    if (color[count] != null) {
      screen.setTextColor(color[count]);
    }
    
    var faceFile = blackRoom.getFaceByName(character[count]);

    var face = new Bitmap.createScaledBitmap(
    faceFile, screenWidth / 5, screenHeight / 3, false);

    if (isLeft[count]) {
    	
    	 var matrix = new android.graphics.Matrix();
        matrix.setScale(-1, 1);
        
        face = Bitmap.createBitmap(face, 0, 0, face.getWidth(), face.getHeight(), matrix, false);

      person2.setBackgroundDrawable(new Drawable.ColorDrawable(Color.TRANSPARENT));

      person1.setBackgroundDrawable(new Drawable.BitmapDrawable(face));
      
      name2.setBackgroundDrawable(new Drawable.ColorDrawable(Color.TRANSPARENT));
      
      name2.setText("");
      
      name1.setBackgroundDrawable(new Drawable.ColorDrawable(Color.parseColor("#b0acad"))); 
      
      name1.setText(character[count]); 
            

    } else {

      person1.setBackgroundDrawable(new Drawable.ColorDrawable(Color.TRANSPARENT));

      person2.setBackgroundDrawable(new Drawable.BitmapDrawable(face));
      
      name1.setBackgroundDrawable(new Drawable.ColorDrawable(Color.TRANSPARENT));
      
      name1.setText("");
            
      name2.setBackgroundDrawable(new Drawable.ColorDrawable(Color.parseColor("#b0acad"))); 
      
      name2.setText(character[count]);

    }

    if (doVibrate[count]) {

      blackRoom.vibrate(500);

    }

    var haveClicked = false;

    new java.lang.Thread(new java.lang.Runnable({
      run: function() {

        try {

          while (!haveClicked && !isChatOver && letterCount < letter.length - 1) {

            java.lang.Thread.sleep(50);

            letterCount++;

            currentChat += letter[letterCount];

            CTX.runOnUiThread(new java.lang.Runnable({
              run: function() {

                (!isChatOver) ? screen.setText(currentChat) : screen.setText(message[count]);
              }
            }));

            if (letterCount == letter.length - 1) {

              isChatOver = true;
              haveClicked = true;

            }

          }

        } catch(e) {
          blackRoom.error(e);
        }

      }
    })).start();

    screen.setOnClickListener(new View.OnClickListener({
      onClick: function(viewarg) {
        try {

          isChatOver = true;

          screen.setText(message[count]);
          
          if (!haveClicked) {

            haveClicked = true;
            return;

          }
          
          if (endFunc[count] != null) {

            endFunc[count]();

          }

          count++;

          if (character.length > count) {

            blackRoom.chat(
            talkWin, character, message, point, isLeft, color, doVibrate, endFunc, count);

          } else {

            ModPE.setGameSpeed(20);

            talkWin.talkWindow.dismiss();
            
            talkWin.arrowWindow.dismiss();
            talkWin.nameWindow1.dismiss();
            talkWin.nameWindow2.dismiss();
            talkWin.personWindow1.dismiss();
            talkWin.personWindow2.dismiss();

            isChatOver = false;

          }

        } catch(e) {
          blackRoom.error(e);
        }
      }
    }));

  } catch(e) {

    blackRoom.error(e);
  }

};

function useItem(x, y, z, I, b) {
  try {

    var message = ["안녕 난 스켈레톤이야", "뭐 왜 뭘봐", "Most numbers typed in fail the test immediately, as most are not primes, and there is no problem with the response of the App. Likewise for small prime numbers, such as the eggshell number 77345993. (Why eggshell? Well if that number is typed into a desktop calculator with a Liquid Crystal Display, LCD, and the calculator is turned upside down then it sort of reads EGGSHELL.)\nNow try a really big prime number, a web search will reveal plenty, how about nineteen ones, 1111111111111111111, strangely this is a prime number. Notice that it takes a few seconds for the routine to determine that it is a prime number. If we add tv.setText(“Checking please wait.”) at the beginning of the CheckPrimeClick we get the same problem as our sleep example. The UI update is blocked by the looping code.", "(동공지진)"];

    var cha = ["Skeleton", "Zombie", "Skeleton", "Zombie"];

    var point = [20, 25, 16, 25];

    var doVibrate = [false, false, false, true];

    var isLeft = [true, false, true, false];

    var color = [null, Color.WHITE, Color.YELLOW, Color.BLUE];

    var endFunc = [

    null, null, function() {
      clientMessage("yo");
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

















 	
