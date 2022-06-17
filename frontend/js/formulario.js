window.onload = () => {
  const query = new URLSearchParams(location.search);
  const btnAdd = document.querySelector("#btnAdd");
  const btnEdit = document.querySelector("#btnEdit");
  const btnDelete = document.querySelector("#btnDelete");
  const form = document.querySelector(".formulario");
  let id = document.querySelector("#id");
  let title = document.querySelector("#title");
  let rating = document.querySelector("#rating");
  let awards = document.querySelector("#awards");
  let release_date = document.querySelector("#release_date");
  let length = document.querySelector("#length");

  if (query.has("id")) {
    btnAdd.style.display = "none";

    let movieId = query.get("id");
    fetch("http://localhost:3031/api/movies/" + movieId)
      .then((res) => res.json())
      .then((movie) => {
        id.value = movie.data.id;
        title.value = movie.data.title;
        rating.value = movie.data.rating;
        awards.value = movie.data.awards;
        release_date.value = movie.data.release_date.split("T")[0];
        length.value = movie.data.length;
      })
      .catch((err) => console.log(err));

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      let data = {
        title: title.value,
        rating: rating.value,
        awards: awards.value,
        release_date: release_date.value,
        length: length.value,
        genre_id: 1,
      };

      let url = "http://localhost:3031/api/movies/update/" + movieId;
      console.log(url);

      fetch(url, {
        method: "PUT", // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((response) => console.log("Success:", response))
        .catch((error) => console.error("Error:", error));
    });

    btnDelete.addEventListener("click", (e) => {
      let eliminar = confirm("Are you sure you want to delete");

      if (eliminar) {
        // eliminar movie
      }
    });

    //
  } else {
    btnEdit.style.display = "none";
    btnDelete.style.display = "none";

    console.log("Cargar nuevo");
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      let data = {
        title: title.value,
        rating: rating.value,
        awards: awards.value,
        release_date: release_date.value,
        length: length.value,
        genre_id: 1,
      };

      let url = "http://localhost:3031/api/movies/create/";

      fetch(url, {
        method: "POST", // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((response) => console.log("Success:", response))
        .catch((error) => console.error("Error:", error));
    });
  }
};
