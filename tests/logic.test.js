const test=require("node:test");const assert=require("node:assert/strict");const L=require("../src/logic.js");
test("staff CSV mapping",()=>{const s=L.mapStaff("name,title,email,phone\nAlex Doe,Manager,alex@example.com,555-0100\n");assert.equal(s.length,1);assert.equal(s[0].name,"Alex Doe");assert.equal(s[0].email,"alex@example.com");});
test("signature contains name and table",()=>{const h=L.buildSignature({name:"Alex Doe",title:"Manager",email:"alex@example.com",phone:""},"classic",{company:"Example Co"});assert.match(h,/<table/);assert.match(h,/Alex Doe/);assert.match(h,/Example Co/);});
test("escaping prevents broken HTML",()=>{const h=L.buildSignature({name:"A<B",title:"",email:"",phone:""},"compact",{});assert.match(h,/A&lt;B/);assert.doesNotMatch(h,/A<B/);});
test("all 3 layouts differ and contain email",()=>{const p={name:"Sam Poe",title:"Dev",email:"sam@example.com",phone:"1"};for(const lay of ["classic","compact","banner"]){assert.match(L.buildSignature(p,lay,{}),/sam@example\.com/);}assert.notEqual(L.buildSignature(p,"compact",{}),L.buildSignature(p,"banner",{}));});
test("filename per employee",()=>{assert.equal(L.filenameFor({name:"Alex Doe"}),"alex-doe-signature.html");assert.equal(L.filenameFor({name:"  "}),"signature-signature.html");});
test("README covers Gmail Outlook Apple Mail",()=>{const r=L.buildReadme({company:"Example Co"});assert.match(r,/Gmail/);assert.match(r,/Outlook/);assert.match(r,/Apple Mail/);});
test("CSV parser handles quoted commas",()=>{const rows=L.parseCsv('a,b\n"x,y",2\n');assert.deepEqual(rows[1],["x,y","2"]);});
