import Categories from "../Categories/Categories";
import imageSrc from "../../assets/image/public/home.jpg";
import "./home.css";

export default function Home() {
  return (
    <div className="container">
      <header>
        <div className="home_text">
          <h1>Welcome to T Shop</h1>
          <p>Find the best products at the best prices</p>
         
        </div>
        <img src={imageSrc} alt="Image description" />
      </header>

      <section className="Categories">
        <h2>Check out our categories</h2>
        <Categories />
      </section>
    </div>
  );
}
