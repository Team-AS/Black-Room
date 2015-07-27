function makeToast(text){
  CTX.runOnUiThread(new java.lang.Runnable({
    run: function(){
			 android.widget.Toast.makeText(CTX,text+"", android.widget.Toast.LENGTH_LONG).show();
    }
  }));
}