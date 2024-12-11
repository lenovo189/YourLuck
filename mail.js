const firebaseConfig = {
    apiKey: "AIzaSyCWScDkHVLttf28OrxpC_JLwHTT0p2wi20",
    authDomain: "contactform-65300.firebaseapp.com",
    databaseURL: "https://contactform-65300-default-rtdb.firebaseio.com",
    projectId: "contactform-65300",
    storageBucket: "contactform-65300.firebasestorage.app",
    messagingSenderId: "727046124786",
    appId: "1:727046124786:web:fb02b5cb9867cfa3b28c6b"
  };
  
  // initialize firebase
  firebase.initializeApp(firebaseConfig);
  
  // reference your database
  var contactFormDB = firebase.database().ref("contactForm");
  
  document.getElementById("contactForm").addEventListener("submit", submitForm);
  
  function submitForm(e) {
  e.preventDefault();

  var name = getElementVal("name");
  var emailid = getElementVal("emailid");
  var msgContent = getElementVal("msgContent");
  var protein = getElementVal("protein");
  var calories = getElementVal("calories");
  var image = getElementVal("image");

  // Check if the product name already exists
  contactFormDB.orderByChild("name").equalTo(name).once("value", (snapshot) => {
    if (snapshot.exists()) {
      // Product name already exists
      alert("This product already exists in the database.");
    } else {
      // Product name does not exist, proceed to save
      saveMessages(name, emailid, msgContent, protein, calories, image);

      // Show success alert
      document.querySelector(".alert").style.display = "block";

      // Remove the alert after 3 seconds
      setTimeout(() => {
        document.querySelector(".alert").style.display = "none";
      }, 3000);

      // Reset the form
      document.getElementById("contactForm").reset();
    }
  });
}
