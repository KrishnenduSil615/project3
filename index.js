function handleFormSubmit(event) {
  event.preventDefault()
  const passwordKeeper = {
    title: event.target.title.value,
    password: event.target.password.value
  }
  // create
  axios
    .post(
      "https://crudcrud.com/api/0e7767a2315b48078923e16192b98568/passwordkey", passwordKeeper
    )
    .then((Response) => {
      totalOnScreen()
      displayUserOnScreen(Response.data)
    })
    .catch((error) => console.log(error))
}
window.addEventListener("DOMContentLoaded", () => {
  let totalPassword = 0
  axios
    .get("https://crudcrud.com/api/0e7767a2315b48078923e16192b98568/passwordkey",)
    .then((response) => {
      for (let i = 0; i < response.data.length; i++) {
        totalPassword += parseInt(response.data[i].title)
        displayUserOnScreen(response.data[i])
      }
      totalOnScreen()
      console.log(response)
    })
    .catch((error) => console.log(error))
})

function displayUserOnScreen(passwordKeeper) {
  const userList = document.querySelector("ul")
  document.getElementById("title").value = "";
  document.getElementById("password").value = "";
  const userItem = document.createElement("li");
  userItem.innerHTML = `${passwordKeeper.title} - ${passwordKeeper.password}`
  userItem.innerHTML += `<button onclick=deleteDetails("${passwordKeeper._id}")>delete</button> <button onclick=editDetails("${passwordKeeper._id}",${passwordKeeper.title}",${passwordKeeper.password}")>edit</button>`
  userItem.setAttribute("id", passwordKeeper._id)
  userList.appendChild(userItem)
}

function deleteDetails(passwordID) {
  // console.log("hi")
  axios
    .delete(`https://crudcrud.com/api/0e7767a2315b48078923e16192b98568/passwordkey/${passwordID}`)
    .then((response) => {
      totalOnScreen()
      removeUserFromScreen(passwordID)
      console.log(response)
    })
    .catch((error) => {
      console.log(error)
    })

  function removeUserFromScreen(userId) {
    const parentNode = document.querySelector("ul")
    const childNodeToBeDeleted = document.getElementById(userId)
    if (childNodeToBeDeleted) {
      parentNode.removeChild(childNodeToBeDeleted)
    }
  }
}

// edit
function editDetails(passwordID, title, password) {
  axios
    .put(`https://crudcrud.com/api/0e7767a2315b48078923e16192b98568/passwordkey/${passwordID}`, {
      title,
      password
    })
    .then((response) => {
      totalOnScreen()
      removeUserFromScreen(passwordID)
      console.log(response)
    })
    .catch((error) => {
      console.log(error)
    })
  document.getElementById("title").value = title
  document.getElementById("password").value = password
  editDetails(userId)
}

// search 
const search = document.getElementById("search")
search.addEventListener("keyup", function (event) {
  const textEntered = event.target.value.toLowerCase()
  const passwordItems = document.querySelectorAll("li")
  for (let i = 0; i < passwordItems.length; i++) {
    const currentPasswordText = passwordItems[i].firstChild.textContent.split(" - ")[0].toLowerCase()
    if (currentPasswordText.indexOf(textEntered) === -1) {
      passwordItems[i].style.display = "none"
    }
    else {
      passwordItems[i].style.display = "list-item"
    }
  }
})
// total

function totalOnScreen() {
  axios
    .get("https://crudcrud.com/api/0e7767a2315b48078923e16192b98568/passwordkey",)
    .then((response) => {
      let totalPass = response.data.length
      const totalPasswordTag = document.querySelector("#total")
      totalPasswordTag.textContent = "Total Password:" + totalPass
      console.log(totalPass)

      console.log(response)
    })
    .catch((error) => console.log(error))
}