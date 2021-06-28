let myColors = []
let colorInput = document.getElementById("color-input")
const saveBtn = document.getElementById("save-btn")
const ulEl = document.getElementById("color-list")
const ulEr = document.getElementById("delete-btn")
const colorsFromLocalStorage = JSON.parse(localStorage.getItem("hexcolor"))

if (colorsFromLocalStorage) {
    myColors = colorsFromLocalStorage;
    render(myColors);
}

const isHexValid = str => {
   const legend = '0123456789abcdefABCDEF';
   for(let i = 0; i < str.length; i++){
      if(legend.includes(str[i])){
         continue;
      };
      return false;
   };
   return true;
};


colorInput.addEventListener("keyup", function(){
    document.querySelector(".color-visual").style.backgroundColor = document.querySelector(".color-input").value;
 });
function render(colors) {
    let listItemsLeft = ""
    let listItemsRight = ""
    for (let i = 0; i < colors.length; i++) {
        listItemsLeft += `
            <li class="color-li">
                <a id="copyFlyout" class="color-link" onclick="copy2(${i})" style="--my-color-var: ${myColors[i]};">
                    ${colors[i]}
                </a>
            </li>
        `;
        listItemsRight += `
            <li class="color-li">
                <button class="delete-link" onclick="removeItem(${i})" >
                    Remove this item
                </button>
            </li>
        `
    }

    ulEl.innerHTML = listItemsLeft;
    ulEr.innerHTML = listItemsRight;

}

saveBtn.addEventListener("click", function(){
  if (isHexValid(colorInput.value)){
    myColors.push(colorInput.value);
    colorInput.value = "";
    localStorage.setItem("hexcolor", JSON.stringify(myColors));
    document.querySelector(".color-visual").style.backgroundColor = "white";
    render(myColors);
  }
  else {
    alert("            Ho...\n U sure it's a hex color?");
  }

});

function copy2(i){
  var copyText = myColors[i];
  navigator.clipboard.writeText(copyText)
  document.execCommand("copy");
  myColors[i] = "Copied!"
  render(myColors)
}


function removeItem(i){
  myColors.splice(i,1)
  localStorage.setItem("hexcolor", JSON.stringify(myColors))
  render(myColors)
}


document.addEventListener("click", (evt) => {
          let targetElement = evt.target;
          if (targetElement.id == "copyFlyout" || targetElement.id == "save-btn"){
            return;
          }
          else{
            myColors = JSON.parse(localStorage.getItem("hexcolor"))
            render(myColors);
            console.log(targetElement)
            return
        }
      });
