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

  const quotesTextAndAuthor = async () => {
    const allData = [];
    let loadMore = true;

    while (loadMore) {
      await page.waitForSelector(".quote");
      const quoteElements = await page.$$(".quote");

      for (let i in quoteElements) {
        const textElement = await quoteElements[i].$(".text");
        const authorElement = await quoteElements[i].$(".author");
        let text, author;
        if (textElement)
          text = await page.evaluate((t) => t.innerText, textElement);
        if (authorElement)
          author = await page.evaluate((a) => a.innerText, authorElement);
        allData.push({ text, author });
      }
      const btn = await page.$(".pager > .next > a");
      if (btn !== null) {
        await btn.click();
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } else {
        loadMore = false;
      }
    }
    return allData;
  };

  console.log(await quotesTextAndAuthor());

    await browser.close();
};

//Start Scrapping
scrapping();

//   const quotesTextAndAuthor = async (p) => {
//     return await p.evaluate(() => {
//       const quotes = document.querySelectorAll(".quote");

//       const allData = Array.from(quotes).map((quote) => {
//         const text = quote.querySelector(".text").innerText;
//         const author = quote.querySelector(".author").innerText;
//         return { text, author };
//       });
//       return allData;
//     });
//   };
//   console.log(await quotesTextAndAuthor(page));
//   await page.click(".pager > .next > a");
