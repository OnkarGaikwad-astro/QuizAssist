
const API_KEY = "YOUR API KEY"; 
const askGPT = async (prompt) => {
  console.log("Prompt:", prompt);


  try {
    console.log("Calling Gemini...");

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }]
            }
          ]
        }),
      }
    );

    console.log("Response status:", response.status);

    const data = await response.json();

    console.log("FULL GEMINI RESPONSE:", data);

    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      console.error("No valid text returned");
      return null;
    }

    return text;

  } catch (error) {
    console.error("Gemini Fetch Error:", error);
    return null;
  }
};

const changeAnswers = (type, question, answer) => {
  try {
    if (type == 0) {
      question.querySelector("input.whsOnd.zHQkBf").value = answer;
    } else if (type == 2) {
      let options = question
        .querySelector("div.SG0AAe")
        .querySelectorAll("div.nWQGrd.zwllIb");
      let index = parseInt(answer) - 1;
      if (!isNaN(index) && options[index]) {
        options[index].querySelector("label").click();
      }
    }
  } catch (error) {
    console.error("Error when changing answer:", error);
  }
};

const getAnswers = async () => {
  console.log("getAnswers triggered");
  const questionElements = Array.from(
    document.querySelectorAll('div[role="listitem"]')
  ).map((el) => el.querySelector("div"));
  const questions = [];
 for (let i = 0; i < questionElements.length; i++) {
  const question = questionElements[i];

  const raw = question.getAttribute("data-params");

  // 🛡️ skip invalid elements
  if (!raw) {
    console.warn("Skipping element (no data-params)");
    continue;
  }

  let questionObject;

  try {
    questionObject = Array.from(
      JSON.parse("[" + raw.substring(4))
    )[0];
  } catch (err) {
    console.warn("Parsing failed, skipping:", err);
    continue;
  }

  const questionText = questionObject?.[1];

  const questionOptions =
    questionObject?.[4]?.[0]?.[1]?.map((el) => el[0]) || [];

  questions.push({
    question,
    type: questionObject?.[3],
    text: questionText,
    options: questionOptions
  });
}

  let prompt = "Answer the following questions:\n\n";
  questions.forEach((q, i) => {
    prompt += `${i + 1}. ${q.text}\n`;
    if (q.options.length > 0) {
      q.options.forEach((opt, j) => {
        prompt += `   ${j + 1}) ${opt}\n`;
      });
    }
    prompt += "\n";
  });

prompt += `
Return ONLY answers in this format:
1: <answer>
2: <answer>
3: <answer>

Do not explain anything.
Do not add extra text.
give only option number.
`;

  const output = await askGPT(prompt);
  if (!output) return;
  console.log("GPT OUTPUT:", output);

  const answers = output.split("\n").map(line => {
    return line.split(":")[1]?.trim();
  });

  answers.forEach((ans, i) => {
    const q = questions[i];

    if (!q || !ans) return;
let title = q.question.querySelector('div[role="heading"]');

if (!title) {
  title = q.question;
}

let span = document.createElement("span");
span.classList.add("answer_quiz_gpt");

span.style.marginLeft = "8px";
span.style.fontSize = "12px";
span.style.color = "#888";
span.style.opacity = "0.3";
span.style.fontWeight = "normal";

span.innerText = `(${ans})`;

title.appendChild(span);

    changeAnswers(q.type, q.question, ans);
  });
};

const toggleAnswers = () => {
  let answers = document.getElementsByClassName("answer_quiz_gpt");
  Array.from(answers).forEach((el) => {
    el.style.display = el.style.display === "none" ? "block" : "none";
  });
};

const deleteAnswers = () => {
  let answers = document.getElementsByClassName("answer_quiz_gpt");
  Array.from(answers).forEach((el) => el.remove());
};

chrome.runtime.onMessage.addListener((request) => {
  if (request.action === "getAnswers") getAnswers();
  if (request.action === "toggleAnswers") toggleAnswers();
  if (request.action === "eraseAnswers") deleteAnswers();
});