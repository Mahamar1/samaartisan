const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'src', 'lib', 'data.ts');
const generatedCategoriesPath = path.join(__dirname, 'generated_categories.json');

const categories = JSON.parse(fs.readFileSync(generatedCategoriesPath, 'utf8'));

// Format categories into TypeScript code
let categoriesTs = 'export const CATEGORIES: Category[] = [\n';
categories.forEach((cat, idx) => {
  categoriesTs += `  {\n`;
  categoriesTs += `    id: ${JSON.stringify(cat.id)},\n`;
  categoriesTs += `    name: ${JSON.stringify(cat.name)},\n`;
  categoriesTs += `    slug: ${JSON.stringify(cat.slug)},\n`;
  categoriesTs += `    iconName: ${JSON.stringify(cat.iconName)},\n`;
  categoriesTs += `    description: ${JSON.stringify(cat.description)},\n`;
  categoriesTs += `    shortDesc: ${JSON.stringify(cat.shortDesc)},\n`;
  categoriesTs += `    providerCount: ${cat.providerCount},\n`;
  categoriesTs += `    popularKeywords: ${JSON.stringify(cat.popularKeywords)},\n`;
  categoriesTs += `    bannerImage: ${JSON.stringify(cat.bannerImage)},\n`;
  categoriesTs += `    averageStartingPrice: ${cat.averageStartingPrice},\n`;
  categoriesTs += `  }${idx < categories.length - 1 ? ',' : ''}\n`;
});
categoriesTs += '];';

let dataContent = fs.readFileSync(dataPath, 'utf8');

const regex = /export const CATEGORIES: Category\[\] = \[[\s\S]*?\];/;
if (!regex.test(dataContent)) {
  console.error("Could not find CATEGORIES in data.ts");
  process.exit(1);
}

dataContent = dataContent.replace(regex, categoriesTs);
fs.writeFileSync(dataPath, dataContent, 'utf8');
console.log("Successfully updated CATEGORIES in data.ts with", categories.length, "trades!");
