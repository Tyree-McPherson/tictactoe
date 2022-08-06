document.addEventListener("DOMContentLoaded", () => HandleAnimateLandingPage());

const HandleAnimateLandingPage = () => {

  // Randomly generate the top row.
  const ContainerTop = document.getElementById("index-cross-line-top");
  const ContainerBottom = document.getElementById("index-cross-line-bottom");
  const ArrayOfCharacters = ["X", "O"];
  const NumberOfCharacters = 4;
  
  // First generate and animate the top row.
  for (let i = 0; i < NumberOfCharacters; i++) {
    
    const Element = document.createElement("div");
    const RandomCharacter = Math.floor(Math.random() * 2);

    // Add the styling and animation.
    Element.innerText = ArrayOfCharacters[RandomCharacter];
    Element.classList.add("index-background-animation");

    if (Element.innerText === "X") {
      
      Element.style.animation = "RotateX 1s infinite";

    } else {
      
      Element.style.animation = "AnimateCircle 1s infinite";
    };
  
    // Pick random for "top" and "left" positions.
    ContainerTop.appendChild(Element);
  };
  
  // Randomly generate the bottom row.
  for (let i = 0; i < NumberOfCharacters; i++) {
    
    const Element = document.createElement("div");
    const RandomCharacter = Math.floor(Math.random() * 2);

    // Add the styling and animation.
    Element.innerText = ArrayOfCharacters[RandomCharacter];
    Element.classList.add("index-background-animation");

    if (Element.innerText === "X") {
      
      Element.style.animation = "RotateX 1s infinite";

    } else {

      Element.style.animation = "AnimateCircle 1s infinite";
    };
  
    // Pick random for "top" and "left" positions.
    ContainerBottom.appendChild(Element);
  };
};