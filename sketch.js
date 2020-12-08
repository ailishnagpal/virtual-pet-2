//Create variables here
var dog, happyDog, database, food, foodStock, dogImage, happyDogImage, foodS
var fedTime, lastFed, foodObj, feed, addFood, Food
function preload() {
  dogImage = loadImage("images/dogImg.png");
  happyDogImage = loadImage("images/happyDogImg.png");
	//load images here
}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);
  
  dog = createSprite(250,300,150,150);
  dog.addImage(dogImage);
  dog.scale = 0.15;

  foodStock = database.ref('food')
  foodStock.on("value", readStock);
  textSize(20);

  feed = createButton("feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("add food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  foodObj = new Food();

}


function draw() {  
background(46,139,87);

foodObj.display();

fedTime = database.ref('FeedTime');
fedTime.on("value", function(data){lastFed = data.val();
})

  text("Food Remaining:" + foodS, 20, 30);
  text("Press Up Arrow To Make The Dog Happy", 20, 60);
  fill(255,255,254);
  textSize(15);

  if(lastFed>=12) {
    text("Last Fed: "+lastFed%12 + " PM", 350, 30);
  } else if(lastFed===0) {
    text("Last Fed: 12 AM", 350, 30);
  } else{
    text("Last Fed: " + lastFed + " AM", 350, 30)
  }
  //add styles here

  drawSprites();

}

function readStock(data) {
foodS=data.val();
}

function writeStock(x) {

  if(x<=0){
    x = 0;
  } else{
    x = x-1;
  }
  database.ref('/').update({
    Food:x
  })
}

function feedDog() {
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function readStock(data) {
  foodS = data.val();
  foodObj.updateFoodStock(foodS)
}
function addFoods() {
  foodS++;
  database.ref('/').update({
    Food: foodS 
  })
}
