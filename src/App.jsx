import "./App.css";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import RouteLayout from "./layouts/RouteLayout";
import PostedBlog from "./pages/PostedBlog";
import PostedBlogDetails, {
  blogPostDetailLoader,
} from "./pages/PostedBlogDetails";
import PostCreate from "./pages/PostCreate";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RouteLayout />}>
      <Route index element={<PostedBlog />} />
      <Route
        path="post/:id"
        element={<PostedBlogDetails />}
        loader={blogPostDetailLoader}
      />
      <Route path="post/create" element={<PostCreate />} />

      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
