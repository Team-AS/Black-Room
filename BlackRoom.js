/**

Black Room script

Copyright (c) Duduzzing 
All rights deserved

*/

var SDCARD = android.os.Environment.getExternalStorageDirectory();

var CTX = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();

var PECTX = CTX.createPackageContext("com.mojang.minecraftpe", android.content.Context.CONTEXT_IGNORE_SECURITY);

var screenWidth = CTX.getWindowManager().getDefaultDisplay().getWidth();

var screenHeight = CTX.getWindowManager().getDefaultDisplay().getHeight();

var FONT_PATH = SDCARD + "/Duduzzing/Survival-Kit/minecraft.ttf";

var Bitmap = android.graphics.Bitmap;

var BitmapFactory = android.graphics.BitmapFactory;

var Button = android.widget.Button;

var Color = android.graphics.Color;

var Drawable = android.graphics.drawable;

var EditText = android.widget.EditText;

var Gravity = android.view.Gravity;

var GridLayout = android.widget.GridLayout;

var LinearLayout = android.widget.LinearLayout;

var PopupWindow = android.widget.PopupWindow;

var Space = android.widget.Space;

var TextView = android.widget.TextView;

var View = android.view.View;

var gui = {};

/**
thk affogatoman

return drawable
*/

gui.ninepatch = function(file) {
  var br = new java.io.BufferedInputStream(new java.io.FileInputStream(new java.io.File(SDCARD, file)));

  return new Drawable.NinePatchDrawable.createFromStream(br, null);

};

var blackRoom = {};

/**
String name
-the character's name

return bitmap
*/

blackRoom.getFaceByName = function(name) {

  return BitmapFactory.decodeFile(SDCARD + "/Download/몹/" + name + ".png");

};

/**
Show the error in clientMessage
use in try-catch
*/

blackRoom.error = function(e) {

  clientMessage(ChatColor.RED + "<error> " + e + "\nline : " + e.lineNumber);

};

/**

int milliSec
-set how long will it vibrate in millisecond

*/

blackRoom.vibrate = function(milliSec) {

  CTX.runOnUiThread(new java.lang.Runnable({
    run: function() {
      try {
        CTX.getSystemService(android.content.Context.VIBRATOR_SERVICE).vibrate(milliSec);

      } catch(e) {
        blackRoom.error(e);
      }

    }
  }));

};

/**

Prepare PopupWindow for chat

return PopupWindow

*/

blackRoom.prepareChat = function() {

  ModPE.setGameSpeed(10);

  var talkLayout = new LinearLayout(CTX);

  var talkWindow = new PopupWindow(screenWidth, screenHeight / 3);

  talkWindow.setContentView(talkLayout);

  talkWindow.setBackgroundDrawable(gui.ninepatch("/Download/talking.9.png"));

  talkWindow.showAtLocation(CTX.getWindow().getDecorView(), Gravity.CENTER | Gravity.BOTTOM, 0, 0);

  return talkWindow;

}

/**

the Chatting function

Character[] character
-defines which character is speaking

Sring[] message
-the talking

Int[] point
-font size

Bool[] doVibrate
-true = virate when talk

Bool[] isLeft
-true = face is on the left side

function[] endFunc
-function that execute when the talking is done

int count
-the index for each arries
-put 0 when it's beginning of chat

*/

blackRoom.chat = function(talkWin, character, message, point, isLeft, color, doVibrate, endFunc, count) {

  try {

    var letter = message[count].split("");
    var currentChat = letter[0];
    var letterCount = 0;
    var isChatOver = false;

    var talkLayout = talkWin.getContentView();

    talkLayout.removeAllViews();

    ModPE.setGameSpeed(10);

    var screen = new Button(CTX);

    screen.setText(currentChat);

    screen.setGravity(Gravity.LEFT);

    screen.setBackgroundDrawable(new Drawable.ColorDrawable(Color.RED
    /*TRANSPARENT*/

    ));

    screen.setShadowLayer(1 / Math.pow(10, 10), 4, 4, Color.parseColor("#424142"));

    screen.setTextSize(android.util.TypedValue.COMPLEX_UNIT_PX, point[count]);

    screen.setTypeface(android.graphics.Typeface.createFromFile(FONT_PATH));

    if (color[count] != null) {
      screen.setTextColor(color[count]);
    }

    var params = new LinearLayout.LayoutParams(talkWin.getWidth() * (3 / 4), talkWin.getHeight());

    screen.setLayoutParams(params);

    var face = new Button(CTX);

    var faceFile = blackRoom.getFaceByName(character[count]);

    var bit = new Bitmap.createScaledBitmap(
    faceFile, screenWidth / 5, screenHeight / 4, false);

    face.setBackgroundDrawable(new Drawable.BitmapDrawable(bit));

    var params2 = new LinearLayout.LayoutParams(talkWin.getWidth() / 4, talkWin.getHeight());

    face.setLayoutParams(params2);

    if (isLeft[count]) {

      talkLayout.addView(face);
      talkLayout.addView(screen);

    } else {

      talkLayout.addView(screen);
      talkLayout.addView(face);

    }

    if (doVibrate[count]) {

      blackRoom.vibrate(500);

    }

    //어... 다른 쓰레드에서 셋 텍스트하면 오류가... 

    new java.lang.Thread(new java.lang.Runnable({
      run: function() {

        try {

          while (isChatOver == false && letterCount < letter.length - 1) {

            java.lang.Thread.sleep(50);

            letterCount++;

            currentChat += letter[letterCount];

            CTX.runOnUiThread(new java.lang.Runnable({
              run: function() {

                screen.setText(currentChat);
              }
            }));

            if (letterCount == letter.length - 1) {

              isChatOver = true;

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

          if (endFunc[count] != null) {

            endFunc[count]();

          }

          count++;

          if (character.length > count) {

            blackRoom.chat(
            talkWin, character, message, point, isLeft, color, doVibrate, endFunc, count);

          } else {

            ModPE.setGameSpeed(20);

            talkWin.dismiss();

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

    var message = ["안녕 난 스티브야", "뭐 왜 뭘봐", "Most numbers typed in fail the test immediately, as most are not primes, and there is no problem with the response of the App. Likewise for small prime numbers, such as the eggshell number 77345993. (Why eggshell? Well if that number is typed into a desktop calculator with a Liquid Crystal Display, LCD, and the calculator is turned upside down then it sort of reads EGGSHELL.)\nNow try a really big prime number, a web search will reveal plenty, how about nineteen ones, 1111111111111111111, strangely this is a prime number. Notice that it takes a few seconds for the routine to determine that it is a prime number. If we add tv.setText(“Checking please wait.”) at the beginning of the CheckPrimeClick we get the same problem as our sleep example. The UI update is blocked by the looping code.", "(동공지진)"];

    var cha = ["steve", "Slime", "steve", "Slime"];

    var point = [20, 25, 10, 25];

    var doVibrate = [false, false, false, true];

    var isLeft = [true, false, true, false];

    var color = [Color.BLACK, Color.WHITE, Color.YELLOW, Color.BLUE];

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






















