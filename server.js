const express = require("express"),
  app = express(),
  cors = require("cors");
const cheerio = require("cheerio");
const axios = require("axios");
const fs = require("fs");
const FinalPerSchema = require("./Schema/FinalSemPercentage");
const FinalAggSchema = require("./Schema/FinalSemAggregate");
const mongoose = require("mongoose");
app.use(cors());
app.get("/", async (req, res) => {
  const db =
    "mongodb+srv://y1a2s3h4:yash1234$@cluster0.lqckj.mongodb.net/y1a2s3h4?retryWrites=true&w=majority";
  mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log("MongoDB Connected...");
    })
    .catch((err) => console.log(err));
  let arr = [
    1715080060,
    1715080061,
    1715080062,
    1715080064,
    1715080072,
    1715080077,
    1715080078,
    1715080079,
    1715080080,
    1715080081,
    1715080082,
    1715080084,
    1715080085,
    1715080086,
    1715080090,
    1715080092,
    1715080093,
    1715080097,
    1715080108,
    1715080109,
    1715080113,
    1715080116,
    1715080118,
    1715080119,
    1715080123,
    1715080124,
    1715080399,
  ];
  let arrNext = [
    1815080245,
    1815080247,
    1815080254,
    1815080257,
    1815080259,
    1815080264,
    1815080265,
    1815080267,
    1815080270,
    1815080271,
    1815080275,
    1815080276,
    1815080277,
  ];
  const resArr = [];
  for (const num of arr) {
    const html = await axios.get(
      `https://msbte.org.in/CRSLDNOV2020DISRESLIVE/2FRSRESFLS20LIVE/EnrollmentNumber/17/${num}Marksheet.html`
    );
    const $ = await cheerio.load(html.data);
    resArr.push({
      NameOfStudent: $(
        "body > div > div:nth-child(3) > table > tbody > tr:nth-child(1) > td:nth-child(2) > strong"
      ).text(),
      EnrollmentNo: $(
        "body > div > div:nth-child(3) > table > tbody > tr:nth-child(2) > td:nth-child(2)"
      ).text(),
      FinalSemPer: $(
        "#dvTotal0 > table > tbody > tr:nth-child(2) > td:nth-child(2) > strong"
      ).text(),
      Aggregate: $(
        "#dvTotal0 > table > tbody > tr:nth-child(5) > td:nth-child(3) > strong"
      ).text(),
    });
    console.log(resArr);
  }

  for (const _num of arrNext) {
    const html = await axios.get(
      `https://msbte.org.in/CRSLDNOV2020DISRESLIVE/2FRSRESFLS20LIVE/EnrollmentNumber/18/${_num}Marksheet.html`
    );
    const $ = await cheerio.load(html.data);
    resArr.push({
      NameOfStudent: $(
        "body > div > div:nth-child(3) > table > tbody > tr:nth-child(1) > td:nth-child(2) > strong"
      ).text(),
      EnrollmentNo: $(
        "body > div > div:nth-child(3) > table > tbody > tr:nth-child(2) > td:nth-child(2)"
      ).text(),
      FinalSemPer: $(
        "#dvTotal0 > table > tbody > tr:nth-child(2) > td:nth-child(2) > strong"
      ).text(),
      Aggregate: $(
        "#dvTotal0 > table > tbody > tr:nth-child(5) > td:nth-child(3) > strong"
      ).text(),
    });
    console.log(resArr);
  }

  resArr.sort((a, b) =>
    a.FinalSemPer >= b.FinalSemPer ? (a.Aggregate >= b.Aggregate ? -1 : 1) : 1
  );
  FinalPerSchema.insertMany(resArr);
  fs.writeFileSync("./FinalSemPercentage.json", JSON.stringify(resArr), {
    encoding: "utf-8",
  });

  resArr.sort((a, b) => (a.Aggregate >= b.Aggregate ? -1 : 1));
  FinalAggSchema.insertMany(resArr);
  fs.writeFileSync("./FinalSemAggregate.json", JSON.stringify(resArr), {
    encoding: "utf-8",
  });
  res.send(resArr);
});
app.listen(3000 || process.env.PORT, () =>
  console.log("http://localhost:3000")
);
