const getId = () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  return id;
};

const fetchUser = async (id) => {
  try {
    const user = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );
    return user.data;
  } catch (error){
    console.log(error);
  }
};

const callUser = (user) => {
  const divElement = document.getElementById("user-section");

  const spanElement = document.createElement("span");

  const nameElement = document.createElement("h2");
  nameElement.className = "user-name";
  nameElement.innerText = `${user.name} (Works at ${user.company.name})`;

  const userNameElement = document.createElement("h4");
  userNameElement.className = "user-username";
  userNameElement.innerText = ` UserName: @${user.username}`;

  spanElement.appendChild(nameElement);
  spanElement.appendChild(userNameElement);
  divElement.appendChild(spanElement);

  const emailElement = document.createElement("p");
  emailElement.innerText = `Email: ${user.email}, Phone: ${user.phone}`;
  divElement.appendChild(emailElement);

  const websiteElement = document.createElement("p");
  websiteElement.innerText = `Website: ${user.website}`;
  divElement.appendChild(websiteElement);

  const addressElement = document.createElement("p");
  const { suite, street, city, zipcode } = user.address;
  addressElement.innerText = `Address: ${suite}, ${street}, ${city} ${zipcode}`;
  divElement.appendChild(addressElement);
};

const getUser = async () => {
  try {
    const id = getId();
    const user = await fetchUser(id);
    callUser(user);
  } catch{
    console.log(error);
  }
};
//call to get User
getUser();
