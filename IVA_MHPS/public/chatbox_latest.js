/* Declaration of global variables */
  var contentbox = "";

 var chatText="";
 var speechText="";
 var responseContext="";
 var claimPolicy ="";
 var VEHICLE_REGISTRATION_NO ="";
 var CLIENT_CONTACT_NUMBERS ="";
 var check_policy_flg="";
 var chkExitFlg =0;
 var chkResponseExtFlg = 0;


//Function to validate the policy number //

 function fetchBluemixResponse(chatText,call){
		         
         var data = {};
	     		
// Ajax call to bluemix service to send the text. Response is fetched and is shown in chat box by appeneding in the dialog box as HTML. //
         data.title = chatText;
		 data.responseContext = responseContext;

		 data.responseContext.length =0;

		 console.log('calling with chattext');	
		 console.log(data.responseContext.length);	

 
        $.ajax({
        type: 'POST',
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType:'json',
        url: 'http://localhost:6006/classify',                      
        success: function(data) {
        console.log('success');
	    responseContext = data.context;

		

		var now = new Date(Date.now());
		var formatted1 = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();			
		//var policyNo = "" ;
	
	
//responseContext.unknown_flg = 0 ;
			//chkResponseExtFlg =0;

			if (responseContext.flag == 'fetchdetail')
{
	console.log('variable is : ' ,responseContext.flag);
		
	
			startSpeaking(data.output.text[0]);
        
		$("#timeStamp").append("<div class='direct-chat-msg doted-border'><div class='direct-chat-info clearfix'><span class='direct-chat-name pull-left'><img style='margin-left: -58px;width: 54px;border-radius: 55%;' src='Capture.PNG' alt='User Avatar' class='img-circle' /></span></div><div style='margin-top: -40px' class='direct-chat-text'>" +data.output.text[0]+ "</div><div id='timeStamp' class='direct-chat-info clearfix'><span id='time' class='direct-chat-timestamp pull-right'>" +formatted1+ "</span></div></div>");

$("#timeStamp").append("<div class='direct-chat-msg doted-border'><div class='direct-chat-info clearfix'><span class='direct-chat-name pull-left'><img style='margin-left: -58px;width: 54px;border-radius: 55%;' src='Capture.PNG' alt='User Avatar' class='img-circle' /></span></div><div style='margin-top: -40px' class='direct-chat-text'>" +data.output.text[0]+ "</div><div id='timeStamp' class='direct-chat-info clearfix'><span id='time' class='direct-chat-timestamp pull-right'>" +formatted1+ "</span></div></div>");

		//startSpeaking(abc);
		//startSpeaking(data.output.text[0]);


}

else
{

		console.log('else variable is : ' ,responseContext.flag);
		
	
			//startSpeaking(data.output.text[0]);
        
		$("#timeStamp").append("<div class='direct-chat-msg doted-border'><div class='direct-chat-info clearfix'><span class='direct-chat-name pull-left'><img style='margin-left: -58px;width: 54px;border-radius: 55%;' src='Capture.PNG' alt='User Avatar' class='img-circle' /></span></div><div style='margin-top: -40px' class='direct-chat-text'>" +data.output.text[0]+ "</div><div id='timeStamp' class='direct-chat-info clearfix'><span id='time' class='direct-chat-timestamp pull-right'>" +formatted1+ "</span></div></div>");

		//startSpeaking(abc);
		//startSpeaking(data.output.text[0]);
}
	
		
		
        var d = $('.popup-messages');
        d.scrollTop(d.prop("scrollHeight"));	
	
        


		},
        error: function(error) {
            console.log("some error in fetching the notifications");
         }

    });
         
  }



////function --No change

 function commaSeparateNumber(val){
    while (/(\d+)(\d{1})/.test(val.toString())){
      val = val.toString().replace(/(\d+)(\d{1})/, '$1'+','+'$2');
    }
    return val;
  }




function xyz(text){


var text =text ;
console.log('funcation2 call');
console.log()
 var now = new Date(Date.now());
		  var formatted2 = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();

	  $("#timeStamp").append("<div class='direct-chat-msg doted-border'><div class='direct-chat-text' style='background-color:blanchedalmond'>" +text+ "</div><div id='timeStamp' class='direct-chat-info clearfix'><span id='time' class='direct-chat-timestamp pull-right'>"  +formatted2+ "</span></div></div>");


      var call =0;
	  fetchBluemixResponse(text,call) ;
  

  }


  function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}


// Ready Function // No change is Required

 $(function(){
	  	$("#progress").hide();
		 
     	/* $("#talk").click(function(){
	
		
		
	}); */

		 $('body').on('click', '#speech', function(){
		 startListening(function() {
			 
	      speechText = $("#status_message").val();
		  var now = new Date(Date.now());
		  var formatted1 = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
		  	$("#progress").show();
		  if(speechText.length > 0)
		  {
		   
		  }
		   else{alert("Please speak something");}
		   
		   var d = $('.popup-messages');
          d.scrollTop(d.prop("scrollHeight"));
		  
		  //Function to make ajax call to bluemix service for getting response from BOT//
		     var call = 1;
		     fetchBluemixResponse(speechText,call);
		    
	});
	
}); 


	 

		  $('body').on('click', '#send', function(){
		
		  chatText = $("#status_message").val();
		  $("#status_message").attr("value", "");
		  var now = new Date(Date.now());
		  var formatted1 = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
		  
		  if(chatText.length > 0)
		  {
		  $("#timeStamp").append("<div class='direct-chat-msg doted-border'><div class='direct-chat-text' style='background-color:blanchedalmond'>" +chatText+ "</div><div id='timeStamp' class='direct-chat-info clearfix'><span id='time' class='direct-chat-timestamp pull-right'>" +formatted1+ "</span></div></div>");
				 }
		  else{alert("Please enter some text");}
		  
		  $("#status_message").val("");		 
		  var d = $('.popup-messages');
          d.scrollTop(d.prop("scrollHeight"));
		  
		  //Function to make ajax call to bluemix service for getting response from BOT//
		     var call = 0;
		     fetchBluemixResponse(chatText,call);
	           
	  })

	   $('body').on('keypress', '#status_message', function(e){

  if(e.keyCode == 13 && !e.shiftKey) {
   e.preventDefault();
  chatText = $("#status_message").val();
 
		  $("#status_message").attr("value", "");
		  var now = new Date(Date.now());
		  var formatted1 = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();

		  var buttontext = 'checking button';
		  
		  if(chatText.length > 0)
		  {

           

		  $("#timeStamp").append("<div class='direct-chat-msg doted-border'><div class='direct-chat-text' style='background-color:blanchedalmond'>" +chatText+ "</div><div id='timeStamp' class='direct-chat-info clearfix'><span id='time' class='direct-chat-timestamp pull-right'>" +formatted1+ "</span></div></div>");
		   
	     
		 }
		  else{
			  alert("Please enter some text");
		
	}
		  
		  $("#status_message").val("");		 
		  var d = $('.popup-messages');
          d.scrollTop(d.prop("scrollHeight"));
		  
		  //Function to make ajax call to bluemix service for getting response from BOT//
		     var call = 0;
		     fetchBluemixResponse(chatText,call);
  }
})
	
 // To open chat box on click of claims icon //
	  
	  
		  	$('body').on('click', '#livechat_charms', function(){
				            var today = new Date()
var curHr = today.getHours()
       var greeting ="";
if (curHr < 12) {
  greeting='おはようございます！';
} else if (curHr < 18) {
 
   greeting='こんにちは！';
} else {

  greeting='こんばんは！';
}     


			 startSpeaking(greeting + ",どのようなご用件でしょうか。");
			     
          $('#qnimate').addClass('popup-box-on');

		
		  var text1 = greeting + ', いらっしゃいませ。ご用件を入力してください。<br><button  style="padding: 0px 12px;    margin-bottom: 2%;" class="btn btn-primary" onclick=xyz("' + 'Activities' + '")>Activity</button>' ;
		   var text2 =  text1 + '<br><button style="padding: 0px 12px;    margin-bottom: 2%;" class="btn btn-primary" onclick=xyz("' + 'Schedule' + '")>Schedule</button>' ;
		  
		  $("#greetings").html(text2);
		//   $("#greetings").html(greeting + ", いらっしゃいませ。ご用件を入力してください。");
          contentbox = $('#qnimate').html();
         var now = new Date(Date.now());
         var formatted = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();

		  $("#time").html(formatted);        
        
          var data = {};
	     data.title = "";
		 data.responseContext = responseContext;			
// Ajax call to bluemix service to send the text. Response is fetched and is shown in chat box by appeneding in the dialog box as HTML. //
		console.log('first call');		
        $.ajax({
        type: 'POST',
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType:'json',
        url: 'http://localhost:6006/classify',                      
        success: function(data) {
              responseContext = data.context;
		}
		});




});
	  

		$('body').on('click', '#removeClass', function(){
		
$('#qnimate').removeClass('popup-box-on');

$('#qnimate').html(contentbox);
	$('#qnimate').replaceAll($('#qnimate'));
	responseContext="";
            });

  })