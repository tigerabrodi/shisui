import env from "dotenv";
import { test } from "@playwright/test";
import {
  getDocument,
  getQueriesForElement,
} from "@playwright-testing-library/test";
import { buildQuestionAnswer } from "./utils";

env.config();

test("complete daily questions user flow.", async ({ page }) => {
  const questionAnswers = buildQuestionAnswer();

  await page.goto("/");
  const document = await getDocument(page);
  const { findByRole, findByLabelText, findAllByLabelText, findByText } =
    getQueriesForElement(document);

  // Landing page
  await (await findByRole("heading", { name: "Shisui" })).isVisible();
  await (await findByRole("button", { name: "Login" })).click();

  // Login
  await page.waitForNavigation();
  await (await page.waitForSelector("input")).type("tigerabrodi@gmail.com");

  await (await page.waitForSelector("button span")).click();
  await page.waitForNavigation();

  await (
    await page.waitForSelector("input[type='password']")
  ).type(process.env.GOOGLE_PASSWORD!);
  await (await page.waitForSelector("button span")).click();

  await page.waitForNavigation();
  await (await findByText("Successfully logged in.")).isVisible();

  // Be on assessment page
  await (await findByRole("heading", { name: "Assessments" })).isVisible();

  // Go to questions page
  await (await findByRole("link", { name: "Questions" })).click();
  await page.waitForNavigation();

  // Questions page
  await (await findByRole("heading", { name: "Questions" })).isVisible();
  await (
    await findByRole("heading", {
      name: "Questions for your daily assessments.",
    })
  ).isVisible();
  await (
    await findByRole("button", { name: "Back to daily assessments" })
  ).isVisible();

  // First question
  await (await findByRole("button", { name: "Add question" })).click();
  await (await findByLabelText("Question")).type(questionAnswers.firstQuestion);

  // Second question
  await (await findByRole("button", { name: "Add question" })).click();
  await (
    await findAllByLabelText("Question")
  )[1].type(questionAnswers.firstQuestion);

  // Save questions
  await (await findByRole("button", { name: "Save" })).click();
  await page.waitForNavigation();
  await (await findByText("Successfully saved your questions.")).isVisible();

  // New assessment page
  await (
    await findByRole("button", { name: "Back to daily assessments" })
  ).isVisible();
  await (await findByRole("heading", { name: "Assessment" })).isVisible();
  await (
    await findByRole("heading", { name: "Assessment for today." })
  ).isVisible();

  // Write a new assessment with the two given questions
});
