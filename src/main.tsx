import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import StarRating from "./components/star-rating.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
    {/* <StarRating
      numStars={5}
      defaultRating={3}
      messages={["Maa chudwa", "Bad", "Ok", "Good", "Loved It"]}
    /> */}
  </React.StrictMode>
);
// function Test() {
//   const [movieRating, setMovieRating] = useState(0);
//   return (
//     <div>
//       <StarRating
//         numStars={10}
//         defaultRating={3}
//         setExternalRating={setMovieRating}
//       />
//       <p>This movie was rated {movieRating} stars</p>
//     </div>
//   );
// }
