/**
 * Roberto Sanchez
 *
 * Script listens for clicks on the image containers
 * and runs function to swap #active-image src and alt
 */

// arrray of object with cat data
const catData = [
  {
    name: "Bento",
    desc:
      "Bento, the Keyboard Cat, rose to fame due to his iconic keyboard skills. Bento died at the young age of 9.",
    src: "assets/bento.jpg",
    alt: "Thumbnail of Bento the keyboard cat",
    id: "bento",
  },
  {
    name: "Tardar Sauce",
    desc:
      "Tardar Sauce, the Grumpy Cat, is famous for his iconic smile. Tardar Sauce died at the young age of 7",
    src: "assets/tardar-sauce.jpg",
    alt: "Thumbnail of Tardar Sauce the grumpy cat",
    id: "tardar-sauce",
  },
  {
    name: "Honey Bee",
    desc:
      "Honey Bee, the Blind Hiking Cat, is famous for her amazing hiking abilities. Honey Bee is still alive.",
    src: "assets/honey-bee.jpg",
    alt: "Thumbnail of Honey Bee the blind hiking cat",
    id: "honey-bee",
  },
  {
    name: "Venus",
    desc:
      "Venus, the two-faced kitten, is famous for having a face with two different colors. Venus is still alive",
    src: "assets/venus.jpg",
    alt: "Thumbnail of Venus the two-faced kitten",
    id: "venus",
  },
  {
    name: "Garfi",
    desc:
      "Garfi, the world's angriest cat, is famous for his scary facial expressions. Garfi is still alive",
    src: "assets/garfi.jpg",
    alt: "Thumbnail of Garfi the angry cat",
    id: "garfi",
  },
  {
    name: "Snoopybabe",
    desc:
      "Snoopybabe, the cutest cat ever, is famous for having one of the cutest smiles ever. Snoopybabe is still alive.",
    src: "assets/snoopy.jpg",
    alt: "Thumbnail of Snoopybabe the cutest cat ever",
    id: "snoopy",
  },
];

/**
 * Function takes in cat id uses it to find the object
 * with the id in the array in order to swap the active image
 *
 * @param {String} id       Unique id for cat
 */
function swapImage(id) {
  const cat = catData.find((cat) => cat.id === id); // returns first object that matches cat id
  // check that a cat object was returned
  // otherwise do not update active image
  if (cat) {
    document.getElementById("active-image").src = cat.src; // updates the active image element's src
    document.getElementById("active-image").alt = cat.alt; // updates the active image element's alt
    document.getElementById("active-image-name").innerHTML = cat.name;
    document.getElementById("active-image-desc").innerHTML = cat.desc;
    updateThumbnailBorder(cat.id);
  }
}

/**
 * Removes the active border from the previous cat
 * Then applies border to the active cat thumbnail
 * @param {String} activeId  unique id for cat
 */
function updateThumbnailBorder(activeId) {
  catData.forEach((cat) => {
    // check if the thumbnail contains the active class
    if (document.getElementById(cat.id).classList.contains("active")) {
      document.getElementById(cat.id).classList.remove("active"); // removes active class from the thumbnail
    }
  });
  document.getElementById(activeId).classList.add("active"); // adds active border to thumbnail
}
