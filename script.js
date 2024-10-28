"use strict";

document
  .querySelector(".mortgage-calculator")
  .addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent form submission

    // Get form values
    const mortgageAmount = parseFloat(
      document.getElementById("mortgage-amount").value
    );
    const mortgageTerm = parseInt(
      document.getElementById("mortgage-term").value
    );
    const interestRate =
      parseFloat(document.getElementById("interest-rate").value) / 100; // Convert to decimal
    const isRepayment = document.getElementById("repayment-type").checked;

    // Calculate results
    let monthlyPayment, totalRepayment;

    if (isRepayment) {
      // Repayment Mortgage Formula
      const monthlyRate = interestRate / 12;
      const totalPayments = mortgageTerm * 12;
      monthlyPayment =
        (mortgageAmount *
          (monthlyRate * Math.pow(1 + monthlyRate, totalPayments))) /
        (Math.pow(1 + monthlyRate, totalPayments) - 1);
      totalRepayment = monthlyPayment * totalPayments;
    } else {
      // Interest-Only Mortgage Formula
      monthlyPayment = mortgageAmount * (interestRate / 12);
      totalRepayment = monthlyPayment * (mortgageTerm * 12);
    }

    // Display results
    document.querySelector(
      ".result-monthly"
    ).innerText = `£${monthlyPayment.toFixed(2)}`;
    document.querySelector(
      ".result-total"
    ).innerText = `£${totalRepayment.toFixed(2)}`;

    // Show results section
    document.querySelector(".show-result").classList.remove("active");
    document.querySelector(".results").classList.add("active");
  });

document.querySelector(".clear-all").addEventListener("click", function (e) {
  e.preventDefault(); // Prevent the default link behavior

  document.querySelector(".show-result").classList.add("active");
  document.querySelector(".results").classList.remove("active");

  document.querySelector(".mortgage-calculator").reset();
});
