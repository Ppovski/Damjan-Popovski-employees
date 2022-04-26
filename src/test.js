const
  oneDay  = 24 * 60 * 60 * 1000 // hours*minutes*seconds*milliseconds
, setDate = YMD =>
    {
    let [Y,M,D] = YMD.split('-').map(Number)
    return new Date(Y,--M,D)
    }
// group Employees by project id , change date string to JS newDate
const Proj_Emps = data.reduce( (r,[EmployeeID, ProjectID, StartDate, EndDate])=>
  {
  let stD = setDate(StartDate)
    , enD = EndDate ? setDate(EndDate) :  new Date()
  r[ProjectID] = r[ProjectID] ?? []
  r[ProjectID].push({EmployeeID,stD,enD})
  return r
  }, {})
// combination of pairs of employees per project 
let combination = {}
for (let proj in Proj_Emps) 
for (let i = 0; i < Proj_Emps[proj].length - 1; i++) 
for (let j = i + 1; j < Proj_Emps[proj].length; j++) 
  {
  let emA = Proj_Emps[proj][i]
  let emB = Proj_Emps[proj][j]
  if (( emA.enD <= emB.enD && emA.enD > emB.stD )
    ||( emB.enD <= emA.enD && emB.enD > emA.stD )
    ){
    let 
      D1   = emA.stD > emB.stD ? emA.stD : emB.stD
    , D2   = emA.enD < emB.enD ? emA.enD : emB.enD
    , days = Math.ceil((D2 - D1) / oneDay)
    , key  = `${emA.EmployeeID}-${emB.EmployeeID}`
      ;
    combination[key] = combination[key] ?? { emA: emA.EmployeeID, emB: emB.EmployeeID, sum:0, details:[] }
    combination[key].details.push({proj: Number(proj), days })
    combination[key].sum += days
    }
  } 
 
let Result  =  
  Object.entries(combination)
  .sort((a,b)=> b[1].sum - a[1].sum )
  .map(([k,v])=>v)
Result.forEach(el => console.log( JSON.stringify(el).replaceAll('"','')))