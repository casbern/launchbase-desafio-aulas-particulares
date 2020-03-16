const currentPage = location.pathName

const items = document.querySelectorAll("header .links a")

for(item in items) {
  if(currentPage.includes(item.getAttribute("href"))) {
    item.classList.add("active")
  }
}