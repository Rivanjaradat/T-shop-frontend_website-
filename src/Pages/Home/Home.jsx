import Categories from "../Categories/Categories";
import "./home.css";
import homeimage1 from "../../assets/image/Home/home1.jpg";
import homeimage2 from "../../assets/image/Home/home2.jpg";
import homeimage3 from "../../assets/image/Home/home3.jpg";



export default function Home() {



  return (
    <>
   <section className="home  
   ">
        
        <div className="leftSide">
          <h1>Shop with us</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            itaque, voluptas, tempore, quod quidem dolorum voluptatem quos
            necessitatibus quae qui quibusdam. Quisquam itaque, voluptas, tempore,
            quod quidem dolorum voluptatem quos necessitatibus quae qui quibusdam.
          </p>
          <button >shop Now!</button>
  </div>
  <div className="rightSide">
          
            <img src={homeimage1} alt="homeimage1" />
        </div>
    </section>
       <section className="Categories container">
        <h2>Check out our categories</h2>
        <Categories />
      </section>

    </>
  );
}
