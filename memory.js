var cards1 =["berg1.jpg","berg2.jpg","berg3.png","berg4.jpg","berg5.jpg","berg6.jpg","berg7.jpg","berg8.jpg","berg9.jpg","dlazmylki.jpg","wietrek.PNG","szczur.jpg","szczur2.jpg","berg10.jpg"];
var cards=cards1.concat(cards1);
var c= new Array(28);
var secondcard=false;
var firstcard;
var counter=0;
var blocked=false;
var paircounter=14;
var kolejnosc=[];
function randomGenerator(from,to) {
	
	var results = [];
  
  to += 1;
  
	return function random () {
  	if (results.length >= to - from) {
    	throw new Error("zle dobrane");
    }
    
    var random;
    
  	do {
	  	random = Math.floor(Math.random() * (to - from) + from);
    } while (results.indexOf(random) > -1);
    
    results.push(random);
    
    return random;
  };
}

var rand = randomGenerator(0, 27);
for (var i = 0; i <=27; i++) {
	kolejnosc[i]=rand();
	
}



function draw()
{
		var ndiv="";
		
	for(var i=0;i<=27;i++)
{
	ndiv+='<div class="card" id="c'+i+'"></div>';
}
	document.getElementById("board").innerHTML=ndiv;
for(let i=0;i<=27;i++)
{

	$('#c'+i+'').on('click',function(){ revealcard(i) });
}
}
function revealcard(nr)
{
randomGenerator(0,27);

	if($('#c'+nr+'').css("opacity")!=0&&(blocked==false))
	{
		
		if(secondcard==false)
	{
	$('#c'+nr+'').css("background-image",'url(img/'+cards[kolejnosc[nr]]+')');
	$("#c"+nr).css("background-size","125px 125px");
	$('#c'+nr+'').addClass("cardA");
	$('#c'+nr+'').removeClass("card");
		$(".cardA").css("cursor","default");

	secondcard=true;
	firstcard=nr;
	}
	else if((secondcard==true)&&(firstcard!=nr))
	{
		$('#c'+nr+'').css("background-image",'url(img/'+cards[kolejnosc[nr]]+')');
		$("#c"+nr).css("background-size","125px 125px");
		$('#c'+nr+'').addClass("cardA");
	    $('#c'+nr+'').removeClass("card");
			$(".cardA").css("cursor","default");
		
		blocked=true;
		
	$(".card").css("cursor","default");

	

	
	setTimeout(function(){reversecards(firstcard,nr)},1000);
	
	counter++;
	$("#score").html('<p>Tura:'+counter+'</p>');
	secondcard=false;

		if(cards[kolejnosc[firstcard]]==cards[kolejnosc[nr]])
		{
			setTimeout(function(){hidecards(firstcard,nr)},1000);
			
		}
	
	}
	
	

}
	

}
function reversecards(nr1,nr2)
{
	$('#c'+nr1+'').css("background-image",'url(img/karta.png)');
	$('#c'+nr1+'').addClass("card");
	$('#c'+nr1+'').removeClass("cardA");
	
	$('#c'+nr2+'').css("background-image",'url(img/karta.png)');
	$('#c'+nr2+'').addClass("card");
	$('#c'+nr2+'').removeClass("cardA");
$(".card").css("cursor","pointer");
			blocked=false;
			
			
}
function hidecards(nr1,nr2)
{
		$('#c'+nr1+'').addClass("cardH");
	$('#c'+nr1+'').removeClass("card");
	
	$('#c'+nr2+'').addClass("cardH");
	$('#c'+nr2+'').removeClass("card");



	blocked=false;
$(".card").css("cursor","pointer");
$(".cardH").css("cursor","default");
paircounter--;
if(paircounter==0)
{
	$("#board").html('<h2>Wygrałeś.Zajęło ci to '+counter+' tur.</h2><span id="reset" onclick="location.reload()">JESZCZE RAZ</span>');
    $("#score").html("");
}
}
window.onload=draw;