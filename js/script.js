  function showTab(index) {
    const tabs = document.querySelectorAll(".tab-content");
    const buttons = document.querySelectorAll(".tab-btn");
    tabs.forEach((tab, i) => {
      tab.classList.toggle("active", i === index);
      buttons[i].classList.toggle("active", i === index);
    });
  }