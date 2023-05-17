/*
  ●  Form should contain the inputBox box and a button to log in.
  ●  When the button is pressed, the player's name should be registered in the 
  database and a new player should be created.


The body of an HTML page can contain several different types of elements-
- h1, h2, h3, h4, h5, h6: display headings of different scales.
- inputBox: to collect inputBox from the user. INPUT BOX
- button: to display a button. and perform update on click.
This model of an HTML page is called Document object Model (or DOM).
We will be using the p5 Dom library to create the formObj.
*/

/*
-> databaseReference.on() creates a listener which keeps listening to the
gameState from the database. When the gameState is changed in
the database, the function passed as an argument to it is executed.
Note: Here the function is directly written inside the .on() listener.
-> databaseReference.update() will update the database reference.
Here "/" refers to the main database inside which gameState is created.
writing code to create objects even though the blueprint/ CLASS isn't
defined yet. This is called writing code using abstraction
*/
class Form {
  /**
   * This is a constructor function that creates input box, play button, title image, and greeting
   * message for a game.
   */
  constructor() {
    this.inputBox = createInput("").attribute("placeholder", "Enter your name");
    this.playButton = createButton("PLAY");
    this.titleIMG = createImg("./assets/title.png", "game title");
    this.greetingMSG = createElement("h2"); //heading2 - slightly large text
  }

  /**
   * The function sets the position of various elements on a web page.
   */
  setElementsPosition() {
    this.inputBox.position(width / 2 - 110, height / 2 - 80);
    this.playButton.position(width / 2 - 90, height / 2 - 20);
    this.titleIMG.position(120, 50);
    this.greetingMSG.position(width / 2 - 300, height / 2 - 100);
  }

  /**
   * The function sets the style of certain elements in a web page using CSS classes.
   */
  setElementsStyle() {
    this.inputBox.class("customInput");
    this.playButton.class("customButton");
    this.titleIMG.class("gameTitle");
    this.greetingMSG.class("greeting");
  }

  /**
   * The function hides the greeting message, play button, and input box.
   */
  hide() {
    this.greetingMSG.hide();
    this.playButton.hide();
    this.inputBox.hide();
  }

  /*
      play.mousePressed() will update fields in database as follows:
        --playerCount by 1 each time play button is clicked.
        --playerOBJ records with 
          INDEX with the sequence of the play button is clicked
          NAME  with the added input as name 
          DISTANCE as 0(ZERO) at the start of the program
          POSNX 
          POSNY
          score
          fuel
          rank
          coins

        button.mousePressed() can be used to trigger an action when a mouse button is pressed. 
        It expects a function as an argument. 
        we are passing argument as The code to display a greeting message and 
        update the database when button is pressed.
    
        Arrow functions bind the function to the original object which calls it.
        Here mousePressed is called inside the handleMousePressed function which is called by
        the formObj object. 
         
        ()=> Arrow function ensures that 'this' remains bound to the formObj object.
    */
  handleMousePressed() {
    this.playButton.mousePressed(() => {
      //hide input box and playbutton
      this.inputBox.hide();
      this.playButton.hide();
      //generate greeting message
      var message = `Hello ${this.inputBox.value()}</br>wait for another player to join...`;
      //display greeting message
      this.greetingMSG.html(message);

      //while the player is waiting
      //increase the variable playercount by 1
      //if through db playercount = 0, now it will be 1,
      //if through db playercount = 1, now it will be 2,
      playerCount += 1; //this is variable, have not updated it in db yet

      //update the variable playerOBJ with the given name
      playerOBJ.name = this.inputBox.value();
      //update the variable playerOBJ with the given index
      playerOBJ.index = playerCount;

      //once we have all the details, connect to database
      // PLAYERS/PLAYER1 or PLAYERS/PLAYER2
      //depends on playerOBJ.index value
      //and update all the records in db accordingly
      playerOBJ.addPlayer();

      /*
        function call to change existing value of playerCount to a new one based on the value 
        of paramter passed in the database
      */
      playerOBJ.updateCount(playerCount);
    });
  }

  /**
   * The function displays elements, sets their position and style, and handles mouse presses.
   */
  display() {
    this.setElementsPosition();
    this.setElementsStyle();
    this.handleMousePressed();
  }
}
