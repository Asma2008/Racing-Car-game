/*
    ● A new player object should be created every time a new user logs in. It should contain all the information
    about the player - name, position in the game etc. 
    
    ● For now it can just have the name property. It
    should also be able to read and write player
    -> databaseReference.on() creates a listener which keeps listening to the
    gameState from the database. When the gameState is changed in
    the database, the function passed as an argument to it is executed.
  
    Note: Here the function is directly written inside the .on() listener.
  
    -> databaseReference.update() will update the database reference.
    Here "/" refers to the main database inside which gameState is created.
  
    writing code to create objects even though the blueprint/ CLASS isn't
    defined yet. This is called writing code using abstraction.
*/

class Player {
  /**
   * This is a constructor function that initializes various properties for a game character.
   */
  constructor() {
    this.name = null;
    this.index = null;
    this.positionX = 0;
    this.positionY = 0;
    this.rank = 0;
    this.fuel = 185;
    this.life = 185;
    this.score = 0;
  }

  /*
function definition to add new player object in DB with its
default properties and associated values
*/
  addPlayer() {
    //if this.index = 1, playerIndex = PLAYERS/PLAYER1
    //if this.index = 2, playerIndex = PLAYERS/PLAYER2
    var playerIndex = "PLAYERS/PLAYER" + this.index;

    if (this.index === 1) {
      this.positionX = width / 2 - 100;
    } else {
      this.positionX = width / 2 + 100;
    }

    // IF INDEX = 1, ADDRESS = https://car-racing-game-54e50-default-rtdb.firebaseio.com/PLAYERS/PLAYER1
    // IF INDEX = 1, ADDRESS = https://car-racing-game-54e50-default-rtdb.firebaseio.com/PLAYERS/PLAYER2
    databaseOBJ.ref(playerIndex).set({
      NAME: this.name,
      POSNX: this.positionX,
      POSNY: this.positionY,
      RANK: this.rank,
      FUEL: this.fuel,
      LIFE: this.life,
      SCORE: this.score,
    });
  }

  /*
function defintion to access the value of
distance for each player base on the index
*/
  getDistance() {
    var playerDistanceRef = databaseOBJ.ref("PLAYERS/PLAYER" + this.index);
    playerDistanceRef.on("value", (data) => {
      var data = data.val();
      this.positionX = data.POSNX;
      this.positionY = data.POSNY;
    });
  }

  /*
function defintion to access the value of
PLAYERCOUNT from DB
*/
  getCount() {
    var playerCountRef = databaseOBJ.ref("PLAYERCOUNT");
    playerCountRef.on("value", (data) => {
      playerCount = data.val();
    });
  }

  /*
function defintion to update the value of
PLAYERCOUNT from DB
*/
  updateCount(newCountInput) {
    // databaseOBJ.ref("/") = https://car-racing-game-54e50-default-rtdb.firebaseio.com/
    databaseOBJ.ref("/").update({
      PLAYERCOUNT: newCountInput,
    });
  }

  /*
function defintion to access the value of CARSATEND from DB
*/
  getCarsAtEnd() {
    var carsAtEndRef = databaseOBJ.ref("CARSATEND");
    carsAtEndRef.on("value", (data) => {
      carsAtFinish = data.val();
    });
  }

  /*
function defintion to update the value of CARSATEND from DB
*/
  static updateCarsAtEnd(newCountInput) {
    databaseOBJ.ref("/").update({
      CARSATEND: newCountInput,
    });
  }

  /*
function definition to update info for any player based on the index
*/
  updatePlayerInfo() {
    var playerIndex = "PLAYERS/PLAYER" + this.index;
    databaseOBJ.ref(playerIndex).update({
      POSNX: this.positionX,
      POSNY: this.positionY,
      RANK: this.rank,
      FUEL: this.fuel,
      SCORE: this.score,
      LIFE: this.life,
    });
  }

  /*
   Static functions are those common functions which are called by the
   class themselves rather than by objects of the class. We use the
   'static' keyword before the function to make it a static function.
   function definition to retrieve existing players records: name and distance
   value for all registered players according to the index in the database
   The players data will be stored as JSON - since the firebase database
   structure is of JSON type


    JSON = javaScript object notation = way of organising and storing data
    ex:-
      key : value pair
      property: value
      label: value
      {
        firstname: uttara
        lastname: sahastrabuddhe
        age: 29
        interests: motorsport
        height: 5.2
        weight: 60
      }
      
  */
  static getPlayersInfo() {
    var playerInfoRef = databaseOBJ.ref("PLAYERS");
    playerInfoRef.on("value", (data) => {
      allPlayers = data.val();
    });
  }

  /**
   * The function retrieves the number of cars that have reached the end of a race from a Firebase
   * database.
   */
  getCarsAtEnd() {
    databaseOBJ.ref("CARSATEND").on("value", data => {
      this.rank = data.val();
    });
  }

  /**
   * The function updates the number of cars that have reached the end of the race in a Firebase
   * database.
   * @param rank - The "rank" parameter is a variable that represents the final position of a car in a
   * race. It is used in the function to update the "CARSATEND" value in the database with the final
   * rank of the car.
   */
  static updateCarsAtEnd(rank) {
    database.ref("/").update({
      CARSATEND: rank
    });
  }
}