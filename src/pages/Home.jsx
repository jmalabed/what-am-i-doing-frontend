import PostTable from "../components/PostTable";
import AddPost from "../components/AddPost";
import { useState, useEffect } from "react";
import axios from "axios";

const Home = (props) => {
  const [posts, setPosts] = useState([]);

  // post functions
  const addPost = async (data) => {
    try {
      // const configs = {
      //   body: JSON.stringify(data),
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // };
      // const addedPost = await fetch("http://localhost:9000/post", configs);

      // add axios post request;
      const addedPost = await axios.post("http://localhost:9000/post", data);
      const parsedPost = addedPost.data;
      console.log(parsedPost);
      setPosts([parsedPost, ...posts]);
    } catch (e) {
      console.log(e);
    }
  };

  const getPosts = async () => {
    try {
      console.log(props);
      // const allPosts = await fetch("http://localhost:9000/post");
      // const parsedPosts = await allPosts.json();

      // adding axios get request
      const allPosts = await axios.get("http://localhost:9000/post");
      const parsedPosts = allPosts.data;
      const swap = (arr) => {
        let a = 0,
          b = arr.length - 1;
        while (a < b) {
          const temp = arr[a];
          arr[a] = arr[b];
          arr[b] = temp;
          a++;
          b--;
        }
        // console.log(arr);
      };
      swap(parsedPosts);
      setPosts(parsedPosts);
      console.log(parsedPosts);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteItem = async (id) => {
    try {
      // const configs = {
      //   method: "DELETE",
      // };
      // const deletedItem = await fetch(
      //   "http://localhost:9000/post/" + id,
      //   configs
      // );
      // const parsedItem = await deletedItem.json();

      //  axios delete request!!

      const deletedItem = await axios.delete(
        "http://localhost:9000/post/" + id
      );
      const parsedItem = deletedItem.data;
      const filteredPosts = posts.filter((post) => post._id !== id);
      setPosts(filteredPosts);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      <AddPost addPost={addPost} posts={posts} setPosts={setPosts} />
      <PostTable posts={posts} setPosts={setPosts} deleteItem={deleteItem} />
    </div>
  );
};
export default Home;
