// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyAu7emmnZJasZU9Zto8_Q4Uc29SGnI5z68",
    authDomain: "contactform-e7dcf.firebaseapp.com",
    databaseURL: "https://contactform-e7dcf-default-rtdb.firebaseio.com",
    projectId: "contactform-e7dcf",
    storageBucket: "contactform-e7dcf.firebasestorage.app",
    messagingSenderId: "69574593077",
    appId: "1:69574593077:web:7277319dafecfdb300ff7c"
  };
// Firebase configuration

  
  // initialize firebase
  firebase.initializeApp(firebaseConfig);
  
  // reference your database
  var contactFormDB = firebase.database().ref("contactForm");
  
  document.getElementById("contactForm").addEventListener("submit", submitForm);
  
  function submitForm(e) {
    e.preventDefault();
  
    var name = getElementVal("name");
    var description = getElementVal("description");
    var msgContent = getElementVal("msgContent");
    var image = getElementVal("image");
    var protein = getElementVal("protein");
    var author = getElementVal("author");
    var calories = getElementVal("calories");
    var category = getElementVal("category");

  
    saveMessages(name,description,image,protein,author,calories,category, emailid, msgContent);
  
    //   enable alert
    document.querySelector(".alert").style.display = "block";
  
    //   remove the alert
    setTimeout(() => {
      document.querySelector(".alert").style.display = "none";
    }, 3000);
  
    //   reset the form
    document.getElementById("contactForm").reset();
  }
  
  const saveMessages = (name,description,image,protein,author,calories,category, emailid, msgContent) => {
    var newContactForm = contactFormDB.push();
  
    newContactForm.set({
      name: name,
      emailid: emailid,
      msgContent: msgContent,
      description: description,
      image: image
      ,
      protein: protein,
      author: author,
      calories: calories,
      category: category
      
    });
  };
  
  const getElementVal = (id) => {
    return document.getElementById(id).value;
  };




// // Submit food form
// document.getElementById("addFoodForm").addEventListener("submit", (e) => {
//     e.preventDefault();

//     // Collect form data
//     const name = getElementVal("name");
//     const description = getElementVal("description");
//     const category = getElementVal("category");
//     const image = getElementVal("image");
//     const calories = getElementVal("calories");
//     const protein = getElementVal("protein");
//     const author = getElementVal("author");

//     // Validate input
//     if (!name || !description || !category || !image || !calories || !protein || !author) {
//         alert("Please fill in all fields!");
//         return;
//     }

//     // Save to Firebase
//     saveFood(name, description, category, image, calories, protein, author)
//         .then(() => {
//             alert("Food added successfully!");
//             document.getElementById("addFoodForm").reset();
//         })
//         .catch((error) => {
//             console.error("Error adding food:", error);
//         });
// });

// // Render food card on the food list page
// const renderFoodCard = (food) => {
//     const row = document.querySelector(".row");

//     const foodCard = document.createElement("div");
//     foodCard.classList.add("col-md-2", "food-item");

//     foodCard.innerHTML = `
//         <div class="card">
//             <img src="${food.image}" class="card-img-top" alt="${food.name}">
//             <div class="card-body">
//                 <h3 class="card-title">${food.name}</h3>
//                 <p class="card-text">${food.description}</p>
//                 <p class="card-text"><strong>Calories:</strong> ${food.calories} | <strong>Protein:</strong> ${food.protein}</p>
//                 <p class="card-text"><strong>Author:</strong> ${food.author}</p>
//                 <button class="btn-primary">Order Now</button>
//             </div>
//         </div>
//     `;

//     row.appendChild(foodCard);
// };

// // Display foods on the food list page
// const displayFoods = () => {
//     dbRef.on("child_added", (snapshot) => {
//         const food = snapshot.val();
//         renderFoodCard(food);
//     });
// };

// // Call displayFoods on the food list page
// if (document.querySelector(".row")) {
//     displayFoods();
// }

