document.addEventListener("DOMContentLoaded", function () {
  // Step elements
  let stepOne = document.getElementById("stepOne");
  let stepTwo = document.getElementById("stepTwo");
  let stepThree = document.getElementById("stepThree");
  let stepFour = document.getElementById("stepFour");
  let changeSelection = document.getElementById("changeSelection");
  let confirmedLog = document.getElementById("confirmed");

  // Form elements and validation (uncomment and adjust as needed)
  let userName = document.getElementById("userName");
  let userEmail = document.getElementById("userEmail");
  let userPhoneNo = document.getElementById("userPhoneNo");
  let invalidName = document.getElementById("invalidName");
  let invalidEmail = document.getElementById("invalidEmail");
  let invalidPhoneNo = document.getElementById("invalidPhoneNo");

  const emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  // Navigation buttons
  let toStepTwo = document.getElementById("toStepTwo");
  let backToStepOne = document.getElementById("backToStepOne");
  let toStepThree = document.getElementById("toStepThree");
  let backToStepTwo = document.getElementById("backToStepTwo");
  let toStepFour = document.getElementById("toStepFour");
  let backToStepThree = document.getElementById("backToStepThree");
  let confirmLog = document.getElementById("submit");

  // Payment duration toggle
  let paymentToggle = document.getElementById("paymentToggle");
  let monthly = document.getElementById("monthlyPayment");
  let yearly = document.getElementById("yearlyPayment");

  // Function to toggle payment duration
  function paymentDuration() {
    let arcadePrice = document.getElementById("arcadePrice");
    let advancedPrice = document.getElementById("advancedPrice");
    let proPrice = document.getElementById("proPrice");
    let monthsFreeAr = document.getElementById("monthsFreeAr");
    let monthsFreeAdv = document.getElementById("monthsFreeAdv");
    let monthsFreePro = document.getElementById("monthsFreePro");
    let onlineServicePrice = document.getElementById("onlineServicePrice");
    let largerStoragePrice = document.getElementById("largerStoragePrice");
    let customizableProfilePrice = document.getElementById(
      "customizableProfilePrice"
    );

    if (paymentToggle.checked) {
      arcadePrice.innerHTML = "$90/yr";
      advancedPrice.innerHTML = "$120/yr";
      proPrice.innerHTML = "$150/yr";
      monthsFreeAr.innerHTML = "2 months free";
      monthsFreeAdv.innerHTML = "2 months free";
      monthsFreePro.innerHTML = "2 months free";
      onlineServicePrice.innerHTML = "+10$/yr";
      largerStoragePrice.innerHTML = "+20$/yr";
      customizableProfilePrice.innerHTML = "+20$/yr";
    } else {
      arcadePrice.innerHTML = "$9/mo";
      advancedPrice.innerHTML = "$12/mo";
      proPrice.innerHTML = "$15/mo";
      monthsFreeAr.innerHTML = "";
      monthsFreeAdv.innerHTML = "";
      monthsFreePro.innerHTML = "";
      onlineServicePrice.innerHTML = "+1$/mo";
      largerStoragePrice.innerHTML = "+2$/mo";
      customizableProfilePrice.innerHTML = "+2$/mo";
    }
    monthly.classList.toggle("monthly");

    yearly.classList.toggle("yearly");
  }

  // Function to show step one
  function showStepOne() {
    stepOne.style.display = "flex";
    stepTwo.style.display = "none";
  }

  // Step Two plan selection buttons
  let planArcadeBtn = document.getElementById("planArcade");
  let planAdvancedBtn = document.getElementById("planAdvanced");
  let planProBtn = document.getElementById("planPro");

  // Variables to store selected plan details
  let selectedPlanName = "";
  let selectedPlanPrice = 0;

  // Function to deselect all plan options
  function deselectAllPlans() {
    planArcadeBtn.classList.remove("selected");
    planAdvancedBtn.classList.remove("selected");
    planProBtn.classList.remove("selected");
  }

  // Event listener for Arcade plan selection
  planArcadeBtn.addEventListener("click", function () {
    deselectAllPlans(); // Deselect all plans first
    planArcadeBtn.classList.add("selected"); // Mark Arcade as selected
    selectedPlanName = planArcadeBtn.getAttribute("name");
    selectedPlanPrice = parseFloat(planArcadeBtn.getAttribute("value"));
    updatePlanPrice();
  });

  // Event listener for Advanced plan selection
  planAdvancedBtn.addEventListener("click", function () {
    deselectAllPlans(); // Deselect all plans first
    planAdvancedBtn.classList.add("selected"); // Mark Advanced as selected
    selectedPlanName = planAdvancedBtn.getAttribute("name");
    selectedPlanPrice = parseFloat(planAdvancedBtn.getAttribute("value"));
    updatePlanPrice();
  });

  // Event listener for Pro plan selection
  planProBtn.addEventListener("click", function () {
    deselectAllPlans(); // Deselect all plans first
    planProBtn.classList.add("selected"); // Mark Pro as selected
    selectedPlanName = planProBtn.getAttribute("name");
    selectedPlanPrice = parseFloat(planProBtn.getAttribute("value"));
    updatePlanPrice();
  });

  function updatePlanPrice() {
    let planPriceElement = document.getElementById("selectedPlanPrice");
    if (paymentToggle.checked) {
      // Display yearly price
      planPriceElement.textContent =
        "$" + (selectedPlanPrice * 10).toFixed(2) + "/yr";
    } else {
      // Display monthly price
      planPriceElement.textContent = "$" + selectedPlanPrice.toFixed(2) + "/mo";
    }
  }

  // Function to show selected plan in Step Four
  function showSelectedPlan() {
    // Display selected plan name and price in Step Four
    let selectedPlanNameElement = document.getElementById("selectedPlanName");
    // let selectedPlanPriceElement = document.getElementById("selectedPlanPrice");
    selectedPlanNameElement.textContent = selectedPlanName;
    updatePlanPrice();
    // selectedPlanPriceElement.textContent = "$" + selectedPlanPrice.toFixed(2) + "/mo";
  }

  // Event listener to navigate to Step Four and show selected plan
  toStepFour.addEventListener("click", function () {
    showStepFour(); // First, show Step Four
    showSelectedPlan(); // Then, show selected plan details
    displaySelectedAddons();
    totalCost();
  });

  function totalCost() {
    // Extracting selected plan price from the HTML element
    let selectedPlanPriceText =
      document.getElementById("selectedPlanPrice").textContent;
    let selectedPlanPrice = parseInt(selectedPlanPriceText.substring(1)) || 0; // Remove '$' and parse, default to 0 if empty or non-numeric

    // Extracting additional costs from the HTML elements
    let firstAddText = document.getElementById("firstAddPrice").textContent;
    let secondAddText = document.getElementById("secondAddPrice").textContent;
    let thirdAddText = document.getElementById('thirdAddPrice').textContent;

    // Extracting numerical values from the text and parsing them to integers
    let firstAdd = parseInt(firstAddText.substring(2)) || 0; // Remove '+$' and parse, default to 0 if empty or non-numeric
    let secondAdd = parseInt(secondAddText.substring(2)) || 0; // Remove '+$' and parse, default to 0 if empty or non-numeric
    let thirdAdd = parseInt(thirdAddText.substring(2)) || 0; // Remove '+$' and parse, default to 0 if empty or non-numeric

    let adsTotal = firstAdd + secondAdd + thirdAdd;

    // Calculating total cost
    let total = selectedPlanPrice + adsTotal;

    // Updating total cost in the HTML element
    document.getElementById("totalCosts").textContent = "$" + total;
    console.log(total); // Logging the total cost for debugging
  }

  function displaySelectedAddons() {
 
    let onlineServiceCheckbox = document.getElementById("onlineServiceCheckboxInput");
    let largerStorageCheckbox = document.getElementById("largerStorageCheckboxInput");
    let customizableProfileCheckbox = document.getElementById("customizableProfileCheckboxInput");
    let addOne = document.getElementById('addOne');
    let addTwo = document.getElementById('addTwo');
    let addThree = document.getElementById('addThree');
    let firstAddPrice = document.getElementById('firstAddPrice');
    let secondAddPrice = document.getElementById('secondAddPrice');
    let thirdAddPrice = document.getElementById('thirdAddPrice');

    if (onlineServiceCheckbox.checked) {
       addOne.innerHTML = "Online services";
       firstAddPrice.innerHTML = '+$1/mo'
    }
    if (largerStorageCheckbox.checked) {
        addTwo.innerHTML = "Larger storage";
        secondAddPrice = "+$2/mo"
    }
    if (customizableProfileCheckbox.checked) {
       addThree.innerHTML = "Customizable profile";
       thirdAddPrice.innerHTML = "+$3/mo"
    }

}



  function showStepTwo() {
    if (userName.value === '') {
        invalidName.innerHTML = 'This field is required';
        stepTwo.style.display = 'none';
    } else if (!emailRegEx.test(userEmail.value)) {
        invalidEmail.innerHTML = 'This field is required';
        stepTwo.style.display = 'none';
    } else if (userPhoneNo !== null && userPhoneNo.value === "") {
        invalidPhoneNo.innerHTML = 'This field is required';
        stepTwo.style.display = 'none';
    } else {
    stepThree.style.display = "none";
    stepOne.style.display = "none";
    stepTwo.style.display = "flex";
    }
  }

  // Function to show step three
  function showStepThree() {
    stepFour.style.display = "none";
    stepTwo.style.display = "none";
    stepThree.style.display = "flex";
  }

  // Function to show step four
  function showStepFour() {
    stepThree.style.display = "none";
    stepFour.style.display = "flex";
  }

  function changeBtn() {
    stepTwo.style.display = "flex";
    stepFour.style.display = "none";
  }

  // Function to submit form and show confirmation
  function submitForm() {
    stepFour.style.display = "none";
    confirmedLog.style.display = "flex";
    // Handle form submission or any additional actions
  }

  // Event listeners for navigation buttons
  toStepTwo.addEventListener("click", showStepTwo);
  backToStepOne.addEventListener("click", showStepOne);
  backToStepTwo.addEventListener("click", showStepTwo);
  toStepThree.addEventListener("click", showStepThree);
  toStepFour.addEventListener("click", showStepFour);
  backToStepThree.addEventListener("click", showStepThree);
  changeSelection.addEventListener("click", changeBtn);
  confirmLog.addEventListener("click", submitForm);

  // Event listener for payment duration toggle
  paymentToggle.addEventListener("click", paymentDuration);
});
