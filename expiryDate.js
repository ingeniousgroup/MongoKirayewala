var expiryDate = new Date();
var dd = expiryDate.getDate();
var mm = expiryDate.getMonth()+1; 
var yyyy = expiryDate.getFullYear();


if(dd<10) 
    dd='0'+dd; 
if(mm<10) 
    mm='0'+mm; 
expiryDate = dd+'/'+(mm*1+3)+'/'+yyyy;

if(mm>12){
    yyyy = yyyy + 1;
    mm = 1;
}
    

export default expiryDate;