export default function dateFormat(dateISO) {
    const dateObject = new Date(dateISO);
  
    const monthsList = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
  
    const day = dateObject.getDate();
    const month = monthsList[dateObject.getMonth()];
    const year = dateObject.getFullYear();
    const formattedDate = `${month} ${day}, ${year}`;
  
    return formattedDate;
  }
  
  