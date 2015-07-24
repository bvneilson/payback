var slideimages = new Array() // create new array to preload images
slideimages[0] = "images/Bluefaced_Leicester.jpg" // set image object src property to an image's src, preloading that image in the process
slideimages[1] = "images/alpacas.jpg"
slideimages[2] = "images/churrosheep.jpg"
slideimages[3] = "images/bamboo.jpg" 
slideimages[4] = "images/camel.jpg"
slideimages[5] = "images/cashgorakid.jpg"
slideimages[6] = "images/cashmere-goat.jpg" 
slideimages[7] = "images/coir-short-fibre-02.jpg"
slideimages[8] = "images/cormo_sheep.jpg"
slideimages[9] = "images/cotswoldsheep.jpg" 
slideimages[10] = "images/cotton.jpg"
slideimages[11] = "images/flax-yellow-wave.jpg"
slideimages[12] = "images/guanaco.jpg"
slideimages[13] = "images/jacobsheep.jpg"
slideimages[14] = "images/jute-plant.jpg"
slideimages[15] = "images/kapok.jpg" 
slideimages[16] = "images/lincolnsheep.jpg"
slideimages[17] = "images/long-hair-cat.jpg"
slideimages[18] = "images/merino.jpg" 
slideimages[19] = "images/mohairgoat.jpg"
slideimages[20] = "images/mongolia-cashmere-goats.jpg"
slideimages[21] = "images/pacovicuna.jpg" 
slideimages[22] = "images/Polyamide-Nylon.jpg"
slideimages[23] = "images/pygoragoat.jpg"
slideimages[24] = "images/qiviut.jpg"
slideimages[25] = "images/rambouillet.jpg" 
slideimages[26] = "images/ream-of-white-paper.jpg"
slideimages[27] = "images/samoyed.jpg"
slideimages[28] = "images/Silkworm__cocoon.jpg" 
slideimages[29] = "images/White_Satin_Angora_Rabbit.jpg"

var captions = new Array();
captions[0] = "Blue faced leicester sheep"
captions[1] = "Alpacas"
captions[2] = "Churro Sheep"
captions[3] = "Bamboo fibers"
captions[4] = "Camel"
captions[5] = "Cashgora goat"
captions[6] = "Cashmere goat"
captions[7] = "Coir coconut fiber"
captions[8] = "Cormo Sheep"
captions[9] = "Cotswold sheep"
captions[10] = "Cotton"
captions[11] = "Flax fibers"
captions[12] = "Guanaco"
captions[13] = "Jacob sheep"
captions[14] = "Jute"
captions[15] = "Kapok"
captions[16] = "Lincoln sheep"
captions[17] = "Cat hair"
captions[18] = "Merino sheep"
captions[19] = "Mohair goat"
captions[20] = "Mongolian cashmere goat"
captions[21] = "Paco vicuna"
captions[22] = "Polyamide nylon"
captions[23] = "Pygora goat"
captions[24] = "Qiviut"
captions[25] = "Rambouillet sheep"
captions[26] = "Paper"
captions[27] = "Dog hair"
captions[28] = "Silk"
captions[29] = "Angora rabbit"

//variable that will increment through the images
var step = 0

function slideit(){
 //if browser does not support the image object, exit.
	if (!document.images){
		return
	}
//this is where the image and caption get swapped
	var capt = document.getElementById("caption");
	capt.innerHTML = captions[step];
	var img = document.getElementById('slide');
	img.src = slideimages[step];
	if (step<slideimages.length - 1) {
		step++
	} else {
		step=0
	}
 //call function "slideit()" every 3 seconds
	setTimeout("slideit()",3000)		
}
slideit()
