const stars = document.querySelectorAll(".stars i");
console.log('enthenkilum dfd')

      stars.forEach((star, index1) => {
        star.addEventListener("click", () => {
          console.log('enthenkilum')
          const selectedValue = star.getAttribute("data-value");
          console.log(selectedValue);
          stars.forEach((star, index2) => {
            index1 >= index2 ? star.classList.add("active") : star.classList.remove("active");
          });

          const selectedValueInput = document.getElementById("selectedValue");
          selectedValueInput.value = selectedValue;
        });
      });