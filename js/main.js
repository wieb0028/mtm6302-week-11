const cats = [
  {
    name: "Cat",
    bio: "Cat is an English word.",
    thumb: "images/kitten1-thumb.jpeg",
    img: "images/kitten1.jpeg"
  },
  {
    name: "Mao",
    bio: "Mao is is a Cantonese word.",
    thumb: "images/kitten2-thumb.jpeg",
    img: "images/kitten2.jpeg"
  },
  {
    name: "Gato",
    bio: "Gato is a Spanish word",
    thumb: "images/kitten3-thumb.jpeg",
    img: "images/kitten3.jpeg"
  },
  {
    name: "Billi",
    bio: "Billi is a Hindi word.",
    thumb: "images/kitten4-thumb.jpeg",
    img: "images/kitten4.jpeg"
  },
  {
    name: "Chat",
    bio: "Chat is a French word.",
    thumb: "images/kitten5-thumb.jpeg",
    img: "images/kitten5.jpeg"
  },
  {
    name: "Kot",
    bio: "Kot is a Polish word.",
    thumb: "images/kitten6-thumb.jpeg",
    img: "images/kitten6.jpeg"
  },
  {
    name: "Kit",
    bio: "Kit is a Ukrainian word.",
    thumb: "images/kitten7-thumb.jpeg",
    img: "images/kitten7.jpeg"
  },
  {
    name: "Kot",
    bio: "Kot is a Russian word.",
    thumb: "images/kitten8-thumb.jpeg",
    img: "images/kitten8.jpeg"
  }
]
const catsRow = document.getElementById("catsRow")

if (catsRow) { // now, this function will only run if the catsRow id exists in the html file. It will get rid of the error we were getting in likedcats.html, because it did not contain this id

// loop over the array of data 
for (const cat of cats) {
  console.log(cat.name)
  const card = `
  <div class="col">
    <div class="card">
      <img data-bs-toggle="modal" data-bs-target="#exampleModal" src="${cat.thumb}" data-fullimg="${cat.img}" class="card-img-top" alt="placeholder kitten">
      <div class="card-body">
        <h5 class="card-title">${cat.name}</h5>
        <p class="card-text">${cat.bio}</p>
        <a href="#" class="like btn btn-light" 
          data-catname="${cat.name}"
          data-catbio="${cat.bio}"
          data-catthumb="${cat.thumb}"
          data-catfullimg="${cat.img}">Like</a>
      </div>
    </div>                    
  </div> <!-- col ends -->`
  // Method 1
  catsRow.insertAdjacentHTML("beforeend", card)
  // Method 2
  // ...
}

// adding event listener to the row 
catsRow.addEventListener("click", openModal)

function openModal(e) {
  // delegate the event to the target element if it contains class card-img-top
  if (e.target.classList.contains("card-img-top")) {
    const fullSizeImage = e.target.dataset.fullimg
    document.querySelector(".modal-body").innerHTML = `<img src="${fullSizeImage}" alt="placeholder kitten">`
  }
}

}
/*-------------------------------------------------------------
                            WEEK 11
-------------------------------------------------------------*/

// *** NOTE *** Had to move this code segment here, so that savedCats becomes a global scope variable that is accessible to all functions, and not just one function in particular, had it remained there 

  // get the cats from localStorage
  let savedCats = localStorage.getItem("mycats")
  // console.log(savedCats) // should say null, meaning empty
  // if the saved cats are null, then !savedcats will be true 
  if (!savedCats) {
    // set savedCats to empty array 
    savedCats = []
  } else {
    // if savedCats is not null, then set savedCats to parsed value of savedCats
    savedCats = JSON.parse(savedCats)
  }

// *** END OF NOTE ***

const likeButtons = document.querySelectorAll(".like")

if(likeButtons.length > 0) {
  for(const likeButton of likeButtons) {
    likeButton.addEventListener("click", likeCat) // clicking the button will call the function "likeCat"
    // loop over the savedCats array and check if any cat name with this button cat name 
    for (savedCat of savedCats) {
      if (savedCat.name == likeButton.dataset.catname) {
      //update button style
      likeButton.classList.remove("btn-light")
      likeButton.classList.add("btn-danger")
      likeButton.textContent = "Liked"
      }
    }
  }
}

function likeCat(e) {
  e.preventDefault() 
  const catName = this.dataset.catname
  const catBio = this.dataset.catbio
  const catThumb = this.dataset.catthumb
  const catImg = this.dataset.catfullimg
  const catInfo = { name: catName, bio: catBio, thumb: catThumb, img: catImg }
  console.log(catInfo)

// *** NOTE *** That code segment at the top used to be here, inside the likeCat function, where savedCats was a function scope variable

  // check if the catName exists in the array from localStorage 
  const catExist = findCat(catName) 
  console.log(catExist)
  
  // if the catName existed we will get a number from the findCat function 
  if (catExist !== null) { // instead of null, you could also write 0
    // display an alert to user 
    alert("This cat is already liked")
  } else {
    // the findCat method did not return a number
    // push the cat object to savedCats array 
    savedCats.push(catInfo)
    
    // stringify the savedCats array and add it to localStorage mycats
    localStorage.setItem("mycats", JSON.stringify(savedCats))

    //update button style
    this.classList.remove("btn-light")
    this.classList.add("btn-danger")
    this.textContent = "Liked"

    // to clear the local storage, type localStorage.clear() in the console 
  }
}

function findCat(catName) {
  for (savedCat of savedCats) {
    if (savedCat.name == catName) {
      return savedCats.indexOf(savedCat) // a function will stop when it reaches a return 
    }
  }
  return null
}

// ----------- LIKED CATS PAGE -----------

// display cats from local storage 

const likedCatsRow = document.getElementById("likedCatsRow")

if (likedCatsRow) {
  showCats()
  function showCats() {
  // if savedCats array contains one or more cats, then display the cats 
  if (savedCats.length > 0) {
    const likedCards = []
    for (const cat of savedCats) {
      const card = `
      <div class="col">
        <div class="card">
          <img data-bs-toggle="modal" data-bs-target="#exampleModal" src="${cat.thumb}" data-fullimg="${cat.img}" class="card-img-top" alt="placeholder kitten">
          <div class="card-body">
            <h5 class="card-title">${cat.name}</h5>
            <p class="card-text">${cat.bio}</p>
            <a href="#" class="like btn btn-light remove" data-catname="${cat.name}">Remove</a>
          </div>
        </div>                    
      </div> <!-- col ends -->`
      likedCards.push(card)
    }
    likedCatsRow.innerHTML = likedCards.join("")
  } else {
    // display message that no cats were found 
    likedCatsRow.innerHTML = "No liked cats to show!"
  }
  }

  // add event delegation for remove button 
  likedCatsRow.addEventListener("click", removeCat)

  function removeCat(e) {
    // check if the target is the remove button
    if (e.target.classList.contains("remove")) {
      e.preventDefault()
      // get the index of cat to remove from the savedCats array using findCat method 
      const removeCatIndex = findCat(e.target.dataset.catname)
      console.log(removeCatIndex)
      // remove the cat from savedCats array 
      savedCats.splice(removeCatIndex, 1)

      // update the local storage with new array 
      localStorage.setItem("mycats", JSON.stringify(savedCats))
      showCats()
    }
  }
}