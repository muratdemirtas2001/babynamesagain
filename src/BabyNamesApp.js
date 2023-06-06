import "./App.css";

import babyNamesData from "./babyNamesData.json";
import BabyNamesCard from "./BabyNamesCard";
import SearchBar from "./SearchBar";
import FavoriteNames from "./FavoriteNames";
import ResetButton from "./ResetButton";
import { useEffect, useState } from "react";
import GenderSelector from "./GenderSelector";


function BabyNamesApp() {
  let [favoriteName, setFavoriteName] = useState([]);
  let [noneFavoriteNames, setNoneFavoriteNames] = useState(babyNamesData);
  let [isClickingFavoriteNames] = useState(true);
  const [showFavoriteNameMessage, setShowFavoriteNameMessage] = useState(true);
  let storedFavoriteNames = localStorage.getItem("storedFavoriteNames");
  let storedNoneFavoriteNames = localStorage.getItem("storedNoneFavoriteNames");

  useEffect(() => {
    if (storedFavoriteNames && storedNoneFavoriteNames) {
      setFavoriteName(JSON.parse(storedFavoriteNames));
      setNoneFavoriteNames(JSON.parse(storedNoneFavoriteNames));
    }
  }, [storedFavoriteNames, storedNoneFavoriteNames]);
  function filterNames(e) {
    let searchInputValue = e.target.value.toUpperCase();
    let filteredBabyNames = babyNamesData.filter((baby) => {
      return baby.name.toUpperCase().includes(searchInputValue);
    });
    setNoneFavoriteNames(filteredBabyNames);
  }
  useEffect(() => {
    let favoriteNamesMessageShow = favoriteName.length > 0;
    setShowFavoriteNameMessage(favoriteNamesMessageShow);
  }, [favoriteName]);
  function moveToFavorite(e) {
    setFavoriteName();
    let name = e.target.value;
    console.log(name);
    let chosenName = babyNamesData.filter((baby) => {
      return baby.name === name;
    });
    chosenName = [...favoriteName, ...chosenName];
    noneFavoriteNames = noneFavoriteNames.filter((baby) => {
      return baby.name !== name;
    });
    setNoneFavoriteNames(noneFavoriteNames);
    setFavoriteName(chosenName);
    localStorage.setItem("storedFavoriteNames", JSON.stringify(chosenName));
    localStorage.setItem(
      "storedNoneFavoriteNames",
      JSON.stringify(noneFavoriteNames)
    );
  }
  function moveFromFavorite(e) {
    let name = e.target.value;
    let favoriteNames = favoriteName.filter((baby) => {
      return baby.name !== name;
    });
    let addNonefavorite = favoriteName.filter((baby) => {
      return baby.name === name;
    });
    noneFavoriteNames = [...noneFavoriteNames, ...addNonefavorite];
    setNoneFavoriteNames(noneFavoriteNames);
    setFavoriteName(favoriteNames);
    localStorage.setItem("storedFavoriteNames", JSON.stringify(favoriteNames));
    localStorage.setItem(
      "storedNoneFavoriteNames",
      JSON.stringify(noneFavoriteNames)
    );
  }
  const [genderPictureClass, setGenderPictureClass] = useState([
    false,
    false,
    false,
  ]);

  function resetSearch() {
    setNoneFavoriteNames(babyNamesData);
    setFavoriteName([]);
    setGenderPictureClass([true, false, false]);
    localStorage.clear();
  }
  function displayBoyNames() {
    let boyNames = babyNamesData.filter((baby) => {
      return baby.sex === "m";
    });
    setNoneFavoriteNames(boyNames);
    setGenderPictureClass([false, true, false]);
  }
  function displayGirlNames() {
    let girlNames = babyNamesData.filter((baby) => {
      return baby.sex === "f";
    });
    setNoneFavoriteNames(girlNames);
    setGenderPictureClass([false, false, true]);
  }
  let isSignedIn = true;
  return (
    <div>
       <div className="app-wrapper">
          <div className="navbar">
            <SearchBar filterNames={filterNames} />
            <GenderSelector
              displayBoyNames={displayBoyNames}
              displayGirlNames={displayGirlNames}
              resetSearch={resetSearch}
              genderPictureClass={genderPictureClass}
            />
            <ResetButton resetSearch={resetSearch} />
          </div>
          <div className="content-wrapper">
            <FavoriteNames
              babyNamesData={babyNamesData}
              moveFromFavorite={moveFromFavorite}
              newFavoriteName={favoriteName}
              isClickingFavoriteNames={isClickingFavoriteNames}
              showFavoriteNameMessage={showFavoriteNameMessage}
            />
            <hr></hr>
            <BabyNamesCard
              babyNames={noneFavoriteNames}
              moveToFavorite={moveToFavorite}
            />
          </div>
        </div>
    </div>
  );
}

export default BabyNamesApp;
