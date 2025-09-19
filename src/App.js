// App.js - Main Container Component
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/App.css';
import { ShopProvider } from './context/ShopContext';
import Header from './components/Header';
import HeroSlideshow from './components/HeroSlideshow';
import ProductShowcase from './components/ProductShowcase';
import IngredientsList from './components/IngredientsList';
import Mission from './components/Mission';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import Cart from './components/Cart';
import BlogList from './components/blog/BlogList';
import BlogPost from './components/blog/BlogPost';
import { setupScrollNav } from './utils/scrollNavUtils';
import './utils/smoothscroll'; // Import the smoothscroll polyfill
import './styles/SectionSpacing.css';

function App() {
  console.log('App component rendering'); // Debug log
  
  // Set up scroll navigation when component mounts
  useEffect(() => {
    setupScrollNav();
    const handleScroll = () => {
      if (window.scrollY > 10) {
        document.body.classList.add('scrolled-header');
      } else {
        document.body.classList.remove('scrolled-header');
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Data structure that could be fetched from Shopify or CMS
  const pageData = {
    header: {
      id: "header",
      type: "site_header",
      content: {
        logo: {
          image: "/Transparent_Logo.webp",
          alt: "Basimo Blends Logo",
          link: "/",
          text: "Basimo Blends",
          style: {
            font_weight: "bold",
            font_size: "1.25rem",
            color: "#1e1e1e", 
            tracking: "wide",
            display_inline_with_logo: true
          }
        },
        navigation: [
          { label: "Shop", link: "#shop" },
          { label: "Blog", link: "/blog" },
          { label: "The Mission", link: "#mission" },
          { label: "Connect", link: "#footer" }
        ],
        cart_icon: {
          visible: true,
          icon: "shopping_cart",
          action: "open_shopify_cart_drawer"
        },
        mobile_menu: {
          hamburger_toggle: true,
          breakpoint: "md"
        }
      },
      style: {
        position: "sticky",
        top: 0,
        z_index: 50,
        background: "white",
        padding: "1rem 2rem",
        layout: "flex_row_space_between_centered",
        gap: "2rem",
        font_family: "serif + sans-serif",
        shadow: "sm",
        logo_alignment: "center_vertical",
        nav_alignment: "middle",
        text_color: "#1a1a1a",
        hover_effect: {
          nav_links: {
            hover_color: "#3b3b3b",
            transition: "ease-in-out 0.2s"
          }
        },
        responsive: {
          collapse_nav_on_small: true,
          hamburger_position: "right"
        }
      }
    },
    homepage: {
      sections: [
        {
          id: "place",
          type: "image_slideshow",
          content: {
            images: [
              "/images/hero-avocado-toast.jpg",
              "/images/hero-labneh-flatbread.jpg",
              "/images/hero-roasted-veggie-bowl.jpg"
            ],
            headline: "Delicious ~ Organic ~ Simplicity",
            subtext: "Created using the freshest, most flavorful, aromatic Organic Ingredients",
            button: {
              text: "SHOP HERE",
              link: "#shop"
            }
          },
          style: {
            background: "white",
            text_align: "center",
            padding: "lg",
            image_size: "large"
          }
        },
        {
          id: "shop",
          type: "product_showcase",
          content: {
            title: "The Goods",
            description: "Our handcrafted blends feature meticulously selected Organic Ingredients, designed to deliver vibrant flavors that elevate your culinary journey.",
            products: [
              {
                product_name: "Basimo Blends Organic Za'atar",
                price: "$11.95",
                image: "/images/zaatar_2.png",
                description: "Our signature Basimo Blends Za'atar is a versatile organic spice mix, handcrafted in small batches...",
                size: "2.1 oz (60g) jar",
                shopify_product_id: "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzQ2MDg4MzI3NjYwOTE=",
                shopify_variant_id: "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zMjYwODk0MDU1NjQyNw==",
                button: {
                  text: "Add to Cart",
                  action: "shopify:add_to_cart"
                }
              },
              {
                product_name: "Organic Turkish Coffee Blend",
                price: "$10.99",
                image: "/images/zaatar_1.png",
                description: "A blend of finely ground organic ingredients including Organic Arabica Beans...",
                size: "2.5 oz (70g) jar",
                shopify_product_id: "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzQ3ODg3NTY3MDk1MTU=",
                shopify_variant_id: "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80NjY5MzQ4NzExNjQ0MA==",
                button: {
                  text: "Add to Cart",
                  action: "shopify:add_to_cart"
                }
              }
            ]
          },
          style: {
            layout: "grid",
            background: "#fefefe"
          }
        },
        {
          id: "ingredients",
          type: "bulleted_list",
          title: "Ingredients",
          content: [
            "Organic Dried Thyme",
            "Organic Sesame Seeds (Black & White)",
            "Black Cumin (Nigella Sativa)",
            "Sumac",
            "Celtic Sea Salt",
            "Chia",
            "Hemp",
            "Quinoa",
            "Dulse",
            "Olive Oil",
            "Cayenne Pepper"
          ],
          style: {
            background: "#f5f5f5",
            text_color: "#333",
            font: "sans-serif"
          }
        },
        {
          id: "mission",
          type: "text_block",
          title: "The Mission",
          content: "The energy that goes into every product that we create\nCare\u00A0~\u00A0Consideration\u00A0~\u00A0Love!",
          style: {
            background: "white",
            text_align: "center",
            font_style: "italic"
          }
        },
        {
          id: "reviews",
          type: "testimonial_preview",
          content: [
            {
              quote: "Best za'atar I've ever had — it elevates everything from hummus to eggs!",
              name: "Verified Customer"
            },
            {
              quote: "Basimo blend's Zaatar is so delicious! There's a perfectly balanced blend of organic ingredients giving it wonderful flavor, adding a healthy Middle Eastern flare to your food. I love it! It's now a staple in my household!",
              name: "Malia"
            }
          ],
          style: {
            background: "#fff9ec",
            font_size: "sm"
          }
        },
        {
          id: "footer",
          type: "footer",
          content: {
            newsletter_signup: true,
            social_links: ["instagram", "email"],
            links: [" ", " ", " "]
          },
          style: {
            background: "#eeeeee",
            text_color: "#666",
            padding: "md"
          }
        }
      ]
    }
  };

  // Homepage component
  const HomePage = () => (
    <>
      <section id="place">
        <HeroSlideshow
          images={pageData.homepage.sections[0].content.images}
          headline={pageData.homepage.sections[0].content.headline}
          subtext={pageData.homepage.sections[0].content.subtext}
          button={pageData.homepage.sections[0].content.button}
          style={pageData.homepage.sections[0].style}
        />
      </section>

      <section id="shop">
        <ProductShowcase
          title={pageData.homepage.sections[1].content.title}
          description={pageData.homepage.sections[1].content.description}
          products={pageData.homepage.sections[1].content.products}
          style={pageData.homepage.sections[1].style}
        />
      </section>

      <section id="ingredients">
        <IngredientsList
          title={pageData.homepage.sections[2].title}
          ingredients={pageData.homepage.sections[2].content}
          style={pageData.homepage.sections[2].style}
        />
      </section>

      <section id="mission">
        <Mission
          title={pageData.homepage.sections[3].title}
          content={pageData.homepage.sections[3].content}
          style={pageData.homepage.sections[3].style}
        />
      </section>

      <section id="reviews">
        <Testimonials
          reviews={pageData.homepage.sections[4].content}
          style={pageData.homepage.sections[4].style}
        />
      </section>

      <section id="footer">
        <Footer
          content={pageData.homepage.sections[5].content}
          style={pageData.homepage.sections[5].style}
        />
      </section>
    </>
  );

  return (
    <ShopProvider>
      <Router>
        <div className="basimo-app">
          <Header
            content={pageData.header.content}
            style={pageData.header.style}
          />

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
          </Routes>

          <Cart />
        </div>
      </Router>
    </ShopProvider>
  );
}

export default App;