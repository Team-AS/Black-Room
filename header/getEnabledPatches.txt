
blackRoom.getEnabledScripts = function() {
	
var prefs=com.mojang.minecraftpe.MainActivity.currentMainActivity.get().getSharedPreferences("mcpelauncherprefs",0);

var scripts=prefs.getString("enabledScripts","");

return scripts.split(";");

};

blackRoom.getEnabledMods = function() {
	
var prefs=com.mojang.minecraftpe.MainActivity.currentMainActivity.get().getSharedPreferences("mcpelauncherprefs",0);

var scripts=prefs.getString("enabledPatches","");

return scripts.split(";");

};

blackRoom.getEnabledAddons = function() {
	
var prefs=com.mojang.minecraftpe.MainActivity.currentMainActivity.get().getSharedPreferences("mcpelauncherprefs",0);

var scripts=prefs.getString("enabledAddons","");

return scripts.split(";");

};



var scriptName = "BlackRoom.js";

if(blackRoom.getEnabledMods().length > 0 || blackRoom.getEnabledAddons().length > 0 || blackRoom.getEnabledScripts()[0] != scriptName){
	
	 CTX.runOnUiThread(new java.lang.Runnable( {
		run: function(){
			try{    
        var dialog = new android.app.AlertDialog.Builder(CTX);
        dialog.setTitle("<Black Room> 본 스크립트 외 다른 스크립트, 모드, 애드온을 비활성화 시켜야 합니다");	        
		     dialog.setNegativeButton("닫기", null); 
		     dialog.create();
		     dialog.show();
		     
		     } catch(e) {
        blackRoom.error(e);        
      }
      }}));
	
isScriptActivated = false;	
	
} 