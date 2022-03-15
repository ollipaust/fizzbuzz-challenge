{
  ("use strict");

  let handleClick = undefined;
  let mobileNavState = false;

  const dropdownTrigger = document.getElementById("dropdownMenu");
  const dropdown = document.getElementById("dropdown");

  const mobileNav = document.getElementById("mobileNavEl");
  const mobileNavTrigger = document.getElementById("burgerMenu");
  const mobileNavCloseTrigger = document.getElementById("closeMobileNav");

  const ul = document.getElementById("fizzBuzzResults");
  const btn = document.getElementById("fizzBuzzBtn");
  const filters = document.getElementById("fizzBuzzFilters");
  const divider = document.getElementById("fizzDivider");
  const spinnerElement =
    '<div id="spinner" class="spinner"><svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="20" /></svg></div>';

  // mobile menu buttons
  mobileNavTrigger.onclick = function () {
    mobileNavState = !mobileNavState;

    if (mobileNavState == true) {
      mobileNav.classList.remove("hidden");
      mobileNav.classList.add("visible");
    } else if (mobileNavState == false) {
      mobileNav.classList.remove("visible");
      mobileNav.classList.add("hidden");
    }
  };
  mobileNavCloseTrigger.onclick = function () {
    mobileNavState = !mobileNavState;

    if (mobileNavState == true) {
      mobileNav.classList.remove("hidden");
      mobileNav.classList.add("visible");
    } else if (mobileNavState == false) {
      mobileNav.classList.remove("visible");
      mobileNav.classList.add("hidden");
    }

    // dropdown menu desktop
  };
  dropdown.onmouseenter = function () {
    dropdown.style.opacity = 1;
  };
  dropdownTrigger.onmouseenter = function () {
    dropdown.style.opacity = 1;
  };
  dropdown.onmouseleave = function () {
    dropdown.style.opacity = 0;
  };
  dropdownTrigger.onmouseleave = function () {
    dropdown.style.opacity = 0;
  };

  // FizzBuzz
  function FizzBuzz() {
    let startNr = 0;
    let endNr = 100;
    let str = "";
    const spinner = document.getElementById("spinner");
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("Results loaded");
        spinner.remove();
        btn.innerText = "Hide Results";
        btn.classList.replace("loading", "loading-done");
        btn.disabled = false;
        filters.style.display = "flex";
        divider.style.display = "block";
        for (startNr; startNr < endNr; str) {
          let result =
            (++startNr % 3 ? "" : "fizz") + (startNr % 5 ? "" : "buzz") ||
            startNr;
          let multiplesThree = startNr % 3;
          let multiplesFive = startNr % 5;
          let multiplesThreeFive = startNr % 15;
          if (multiplesThreeFive == 0) str = "fizz-buzz";
          else if (multiplesThree == 0) str = "fizz";
          else if (multiplesFive == 0) str = "buzz";
          else str = "none";

          let li = document.createElement("li");
          li.appendChild(document.createTextNode(result));
          li.setAttribute(
            "class",
            "fizzBuzz__item " + "item-" + startNr + " " + str
          );
          ul.appendChild(li);
        }
      }, 2000);
    });
  }
  // async call
  async function GetResults() {
    try {
      ul.innerHTML = spinnerElement;
      btn.innerText = "Loading Results";
      btn.classList.add("loading");
      ul.classList.remove("grid-hidden");
      btn.disabled = true;
      let result = await FizzBuzz();
      console.log(result);
    } catch (error) {
      console.log("Something went wrong!", error);
    }
  }
  // btn handler
  function FizzBuzzBtn() {
    handleClick = !handleClick;
    console.log(handleClick ? "sending request..." : "deleting results...");
    if (handleClick == undefined) {
      handleClick = true;
    } else if (handleClick == true) {
      GetResults();
      console.log("Results loading...");
    } else if (handleClick == false) {
      ul.innerHTML = "";
      btn.innerText = "Show Results";
      btn.classList.remove("loading-done");
      ul.classList.add("grid-hidden");
      filters.style.display = "none";
      divider.style.display = "none";
      console.log("Results deleted from DOM!");
    }
  }

  // searchbar
  function externalSearch() {
    let searchInput = document.getElementById("searchInput");
    let searchUrl =
      "https://www.statista.com/search/?q=" +
      searchInput.value +
      "&Search=&qKat=search&newSearch=true";
    return window.open(searchUrl, "");
  }
  window.onscroll = function () {
    scrollFunction();
  };
  // sticky header
  function scrollFunction() {
    let sn = document.getElementById("stickyNav");
    if (
      document.body.scrollTop > 100 ||
      document.documentElement.scrollTop > 100
    ) {
      sn.setAttribute(
        "class",
        "pageHeader__stickyHeader pageHeader__stickyHeader--active flex-box"
      );
    } else {
      sn.setAttribute(
        "class",
        "pageHeader__stickyHeader pageHeader__stickyHeader--inactive flex-box"
      );
    }
  }
}
