# Beyond Vision

## Steps to run the project:

( In order to run this project on your local environment, you need to have node and npm installed )

- git clone the repository
- open the project on your system
- run "npm i yarn"
- run "yarn install"
- let the dependencies install
- run "yarn start"

## Steps to work on the project:

### Landing Page

We can navigate to CodeSense, quiz or game page via the navbar. We can also click on the give command button which starts voice recognition and accepts commands: give quiz, play game, open codesense.

### CodeSense

![image](https://github.com/poojasharma097/CodeSense/blob/master/screenshots/BV-Codesense.png)

- We can select linear search or binary search or documentation to understand the algorithm.
- We can click on "start voice recognition". It starts listening to our voice and accepts commands like:
  - Linear search
  - Binary search
  - Read
- In linear search and binary search, the user can click on the "generate array" button to generate a new array.
- The user can enter the number that he/she wants to search.
- The user can click on the "explanation" button to listen to the simple explanation of the algorithm.

![image](https://github.com/poojasharma097/CodeSense/blob/master/screenshots/BV-LinearSearchResult.png)

![image](https://github.com/poojasharma097/CodeSense/blob/master/screenshots/BV-BinarySearchResult.png)

### Quiz page

![image](https://github.com/poojasharma097/CodeSense/blob/master/screenshots/BV-Quiz.png)

- We can select options and move to the next and previous questions via the buttons provided down below.
- We can click on "start voice recognition". It starts listening to our voice and accepts commands like:
  - read question
  - read options
  - next question
  - previous question
  - read option 1
  - read option 2
  - read option 3
  - read option 4
  - select option 1
  - select option 2
  - select option 3
  - select option 4
  - read selected option
  - reset
  - play game

### Game/Tic Tac Toe Page

![image](https://github.com/poojasharma097/CodeSense/blob/master/screenshots/BV-Game.png)

- We can start playing by clicking on the boxes.
- The system will automatically read out which player's turn it is.
- When the game detects a win/tie, a message is popped up as such
  ![image](https://github.com/poojasharma097/CodeSense/blob/master/screenshots/BV-GameResult.png)
- We can reset the board by clicking the button.
- We can also play this game using voice recognition by clicking on the start game button.
- The list of commands recognized by the application are as follows:
  - top left / 1
  - top center/ 2
  - top right / 3
  - left / 4
  - center / 5
  - right / 6
  - bottom left / 7
  - bottom center/ 8
  - bottom right / 9
  - reset
  - give quiz
