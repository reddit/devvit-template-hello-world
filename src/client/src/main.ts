import {
  IncrementResponse,
  DecrementResponse,
  InitResponse,
} from "../../shared/types/api";

const counterValueElement = document.getElementById(
  "counter-value"
) as HTMLSpanElement;
const incrementButton = document.getElementById(
  "increment-button"
) as HTMLButtonElement;
const decrementButton = document.getElementById(
  "decrement-button"
) as HTMLButtonElement;

let currentPostId: string | null = null;

async function fetchInitialCount() {
  try {
    const response = await fetch("/api/init");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = (await response.json()) as InitResponse;
    if (data.type === "init") {
      counterValueElement.textContent = data.count.toString();
      currentPostId = data.postId; // Store postId for later use
    } else {
      console.error("Invalid response type from /api/init", data);
      counterValueElement.textContent = "Error";
    }
  } catch (error) {
    console.error("Error fetching initial count:", error);
    counterValueElement.textContent = "Error";
  }
}

async function updateCounter(action: "increment" | "decrement") {
  if (!currentPostId) {
    console.error("Cannot update counter: postId is not initialized.");
    // Optionally, you could try to re-initialize or show an error to the user.
    return;
  }

  try {
    const response = await fetch(`/api/${action}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // The body can be an empty JSON object or include the postId if your backend expects it,
      // but based on your server code, postId is taken from req.devvit.
      body: JSON.stringify({}),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = (await response.json()) as
      | IncrementResponse
      | DecrementResponse;
    counterValueElement.textContent = data.count.toString();
  } catch (error) {
    console.error(`Error ${action}ing count:`, error);
    // Optionally, display an error message to the user in the UI
  }
}

incrementButton.addEventListener("click", () => updateCounter("increment"));
decrementButton.addEventListener("click", () => updateCounter("decrement"));

// Fetch the initial count when the page loads
fetchInitialCount();
