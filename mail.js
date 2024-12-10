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
    var image = getElementVal("image")
  
    saveMessages(name, emailid, msgContent,protein,calories,image);
  
    //   enable alert
    document.querySelector(".alert").style.display = "block";
  
    //   remove the alert
    setTimeout(() => {
      document.querySelector(".alert").style.display = "none";
    }, 3000);
  
    //   reset the form
    document.getElementById("contactForm").reset();
  }
  
  const saveMessages = (name, emailid, msgContent,protein,calories,image) => {
    var newContactForm = contactFormDB.push();
  
    newContactForm.set({
      name: name,
      emailid: emailid,
      msgContent: msgContent,
      protein: protein,
      calories: calories,
      image: image
    });
  };
  
  const getElementVal = (id) => {
    return document.getElementById(id).value;
  };