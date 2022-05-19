import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchCategories } from "../utils";
import { getAllPin, getPinsByCategoryKey } from "../utils/APIUtils";
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";

const Feed = () => {
  const [pins, setPins] = useState();
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState([]);
  const [ideaName, setIdeaName] = useState("");
  const { categoryId } = useParams();

  useEffect(() => {
    setCategory(fetchCategories());
  }, []);

  useEffect(() => {
    var t = category.filter((item) => {
      return item.key == categoryId;
    });
    if (t.length > 0) {
      setIdeaName(t[0].name);
    }

    if (categoryId) {
      setLoading(true);
      getPinsByCategoryKey(categoryId).then((resp) => {
        console.log(resp);
        setPins(resp);
        setLoading(false);
        setIdeaName("");
      });
    } else {
      setLoading(true);
      getAllPin().then((res) => {
        setPins(res);
        setLoading(false);
        setIdeaName("");
      });
    }
  }, [categoryId]);

  if (loading) {
    return <Spinner message={`正在加载 ${ideaName} 相关的内容!`} />;
  }
  return <div>{pins && <MasonryLayout pins={pins} />}</div>;
};

export default Feed;
