// Sample equation 4He + 14N = 17O + 1H
// A == NO OF PROTONS

// https://github.com/neelpatel05/periodic-table-api  --> more detail on use of API

// const c = 299792458; // speed of light in m/s
const c_in_MeV = 931.5 //MeV/c^2

const calcBtn = document.querySelector('.calculate')
const ans = document.getElementById('myDiv')

calcBtn.addEventListener('click', () => {
   ans.innerText = 'The Q Value is: - '
   massSum()
})

async function massSum(){
   
const reactants = document.querySelector('.reactants').value.split('+')
const products = document.querySelector('.products').value.split('+')

   let totalReactMass = 0 
   let totalProdMass = 0
   const reactantSym = getElementSymbol(reactants)  // array of symbols from reactant nd product side
   const productSym = getElementSymbol(products)

   //find total reactant mass
   for(let i = 0 ; i< reactantSym.length;i++){
      eleMass = await getElementAtomicMass(reactantSym[i])
      totalReactMass += +eleMass.slice(0,-3)
   }

   // find total product mass
   for(let i = 0 ; i< productSym.length;i++){
      eleMass = await getElementAtomicMass(productSym[i])
      totalProdMass += +eleMass.slice(0,-3)
   } 
   console.log(totalReactMass, totalProdMass)

   // find the qvalue
   const qvalue =  (totalReactMass - totalProdMass) * c_in_MeV
   console.log('q value is ' + qvalue)
   ans.innerText = `The Q Value is: ${qvalue} MeV `
  }

   async function getElementAtomicMass(el) {
   const response = await fetch(`https://neelpatel05.pythonanywhere.com/element/symbol?symbol=${el}`)
   var data = await response.json() 
   console.log(el + data.atomicMass)
   return  data.atomicMass
}

function getElementSymbol(eleArray) {
   const symArray = []
   symArray.length = 0

   eleArray.forEach(ele => {
      const element = ele.trim().split(/(\d+)/).filter(el => el != '')
      const eleName = capitalizeFirstLetter(element[1])
      symArray.push(eleName)
   })
   console.log('Symbols are:- ' + symArray) 
   return symArray
}


capitalizeFirstLetter = (str) => {
   return str.charAt(0).toUpperCase() + str.slice(1);
}