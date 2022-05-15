import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAllPin } from "../utils/APIUtils";
import { DummyPins } from "../utils/data";
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";

const Feed = () => {
  const [pins, setPins] = useState();
  const [loading, setLoading] = useState(false);
  const { categoryId } = useParams();

  useEffect(() => {
    if (categoryId) {
      setLoading(true);
    } else {
      // setLoading(true);
    }
    getAllPin().then((res) => {
      setPins(res);
    });
  }, [categoryId]);

  const ideaName = categoryId || "new";

  if (loading) {
    return (
      <Spinner message={`We are adding ${ideaName} ideas to your feed!`} />
    );
  }
  return <div>{pins && <MasonryLayout pins={pins} />}</div>;
};

export default Feed;
