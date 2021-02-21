let msgJson = {};
let users = [];
const inputEl = document.getElementById("mjson");
const formEl = document.getElementById("form-json");
const moreEl = document.getElementById("more_msg");
const totalEL = document.getElementById("total_msg");

let elements = [];
/* cursed */
for (let i = 1; i <= 2; i++) {
  elements.push({
    name: document.getElementById(`user${i}_name`),
    tms: document.getElementById(`user${i}_tms`),
    wpm: document.getElementById(`user${i}_wpm`),
  });
}

formEl.onsubmit = function (e) {
  e.preventDefault();
  getFile();
};

function getFile() {
  const file = inputEl.files[0];
  const reader = new FileReader();
  reader.addEventListener("load", (e) => {
    msgJson = JSON.parse(e.target.result);
    readMessage();
  });
  reader.readAsText(file);
}

function readMessage() {
  // users array
  let currentYear = 1970;
  users = [];
  for (let i = 0; i < 2; i++) {
    users.push({
      info: {
        id: msgJson.id,
        name: msgJson.name,
        stats: {
          tms: 0, // total messages sent
          tw: 0, // total words
          wpm: 0, // words per message
        },
      },
      messagesDate: [],
    });
  }

  // users[0] id and name are set by default
  // find users[1] id and name
  for (message of msgJson.messages) {
    if (message.type != "service") {
      if (message.from_id != users[0].info.id) {
        users[1].info.name = message.from;
        users[1].info.id = message.from_id;
        currentYear = new Date(message.date).getFullYear(); // find year of the first message
        break;
      }
    }
  }

  let years = [currentYear];
  let mmap = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
  // iterate through messages
  for (message of msgJson.messages) {
    if (message.type != "service") {
      let word = message.text.toString().split(" ").length;

      let month = new Date(message.date).getMonth();
      let myear = new Date(message.date).getFullYear();

      if (myear != currentYear) {
        currentYear = myear;
        mmap.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]); // add new year
        years.push(myear);
      }
      mmap[mmap.length - 1][month]++;

      for (let i = 0; i < 2; i++) {
        if (message.from_id == users[i].info.id) {
          users[i].info.stats.tms++; // increase total messages counter
          users[i].info.stats.tw += word; // increase total words
          users[i].messagesDate.push(new Date(message.date));
        }
      }
    }
  }

  setStats();
  makeChart(mmap);
}

function setStats() {
  for (element of elements) {
    let index = elements.indexOf(element);
    users[index].info.stats.wpm =
      users[index].info.stats.tw / users[index].info.stats.tms;
    const { tms, wpm } = users[index].info.stats;
    element.name.innerHTML = users[index].info.name;
    element.tms.innerHTML = tms;
    element.wpm.innerHTML = wpm.toFixed(2);
  }

  let tms1 = users[0].info.stats.tms;
  let tms2 = users[1].info.stats.tms;
  let n1 = users[0].info.name;
  let n2 = users[1].info.name;

  moreEl.innerHTML =
    tms1 > tms2
      ? `<strong>${n1}</strong> sent ${tms1 - tms2} more messages than <strong>${n2}</strong>`
      : `<strong>${n2}</strong> sent ${tms2 - tms1} more messages than <strong>${n1}</strong>`;

  totalEL.innerHTML = `<strong>${tms1 + tms2}</strong> messages in total`;
}

function createYearsLabel(data) {}