/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/***/ (() => {

eval("let msgJson = {};\r\nlet users = [];\r\nconst inputEl = document.getElementById(\"mjson\");\r\nconst formEl = document.getElementById(\"form-json\");\r\nconst moreEl = document.getElementById(\"more_msg\");\r\nconst totalEL = document.getElementById(\"total_msg\");\r\n\r\nlet elements = [];\r\n/* cursed */\r\nfor (let i = 1; i <= 2; i++) {\r\n  elements.push({\r\n    name: document.getElementById(`user${i}_name`),\r\n    tms: document.getElementById(`user${i}_tms`),\r\n    wpm: document.getElementById(`user${i}_wpm`),\r\n  });\r\n}\r\n\r\nformEl.onsubmit = function (e) {\r\n  e.preventDefault();\r\n  getFile();\r\n};\r\n\r\nfunction getFile() {\r\n  const file = inputEl.files[0];\r\n  const reader = new FileReader();\r\n  reader.addEventListener(\"load\", (e) => {\r\n    msgJson = JSON.parse(e.target.result);\r\n    readMessage();\r\n  });\r\n  reader.readAsText(file);\r\n}\r\n\r\nfunction readMessage() {\r\n  // users array\r\n  let currentYear = 1970;\r\n  users = [];\r\n  for (let i = 0; i < 2; i++) {\r\n    users.push({\r\n      info: {\r\n        id: msgJson.id,\r\n        name: msgJson.name,\r\n        stats: {\r\n          tms: 0, // total messages sent\r\n          tw: 0, // total words\r\n          wpm: 0, // words per message\r\n        },\r\n      },\r\n      messagesDate: [],\r\n    });\r\n  }\r\n\r\n  // users[0] id and name are set by default\r\n  // find users[1] id and name\r\n  for (message of msgJson.messages) {\r\n    if (message.type != \"service\") {\r\n      if (message.from_id != users[0].info.id) {\r\n        users[1].info.name = message.from;\r\n        users[1].info.id = message.from_id;\r\n        currentYear = new Date(message.date).getFullYear(); // find year of the first message\r\n        break;\r\n      }\r\n    }\r\n  }\r\n\r\n  let years = [currentYear];\r\n  let mmap = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];\r\n  // iterate through messages\r\n  for (message of msgJson.messages) {\r\n    if (message.type != \"service\") {\r\n      let word = message.text.toString().split(\" \").length;\r\n\r\n      let month = new Date(message.date).getMonth();\r\n      let myear = new Date(message.date).getFullYear();\r\n\r\n      if (myear != currentYear) {\r\n        currentYear = myear;\r\n        mmap.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]); // add new year\r\n        years.push(myear);\r\n      }\r\n      mmap[mmap.length - 1][month]++;\r\n\r\n      for (let i = 0; i < 2; i++) {\r\n        if (message.from_id == users[i].info.id) {\r\n          users[i].info.stats.tms++; // increase total messages counter\r\n          users[i].info.stats.tw += word; // increase total words\r\n          users[i].messagesDate.push(new Date(message.date));\r\n        }\r\n      }\r\n    }\r\n  }\r\n\r\n  setStats();\r\n  makeChart(mmap);\r\n}\r\n\r\nfunction setStats() {\r\n  for (element of elements) {\r\n    let index = elements.indexOf(element);\r\n    users[index].info.stats.wpm =\r\n      users[index].info.stats.tw / users[index].info.stats.tms;\r\n    const { tms, wpm } = users[index].info.stats;\r\n    element.name.innerHTML = users[index].info.name;\r\n    element.tms.innerHTML = tms;\r\n    element.wpm.innerHTML = wpm.toFixed(2);\r\n  }\r\n\r\n  let tms1 = users[0].info.stats.tms;\r\n  let tms2 = users[1].info.stats.tms;\r\n  let n1 = users[0].info.name;\r\n  let n2 = users[1].info.name;\r\n\r\n  moreEl.innerHTML =\r\n    tms1 > tms2\r\n      ? `<strong>${n1}</strong> sent ${tms1 - tms2} more messages than <strong>${n2}</strong>`\r\n      : `<strong>${n2}</strong> sent ${tms2 - tms1} more messages than <strong>${n1}</strong>`;\r\n\r\n  totalEL.innerHTML = `<strong>${tms1 + tms2}</strong> messages in total`;\r\n}\r\n\r\nfunction createYearsLabel(data) {}\n\n//# sourceURL=webpack://tganalyzer/./src/main.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/main.js"]();
/******/ 	
/******/ })()
;