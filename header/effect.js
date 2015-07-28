
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



