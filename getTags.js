//PLAY with HTML DOM

import puppeteer from "puppeteer";

const scrapping = async () => {
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: null,
  });

  const page = await browser.newPage();
  await page.goto("http://quotes.toscrape.com", {
    waitUntil: "domcontentloaded",
  });

  const getTags = async () => {
    const allData = [];
    await page.waitForSelector(".quote");
    const quotesElements = await page.$$(".quote");

    for (let i in quotesElements) {
      const tagsArray = []; // Initialize tagsArray for each quote
      const tagsElement = await quotesElements[i].$(".tags");
      const tagElements = await tagsElement.$$(".tag");

      for (let tagEl of tagElements) {
        let tag;
        if (tagEl) {
          tag = await page.evaluate((t) => t.innerText, tagEl);
          tagsArray.push(tag);
        }
      }
      allData.push(tagsArray);
    }

    return allData;
  };

  console.log(await getTags());

  await browser.close();
};

//Start Scrapping
scrapping();
