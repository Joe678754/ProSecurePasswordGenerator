// Stripe publishable key
const stripe = Stripe(pk_test_51SefJDGkobMEHQEEE2XwmMzkwamMhibsE2B8giChp2T1metveoTdr15Cv3wXCFGuGZ3WQAyKxDdM4Cz1c4oOUuFs00PRZjtZa0); // replace with your own key
async function subscribe() {
  try {
    const response = await fetch("http://127.0.0.1:8000/create-checkout-session", {
      method: "POST",
    });
    const data = await response.json();
    if (data.url) {
      // Redirect user to Stripe checkout
      window.location.href = data.url;
    } else {
      console.error(data.error);
      alert("Error creating checkout session");
    }
  } catch (err) {
    console.error(err);
    alert("Something went wrong");
  }
}
