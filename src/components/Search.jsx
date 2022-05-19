import React, { useEffect, useState } from "react";
import { getAllPin, searchPinsByTitleOrAbout } from "../utils/APIUtils";

import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";

const Search = ({ searchTerm }) => {
  const [pins, setPins] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(searchTerm);
    if (searchTerm !== "") {
      setLoading(true);
      searchPinsByTitleOrAbout(searchTerm).then((resp) => {
        setLoading(false);
        setPins(resp);
      });
    }
  }, [searchTerm]);

  return (
    <div>
      {loading && <Spinner message="Searching pins" />}
      {pins?.length !== 0 && <MasonryLayout pins={pins} />}
      {pins?.length === 0 && searchTerm !== "" && !loading && (
        <div className="mt-10 text-center text-xl ">没有相关内容!</div>
      )}
    </div>
  );
};

export default Search;
