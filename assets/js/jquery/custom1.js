






var RoomAddBool = true;
var maxroom = 3;
var roomID = 2;
var dropDownOpened = false;
$(document).ready(function () {
	 $(document).on('click', '#select_room', function (e) {
		 e.preventDefault();
		$('.user-details').toggle();
		dropDownOpened = true;
		});
	 $(document).on( "click", ".custombtn", function(e) {
 e.preventDefault();
        var rmid = 0;
       dropDownOpened = true;
        $(".user-details").find(".user_data").each(function () {
            num = parseInt(this.id.substring(7, 8));
            if (num > rmid) {
                rmid = num;
            }
        });
        if (rmid < maxroom) {
            //Addroom(rmid + 1);
            var rmindx = parseInt(rmid) + 1;
            if (RoomAddBool == true) {
                RoomAddBool = false;
			var room = "<div id='divRoom" + rmindx + "' class='oneroom form-row user_data hidedone'>" + 
										  "<div class='roomrow'>"+
										  "<div class='celroe col-xs-5'>"+
                                                "<h6 class='roomnum'>Room " + rmindx + "</h5>"+
												"</div>"+
												" <div class='celroe col-xs-7' id='rmroom'>"+
                                        "<a href='#' class='custombtn1'>Remove</a>"+
                                           "</div>"+
                                            "</div>"+
											"<hr style='margin-top: 0px;margin-bottom: 0px;'>"+
                                                "<div class='roomrow'>"+
                                                "<div class='celroe col-xs-5' >Adults<br>"+
                                                   " <span class='agemns'>Over 18 years old</span></div>"+
                                               " <div class='celroe col-xs-7'>"+
                                               "<div class='quantity'> " +
                                                    
													 "<input id='room" + rmindx + "AdultMinus' class='quantity__minus adult_minus' type='button' value='-' >" +
                                                   " <input  type='text' class=' quantity__input adult_input' value='1' data-val='true' data-val-number='The field NoOfAdults must be a number.' data-val-required='The NoOfAdults field is required.' id='room" + rmindx + "Adult' name='roomsNoOfAdults[]' >" +
                                                    
													"<input id='room" + rmindx + "AdultPlus' class='quantity__plus adult_plus' type='button' value='+' >" +
                                               " </div>"+
                                           " </div>"+
										   "</div>"+
										 	"<hr style='margin-top: 0px;margin-bottom: 0px;'>"+
											 "<div class='roomrow'>"+
                                               " <div class='celroe col-xs-5' >Children<br>"+
                                                    "<span class='agemns' >Up to 18 years old</span></div>"+
                                                "<div class='celroe col-xs-7'>"+
                                           
                                              "<div class='quantity'>"+
                                                    "<input id='room" + rmindx + "AdultMinus' class='quantity__minus children_minus' type='button' value='-' >"+
                                                    "<input  type='text' class=' quantity__input children_input' data-val='true' data-val-number='The field NoOfChildren must be a number.' data-val-required='The NoOfChildren field is required.' id='room" + rmindx + "Child' name='roomsNoOfChildren[]' type='text' value='0' >"+
                                                  " <input id='room" + rmindx + "AdultPlus' class='quantity__plus children_plus' type='button' value='+' >"+
                                                "</div>"+
                                            "</div>"+
											"</div>"+
                                            
										 "<div class='roomrow' >"+
                                                "<div id='divroom" + rmindx + "ChildAges1' class='row'  style='margin-left: 0;display:none;width:100%; '>"+
                                         " <span id='rchild" + rmindx + "' ></span>"+
                                            "</div>"+
                                            "</div>"+
										"</div>";
										

                                        
                
                var htmlObject = $.parseHTML(room);
                $("#divRoom" + rmid).after(htmlObject);
                roomID++;
                RoomAddBool = true;

            }
            calculatePerson();
        }
         if (rmid == (maxroom)) {
            
            // $("#rmroom").addClass("hide");
			 $(this).unbind("click");
         }
         else {
             
             $("#rmroom").removeClass("hide");
         }
		
		
	
    });

    

    //----remove room
    
         $(document).on('click', '.custombtn1', function (e) {
			  e.preventDefault();
        var rmid = 0;
        
        $(".user-details").find(".user_data").each(function () {
            num = parseInt(this.id.substring(7, 8));
            if (num > rmid) {
                rmid = num;
            }
        });
           
            if (rmid > 1) {
            $("#divRoom" + rmid).remove();
			
            calculatePerson();
        }
		
		if (rmid == 2) {
            $("#rmroom").addClass("hide");
        }
          if (rmid == maxroom) {
			  
            $("#rmroom").removeClass("hide");
        }
    });
        
         
   
	

    //---room Adult plus
    $(document).on('click', '.adult_minus', function () {
        var Id = $(this).attr('id');
		
        var rmid = Id.substring(4, 5);
       
        var roomAdultminus = $('#room' + rmid + 'Adult').val();
          if(roomAdultminus > 1 ){
            $('#room' + rmid + 'Adult').val(parseInt(roomAdultminus) - 1);
		  }
       		  else{
			  alert("Atleast 1 Adult must be present");	
		  }								   
        calculatePerson();
    });

    //---room Adult Minus
    $(document).on('click', '.adult_plus', function () {
		
        var Id = $(this).attr('id');
		
        var rmid = Id.substring(4, 5);
		
       
        var roomAdultplus = $('#room' + rmid + 'Adult').val();
		
		var roomChildplus = $('#room' + rmid + 'Child').val();								
          if(roomAdultplus < 4 ){
			if((parseInt(roomAdultplus)+parseInt(roomChildplus))<4 && (parseInt(roomAdultplus))<4)
			{
				
               $('#room' + rmid + 'Adult').val(parseInt(roomAdultplus) + 1);
			}
			else
			{
			   alert("More than 4 person not allowed");	
			}	
		  }
        calculatePerson();
    });
	 $(document).on('click', '.children_plus', function () {
        var Id = $(this).attr('id');
        var rmid = Id.substring(4, 5);
        var tchild = parseInt($('#room' + rmid + 'Child').val());
        var name = $('#room' + rmid + 'Child').attr('name');
        var type = name.substring(0, 4);
		 var roomAdultplus = $('#room' + rmid + 'Adult').val();
        var roomChildplus = $('#room' + rmid + 'Child').val();
         if(roomChildplus < maxroom ){
			if((parseInt(roomAdultplus)+parseInt(roomChildplus))<4)
			{ 
				
              $('#room' + rmid + 'Child').val(parseInt(roomChildplus) + 1);
			   if (tchild < 3) {
            var totalchildren = parseInt(tchild) + 1;
          
            $('#room' + rmid + 'Child').val(totalchildren);

            $('#divroom' + rmid + 'ChildAges1').show();
            $('#divroom' + rmid + 'ChildAges1').css('display','inline-flex');
			 $('#divroom' + rmid + 'ChildAges1').css('padding','0px 0px 10px 10px');
            if (type == 'room') {
                var rnameid = parseInt(rmid) - 1;
				 
                var cage = "<div id='divRoom" + rmid + "Child" + totalchildren + "Age' style='width:33%;'><label style='color: #000;font-size: 10px;'> Age of Child " + totalchildren + "  </label>"+
				 "<select id='room" + rmid + "Child" + totalchildren + "Age' name='roomsNoOfchildarenages[" + rnameid + "][]' class='custom-select' style='border: 1px solid #298eefe3;width: 90%;height: 30px;'>"+
				  " <option> 0</option>"+
                  " <option> 1</option>"+
                  "<option> 2</option>"+
                   "<option> 3</option>"+
				    "<option> 4</option>"+
                  "<option> 5</option>"+
                   "<option> 6</option>"+
				    "<option> 7</option>"+
                  "<option> 8</option>"+
                   "<option> 9</option>"+
				    "<option> 10</option>"+
                  "<option> 11</option>"+
                  " <option> 12</option>"+
                    "</select>"+
"</div>";																
				
				"<div class='quantity '>"+
				"<input id='room" + rmid + "Child" + totalchildren + "AgeMinus' class='quantity__minus childAgeMinus' type='button' value='-' style='color:#ffffff;'>" +
                      "<input  type='text' class='rmiddle valid quantity__input ' value='0' data-val='true' data-val-number='The field NoOfAdults must be a number.' data-val-required='The NoOfAdults field is required.' id='room" + rmid + "Child" + totalchildren + "Age' name='roomsNoOfchildarenages[" + rnameid + "][]' >" +  
                         "<input id='room" + rmid + "Child" + totalchildren + "AgePlus' class='quantity__plus childAgePlus' type='button' value='+' style='color:#ffffff;'>"+
						 "</div>"+
						 "</span></div>";
                var htmlObject = $.parseHTML(cage);
                if (totalchildren == 1) {
                    $("#rchild" + rmid).after(htmlObject);

                }
                else {

                    var pdiv = '#divRoom' + rmid + 'Child' + tchild + 'Age';
                    $(pdiv).after(htmlObject);
                }
                
            }
           

            calculatePerson();
        }
		}
			else
			{
			   alert("More than 4 person not allowed");	
			  
			}
	 
		 }
		 
       
    });
 $(document).on('click', '.children_minus', function () {
       var Id = $(this).attr('id');
        var rmid = Id.substring(4, 5);
        var totalchildren = $('#room' + rmid + 'Child').val();
        if (parseInt(totalchildren) >= 1) {
            $('#room' + rmid + 'Child').val(parseInt(totalchildren) - 1);
            $('#divRoom' + rmid + 'Child' + totalchildren + 'Age').remove();
            calculatePerson();
            if (parseInt(totalchildren) == 1) {
                $('#divroom' + rmid + 'ChildAges1').hide();
            }
        }
        else {
            $('#' + id).addClass('disableButton');
        }
    });
    //---room Adult Minus
   $(document).on('click', '.childAgePlus', function () {
        var Id = $(this).attr('id');
        var rmid = Id.substring(4, 5);
        var chid = Id.substring(10, 11);
        var roomChilds = $('#room' + rmid + 'Child' + chid + 'Age').val();
        if (roomChilds < 12) {
            $('#room' + rmid + 'Child' + chid + 'Age').val(parseInt(roomChilds) + 1);
        }
      calculatePerson();
        
    });
 $(document).on('click', '.childAgeMinus', function () {

        var Id = $(this).attr('id');
        var rmid = Id.substring(4, 5);
        var chid = Id.substring(10, 11);
        var roomChilds = $('#room' + rmid + 'Child' + chid + 'Age').val();
         if (roomChilds > 0) {
            $('#room' + rmid + 'Child' + chid + 'Age').val(parseInt(roomChilds) - 1);
        }
       calculatePerson();
    });
	
   $(document).on('click', '.done1', function (e) {
	    e.preventDefault();
        $('.user-details').hide();
        
    });
	 $(document).mouseup(function (e) { 
            var container = $('.posrel');
			
            if (dropDownOpened) {
                if ( !container.is(e.target) && container.has(e.target).length === 0 ) {
                     $('.psngrpopover').hide();
                }
            }

        });

// $( ".roomdone" ).click(function() {
	// $('.hidedone').hide();
     // $('.checkout').hide();
  // $( ".custombtn" ).bind( "click");
// });   
	function calculatePerson() {
    var  person = 0;
	//var child= 0;
    var trooms = $(".user_data").length;
    for (var i = 1; i <= trooms; i++) {
		//adult = parseInt(adult) + parseInt($("#room" + i + "Adult").val());
		//child = parseInt(child) + parseInt($("#room" + i + "Child").val());
        person = parseInt(person) + parseInt($("#room" + i + "Adult").val()) + parseInt($("#room" + i + "Child").val());
		
    }
	    var countroom = parseInt(trooms);
var _selectText = parseInt(trooms) + ' Room '  + parseInt(person) + ' Persons '  ;
    
    $("#select_room").val(_selectText);
	    $("#countroom").val(countroom);

    //var rom = _selectText.split(" ").slice(0, 2).join(" ");
    //$("#roomsss").html(rom);
}

   
});



 

