// let isPopupVisible = false;

// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//   if (request.action === "togglePopup") {
//     isPopupVisible = !isPopupVisible;
//     togglePopup();
//   }
// });

// function togglePopup() {
//   const popupDiv = document.getElementById("note-container");

//   if (!popupDiv) {
//     createPopup();
//   } else {
//     popupDiv.style.display = isPopupVisible ? "block" : "none";
//   }
// }

// function createPopup() {
//   const popupDiv = document.createElement("div");
//   popupDiv.id = "note-container";
//   popupDiv.innerHTML = `
//     <textarea id="note"></textarea>
//     <button id="save-button">Lưu Ghi Chú</button>
//   `;

//   document.body.appendChild(popupDiv);

//   const noteTextarea = document.getElementById("note");
//   const saveButton = document.getElementById("save-button");

//   chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//     const currentTab = tabs[0];
//     const tabUrl = currentTab.url;

//     noteTextarea.value = 'Ghi chú cho trang web: ' + tabUrl;
//   });

//   saveButton.addEventListener("click", function () {
//     const noteText = noteTextarea.value;
//     alert('Ghi chú đã được lưu!');
//   });
// }

// document.addEventListener('selectionchange', function () {
//     var selection = window.getSelection();

//     if (selection.rangeCount > 0) {
//       var selectedRange = selection.getRangeAt(0);
//       var selectedText = selectedRange.toString();
//       console.log(selectedText);
//       // Tìm vị trí của selectedText trong nội dung đầy đủ
//       // var fullText = document.getElementById('paragraph').innerText;
//       // var index = fullText.indexOf(selectedText, selectedRange.startOffset);

//       // if (index !== -1) {
//       //   // Chia nội dung thành ba phần
//       //   var part1 = fullText.substring(0, index);
//       //   var part2 = selectedText;
//       //   var part3 = fullText.substring(index + selectedText.length);
//       //   var spanTag = document.createElement('span');
//       //     spanTag.innerText = part2;

//       //     // Thay thế nội dung đầy đủ bằng phần 1 + spanTag.outerHTML + phần 3
//       //     var paragraph = document.getElementById('paragraph');
//       //     paragraph.innerHTML = part1 + spanTag.outerHTML + part3;
//       //   }
//       }
//     });
// const highlightIcon = document.querySelector('.highlight-icon');
// import axios from "axios";
// try {
//   const response = await axios.get('https://64ad35b7b470006a5ec58b33.mockapi.io/api/users/users')
//     .then(res => {
//       console.log(res);
//     })
//     .catch(err => {
//       console.log(err);
//     });
//   console.log(response);
// } catch (error) {
//   console.error(error);
// }

chrome.runtime.sendMessage(
    {
      action: "callApi",
      url: "https://64ad35b7b470006a5ec58b33.mockapi.io/api/users/users",
    },
    function (response) {
      console.log(response);
    }
  );
  
  let isHightLight = false;
  let spanIdCounter = 1;
  let lastSpanId;
  var newDiv = document.createElement("div");
  newDiv.className = "highlight-icon";
  document.body.appendChild(newDiv);
  
  const highlightIcon = document.querySelector(".highlight-icon");
  
  var newDivChild = document.createElement("div");
  newDivChild.className = "additional-info";
  newDivChild.type = "color";
  newDivChild.id = "colorPicker";
  
  var colors = [
    "#ff5959", //red
    "#5983ff", //blue
    "#59ff72", //green
    "#ffba59", //orange
    "#c559ff", //pruple
    "#ff59f7", //pink
    "#fff959", //yellow
    "white",
  ];
  for (var i = 1; i <= 8; i++) {
    // Create a new div element
    var divChild = document.createElement("div");
  
    // Optional: Add a class for styling (e.g., "square")
    divChild.classList.add("square");
    divChild.style.backgroundColor = colors[i - 1];
  
    // Set the content or style for the new div if needed
    // divChild.textContent = "Square " + i;
  
    if (i != 8) {
      divChild.addEventListener("click", function (event) {
        let selection = JSON.parse(sessionStorage.getItem("item"));
        if (selection && selection.toString().length > 0) {
          const savedRangeInfo = sessionStorage.getItem("range");
          const rangeInfo = JSON.parse(savedRangeInfo);
          const range = document.createRange();
          const startContainer = getNodeByPath(rangeInfo.startContainer);
          const endContainer = getNodeByPath(rangeInfo.endContainer);
          range.setStart(startContainer, rangeInfo.startOffset);
          range.setEnd(endContainer, rangeInfo.endOffset);
  
          const span = document.createElement("text-highlight");
          // const range = selection.getRangeAt(0);
          const textHighLight = selection.toString();
          let spanId = `highlighted-text-${spanIdCounter}`;
          span.id = spanId;
          span.appendChild(document.createTextNode(textHighLight));
          range.deleteContents();
          range.insertNode(span);
          lastSpanId = spanId;
          spanIdCounter++;
          isHightLight = false;
  
          // Get the background color of the clicked div
          var clickedColor = event.target.style.backgroundColor;
          const highlightedSpan = document.getElementById(lastSpanId);
          highlightedSpan.style.backgroundColor = clickedColor;
          highlightedSpan.style.cursor = "pointer";
  
          // if(true){
          const rect = range.getBoundingClientRect();
          var event1 = document.getElementById(spanId);
          event1.addEventListener("click", () => {
            sessionStorage.setItem("test", spanId.toString());
            console.log("value: " + event1.innerText);
            var newDiv1 = document.createElement("div");
            newDiv1.className = "highlight-focus";
            for (var i = 1; i <= 3; i++) {
              var divChild = document.createElement("div");
              divChild.classList.add("edit-square");
              if (i == 1) {
                divChild.textContent = "💾";
                divChild.style.paddingRight = "10px";
                divChild.addEventListener("click", function (event) {});
              } else if (i == 2) {
                divChild.textContent = "✏️";
                divChild.addEventListener("click", function (event) {
                  var a = document.querySelector(".additional-info");
                  a.style.display = "block";
                  // Get the background color of the clicked div
                  // var clickedColor = event.target.style.backgroundColor;
                  // const highlightedSpan = document.getElementById(lastSpanId);
                  // highlightedSpan.style.backgroundColor = clickedColor;
                  // highlightedSpan.style.cursor = 'pointer';
                  // }
                });
              }
              // Append the new div to the parent div
              newDiv1.appendChild(divChild);
            }
  
            document.body.appendChild(newDiv1);
  
            const highlightFocus = document.querySelector(".highlight-focus");
            highlightFocus.style.display = "block";
            highlightFocus.style.top = rect.top + window.scrollY - 35 + "px";
            highlightFocus.style.left = rect.right + window.scrollX - 150 + "px";
  
            highlightFocus.appendChild(newDivChild);
          });
  
          sessionStorage.clear();
        } else {
          var clickedColor = event.target.style.backgroundColor;
          const highlightedSpan = document.getElementById(
            sessionStorage.getItem("test")
          );
          highlightedSpan.style.backgroundColor = clickedColor;
          highlightedSpan.style.cursor = "pointer";
        }
        // }
      });
    } else {
      let colorPicker = document.createElement("div");
      colorPicker.classList.add("gg-add");
      divChild.appendChild(colorPicker);
      divChild.addEventListener("click", function (event) {
        // Get the background color of the clicked div
        const colorPicker = document.getElementById("colorPicker");
        colorPicker.addEventListener("input", function () {
          const highlightedSpan = document.getElementById(lastSpanId);
  
          if (highlightedSpan) {
            highlightedSpan.style.backgroundColor = colorPicker.value;
          }
        });
      });
    }
    // Append the new div to the parent div
    newDivChild.appendChild(divChild);
    // Add a line break after every 3 squares to create rows
    if (i % 3 === 0) {
      newDivChild.appendChild(document.createElement("br"));
    }
  }
  
  highlightIcon.appendChild(newDivChild);
  
  document.addEventListener("selectionchange", function () {
    // let a = document.querySelector(".additional-info");
    // if(a)
    //   a.style.display = "none";
    // let highlightFocus = document.querySelector(".highlight-focus");
    // if(highlightFocus)
    //   highlightFocus.style.display = "none";
    // highlightIcon.style.display = "none";
  });
  function getNodePath(node) {
    const path = [];
    while (node.parentNode) {
      const index = Array.from(node.parentNode.childNodes).indexOf(node);
      path.unshift(index);
      node = node.parentNode;
    }
    return path;
  }
  
  // Utility function to get a node by its path
  function getNodeByPath(path) {
    let node = document;
    for (const index of path) {
      node = node.childNodes[index];
      if (!node) break;
    }
    return node;
  }
  
  document.addEventListener("mouseup", function () {
    let selection = window.getSelection();
    if (selection.toString().length > 0) {
      // Get range selected
      const range = selection.getRangeAt(0);
      const rangeInfo = {
        startContainer: getNodePath(range.startContainer),
        startOffset: range.startOffset,
        endContainer: getNodePath(range.endContainer),
        endOffset: range.endOffset,
      };
  
      sessionStorage.setItem("range", JSON.stringify(rangeInfo));
      sessionStorage.setItem("item", JSON.stringify(selection.toString()));
      const rect = range.getBoundingClientRect();
      //
      if (highlightIcon == null) {
        var newDiv = document.createElement("div");
        newDiv.className = "highlight-icon";
        document.body.appendChild(newDiv);
      }
  
      highlightIcon.style.display = "block";
      highlightIcon.style.top = rect.top + window.scrollY - 26 + "px";
      highlightIcon.style.left = rect.right + window.scrollX + "px";
      // if(isHightLight){
      // const span = document.createElement("text-highlight");
      // const textHighLight = selection.toString();
      // let spanId = `highlighted-text-${spanIdCounter}`;
      // span.id = spanId;
      // span.appendChild(document.createTextNode(textHighLight));
      // range.deleteContents();
      // range.insertNode(span);
      // lastSpanId = spanId;
      // spanIdCounter++;
      // var event1 = document.getElementById(spanId)
      // event1.addEventListener('click', () => {
      //   console.log("value: " + event1.innerText);
      //   var newDiv1 = document.createElement("div");
      //   newDiv1.className = "highlight-focus";
      //   for (var i = 1; i <= 3; i++) {
      //     var divChild = document.createElement("div");
      //     divChild.classList.add("square");
      //     if(i == 1){
      //       divChild.style.backgroundColor = 'yellow';
      //       divChild.addEventListener("click", function(event) {
  
      //       });
      //     }
      //     else if(i == 2){
      //       divChild.style.backgroundColor = 'red';
      //       divChild.addEventListener("click", function(event) {
      //         var a = document.querySelector('.additional-info');
      //         a.style.display = 'block'
      //         // Get the background color of the clicked div
      //         // var clickedColor = event.target.style.backgroundColor;
      //         // const highlightedSpan = document.getElementById(lastSpanId);
      //         // highlightedSpan.style.backgroundColor = clickedColor;
      //         // highlightedSpan.style.cursor = 'pointer';
      //       // }
      //       });
      //     }
      //     // Append the new div to the parent div
      //     newDiv1.appendChild(divChild);
      //   }
  
      //   document.body.appendChild(newDiv1);
  
      //   const highlightFocus = document.querySelector(".highlight-focus");
      //   highlightFocus.style.display = "block";
      //   highlightFocus.style.top = rect.top + window.scrollY - 35 + "px";
      //   highlightFocus.style.left = rect.right + window.scrollX - 150 + "px";
  
      //   highlightFocus.appendChild(newDivChild);
      // })
    } else {
      highlightIcon.style.display = "none";
    }
  });
  
  const colorPicker = document.getElementById("colorPicker");
  colorPicker.addEventListener("input", function () {
    const highlightedSpan = document.getElementById(lastSpanId);
  
    if (highlightedSpan) {
      highlightedSpan.style.backgroundColor = colorPicker.value;
    }
  });
  
  // for(var i = 1; i < 10 ; i++){
  //   var event1 = document.getElementById(`highlighted-text-${i}`)
  //   event1.addEventListener('click', () => {
  //     console.log("ghdeb");
  //   })
  // }
  