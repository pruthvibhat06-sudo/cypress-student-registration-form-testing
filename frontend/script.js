const form = document.querySelector("#registration-form");
const result = document.querySelector("#result");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  document.querySelectorAll("[data-error]").forEach((node) => node.textContent = "");
  result.textContent = "";
  result.className = "";

  const data = Object.fromEntries(new FormData(form).entries());
  try {
    const response = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    const payload = await response.json();
    if (!response.ok) {
      Object.entries(payload.errors || {}).forEach(([field, message]) => {
        const node = document.querySelector(`[data-error="${field}"]`);
        if (node) node.textContent = message;
      });
      result.textContent = response.status === 409 ? "This email is already registered." : "Please correct the highlighted fields.";
      result.className = "failure";
      return;
    }
    result.textContent = payload.message;
    result.className = "success";
    form.reset();
  } catch (_error) {
    result.textContent = "Unable to contact the registration service. Please try again.";
    result.className = "failure";
  }
});
