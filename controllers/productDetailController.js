const axios = require("axios");
const cheerio = require("cheerio");
const urlLib = require("url");

const getProductDetail = async (req, res) => {
  const { url } = req.query;
  try {
    const { hostname } = urlLib.parse(url);

    const { data } = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
      }
    });
    const $ = cheerio.load(data);

    let price = "";
    let image = "";

    if (hostname.includes("daraz")) {
      price = $('.pdp-price').first().text().trim();
      image = $('.gallery-preview-panel__image').first().attr('src');
    } else if (hostname.includes("amazon")) {
      // Amazon price selectors
      price = $('#priceblock_ourprice').text().trim() ||
              $('#priceblock_dealprice').text().trim() ||
              $('[data-asin-price]').attr('data-asin-price') ||
              $('[class*="priceToPay"]').first().text().trim();
      // Amazon image selectors
      image = $('#landingImage').attr('src') ||
              $('img[data-old-hires]').attr('data-old-hires') ||
              $('img[data-a-dynamic-image]').attr('src');
    } else if (hostname.includes("olx")) {
      // OLX price selectors
      price = $('h3[data-aut-id="itemPrice"]').text().trim() ||
              $('span[data-aut-id="itemPrice"]').text().trim();
      // OLX image selectors
      image = $('img[data-aut-id="itemImage"]').first().attr('src') ||
              $('img').first().attr('src');
    } else {
      return res.status(400).json({ error: "Unsupported site" });
    }

    res.json({ price, image });
  } catch (err) {
    res.status(500).json({ error: "Scraping failed", details: err.message });
  }
};

module.exports = getProductDetail;