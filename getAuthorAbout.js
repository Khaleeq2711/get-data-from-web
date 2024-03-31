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

    return allData;
  };
  console.log(await getAuthor());

  await browser.close();
};

//Start Scrapping
scrapping();
