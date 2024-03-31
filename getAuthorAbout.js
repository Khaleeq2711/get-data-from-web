//PLAY with HTML DOM

import puppeteer from "puppeteer";

const scrapping = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });

  const page = await browser.newPage();
  await page.goto("http://quotes.toscrape.com", {
    waitUntil: "domcontentloaded",
  });

  const getAuthor = async () => {
    const allData = [];

    await page.waitForSelector(".quote");
    const quoteElements = await page.$(".quote");

    const authorElement = await quoteElements.$(".author");
    let author, date;
    if (authorElement)
      author = await page.evaluate((a) => a.innerText, authorElement);

    await page.waitForSelector(".quote > span a");
    const btn = await page.$(".quote > span > a");
    await btn.click();

    await page.waitForSelector(".author-born-date");
    await new Promise((resolve) => setTimeout(resolve, 2500));

    const dateEl = await page.$(".author-born-date");
    if (dateEl) {
      date = await page.evaluate((d) => d.innerText, dateEl);
    }
    await page.goBack();
    allData.push({ author, date });

    return allData;
  };
  console.log(await getAuthor());

  await browser.close();
};

//Start Scrapping
scrapping();
