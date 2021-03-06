import parse from 'csv-parse/lib/sync';
import fs from 'fs';
const BASE_PATH = __dirname + '/../data/';

let inputString = fs.readFileSync(BASE_PATH+'db.csv', 'utf-8');
inputString = 'pid,members,category,details,cost\n' + inputString.replace(/^\uFEFF/, '');
let photoDataRaw = parse(inputString, { columns: true });

const uniq = (array) => {
  return array.filter((elem, pos, arr) => {
    return arr.indexOf(elem) == pos;
  });
};

// let categoryList = uniq(photoDataRaw.map(photo=>photo.category.trim()));
// categoryList = categoryList.filter(category=>!(category === ''));

// let photoPack = categoryList.map(category=>{
//   let photos = photoDataRaw.filter(photo=>photo.category.trim()===category);
//   photos = photos.map(pd=>{
//     return {
//       pid: pd.pid.replace(/.jpg$/, ''),
//       members: pd.members.replace(/\r/g, ''),
//       category: pd.category.trim(),
//       details: pd.details.trim(),
//       cost: parseInt(pd.cost)
//     };
//   });
//   return {
//     category,
//     photos
//   };
// });

// let photoData = {
//   categories: categoryList,
//   photoPack
// };
//

let categories = uniq(photoDataRaw.map(p=>p.category.trim()));
let photos = photoDataRaw.map(p=>{
  return {
    pid: p.pid.replace(/.jpg$/, ''),
    members: p.members.replace(/\r/g, ''),
    category: p.category.trim(),
    details: p.details.trim(),
    cost: parseInt(p.cost)
  };
});


export default {
  categories,
  photos
};
