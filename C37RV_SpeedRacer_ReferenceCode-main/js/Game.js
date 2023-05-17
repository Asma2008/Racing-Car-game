/*
    ● Game object  should be able to hold the state of the game. It should be able to display formOBJ
     when the game state is 0(WAIT) 
    or the game when the game state is 1(PLAY) or leaderboard when the game state is 2(END).
    ● GAMESTATES: 0 WAIT
              1 START
              2 END
*/
class Game {
  /*   
    writing code to create objects even though the blueprint/CONSTRUCTOR isn't
    defined yet. This is called writing code using abstraction 
  */
  constructor() {
    this.resetTitle = createElement("h2");
    this.resetButton = createButton("");

    this.leaderboardTitle = createElement("h2");
    this.leader1 = createElement("h2");
    this.leader2 = createElement("h2");

    /* The above code is defining three boolean variables: `playerMoving`, `leftKeyActive`, and
    `blast`. These variables are likely used in a game or animation to track the state of certain
    actions or events. 
    The `playerMoving` variable may be used to determine if the player character
    is currently in motion, while `leftKeyActive` may be used to track if the left arrow key is
    currently being pressed. 
    The purpose of the `blast` variable is unclear without additional
    context. */
    this.playerMoving = false;
    this.leftKeyActive = false;
    this.blast = false;
  }

  /*
      function definition to get/read/retrieve existing value of gameState from database
    */

  getState() {
    var gameStateRef = databaseOBJ.ref("GAMESTATE");
    // gameStateRef = https://car-racing-game-54e50-default-rtdb.firebaseio.com/GAMESTATE
    gameStateRef.on("value", function (data) {
      gameState = data.val();
    });
  }
  /*
    function definition to change existing value of gameState to a 
    new one based on the value of paramter passed in the database
  */
  updateState(newValue) {
    // databaseOBJ.ref("/") = https://car-racing-game-54e50-default-rtdb.firebaseio.com/
    databaseOBJ.ref("/").update({
      GAMESTATE: newValue,
    });
  }

  /*
        function defintion to start the GAME i.e. gameState will remain in WAIT(0) state 
        displaying the FORM until all 2 playerOBJs are registered
    */
  start() {
    //as long as gameState is on WAIT
    playerOBJ = new Player(); //generate a new playerOBJ
    playerOBJ.getCount(); //get the number of playerOBJs registered from the database

    formOBJ = new Form(); //create new formOBJ for registration
    formOBJ.display(); //display the generated formOBJ

    //check playercount
    //run a loop to create car sprites
    //this loop will run no. of iterations =  the number of players registered = playerCount
    car1 = createSprite(width / 2 - 50, height - 100);
    car1.addImage("car1", car1IMG);
    car1.scale = 0.07;

    car2 = createSprite(width / 2 + 100, height - 100);
    car2.addImage("car2", car2IMG);
    car2.scale = 0.07;

    //CREATING AN ARRAY FOR TWO CAR SPRITE OBJECTS
    //TO MAKE SURE WE CAN ACCESSS,control and modify values/their properties accordingly
    //the cars array has 2 items, at 0 index = car1, at 1 index = car2
    cars = [car1, car2];

    powerCoinsGroup = new Group();
    // adding coin sprites in the game at random positions
    this.addSprites(powerCoinsGroup, 15, powerCoinIMG, 0.09);

    fuelsGroup = new Group();
    // Adding fuel sprites in the game
    this.addSprites(fuelsGroup, 4, fuelIMG, 0.02);

    obstaclesGroup = new Group();
    //this array contains 12 objects of JSON formOBJat, obstaclesPositions.length = 12
    var obstaclesPositions = [
      { x: width / 2 + 250, y: height - 800, image: obstacle2IMG }, //at index 0
      { x: width / 2 - 180, y: height - 2300, image: obstacle2IMG }, //at index 1
      { x: width / 2 + 180, y: height - 3300, image: obstacle2IMG }, //at index 2
      { x: width / 2 + 250, y: height - 3800, image: obstacle2IMG }, //at index 3
      { x: width / 2 + 250, y: height - 4800, image: obstacle2IMG }, //at index 4
      { x: width / 2, y: height - 2800, image: obstacle2IMG }, //at index 5

      { x: width / 2 - 180, y: height - 3300, image: obstacle1IMG }, //at index 6
      { x: width / 2 - 150, y: height - 1300, image: obstacle1IMG }, //at index 7
      { x: width / 2 + 250, y: height - 1800, image: obstacle1IMG }, //at index 8
      { x: width / 2 - 150, y: height - 4300, image: obstacle1IMG }, //at index 9
      { x: width / 2 - 180, y: height - 5500, image: obstacle1IMG }, //at index 10
      { x: width / 2, y: height - 5300, image: obstacle1IMG }, //at index 11
    ];

    /* function calls to add and create obstacles randomly on the track*/
    this.addSprites(
      obstaclesGroup,
      obstaclesPositions.length,
      obstacle1IMG,
      0.04,
      obstaclesPositions
    );
  }

  //function definition to add sprite object to a group
  // it is added only after the sprite object is created fully
  // and has been applied full modifications such as image, velocity, scale, position, etc
  addSprites(
    spriteGroupInput,
    numberOfSprites,
    spriteImageInput,
    scaleInput,
    positionsArray = []
  ) {
    /* 
In this loop, i variable = 0 and if i is less than the number of sprites in
the group then the game should add another i. 
Everytime the loop repeats it creates a new sprite,
gives it a random x and y, gives it the animation or picture, adjust the scale and then adds it to the
group that we have created. 
The loop function will repeat as long as the given condition is true.
Basically it gives the sprites the properties and makes a new sprite which is part of the group.
*/
    for (var i = 0; i < numberOfSprites; i++) {
      /*
      This command is for the condition that is given in order for the loop to work.
      The loop will only work as long as this condition is true and if it is not true the functions wont
      take place and a new sprite wont be created.
      */
      var newX, newY;
      /* this line is saying that if the length of the positionsArray is more than 0, it will  be true*/
      if (positionsArray.length > 0) {
        /*This command extracts the x pos for the current object from the array to assign its value to xposition for the newly created sprite.*/
        newX = positionsArray[i].x;
        /*This command extracts the x pos for the cuurrent object from the array to assign its value to yposition for the newly created sprite.*/
        newY = positionsArray[i].y;
        /*This command extracts the image preloaded variable  for the current object from the array to assign its value to sprite image for the newly created sprite.*/
        spriteImageInput = positionsArray[i].image;
      } else {
        //if the criteria above in the if statement is not met, this code below will run
        // that means, if no more objects are available in the loop, then generate random values within the given range
        // for x and y positions respectively
        newX = random(width / 2 + 150, width / 2 - 150);
        newY = random(-height * 4.5, height - 400);
      }

      //once, the x and y positions are finalised, new sprite object will be created based off those values
      //the image file passed as part of the objects in the loop will be assigned, otherwise the image variable passed as parameter will be used instead
      var sprite = createSprite(newX, newY);
      sprite.addImage("sprite", spriteImageInput);
      //the scale value passed as 4th parameter will be used here
      sprite.scale = scaleInput;

      //taking the new sprite we just created and adding/storing it into the group parameter.
      spriteGroupInput.add(sprite);
    }
  }

  handleElements() {
    formOBJ.hide();
    formOBJ.titleIMG.position(40, 50);
    formOBJ.titleIMG.class("gameTitleAfterEffect");

    this.resetTitle.html("Reset Game");
    this.resetTitle.class("resetText");
    this.resetTitle.position(width / 2 + 200, 40);

    this.resetButton.class("resetButton");
    this.resetButton.position(width / 2 + 230, 100);

    this.leaderboardTitle.html("Leaderboard");
    this.leaderboardTitle.class("resetText");
    this.leaderboardTitle.position(width / 3 - 60, 40);

    this.leader1.class("leadersText");
    this.leader1.position(width / 3 - 50, 80);

    this.leader2.class("leadersText");
    this.leader2.position(width / 3 - 50, 130);
  }

  /*
  function defintion to activate the gameOBJ to START 1 mode and 
  aligned all playerOBJs to starting positions at the start line
  */
  play() {
    /* The code is calling two methods, `handleElements()` and `handleResetButton()`, on the current
    object (`this`).  */
    this.handleElements();
    this.handleResetButton();

    /* The above code is likely a comment in JavaScript. 
    
   Static functions are those common functions which are called by the
   class themselves rather than by objects of the class. We use the
   'static' keyword before the function to make it a static function.
   function definition to retrieve existing players records: name and distance
   value for all registered players according to the index in the database
   The players data will be stored as JSON - since the firebase database
   structure is of JSON type
   */
    Player.getPlayersInfo();
    playerOBJ.getCarsAtEnd();

    if (allPlayers !== undefined) {
      image(trackIMG, 0, -height * 5, width, height * 6);

      /* The code is calling a function named "showFuelBar" using the "this" keyword. The purpose and
      functionality of the "showFuelBar" function is not provided in the given code snippet. The
      three hash symbols " */
      this.showFuelBar();
      /* The code is calling a function named "showLifeBar" using the "this" keyword, which is likely a
      method of an object or class. The syntax " */
      this.showLifeBar();
      /* The above code is calling a function called "showLeaderboard()" in the current context. The
      purpose and implementation of the function is not provided in the given code snippet. */
      /* The above code is calling a function named "showLeaderboard" on the current object. The
      implementation of the function is not shown in the code snippet. */
      this.showLeaderboard();

      /*
      static function call to retrieve existing playerOBJ records: name and distance 
      value for all registered playerOBJs according to the index in the database  
      */
      Player.getPlayersInfo();

      if (allPlayers !== undefined) {
        background("#c68767");
        //displaying trackimage to cover the entire canvas
        image(trackIMG, 0, -displayHeight * 4, displayWidth, displayHeight * 5);
        //var display_position = 100;

        //index of the array
        var index = 0;
        for (var plr in allPlayers) {
          //add 1 to the index for every loop
          index = index + 1;

          //use data form the database to display the cars in x and y direction
          var x = allPlayers[plr].positionX;
          var y = height - allPlayers[plr].positionY;

          cars[index - 1].position.x = x;
          cars[index - 1].position.y = y;

          if (index === playerOBJ.index) {
            cars[index - 1].shapeColor = "red";
            //assigning camera with the same position with the car
            /* The above code is setting the position of the camera in a 3D scene to the position of a
            car object at a specific index in an array of cars. The x and y coordinates of the car
            object are used to set the x and y coordinates of the camera position. */
            camera.position.x = cars[index - 1].x;
            camera.position.y = cars[index - 1].y;

            //Creating an indicator
            /* The above code is drawing a yellow circle with a diameter of 100 pixels at the
            coordinates (x, y) on the canvas. It is also adding a white stroke with a weight of 4
            pixels around the circle and a black text displaying the value of the variable "index"
            above the circle. */
            fill("yellow");
            stroke("yellow");
            strokeWeight(10);
            ellipse(x, y, 100, 100);
            stroke("white");
            strokeWeight(4);
            fill("black");

            /*  It appears to be written in JavaScript and includes
            a function call to `text()` with three arguments: `index`, `x`, and `y -
            150`. */
            text(index, x, y - 150);

            /* The code is calling four different methods/functions: 
            `handleFuel`, `handlePowerCoins`,`handleCarACollisionWithCarB`, and `handleObstacleCollision`, 
            passing in the `index`
            variable as an argument to each of them. The purpose and implementation of these
            methods/functions are not shown in the given code snippet. */
            this.handleFuel(index);
            this.handlePowerCoins(index);
            this.handleCarACollisionWithCarB(index);
            this.handleObstacleCollision(index);

            // Changing camera position in y direction
            camera.position.y = cars[index - 1].position.y;
          }
        }

        if (this.playerMoving) {
          playerOBJ.positionY += 5;
          playerOBJ.updatePlayerInfo();
        }

        // handling keyboard events
        this.handlePlayerControls();

        // Finshing Line
        const finshLine = height * 6 - 100;

        /* The above code is checking if the Y position of the player object is 
        greater than the position of the finish line.  */
        if (playerOBJ.positionY > finshLine) {
          /* The code is updating the game state to 2, increasing the player's rank by 1, updating the
          number of cars at the end of the race for the player, updating the player's information,
          and displaying the player's rank. */
          gameState = 2;
          playerOBJ.RANK += 1;
          Player.updateCarsAtEnd(playerOBJ.RANK);
          playerOBJ.updatePlayerInfo();
          this.showRank();
        }

        drawSprites();
      }
    }
  }

  handleResetButton() {
    /* The above code is defining a callback function that will be executed when the mousePressed event
    is triggered on the resetButton. The function is resetting the values of the databaseOBJ by
    setting the PLAYERCOUNT, GAMESTATE, PLAYERS, and CARSATEND to their initial values. This code is
    likely part of a larger program that is managing a game or application that uses a database to
    store and retrieve data. */
    this.resetButton.mousePressed(() => {
      databaseOBJ.ref("/").set({
        PLAYERCOUNT: 0,
        GAMESTATE: 0,
        PLAYERS: {},
        CARSATEND: 0,
      });
      /* The above code is reloading the current webpage using the `window.location.reload()` method in
      JavaScript. */
      window.location.reload();
    });
  }

  /**
   * The function displays the player's remaining life as a colored rectangle on top of a white
   * rectangle with a life image next to it.
   */
  showLifeBar() {
    push();
    image(lifeIMG, width / 2 - 130, height - playerOBJ.positionY - 400, 20, 20);
    fill("white");
    rect(width / 2 - 100, height - playerOBJ.positionY - 400, 185, 20);
    fill("#f50057");
    rect(
      width / 2 - 100,
      height - playerOBJ.positionY - 400,
      playerOBJ.life,
      20
    );
    noStroke();
    pop();
  }

  /**
   * This function displays a fuel bar on the screen using images and rectangles.
   */
  showFuelBar() {
    /* 
    The above code is using the p5.js library to display an image of fuel on a canvas. The image is
    being positioned using the width and height of the canvas, as well as the position of the player
    object. 
    The image is being displayed with a width and height of 20 pixels. 
    Additionally, a white rectangle is being drawn behind the fuel bar, and a fuel bar is being drawn using a yellow color. 
    The length of the fuel bar is determined by the "fuel" property of the player object.
    Finally, the code is using the push() and pop() functions to isolate the transformations */
    push();
    /* The above code is using the p5.js library to display an image of fuel (represented by the
    variable fuelIMG) on a canvas. The image is being positioned using the width and height of the
    canvas, as well as the position of the player object (represented by the variable playerOBJ).
    The image is being displayed with a width and height of 20 pixels. */
    image(fuelIMG, width / 2 - 130, height - playerOBJ.positionY - 350, 20, 20);
    fill("white");
    rect(width / 2 - 100, height - playerOBJ.positionY - 350, 185, 20);
    fill("#ffc400");
    rect(
      width / 2 - 100,
      height - playerOBJ.positionY - 350,
      playerOBJ.fuel,
      20
    );
    noStroke();
    pop();
  }

  showLeaderboard() {
    var leader1, leader2;
    /* The above code is creating a variable called `playerOBJs` and assigning it the value of an array
    of all the values of the `allPlayers` object. The `Object.values()` method is used to extract
    all the values of an object and return them as an array. */
    var playerOBJs = Object.values(allPlayers);
    if (
      (playerOBJs[0].RANK === 0 && playerOBJs[1].RANK === 0) ||
      playerOBJs[0].RANK === 1
    ) {
      // &emsp;    This tag is used for displaying four spaces.
      leader1 =
        playerOBJs[0].RANK +
        "&emsp;" +
        playerOBJs[0].NAME +
        "&emsp;" +
        playerOBJs[0].SCORE;

      leader2 =
        playerOBJs[1].RANK +
        "&emsp;" +
        playerOBJs[1].NAME +
        "&emsp;" +
        playerOBJs[1].SCORE;
    }

    if (playerOBJs[1].RANK === 1) {
      leader1 =
        playerOBJs[1].RANK +
        "&emsp;" +
        playerOBJs[1].NAME +
        "&emsp;" +
        playerOBJs[1].SCORE;

      leader2 =
        playerOBJs[0].RANK +
        "&emsp;" +
        playerOBJs[0].NAME +
        "&emsp;" +
        playerOBJs[0].SCORE;
    }

    this.leader1.html(leader1);
    this.leader2.html(leader2);
  }

  /**
   * This function handles player controls for moving up, left, and right in a game, but only if the
   * player has not used a "blast" ability.
   */
  handlePlayerControls() {
    if (!this.blast) {
      /* The above code is checking if the up arrow key is being pressed. If it is, it sets a boolean
      variable "playerMoving" to true, increases the player's Y position by 10, and updates the
      player's information. This code is likely part of a game or interactive application where the
      user controls a player character using arrow keys. */
      if (keyIsDown(UP_ARROW)) {
        this.playerMoving = true;
        playerOBJ.positionY += 10;
        playerOBJ.updatePlayerInfo();
      }

      /* The above code is checking if the left arrow key is being pressed and if the player's position
      is greater than one-third of the width minus 50. If both conditions are true, it updates the
      player's position by subtracting 5 from the X-coordinate and updates the player's information.
      This code is likely part of a game or interactive application where the player can move left
      using the left arrow key. */
      if (keyIsDown(LEFT_ARROW) && playerOBJ.positionX > width / 3 - 50) {
        playerOBJ.positionX -= 5;
        playerOBJ.updupdatePlayerInfoate();
      }

      /* The above code is checking if the right arrow key is being pressed and if the player's
      position on the X-axis is less than half of the canvas width plus 300. If both conditions are
      true, the player's position on the X-axis is increased by 5 and the player's information is
      updated. This code is likely part of a game or interactive application where the player can
      move their character to the right within a certain boundary. */
      if (keyIsDown(RIGHT_ARROW) && playerOBJ.positionX < width / 2 + 300) {
        playerOBJ.positionX += 5;
        playerOBJ.updatePlayerInfo();
      }
    }
  }

  /**
   * This function handles adding fuel to the player's car and reducing the fuel level as the player
   * moves, and triggers a game over state if the fuel level reaches zero.
   * @param index - The index parameter is used to identify which car in the cars array is being handled
   * for fuel. It is subtracted by 1 because arrays are zero-indexed in JavaScript.
   */
  handleFuel(index) {
    // Adding fuel
    /* The above code is using the `overlap` method to check if the `cars` array at the index `index -
   1` is overlapping with any of the elements in the `fuels` array. If there is an overlap, the
   function passed as the second argument will be executed with `collector` representing the car and
   `collected` representing the fuel that was overlapped. */
    cars[index - 1].overlap(fuelsGroup, function (collector, collected) {
      playerOBJ.fuel = 185;
      //collected is the sprite in the group collectibles that triggered the event
      collected.remove();
    });

    // Reducing Player car fuel
    if (playerOBJ.fuel > 0 && this.playerMoving) {
      playerOBJ.fuel -= 10;
    }

    if (playerOBJ.fuel <= 0) {
      gameState = 2;
      this.gameOver();
    }
  }

  /**
   * This function adds 21 points to the player's score and removes a power coin sprite when a car
   * sprite overlaps with it.
   * @param index - The index parameter is an integer that represents the index of the car in the cars
   * array that is currently being checked for overlap with the powerCoins group. The "-1" is used to
   * convert the index to match the zero-based indexing used in arrays.
   */
  handlePowerCoins(index) {
    /* The above code is using the Phaser game engine's `overlap` method to check for collisions
    between the player's car (represented by the `collector` parameter) and power coins (represented
    by the `collected` parameter). When a collision occurs, the `collector` (player's car) will
    collect the `collected` (power coin) and trigger a callback function. */
    cars[index - 1].overlap(powerCoinsGroup, function (collector, collected) {
      playerOBJ.score += 21;
      playerOBJ.updatePlayerInfo();
      //collected is the sprite in the group collectibles that triggered the event
      collected.remove();
    });
  }

  /**
   * The function handles collisions between two cars and updates the player's position and life
   * accordingly.
   * @param index - The index parameter represents the index of the car that has collided with another
   * car. It is used to determine which cars are colliding and to update the player's position and life
   * accordingly.
   */
  handleCarACollisionWithCarB(index) {
    /* The code is checking if the variable `index` is equal to the number 1 using the strict equality
    operator `===`. If `index` is indeed equal to 1, then the code inside the curly braces (`{}`)
    will be executed. However, the code inside the curly braces is not shown and is instead replaced
    with three hash symbols (` */
    if (index === 1) {
      /* The above code is checking if the car at the index position minus one in the "cars" array is
      colliding with the car at index position 1 in the same array.
      
      in this case, 
      if (cars[index - 1].collide(cars[1])) 
      if (cars[ 1    - 1].collide(cars[1]))
      if (cars[    0    ].collide(car2))
      if (car1.collide(car2))  */
      if (cars[index - 1].collide(cars[1])) {
        /* The above code is checking if the left key is active. If it is, it increases the player's
        position on the X-axis by 100. If the left key is not active, it decreases the player's
        position on the X-axis by 100. */
        if (this.leftKeyActive) {
          playerOBJ.positionX += 100;
        } else {
          playerOBJ.positionX -= 100;
        }

        //Reducing Player Life
        /* The above code is checking if the player's life is greater than 0. If it is, then it
        subtracts 185 divided by 4 from the player's life. */
        if (playerOBJ.life > 0) {
          playerOBJ.life -= 185 / 4;
        }
        /*  This method is used to update information about the player in a game or application.*/
        playerOBJ.updatePlayerInfo();
      }
    }
    /* 
    The code is checking if the car at index 2 in the "cars" array is colliding with the first car
    in the same array. 
    If the condition is true, some action will be taken (which is not shown in
    the provided code snippet). */
    if (index === 2) {
      /* The above code is checking if the car at the current index minus one position is colliding
      with the first car in the array called "cars". The result of this check will be a 
      boolean(datatype for TRUEor FALSE)
      value (true or false) which can be used to trigger some action or behavior in the program. 
      
      in this case, 
      if (cars[index - 1].collide(cars[0])) 
      if (cars[ 2    - 1].collide(cars[0]))
      if (cars[    1    ].collide(car1)) 
      if (car2.collide(car1)) 

      */
      if (cars[index - 1].collide(cars[0])) {
        if (this.leftKeyActive) {
          playerOBJ.positionX += 100;
        } else {
          playerOBJ.positionX -= 100;
        }

        //Reducing Player Life
        if (playerOBJ.life > 0) {
          playerOBJ.life -= 185 / 4;
        }
        /* The above code is calling the `updatePlayerInfo()` method on an object named `playerOBJ` in
        JavaScript. This method is likely used to update information about the player in a game or
        application.   */
        playerOBJ.updatePlayerInfo();
      }
    }
  }

  /**
   * This function handles collision between a car and an obstacle, updating the player's position and
   * reducing their life if necessary.
   * @param index - The index parameter is an integer value representing the index of the car in the
   * cars array that collided with the obstaclesGroup.
   */
  handleObstacleCollision(index) {
    /* The code is checking if the car at the previous index in the "cars" array is colliding with any
   obstacles in the "obstaclesGroup". */
    if (cars[index - 1].collide(obstaclesGroup)) {
      /* The above code is checking if the left key is active. If it is, it increases the player's
      position on the X-axis by 100. If the left key is not active, it decreases the player's
      position on the X-axis by 100. */
      if (this.leftKeyActive) {
        playerOBJ.positionX += 100;
      } else {
        playerOBJ.positionX -= 100;
      }

      //Reducing Player Life
      /* The code is subtracting 185 divided by 4 from the "life" property of the "playerOBJ" object,
      as long as the "life" property is greater than 0. */
      if (playerOBJ.life > 0) {
        playerOBJ.life -= 185 / 4;
      }

      /* The above code is calling a method named "updatePlayerInfo()" on an object named "layerOBJ".
      This method is likely used to update information about a player in a game or application. */
      playerOBJ.updatePlayerInfo();
    }
  }

  /**
   * The function displays a congratulatory message with the player's rank and an image of a cup.
   */
  showRank() {
    /* This code is displaying a pop-up message using the SweetAlert library 
    (A BEAUTIFUL, RESPONSIVE, CUSTOMIZABLE, ACCESSIBLE (WAI-ARIA) REPLACEMENT FOR JAVASCRIPT'S POPUP BOXES). 
    The pop-up message contains a title that includes the player's rank, a message indicating that the player has
    successfully reached the finish line, and an image of a cup. The pop-up also includes a
    confirmation button. 
    
    
SweetAlert uses promises to keep track of how the user interacts with the alert. 
If the user clicks the confirm button, the promise resolves to true . 
If the alert is dismissed (by clicking outside of it), the promise resolves to null .

*/
    swal({
      title: `Awesome!${"\n"}Rank${"\n"}${playerOBJ.RANK}`,
      text: "You reached the finish line successfully",
      imageUrl:
        "https://raw.githubusercontent.com/vishalgaddam873/p5-multiplayerOBJ-car-race-game/master/assets/cup.png",
      imageSize: "100x100",
      confirmButtonText: "Ok",
    });
  }

  /**
   * The function displays a pop-up message indicating that the game is over and the player has lost.
   */
  gameOver() {
    /* The above code is displaying a pop-up message using the SweetAlert library.
    (A BEAUTIFUL, RESPONSIVE, CUSTOMIZABLE, ACCESSIBLE (WAI-ARIA) REPLACEMENT FOR JAVASCRIPT'S POPUP BOXES). 
     The message says "Game Over" with the text "Oops you lost the race....!!!" and an image of a thumbs down emoji.
    The pop-up also has a confirm button with the text "Thanks For Playing". 

    
SweetAlert uses promises to keep track of how the user interacts with the alert. 
If the user clicks the confirm button, the promise resolves to true . 
If the alert is dismissed (by clicking outside of it), the promise resolves to null .
    */

    swal({
      title: `Game Over`,
      text: "Oops you lost the race....!!!",
      imageUrl:
        "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
      imageSize: "100x100",
      confirmButtonText: "Thanks For Playing",
    });
  }
}
