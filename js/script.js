//PAGINATION FUNCTIONALTY
const itemsContainer = document.querySelector(".sections__items");
const prevButton = document.querySelector(".sections__pagination--prev");
const nextButton = document.querySelector(".sections__pagination--next");
const sectionsBtn = document.querySelectorAll(".sections__btn");

function updatePagination() {
  const totalItemsWidth = itemsContainer.scrollWidth;
  const viewportWidth = window.innerWidth;

  if (totalItemsWidth <= viewportWidth) {
    prevButton.style.display = "none";
    nextButton.style.display = "none";
  } else {
    prevButton.style.display = "block";
    nextButton.style.display = "block";
  }
}

updatePagination();

window.addEventListener("resize", updatePagination);

const sections = document.querySelector(".sections");

const itemWidth = 165;
let isScrolling = false;

function scrollLeft() {
  if (!isScrolling) {
    const scrollAmount = itemWidth * 3;

    isScrolling = true;

    itemsContainer.scrollBy({
      left: -scrollAmount,
      behavior: "smooth",
    });

    prevButton.disabled = true;
    nextButton.disabled = true;

    setTimeout(() => {
      isScrolling = false;
      prevButton.disabled = false;
      nextButton.disabled = false;
    }, 500);
  }
}

function scrollRight() {
  if (!isScrolling) {
    const scrollAmount = itemWidth * 3;

    isScrolling = true;

    itemsContainer.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });

    prevButton.disabled = true;
    nextButton.disabled = true;

    setTimeout(() => {
      isScrolling = false;
      prevButton.disabled = false;
      nextButton.disabled = false;
    }, 500);
  }
}

prevButton.addEventListener("click", scrollRight);
nextButton.addEventListener("click", scrollLeft);

//************************************************* */

//ADD ITEM TO CATR
const addBtn = document.querySelectorAll(".add-btn");
const itemContent = document.querySelectorAll(".item__name");
const itemPrice = document.querySelectorAll(".item__price");
const itemImg = document.querySelectorAll(".items__item--main-img");
//parseFloat(itemPrice[i].textContent.match(/\d+/)[0])

addBtn.forEach((btn, i) => {
  const itemName = itemContent[i].childNodes[0].nodeValue.trim(); // Get the item name
  btn.addEventListener("click", () => {
    Swal.fire({
      showCloseButton: true,
      width: 370,
      showConfirmButton: false,
      html: `
        <form class="addItem">
          <div class="addItem__info">
            <img src="${itemImg[i].src}" 
            alt="${itemImg[i].alt}" 
            class="addItem__info--img"
            loading="lazy">
            <h1 class="addItem__info--name">${itemName} <span class="addItem__info--price">${
        itemPrice[i].textContent
      }<span></h1>
          </div>
          <div class="addItem__orderInfo">
            <p class="addItem__orderInfo--extras">الإضافات</p>
              <div class="addItem__orderInfo--extra">
                <p class="addItem__orderInfo--extraName">ثومية</p>
                <p class="addItem__orderInfo--extraPrice">1000 د.ع</p>
                <input class="addItem__orderInfo--extraQty" type="number" step="1" value="1" min="1">
                <input class="addItem__orderInfo--extraCheck" type="checkbox">
              </div>
              <div class="addItem__orderInfo--extra">
                <p class="addItem__orderInfo--extraName">صلصة الباربكيو</p>
                <p class="addItem__orderInfo--extraPrice">1000 د.ع</p>
                <input class="addItem__orderInfo--extraQty" type="number" step="1" value="1" min="1">
                <input class="addItem__orderInfo--extraCheck" type="checkbox">
              </div>
            <textarea class="addItem__orderInfo--note" placeholder="إضافة ملاحضات ..."></textarea>
            <div class="addItem__orderInfo--qtyBox">
              <button type="button" class="addItem__orderInfo--qtyBox-btn addItem__orderInfo--decrease">-</button>
              <input class="addItem__orderInfo--qtyBox-qty" type="number" value="1" min="1">
              <button type="button" class="addItem__orderInfo--qtyBox-btn addItem__orderInfo--increase">+</button>
            </div>
            <h1 class="addItem__orderInfo--total">المجموع ${parseFloat(
              itemPrice[i].textContent.match(/\d+/)[0]
            )} د.ع</h1>
            <button type="button" class="btn addItem__orderInfo--btn">إضافة</button>
          </div>
        </form>
      `,
    });

    const qtyInput = document.querySelector(
      ".swal2-container .addItem__orderInfo--qtyBox-qty"
    );
    const decreaseButton = document.querySelector(
      ".swal2-container .addItem__orderInfo--decrease"
    );
    const increaseButton = document.querySelector(
      ".swal2-container .addItem__orderInfo--increase"
    );
    const total = document.querySelector(
      ".swal2-container .addItem__orderInfo--total"
    );
    const extras = document.querySelectorAll(
      ".swal2-container .addItem__orderInfo--extra"
    );

    const updateTotal = () => {
      let totalPrice = parseFloat(itemPrice[i].textContent.match(/\d+/)[0]);
      let totalExtras = 0;

      extras.forEach((extra) => {
        const checkbox = extra.querySelector(".addItem__orderInfo--extraCheck");
        const extraQtyInput = extra.querySelector(
          ".addItem__orderInfo--extraQty"
        );
        const extraPrice =
          parseFloat(
            extra
              .querySelector(".addItem__orderInfo--extraPrice")
              .textContent.match(/\d+/)[0]
          ) * extraQtyInput.value;

        if (checkbox.checked) {
          totalExtras += extraPrice;
        }
      });

      const quantity = parseInt(qtyInput.value, 10);
      if (qtyInput.value) {
        total.textContent = `المجموع ${
          totalPrice * quantity + totalExtras
        } د.ع`;
      }
    };

    // Add an event listener to each 'extraQty' input
    extras.forEach((extra) => {
      const extraQtyInput = extra.querySelector(
        ".addItem__orderInfo--extraQty"
      );
      extraQtyInput.addEventListener("input", () => {
        updateTotal(); // Recalculate the total when 'extraQty' input changes
      });
    });

    extras.forEach((extra) => {
      const checkbox = extra.querySelector(".addItem__orderInfo--extraCheck");
      checkbox.addEventListener("change", () => {
        updateTotal();
      });
    });

    decreaseButton.addEventListener("click", () => {
      const currentQty = parseInt(qtyInput.value, 10);
      if (currentQty > 1) {
        qtyInput.value = currentQty - 1;
        updateTotal();
      }
      if (!qtyInput.value) {
        qtyInput.value = 1;
      }
    });

    increaseButton.addEventListener("click", () => {
      const currentQty = parseInt(qtyInput.value, 10);
      qtyInput.value = currentQty + 1;
      if (!qtyInput.value) {
        qtyInput.value = 1;
      }
      updateTotal();
    });

    qtyInput.addEventListener("input", () => {
      const enteredQty = parseInt(qtyInput.value, 10);
      if (enteredQty < 1) {
        qtyInput.value = 1;
      }
      updateTotal();
    });
    const orderBtn = document.querySelector(".addItem__orderInfo--btn");
    orderBtn.addEventListener("click", () => {
      Swal.fire({
        icon: "success",
        title: `تم إضافة ${itemName} عدد ${qtyInput.value} الى قائمة الطلبات`,
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });
    });
  });
});

const cart = document.querySelector(".header__cart");
cart.addEventListener("click", () => {
  Swal.fire({
    showCloseButton: true,
    width: 370,
    showConfirmButton: false,
    html: `
      <form class="cart">
        <h1 class="cart__title">تفاصيل الطلب</h1>
        <div class="cart__items">
          <div class="cart__items--header">
            <h2>المنتج</h2>
            <h2>العدد</h2>
            <h2>المجموع</h2>
          </div>

          <i class="cart__items--delete fa-regular fa-trash-can"></i>
          <p class="cart__items--name">دبل بركر</p>
          <p class="cart__items--qty">2</p>
          <p class="cart__items--price">10000 د.ع</p>

          <i class="cart__items--delete fa-regular fa-trash-can"></i>
          <p class="cart__items--name">بركر لحم</p>
          <p class="cart__items--qty">1</p>
          <p class="cart__items--price">6000 د.ع</p>

          <i class="cart__items--delete fa-regular fa-trash-can"></i>
          <p class="cart__items--name">بيتزا خضار</p>
          <p class="cart__items--qty">1</p>
          <p class="cart__items--price">7000 د.ع</p>

        </div>

        <h1 class="cart__total">المجموع : 23000 د.ع</h1>
        <button type="button" class="btn cart__btn">إتمام عملية الطلب</button>

      </form>
    `,
  });
  const cartBtn = document.querySelector(".cart__btn");
  cartBtn.addEventListener("click", () => {
    Swal.fire({
      icon: "success",
      title: "تم الطلب بنجاح",
      showConfirmButton: false,
      timer: 2500,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });
  });

  const deleteIcons = document.querySelectorAll(".cart__items--delete");

  deleteIcons.forEach((deleteIcon, i) => {
    deleteIcon.addEventListener("click", () => {});
  });
});
