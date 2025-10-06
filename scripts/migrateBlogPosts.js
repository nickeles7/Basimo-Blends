// scripts/migrateBlogPosts.js
const { createClient } = require('@sanity/client');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const client = createClient({
  projectId: 'ua6bwc3k',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: 'skVHmxm5VliRKBFca0VTGz8pjgOrxvoQSMIIQ2YNB4vX489Qg6iY11OJhkrSqXixrcdTSk8g6agTz0HZrEaUJpDoslWl3gJc2pnTr0ZY2fheygo9VdshSRXORiYSactn1Y7nRXqtjPAPW9MH5NsgaCDHGS5q2xsZFHOlW8eOP5vi59IQjZZd',
});

// Your existing blog posts
const blogPosts = [
  {
    slug: 'perfect-zaatar-roasted-chicken',
    title: "Perfect Za'atar Roasted Chicken Recipe",
    publishedAt: '2024-12-15T00:00:00Z',
    author: 'Basimo Blends',
    category: 'Recipes',
    tags: ['zaatar', 'chicken', 'dinner', 'organic', 'mediterranean'],
    excerpt: "Transform your dinner with this aromatic za'atar roasted chicken that showcases the incredible flavor of our organic spice blend.",
    readTime: '8 min read',
    relatedProducts: ['zaatar-blend'],
    content: `# Perfect Za'atar Roasted Chicken Recipe

This aromatic roasted chicken showcases the incredible flavor of our organic za'atar blend. The combination of herbs, sesame seeds, and sumac creates a crispy, flavorful crust that will make this your new favorite dinner recipe.

## Ingredients

- 1 whole chicken (3-4 lbs)
- 3 tbsp Basimo Blends Organic Za'atar
- 2 tbsp extra virgin olive oil
- 1 lemon (juiced and zested)
- 3 cloves garlic, minced
- Salt and black pepper to taste
- 1 onion, quartered
- Fresh herbs for garnish

## Instructions

1. **Preheat your oven** to 425°F (220°C).

2. **Prepare the chicken** by patting it dry with paper towels. This ensures crispy skin.

3. **Make the za'atar paste** by mixing our organic za'atar with olive oil, lemon juice, lemon zest, and minced garlic.

4. **Season the chicken** generously with salt and pepper, then rub the za'atar paste all over the skin and inside the cavity.

5. **Stuff the cavity** with quartered onion and any remaining lemon halves.

6. **Roast for 60-75 minutes** until the internal temperature reaches 165°F (74°C).

7. **Rest for 10 minutes** before carving.

## Chef's Tips

- For extra crispy skin, let the seasoned chicken sit uncovered in the refrigerator for 2-4 hours before roasting
- Save the pan drippings to make a delicious gravy
- Serve with roasted vegetables tossed in our za'atar blend

## The Magic of Our Za'atar

Our organic za'atar blend features hand-selected thyme, sesame seeds, sumac, and other premium ingredients that create layers of flavor - earthy, tangy, and aromatic all at once.

*Enjoy this recipe? Share it with friends and tag us @basimoblend on Instagram!*`,
  },
  {
    slug: 'health-benefits-organic-thyme',
    title: 'The Amazing Health Benefits of Organic Thyme',
    publishedAt: '2024-12-10T00:00:00Z',
    author: 'Basimo Blends',
    category: 'Health',
    tags: ['thyme', 'health', 'organic', 'antioxidants', 'wellness'],
    excerpt: "Discover why organic thyme is more than just a flavorful herb - it's a powerhouse of health benefits that have been treasured for centuries.",
    readTime: '5 min read',
    relatedProducts: ['zaatar-blend'],
    content: `# The Amazing Health Benefits of Organic Thyme

Thyme isn't just a delicious herb that adds incredible flavor to your dishes - it's also packed with health benefits that have been recognized for thousands of years. As one of the key ingredients in our organic za'atar blend, thyme brings both taste and wellness to your table.

## Rich in Antioxidants

Organic thyme is loaded with antioxidants, including:
- **Vitamin C** - supports immune system function
- **Vitamin A** - promotes healthy vision and skin
- **Flavonoids** - help fight inflammation

## Natural Antimicrobial Properties

Studies have shown that thyme contains compounds like thymol and carvacrol that have natural antimicrobial properties, making it a traditional remedy for:
- Supporting respiratory health
- Promoting digestive wellness
- Natural preservation (which is why it's been used in cooking for centuries!)

## Why Choose Organic?

When you choose organic thyme like we use in our Basimo Blends za'atar:
- No synthetic pesticides or fertilizers
- Higher concentration of beneficial compounds
- Better for the environment
- Pure, clean flavor

## How to Incorporate More Thyme

- Sprinkle our za'atar blend on roasted vegetables
- Add to marinades for meat and fish
- Mix into olive oil for a healthy bread dip
- Season soups and stews

## The Basimo Blends Difference

Our organic thyme is carefully sourced and dried to preserve maximum flavor and nutritional value. Combined with our other premium organic ingredients, it creates a za'atar blend that's both delicious and nourishing.

*Ready to experience the benefits of organic thyme? Try our za'atar blend today!*`,
  },
  {
    slug: 'perfect-labneh-flatbread-recipe',
    title: "Mediterranean Labneh Flatbread with Za'atar",
    publishedAt: '2024-12-05T00:00:00Z',
    author: 'Basimo Blends',
    category: 'Recipes',
    tags: ['labneh', 'flatbread', 'mediterranean', 'zaatar', 'appetizer'],
    excerpt: "Create an authentic Mediterranean appetizer with creamy labneh, fresh vegetables, and our signature organic za'atar blend.",
    readTime: '6 min read',
    relatedProducts: ['zaatar-blend'],
    content: `# Mediterranean Labneh Flatbread with Za'atar

This beautiful flatbread combines creamy labneh cheese with fresh vegetables and our signature organic za'atar for an authentic Mediterranean experience that's perfect as an appetizer or light meal.

## Ingredients

### For the Flatbread:
- 4 pieces naan or pita bread
- 2 tbsp olive oil
- 1 tbsp Basimo Blends Organic Za'atar

### For the Topping:
- 1 cup labneh (or thick Greek yogurt)
- 1 cucumber, diced
- 1 cup cherry tomatoes, halved
- 1/4 red onion, thinly sliced
- 2 tbsp Basimo Blends Organic Za'atar
- Extra virgin olive oil for drizzling
- Fresh mint leaves
- Sea salt to taste

## Instructions

1. **Prepare the flatbread** by brushing with olive oil and sprinkling with za'atar. Toast in a 400°F oven for 5-7 minutes until crispy.

2. **Spread the labneh** generously over each warm flatbread.

3. **Add the vegetables** - arrange cucumber, tomatoes, and red onion over the labneh.

4. **Finish with za'atar** - sprinkle generously over the top.

5. **Drizzle with olive oil** and garnish with fresh mint leaves.

6. **Serve immediately** while the flatbread is still warm.

## Variations

- **Roasted Vegetable**: Add roasted bell peppers and eggplant
- **Protein Boost**: Top with grilled chicken or chickpeas
- **Seasonal**: Use seasonal vegetables like roasted butternut squash in fall

## About Labneh

Labneh is a Middle Eastern strained yogurt cheese that's incredibly creamy and tangy. If you can't find it, you can make your own by straining Greek yogurt overnight through cheesecloth.

## The Perfect Za'atar

Our organic za'atar blend adds the perfect finishing touch with its blend of thyme, sesame seeds, sumac, and other premium ingredients. The tangy, earthy flavor complements the creamy labneh beautifully.

*This recipe serves 4 as an appetizer or 2 as a light meal. Perfect for entertaining!*`,
  },
];

async function migratePosts() {
  console.log('Starting blog post migration to Sanity...\n');

  for (const post of blogPosts) {
    try {
      console.log(`Migrating: ${post.title}...`);

      const document = {
        _type: 'blogPost',
        title: post.title,
        slug: {
          _type: 'slug',
          current: post.slug,
        },
        author: post.author,
        publishedAt: post.publishedAt,
        category: post.category,
        tags: post.tags,
        excerpt: post.excerpt,
        content: post.content,
        readTime: post.readTime,
        relatedProducts: post.relatedProducts,
      };

      const result = await client.create(document);
      console.log(`✓ Created: ${result.title} (ID: ${result._id})\n`);
    } catch (error) {
      console.error(`✗ Error migrating ${post.title}:`, error.message, '\n');
    }
  }

  console.log('Migration complete!');
  console.log('\nNext steps:');
  console.log('1. Upload featured images through Sanity Studio');
  console.log('2. Visit https://basimoblends.sanity.studio to edit posts');
}

migratePosts();
