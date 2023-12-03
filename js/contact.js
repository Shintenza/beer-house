/**
 * @type {string} - email address where the message is going to be sent
 */
const DESTINATION_ADDRESS = "kam.kuziora@gmail.com";

/**
 * class responsible for handling a contact form
 * @class
 */
class ContactFormHandler {
  #emailAddress = "";
  #messageTitle = "";
  #messageContent = "";

  #emailElement = null;
  #titleElement = null;
  #messageElement = null;
  #submitBtnElement = null;

  #formFeedbackElement = null;

  #isCorrect = true;
  #isSending = false;

  /**
  * @constructor
  * @type {string} - email input ID
  * @type {string} - message title input ID
  * @type {string} - message content input ID
  * @type {string} - submit button ID 
  */
  constructor(emailElemId, titleElemId, textElemId, submitBtnId) {
    this.#emailElement = document.getElementById(emailElemId);
    this.#titleElement = document.getElementById(titleElemId);
    this.#messageElement = document.getElementById(textElemId);
    this.#submitBtnElement = document.getElementById(submitBtnId);

    if (
      !this.#emailElement ||
      !this.#titleElement ||
      !this.#messageElement ||
      !this.#submitBtnElement
    ) {
      throw new Error("invalid IDs provided");
    }

    this.#formFeedbackElement = document.createElement("p");

    this.#submitBtnElement.addEventListener(
      "click",
      this.handleSubmit.bind(this),
    );
  }

  /**
   * method updating class atribiutes to the current inputs values
   * @method
   */
  #updateValues() {
    this.#emailAddress = this.#emailElement.value;
    this.#messageTitle = this.#titleElement.value;
    this.#messageContent = this.#messageElement.value;
  }

  /**
   * method removing all feedback elements attached to the form
   * @method
   */
  #clearMessages() {
    const parentNode = this.#emailElement.parentNode;

    for (const child of parentNode.children) {
      if (child.classList.contains("success_msg")) {
        child.classList.remove("success_msg");
      }

      if (child.classList.contains("error_msg")) {
        child.classList.remove("error_msg");
      }
      if (this.#isCorrect && child.value && child.value.length > 0) {
        child.value = "";
      }
      if (child.classList.contains("error_border")) {
        child.classList.remove("error_border");
      }
      if (child.tagName == "P") {
        child.remove();
      }
    }
  }
  /**
   * method attaching a feedback message containing positive result
   * @method
   * @param {Element} - element after the message is going to be attached
   * @param {string} - success message content
   */
  #appendSuccess(element, successMsg) {
    this.#formFeedbackElement.classList.add("success_msg");
    this.#formFeedbackElement.innerText = successMsg;
    element.after(this.#formFeedbackElement);
  }

  /**
   * method attaching a feedback message containing negative result
   * @method
   * @param {Element} - element after the message is going to be attached
   * @param {string} - error message content
   */
  #appendError(element, errorMsg) {
    element.classList.add("error_border");
    this.#formFeedbackElement.classList.add("error_msg");
    this.#formFeedbackElement.innerText = errorMsg;
    element.after(this.#formFeedbackElement);
  }

  /**
   * method responsible for form validation (with regex email checking)
   * @method
   */
  #validateForm() {
    this.#isCorrect = true;

    const validEmail =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!this.#emailAddress.match(validEmail)) {
      this.#appendError(this.#emailElement, "Niepoprawny adres email");
      this.#isCorrect = false;
      return;
    }

    if (this.#messageTitle.length === 0) {
      this.#appendError(
        this.#titleElement,
        "Musisz wpisać jakiś tytuł wiadomości",
      );
      this.#isCorrect = false;
      return;
    }

    if (this.#messageContent.length === 0) {
      this.#appendError(
        this.#messageElement,
        "Musisz podać jakąś treść wiadomości",
      );
      this.#isCorrect = false;
      return;
    }
  }

  /**
   * method sending a post request with form content to the formsubmit.co endpoint
   * @async
   * @method
   * @param {Event} - callback event
   */
  async handleSubmit(e) {
    e.preventDefault();
    if (this.#isSending) return;
    this.#updateValues();
    this.#clearMessages();
    this.#validateForm();
    const spinnerElement = this.#submitBtnElement.querySelector(".loader");
    const sendTextElement = this.#submitBtnElement.querySelector(".send");

    if (this.#isCorrect) {
      this.#submitBtnElement.classList.add("active_btn");
      spinnerElement.classList.remove("hidden");
      sendTextElement.classList.add("hidden");

      this.#isSending = true;
      this.#clearMessages();
      const response = await fetch(
        `https://formsubmit.co/ajax/${DESTINATION_ADDRESS}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            emailFrom: this.#emailAddress,
            title: this.#messageTitle,
            content: this.#messageContent,
          }),
        },
      );
      const responseJson = await response.json();

      if (responseJson.success) {
        this.#appendSuccess(
          this.#messageElement,
          "Pomyślnie wysłano wiadomość",
        );
        this.#submitBtnElement.classList.remove("active_btn");
        spinnerElement.classList.add("hidden");
        sendTextElement.classList.remove("hidden");
      }
      this.#isSending = false;
    }
  }
}

const formHandler = new ContactFormHandler(
  "contact_form_email",
  "contact_form_title",
  "contact_form_textarea",
  "contact_form_submit",
);
