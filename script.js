let numberOfObjects = 0;
let generateId = Math.random().toString(26).slice(2);
let songEditId = 0;
class Song {
  id;
  name;
  artist;
  //date instance was created
  #entryTopDate;
  #votes = 0;
  constructor(id, name, artist, entryTopDate) {
    this.id = id;
    this.name = name;
    this.artist = artist;
    this.#entryTopDate = entryTopDate;
  }
  vote() {
    this.#votes++;
  }
  getVoteCount() {
    return this.#votes;
  }
  setVoteCount(votes) {
    this.#votes = votes;
  }
  get entryTopDate() {
    return this.#entryTopDate;
  }
}
class MusicTop {
  #Songs = [];
  addSong(Song) {
    this.#Songs.push(Song);
  }
  getTop() {
    this.#Songs.sort((a, b) => {
      if (b.getVoteCount() !== a.getVoteCount()) {
        return b.getVoteCount() - a.getVoteCount();
      }
      return b.entryTopDate - a.entryTopDate;
    });
    return this.#Songs;
  }
}

class HtmlSong extends Song {
  getHtml() {
    return `<p id="songParagraph"><span>${this.name} ${this.artist} ${this.entryTopDate}</span>
      <span><button id="${this.id}">EDIT</button><button id="${this.id}">DELETE</button>
      <button id="${this.name}">VOTE</button></span></p>`;
  }
}

class MusicTopHtmlGenerator {
  static getHtml(MusicTop) {
    let container = document.getElementById("topContainer");
    let listaSterge = document.getElementById("topList");
    if (listaSterge.hasChildNodes()) {
      let elements = listaSterge.getElementsByTagName("LI");
      while (elements.length > 0) {
        listaSterge.removeChild(elements[0]);
      }
    }
    MusicTop.getTop().forEach((element) => {
      let list = document.getElementById("topList");
      let li = document.createElement("LI");
      li.innerHTML =
        element.name +
        " " +
        element.artist +
        "VOTES: " +
        element.getVoteCount() +
        "    " +
        element.entryTopDate;
      li.id = "songTop";
      list.appendChild(li);
    });
  }
}
//creating the music top instance
let musicTopTest = new MusicTop();

//creating the 5 song instances
let song = new Song(
  "Flowers",
  "Miley Cyrus",
  new Date().toLocaleString("default", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
);
let song1 = new Song(
  "Kill Bill",
  "SZA",
  new Date().toLocaleString("default", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
);
let song2 = new Song(
  "Love Again",
  "The Kid LAROI",
  new Date().toLocaleString("default", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
);
let song3 = new Song(
  "Escapism",
  "RAYE",
  new Date().toLocaleString("default", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
);
let song4 = new Song(
  "Creepin",
  "Metro Boomin",
  new Date().toLocaleString("default", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
);

//adding the songs to the music top
musicTopTest.addSong(song);
musicTopTest.addSong(song1);
musicTopTest.addSong(song2);
musicTopTest.addSong(song3);
musicTopTest.addSong(song4);

//logging the music top
musicTopTest.getTop();
console.log(song1.getVoteCount());

//modifying the vote counts
song3.vote();
song3.vote();
song1.vote();
song1.vote();
song2.vote();

musicTopTest.getTop();

//modifying the votes again
song4.vote();
song4.vote();
song4.vote();
song4.vote();
song2.vote();
song2.vote();

musicTopTest.getTop();

//Adding some songs to the real top so that the site doesnt look blank when opened
let musicTop = new MusicTop();
//fetching the data from db.json
const getSongs = () => {
  fetch("http://localhost:3000/songs")
    .then((response) => response.json())
    .then((data) =>
      data.map((jsonSong) => {
        let songJ = new HtmlSong(
          jsonSong.id,
          jsonSong.name,
          jsonSong.artist,
          new Date().toLocaleString("default", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })
        );
        songJ.setVoteCount(jsonSong.votes);
        musicTop.addSong(songJ);
        addSongHtml(songJ);
        MusicTopHtmlGenerator.getHtml(musicTop);
      })
    );
};
const searchSongs = (searchParam) => {
  let listaSterge = document.getElementById("topList");
  if (listaSterge.hasChildNodes()) {
    let elements = listaSterge.getElementsByTagName("LI");
    while (elements.length > 0) {
      listaSterge.removeChild(elements[0]);
    }
  }
  fetch("http://localhost:3000/songs")
    .then((response) => response.json())
    .then((data) =>
      data.map((jsonSong) => {
        let songJ = new HtmlSong(
          jsonSong.id,
          jsonSong.name,
          jsonSong.artist,
          new Date().toLocaleString("default", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })
        );
        songJ.setVoteCount(jsonSong.votes);
        if (songJ.name == searchParam || songJ.artist == searchParam) {
          let list = document.getElementById("topList");
          let li = document.createElement("LI");
          li.innerHTML =
            songJ.name +
            " " +
            songJ.artist +
            "VOTES: " +
            songJ.getVoteCount() +
            "    " +
            songJ.entryTopDate;
          li.id = "songTop";
          list.appendChild(li);
        }
      })
    );
};
getSongs();
function addSongHtml(Song) {
  let songHtml = Song.getHtml();
  let container = document.getElementById("songContainer");
  let div = document.createElement("div");
  div.innerHTML = songHtml;
  container.appendChild(div);
}
MusicTopHtmlGenerator.getHtml(musicTop);

//making a form variable to listen for the submit event
let form = document.getElementById("submitSong");
form.addEventListener("submit", function (event) {
  event.preventDefault();
  //taking the song and putting it into the musicTop
  let songName = document.getElementById("nameInput").value;
  let artistName = document.getElementById("artistInput").value;
  let songAdd = new HtmlSong(
    generateId,
    songName,
    artistName,
    new Date().toLocaleString("default", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  );
  musicTop.addSong(songAdd);
  addSongHtml(songAdd);
  MusicTopHtmlGenerator.getHtml(musicTop);
  let jsonDict = {
    id: songAdd.id,
    name: songAdd.name,
    artist: songAdd.artist,
    votes: songAdd.getVoteCount(),
  };
  //calling the function that adds the song into the json.db
  postSong(jsonDict);
});

let formSearch = document.getElementById("submitSearch");
formSearch.addEventListener("submit", function (event) {
  event.preventDefault();
  let songSearch = document.getElementById("songSearch").value;
  searchSongs(songSearch);
});
let formRefresh = document.getElementById("refreshSongs");
formRefresh.addEventListener("submit", function (event) {
  event.preventDefault();
  MusicTopHtmlGenerator.getHtml(musicTop);
});
//creating an element to listent for any vote button click
let ancestorElement = document.querySelector("body");
ancestorElement.addEventListener("click", function (event) {
  //when the click happens we identify the button clicked
  if (event.target.matches("button")) {
    let buttonId = event.target.getAttribute("id");
    let buttonInnerText = event.target.innerText;
    if (buttonInnerText == "VOTE") {
      //we search in the music top for the song voted
      musicTop.getTop().forEach((element) => {
        if (element.name == buttonId) {
          //we give the vote to the song
          element.vote();
          MusicTopHtmlGenerator.getHtml(musicTop);
          //patching the song with the new vote
          let jsonDict = {
            id: element.id,
            name: element.name,
            artist: element.artist,
            votes: element.getVoteCount(),
          };
          patchSong(jsonDict);
        }
      });
    } else if (buttonInnerText == "DELETE") {
      musicTop.getTop().forEach((element) => {
        if (element.id == buttonId) {
          deleteSong(element);
        }
      });
    } else {
      let editForm = document.getElementById("songEditor");
      let editorName = document.getElementById("editSongName");
      let editorArtist = document.getElementById("editSongArtist");
      editForm.style.display = "block";
      musicTop.getTop().forEach((element) => {
        if (element.id == buttonId) {
          songEditId = element.id;
          editorName.value = element.name;
          editorArtist.value = element.artist;
        }
      });
    }
  }
});

let songEdit = document.getElementById("songEditor");
songEdit.addEventListener("submit", function (event) {
  event.preventDefault();
  musicTop.getTop().forEach((element) => {
    if (songEditId == element.id) {
      let editorArtist = document.getElementById("editSongArtist");
      let editorName = document.getElementById("editSongName");
      let modifiedName = editorName.value;
      let modifiedArtist = editorArtist.value;
      let jsonDict = {
        id: element.id,
        name: modifiedName,
        artist: modifiedArtist,
        votes: element.getVoteCount(),
      };
      patchSong(jsonDict);
    }
  });
});
let cancelForm = document.getElementById("cancelForm");
cancelForm.addEventListener("click", function (event) {
  editForm.style.display = "none";
});

const postSong = (song) => {
  fetch("http://localhost:3000/songs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(song), // body data type must match "Content-Type" header
  })
    .then((response) => response.json())
    .then((resp) => {
      console.log(`${resp.name} by ${resp.artist} added.`, resp);
    });
};
const deleteSong = (song) => {
  fetch(`http://localHost:3000/songs/${song.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(song),
  })
    .then((response) => response.json())
    .then((resp) => {
      console.log(`${resp.name} by ${resp.artist} added.`, resp);
    });
};

const patchSong = (song) => {
  fetch(`http://localHost:3000/songs/${song.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(song),
  })
    .then((res) => res.json())
    .then((json) => console.log(json));
};
