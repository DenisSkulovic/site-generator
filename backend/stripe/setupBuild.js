const fs = require('fs-extra')
const AdmZip = require("adm-zip");

const fileZipped = "./dist/dist.zip"
if (fs.existsSync(fileZipped)) {
  fs.unlinkSync(fileZipped)
}



async function createZipArchive() {
  const zip = new AdmZip();
  zip.addLocalFolder("./dist/");
  zip.addLocalFile("./dist/index.js");

  zip.writeZip(fileZipped);
  console.log(`Created ${fileZipped} successfully`);
}

createZipArchive();