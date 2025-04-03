function simulatePayment() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("Оплата пройшла успішно!");
      }, 1000);
    });
  }

  module.exports = simulatePayment;