const htmlparser2 = require("htmlparser2");
const fs = require("fs");
var HTMLParser = require("node-html-parser");
const cheerio = require("cheerio");
const axios = require('axios');
//const { isTypedArray } = require("util/types");

const scrappingController = async (req, res) => {
    try {
      console.log("inside scrappingController")
      fs.writeFile("test.html", req.body.html, (err) => {
        if (err)
          console.log(err);
        else {
          console.log("File written successfully\n");
          console.log("The written has the following contents:");
        }
      });
      const result = await scrapping(req.body.html);
      console.log(result);
      //console.log("This is entire html content",req.body.html);
      return res.status(200).json(result);
    } catch (e) {
      console.log(e);
    }
};
const scrapping = async (data) => {
    try {
      const dom = htmlparser2.parseDocument(data, {});
      const $ = cheerio.load(dom);
      let obj = {};
      
      obj["address"] = '';
      // const address = $("h1.Text-c11n-8-62-4__sc-aiai24-0");
      const address = $("#ds-chip-property-address");
      console.log("this is address" ,$(address).text());

      //const addresstax = $("span.sc-jRQBWg");
      const addressUrl = $("a.countyLink");
  
      const countryLink = addressUrl[0].attribs.href;
      console.log("This is Url of Country Website:",countryLink)
      obj["countryWebsiteURL"] = countryLink;

      address.each(function(index, el){
        if(index === 0){
          obj["address"] = $(el).text();
        }
      })

      if(obj['address'].length === 0){
        const address = $("h1.hdp__sc-1qahopj-0");
        address.each(function(index, el){
          if(index === 0){
            obj["address"] = $(el).text();
          }
        })
      }

      if(obj['address'].length === 0){
        const address = $("h1.kZKvMY");
        address.each(function(index, el){
          if(index === 0){
            obj["address"] = $(el).text();
          }
        })
      }
      const zestimate = $("span.Text-c11n-8-62-4__sc-aiai24-0");
      zestimate.each(function (idx, el){
        // console.log('this is Zestimate', $(el).text());
        // if(idx === 0){
        //   obj["zestimate"] = $(el).text().split(' ')[0];
        // }
        let arr = $(el).text().split(":");

        if(arr.length > 1){
          if(arr[0] === 'Heating features' || arr[0] === 'Cooling features' || arr[0] === 'Appliances included' || arr[0] === 'Interior features' 
          || arr[0] === 'Total interior livable area' || arr[0] === 'Parking features' || arr[0] === 'Garage spaces' || 
          arr[0] === 'Exterior features' || arr[0] === 'Lot size' || arr[0] === 'Construction materials' || 
          arr[0] === "Year built" || arr[0] === 'Electric utility on property' || arr[0] === 'Water information' || arr[0] === 'Services included' ||
          arr[0] === 'Annual tax amount' || arr[0] === 'Rent Zestimate®'){
          obj[arr[0]] = arr[1].trim();
          }
        }
      })
      const details = $("span");
      details.each(function (idx, el) {
        let text = $(el).text();
          // if(obj['Bedrooms'] === undefined && text.includes('bd')){
          //   obj['Bedrooms'] = text.split(' ')[0]
            
          // }
          // if(obj['Bathrooms'] === undefined && text.includes('ba')){
          //   obj['Bathrooms'] = text.split(' ')[0]
            
          // }
          if(obj['sqft'] === undefined && text.includes('sqft') && (text.split(' ').length === 2)){
            obj['sqft'] = text.split(' ');
          }
        });
      // const type = $("span.ggUolW");
      // type.each(function(idx, el){
      //   if(idx === 0){
      //   obj["Property type"] = $(el).text();
      //   }
      // });
      // if(obj['Zestimate®'] !== undefined){
      // obj['Zestimate®'] = obj['Zestimate®'].split(' ')[0];
      // }
      if(obj["Year built"] === undefined){
        obj["Year built"] = "no data"
      }
      // if(obj['Zestimate®'] === undefined){
      //   obj['Zestimate®'] = "no data"
      // }
      if(obj['Rent Zestimate®'] === undefined){
        obj['Rent Zestimate®'] = "no data"
      }
      if(obj['Lot size'] === undefined){
        obj['Lot size'] = "no data"
      }
      // if(obj["Property type"] === undefined){
      //   obj["Property type"] = "no data"
      // }

      const bd = $("span.bnmVPu");
      bd.each(function (idx, el){
        if(obj['sqft'] === undefined && $(el).text().includes('sqft')){
          obj['sqft'] = $(el).text();
        }         
      })
       
      // const tax = $(".hdp__sc-reo5z7-1", ".byXkTj");
      // console.log(tax.text());
      // tax.each(function (idx, el){
      //   let text = $(el).text();
      //   console.log("here inside of loop", idx);
      //   console.log(text);
      // })
      const Tax_Assessment = [];
      
      const tax = $("span.byXkTj");
      tax.each(function (idx, el){
       Tax_Assessment.push($(el).text());
      })
      obj["Tax Assessment"] = Tax_Assessment;

      if(Tax_Assessment.length === 0){
        const tax = $("span.yAzQT");
        tax.each(function (idx, el){
        Tax_Assessment.push($(el).text());
        })
        obj["Tax Assessment"] = Tax_Assessment;
      }
      // console.log(obj);
      // Text-c11n-8-62-5__sc-aiai24-0 kZKvMY
      let otherDataFlag = false;
      const otherData = $("li.kKWYwH");
      otherData.each(function (idx, el){
        console.log("this is other data",$(el).text());
        let arr = $(el).text().split(":");
        if(arr.length === 2){
          obj[arr[0]] = arr[1];
          otherDataFlag = true;
        }
      })
      // li.eUsGPL
      const otherData1 = $("li.eUsGPL");
      // if(!otherDataFlag){
      otherData1.each(function (idx, el){
        console.log("this is other data1111",$(el).text());
        let arr = $(el).text().split(":");
        if(arr.length === 2){
          obj[arr[0]] = arr[1];
        }
      })
      // }
      // zestimate value case-1
      const zest = $("span.kHJjYI");
      if($(zest).text().split('$')[1]?.length > 5){
        console.log("zest case-1", $(zest).text().split('$')[1]);
        obj["Zestimate®"] =  $(zest).text().split('$')[1];
      }
      // zestimate value case-2
      const zest1 = $("h3.gzNGZJ");
      if( !obj["Zestimate®"]  && $(zest1).text()?.length > 5){
        console.log("zest case-2", $(zest1).text())
        obj["Zestimate®"] =  $(zest1).text();
      }



      // adding no data 
      if(obj['Bedrooms'] === undefined){
        obj['Bedrooms'] = 'no data';
      }
      if(obj["Bathrooms"] === undefined){
        obj["Bathrooms"] = 'no data';
      }
      if(obj['sqft'] === undefined){
        obj['sqft'] = 'no data';
      } 
      if(obj['Zestimate®'] === undefined){
        obj['Zestimate®'] = 'no data';
      } 

      return obj;
    } catch (e) {
      console.log("err", e);
    }
  };
  
  module.exports = scrappingController;



   