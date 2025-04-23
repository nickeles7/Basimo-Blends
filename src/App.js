// App.js - Main Container Component
import React from 'react';
import './styles/App.css';
import { ShopProvider } from './context/ShopContext';
import Header from './components/Header';
// Remove the unused Hero import
import HeroSlideshow from './components/HeroSlideshow';
import ProductShowcase from './components/ProductShowcase';
import IngredientsList from './components/IngredientsList';
import Mission from './components/Mission';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import Cart from './components/Cart';

function App() {
  console.log('App component rendering'); // Debug log
  
  // Data structure that could be fetched from Shopify or CMS
  const pageData = {
    header: {
      id: "header",
      type: "site_header",
      content: {
        logo: {
          image: "/Transparent_Logo.webp",
          alt: "Basimo Blend Logo",
          link: "/",
          text: "Basimo Blend",
          style: {
            font_weight: "bold",
            font_size: "1.25rem",
            color: "#1e1e1e", 
            tracking: "wide",
            display_inline_with_logo: true
          }
        },
        navigation: [
          { label: "Home", link: "/" },
          { label: "Shop", link: "/shop" },
          { label: "Our Mission", link: "#mission" },
          { label: "Contact", link: "#footer" }
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
          id: "hero",
          type: "image_slideshow",
          content: {
            images: [
              "/images/hero-avocado-toast.jpg",
              "/images/hero-labneh-flatbread.jpg",
              "/images/hero-roasted-veggie-bowl.jpg"
            ],
            headline: "Za'atar. Simple. Organic. Bold.",
            subtext: "Crafted with love using 100% organic Mediterranean herbs",
            button: {
              text: "Shop Now",
              link: "/shop"
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
          id: "product",
          type: "product_showcase",
          content: {
            title: "Our Products",
            description: "Handcrafted with care, our organic blends bring Mediterranean flavors to your kitchen.",
            products: [
              {
                product_name: "Basimo Blend Organic Za'atar",
                price: "$10.95",
                image: "/images/zaatar_2.png",
                description: "Our signature Basimo Blend Za'atar is a versatile organic spice mix, handcrafted in small batches with premium ingredients. Perfect for dipping with olive oil, sprinkling on flatbreads, seasoning roasted vegetables, or elevating any Mediterranean dish.",
                size: "2.5 oz (70g) jar",
                shopify_product_id: "", // Will be filled with actual Shopify product ID
                shopify_variant_id: "", // Will be filled with actual Shopify variant ID
                button: {
                  text: "Add to Cart",
                  action: "shopify:add_to_cart"
                }
              },
              {
                product_name: "Organic Turkish Coffee Blend",
                price: "$10.99",
                image: "/images/zaatar_1.png",
                description: "A blend of finely ground organic ingredients including Organic Arabica Beans. Experience the rich, aromatic flavor of traditional Turkish coffee with our carefully crafted blend.",
                size: "2.5 oz (70g) jar",
                shopify_product_id: "", // Will be filled with actual Shopify product ID
                shopify_variant_id: "", // Will be filled with actual Shopify variant ID
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
          title: "Our Mission",
          content: "The energy that goes into our products: Care ~ Consideration ~ Love",
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
            links: ["About Us", "Shop", "Contact"]
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

  return (
    <ShopProvider>
      <div className="basimo-app">
        <Header
          content={pageData.header.content}
          style={pageData.header.style}
        />
        <HeroSlideshow
          images={pageData.homepage.sections[0].content.images}
          headline={pageData.homepage.sections[0].content.headline}
          subtext={pageData.homepage.sections[0].content.subtext}
          button={pageData.homepage.sections[0].content.button}
          style={pageData.homepage.sections[0].style}
        />
        
        <ProductShowcase 
          title={pageData.homepage.sections[1].content.title}
          description={pageData.homepage.sections[1].content.description}
          products={pageData.homepage.sections[1].content.products}
          style={pageData.homepage.sections[1].style}
        />
        
        <IngredientsList 
          title={pageData.homepage.sections[2].title}
          ingredients={pageData.homepage.sections[2].content}
          style={pageData.homepage.sections[2].style}
        />
        
        <Mission 
          title={pageData.homepage.sections[3].title}
          content={pageData.homepage.sections[3].content}
          style={pageData.homepage.sections[3].style}
        />
        
        <Testimonials 
          reviews={pageData.homepage.sections[4].content}
          style={pageData.homepage.sections[4].style}
        />
        
        <Footer 
          content={pageData.homepage.sections[5].content}
          style={pageData.homepage.sections[5].style}
        />
        
        <Cart />
      </div>
    </ShopProvider>
  );
}

export default App;