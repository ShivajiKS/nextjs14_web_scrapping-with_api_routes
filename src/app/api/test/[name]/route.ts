import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer";

export async function GET(req: NextRequest) {
  const userPrompt = req.url.split("/").pop();
  if (!userPrompt) {
    return NextResponse.json({
      label: "please provide a search query",
      status: "400",
    });
  }
  let browser;
  let htmldata;
  try {
    browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.goto("https://amazon.com");
    await page.type("#twotabsearchtextbox", userPrompt); // find the input text box and insert the input query..
    await page.keyboard.press("Enter"); //search the data
    await page.waitForNavigation(); //it waits utill promise resolves.
    htmldata = await page.content();
  } catch (error) {
    console.log(error);
  }

  return NextResponse.json({ data: `${htmldata}` });
}

/*  Puppeteer old Headless deprecation warning:
      In the near future `headless: true` will default to the new Headless mode.
      to avoid the above warning you can add a headless:"new" property to launch method.
      example :  puppeteer.launch({headless: "new" });
    */
