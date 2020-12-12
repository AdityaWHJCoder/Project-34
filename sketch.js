//Create variables here
var dog, happyDog, dogImage;
var databas
var foodS, foodStock;

function preload()
{
  //load images here
  happyDog = loadImage('images/dogImg1.png');
  dogImage = loadImage('images/dogImg.png');
}

function setup() {
  createCanvas(500, 500);
  
  database = firebase.database();

  dog = createSprite(250, 300, 10, 10);
  dog.addImage(dogImage);
  dog.scale = 0.2;

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
}


function draw() {  
  background(46, 139, 87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    if(foodS !== 0){
      dog.addImage(happyDog);
    }
  
  }

  drawSprites();
  //add styles here
  textSize(15);
  fill("white")
  text("Note: Press UP_ARROW Key To Feed Your Pet Milk!", 75, 30);

  text("Food Remaining: " + foodS, 190, 400);

}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x <= 0){
    x = 0;
  } else {
    x = x - 1;
  }


  database.ref().set({
    Food : x
  })
}

