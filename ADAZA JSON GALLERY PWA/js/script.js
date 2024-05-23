document.addEventListener("DOMContentLoaded", function () {
  // Navigation click events
  document.querySelectorAll(".nav-link").forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      document.querySelectorAll(".nav-link").forEach(function (item) {
        item.parentElement.classList.remove("active");
      });
      link.parentElement.classList.add("active");

      var target = link.getAttribute("href").substring(1);
      document.querySelectorAll(".tab-content").forEach(function (content) {
        content.classList.remove("active");
      });
      document.getElementById(target).classList.add("active");
    });
  });

  // Load users data
  fetch("data/users.json")
    .then((response) => response.json())
    .then((data) => {
      var userList = document.getElementById("user-list");
      data.forEach(function (user) {
        var listItem = document.createElement("li");
        listItem.classList.add("list-group-item");
        listItem.innerHTML = `
                  <h5>${user.name}</h5>
                  <p><strong>Username:</strong> ${user.username}</p>
                  <p><strong>Email:</strong> ${user.email}</p>
                  <p><strong>Address:</strong> ${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}</p>
                  <p><strong>Phone:</strong> ${user.phone}</p>
                  <p><strong>Website:</strong> <a href="http://${user.website}" target="_blank">${user.website}</a></p>
                  <p><strong>Company:</strong> ${user.company.name} - ${user.company.catchPhrase}</p>
              `;
        userList.appendChild(listItem);
      });
    })
    .catch((error) => console.error("Error loading users:", error));

  // Load photos data
  fetch("data/photos.json")
    .then((response) => response.json())
    .then((data) => {
      var photoGallery = document.getElementById("photo-gallery");
      data.photos.forEach(function (photo) {
        var col = document.createElement("div");
        col.classList.add("col-md-4", "mb-4");
        var card = document.createElement("div");
        card.classList.add("card");
        var img = document.createElement("img");
        img.classList.add("card-img-top");
        img.src = "img/" + photo.src;
        img.alt = photo.title;
        var cardBody = document.createElement("div");
        cardBody.classList.add("card-body");
        var cardTitle = document.createElement("h5");
        cardTitle.classList.add("card-title");
        cardTitle.textContent = photo.title;
        cardBody.appendChild(cardTitle);
        card.appendChild(img);
        card.appendChild(cardBody);
        col.appendChild(card);
        photoGallery.appendChild(col);
      });
    })
    .catch((error) => console.error("Error loading photos:", error));
});
