

function handleFormSubmit(event) {
  event.preventDefault()
  const productsDetails = {
    selling_price: event.target.selling_price.value,
    Product_name: event.target.Product_name.value
  }
  // creat
  axios
    .post(
      "https://crudcrud.com/api/355a560f4507454390125f13a58b5d8e/productData", productsDetails
    )
    .then((Response) =>
      displayUserOnScreen(Response.data))
    .catch((error) => console.log(error))
}
window.addEventListener("DOMContentLoaded", () => {
  let totalPrice = 0
  axios
    .get("https://crudcrud.com/api/355a560f4507454390125f13a58b5d8e/productData",)
    .then((response) => {
      for (let i = 0; i < response.data.length; i++) {
        totalPrice+=parseInt(response.data[i].selling_price)
        displayUserOnScreen(response.data[i])
      }
      const body = document.querySelector("body") 
      const total = document.createElement("h3")
      total.innerHTML=`Total value worth on Product:- ${totalPrice}`
      body.appendChild(total)
      console.log(response)
    })
    .catch((error) => console.log(error))
})

function displayUserOnScreen(productsDetails) {
  const userList = document.querySelector("ul")
  document.getElementById("selling_price").value = "";
  document.getElementById("Product_name").value = "";
  const userItem = document.createElement("li");
  userItem.innerHTML = `${productsDetails.selling_price} - ${productsDetails.Product_name}`
  userItem.innerHTML += `<button onclick=deleteDetails("${productsDetails._id}")>Delete Product</button>`
  userItem.setAttribute("id", productsDetails._id)
  userList.appendChild(userItem)
}



function deleteDetails(productId) {
  console.log("hi")
  axios
    .delete(`https://crudcrud.com/api/355a560f4507454390125f13a58b5d8e/productData/${productId}`)
    .then((response) => {
      removeUserFromScreen(productId)
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











