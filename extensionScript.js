// Pass a number, not a string.
function dateKeyToDate(dateKey) {
    let date = new Date('March 11, 1950');
    date.setDate(date.getDate() + dateKey);
    return date;
}

let colheaders = document.querySelectorAll("div[role='presentation'] div[role='columnheader'] h2");
colheaders.forEach(el => {
    const dateKey = parseInt(el.querySelector("div[role='link']").getAttribute("data-datekey"), 10);
    el.style.backgroundColor = "red";
    el.textContent = dateKeyToDate(dateKey);
})