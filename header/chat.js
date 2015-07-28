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

    throw new Error("No face image exists in: " + path);

  }

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

  var personWindow1 = new PopupWindow(imageView1, dp(260), dp(350) );
  personWindow1.setBackgroundDrawable(new Drawable.ColorDrawable(Color.TRANSPARENT));

  personWindow1.showAtLocation(CTX.getWindow().getDecorView(), Gravity.LEFT | Gravity.CENTER, 0, -(dp(60)));

  var imageView2 = new ImageView(CTX);

  var personWindow2 = new PopupWindow(imageView2, dp(260), dp(350));
  personWindow2.setBackgroundDrawable(new Drawable.ColorDrawable(Color.TRANSPARENT));

  personWindow2.showAtLocation(CTX.getWindow().getDecorView(), Gravity.RIGHT | Gravity.CENTER, 0, -(dp(60)));
  
  var nWid = dp(200);
  var nHei = dp(60);

  var name1 = new Button(CTX);
  
  name1.setTextSize(android.util.TypedValue.COMPLEX_UNIT_PX,20);
  
  name1.setTextColor(Color.BLACK);

  name1.setBackgroundDrawable(new Drawable.ColorDrawable(Color.TRANSPARENT));
  
  var nameWindow1 = new PopupWindow(name1, nWid, nHei);
  
  nameWindow1.setBackgroundDrawable(new Drawable.ColorDrawable(Color.TRANSPARENT));
  
  nameWindow1.showAtLocation(CTX.getWindow().getDecorView(), Gravity.LEFT | Gravity.CENTER, 0, dp(70));

  var name2 = new Button(CTX);
  
  name2.setTextSize(android.util.TypedValue.COMPLEX_UNIT_PX,20)
  
  name2.setTextColor(Color.BLACK);

  name2.setBackgroundDrawable(new Drawable.ColorDrawable(Color.TRANSPARENT));
    
  var nameWindow2 = new PopupWindow(name2, nWid, nHei);
  
  nameWindow2.setBackgroundDrawable(new Drawable.ColorDrawable(Color.TRANSPARENT));
  
  nameWindow2.showAtLocation(CTX.getWindow().getDecorView(), Gravity.RIGHT | Gravity.CENTER, 0, dp(70));

  var screen = new Button(CTX);
  
  screen.setBackgroundDrawable(new Drawable.ColorDrawable(Color.TRANSPARENT));




  var talkWindow = new PopupWindow(screen,screenWidth, screenHeight / 3);

  talkWindow.setBackgroundDrawable( ninepatch("/Team-AS/Black-Room/talking.9.png"));

  talkWindow.showAtLocation(CTX.getWindow().getDecorView(), Gravity.CENTER | Gravity.BOTTOM, 0, 0);

  
  var arrowBitmap = new Bitmap.createScaledBitmap( new Bitmap.createBitmap(spritesheet,38,11,8,4), 32, 14, false);
  
 var b  = new Button(CTX);

 b.setBackgroundDrawable(new Drawable.BitmapDrawable(arrowBitmap));


  var arrowWindow = new PopupWindow(b,32,14);

  arrowWindow.showAtLocation(CTX.getWindow().getDecorView(), Gravity.BOTTOM | Gravity.RIGHT, dp(20), dp(12));


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
    faceFile, dp(250), dp(350), false);

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
      onClick: function(view) {
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

talkWin.personWindow1.dismiss();
talkWin.personWindow2.dismiss();
talkWin.nameWindow1.dismiss();
talkWin.nameWindow2.dismiss();
talkWin.talkWindow.dismiss();            
talkWin.arrowWindow.dismiss();            

            

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




