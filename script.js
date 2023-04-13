// Sample equation 4He + 14N = 17O + 1H
// A == NO OF PROTONS

// https://github.com/neelpatel05/periodic-table-api  --> more detail on use of API

// const c = 299792458; // speed of light in m/s
const c = 931.5 //MeV/c^2
const uToKg = 1.66054e-27; // conversion factor from atomic mass unit (u) to kilograms (kg)

const n = 1.008665 // mass of neutron in amu
const p = 1.00727647 // mass of proton in amu


const calcBtn = document.querySelector('.calculate')
const ans = document.getElementById('myDiv')

calcBtn.addEventListener('click', () => {
//   console.log(calc())
ans.innerText = calc()
console.log(ans.innerText)
})

 function calc(){
   // console.log('am i working ')

   // Get elements from reactant and product side 
   const reactants = document.querySelector('.reactants').value.split('+')
   const products = document.querySelector('.products').value.split('+')

   const reactantSym = getElementSymbol(reactants)  // array of symbols from reactant nd product side
   const productSym = getElementSymbol(products)

   // total Mass sum on one side 
   const totalReactMass= massSum(reactantSym)
   const totalProdMass= massSum(productSym)

   // find the qvalue
   const qvalue =  totalReactMass - totalProdMass * c * c
   console.log('q value is ' + qvalue)
   return qvalue
}

async function getElementAtomicMass(el) {
   const response = await fetch(`https://neelpatel05.pythonanywhere.com/element/symbol?symbol=${el}`)
   var data = await response.json() 
   return  data.atomicMass
}

async function massSum(elearr){
   let totalMass = 0 

   for(let i = 0 ; i< elearr.length;i++){
      eleMass = await getElementAtomicMass(elearr[i])
      totalMass += +eleMass.slice(0,-3)
   }
   console.log('Mass for ' + elearr + ' : ' + totalMass )
   return totalMass
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

function findQvalue(reactantMass, productMass) {
   const qvalue = reactantMass - productMass * c * c
   return qvalue
}
