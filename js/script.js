//function for addGradItems from categories.json file
const addGradItems = (jsonFile, className) => {
  fetch(`../js/${jsonFile}`)
    .then(async (resp) => {
      //get items list
      const itemList = await resp.json();
      let changeDiv = document.getElementsByClassName(className)[0];
      let changeHtml = ``;
      for (let item of itemList.data) {
        changeHtml += `<div class="grad-grid-item">
                        <img src="../Images/${item.imgPath}">
                        <p class="grad-grid-title">${item.text}</p>
                    </div>`;
      }
      changeDiv.innerHTML = changeHtml;
    })
    .catch((error) => console.log(error));
};

//call to categories through addGradItems function
addGradItems("categoriesData.json", "categories-grid");
//call to getaways through addGradItems function
addGradItems("getawaysData.json", "getaways-grid");
//call to destinations through addGradItems function
addGradItems("destinationsData.json", "destinations-grid");

//function for add ratings in travel items
const addRatingItems = (jsonFile, className) => {
  fetch(`../js/${jsonFile}`)
    .then(async (resp) => {
      const itemsList = await resp.json();
      let changeDiv = document.getElementsByClassName(className)[0];
      let changeHtml = "";
      let rating = "";
      for (let item of itemsList.data) {
        rating = '<span class="material-icons">circle</span>'.repeat(
          Math.trunc(item.rating)
        );
        if (item.rating % 1 != 0)
          rating += '<span class="material-icons">nightlight</span>';
        changeHtml += `<div class="rating-grid-item">
                                <div class="rating-grid-img">
                                    <img src="../Images/${item.imgPath}">
                                </div>
                                <a href="#" class="rating-grid-title">${item.text}</a><br>
                                ${rating}
                                <span class="review-amt">${item.reviews}</span><br>
                                <p class="rating-grid-cost">from &#x20B9 ${item.cost} per adult</p>
                            </div>`;
      }
      changeDiv.innerHTML = changeHtml;
    })
    .catch((error) => console.log(error));
};

//call to addRatingItems function
addRatingItems("travelData.json", "tour-grid");

//Assignment-2

const renderUsers = (users) => {
  const userElement = document.createElement("a");
  userElement.className = "user";
  userElement.href = `../html/users.html?id=${users.id}`;

  const nameElement = document.createElement("h2");
  nameElement.innerText = users.name;
  nameElement.className = "user-title";
  userElement.appendChild(nameElement);

  const userNameElement = document.createElement("p");
  userNameElement.innerText = users.username;
  nameElement.className = "user-subtitle";
  userElement.appendChild(userNameElement);

  return userElement;
};

const fetchUsers = async () => {
  try {
    const userListElement = document.getElementById("user-list");
    const res = await axios.get("https://jsonplaceholder.typicode.com/users");
    const data = res.data;
    const usersDetail = data.map((item) => ({
      id: item.id,
      name: item.name,
      username: item.username,
    }));
    
    usersDetail.forEach((card) => userListElement.appendChild(renderUsers(card)));
  } catch (error) {
    console.log(error);
  }
};

fetchUsers();