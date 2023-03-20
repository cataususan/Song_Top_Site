[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-c66648af7eb3fe8bc4f294546bfd86ef473780cde1dea487d3c4ff354943c9ae.svg)](https://classroom.github.com/online_ide?assignment_repo_id=10042357&assignment_repo_type=AssignmentRepo)
Music Top: Create an html page which displays a list of songs organized as a music top.

Requirements:

a) Define the following classes and implement the functions to work as mentioned below

Song:
  - public properties: 
    - name (String)
    - artist (String)
  - private properties:
    - entryTopDate (Date) - date the instance was created
    - votes (Number)
  - public functions:
    - vote() - increases the current vote count with 1 vote
    - getVoteCount() - returns the current number of votes
  - magic getters:
    - get entryTopDate() - returns the date the instance was created
MusicTop:
  - private properties:
    - songs (Array of Song)
  - public functions:
    - addSong(song) - adds a new song to the songs array
    - getTop() - returns an array of songs ordered based on their number of votes (songs with the most votes should be first). 
    if 2 songs have the same amount of votes, the ones which were added recently should appear before (on top of) the older ones

b) Create 1 instance of MusicTop called musicTopTest and at least 5 instances of Song. Every time you create a song instance, add it to the musicTopTest instance. Log the top in the console after adding all song instances. 

Simulate increasing the votes count for some songs. Log the top again after messing with the votes. Repeat these steps several times.

c) Create the following classes and implement the functions to work as mentioned below

HtmlSong:
  - extends the Song class above
  - public functions:
    - getHtml() - returns the html code with song info. the info must include:
      - song name
      - artist
      - vote count
      - date it was created (format 'dd/mm/yyyy hh:mm')
      - a button which says 'Vote'

MusicTopHtmlGenerator:
  - static functions:
    - getHtml(musicTop) - returns the entire music top as html code for the Array of HtmlSongs. the generated html code needs to contain the following elements
      - html elements specific for lists
      - each element in the list is a container for a song in the top
      - besides the song info, also include the current possition in the top for each song

d) Create an html page which contains:
  - a form with 2 input text fields (artist and song name - both fields required - you can add other validations as well) and a Submit button.
  - an empty div container in which we will put the generated html code for the top
Create another instance of MusicTop called musicTop
Every time you hit the submit button (make sure the Submit does not refresh the page or you will lose the previous submitted song(s)):
  - create a new HtmlSong instance
  - push/add the song instance to the musicTop instance
  - get the computed top from the new musicTop instance and pass it to MusicTopHtmlGenerator to get the full html code for the top.
  - take the full html top and place it in the empty div container in the page

e) Implement the voting functionality. Each time a Vote button from a specific song is clicked, increase the vote count for that particular song and update the top accordingly.

Notes:
- Only use vanilla/clean javascript and no frameworks
- You can add other private or public properties/functions to the classes mentioned above if you think that's necessary
- You can also create and use other objects and functions besides the instances mentioned above
- Add some CSS styling to the page so it looks cool
