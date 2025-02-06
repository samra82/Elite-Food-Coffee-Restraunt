const foodSchema = {
  name: 'food',
  type: 'document',
  title: 'Food',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Food Name',
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description: 'A unique URL-friendly identifier for the food item.',
      options: {
        source: 'name',
        maxLength: 96,
      },
    },
    {
      name: 'category',
      type: 'string',
      title: 'Category',
      description: 'Category of the food item (e.g., Burger, Sandwich, Drink, etc.)',
    },
    {
      name: 'price',
      type: 'number',
      title: 'Current Price',
    },
    {
      name: 'originalPrice',
      type: 'number',
      title: 'Original Price',
      description: 'Price before discount (if any)',
    },
    {
      name: 'tags',
      type: 'array',
      title: 'Tags',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
      description: 'Tags for categorization (e.g., Best Seller, Popular, New)',
    },
    {
      name: 'image',
      type: 'image',
      title: 'Food Image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
      description: 'Short description of the food item',
    },
    {
      name: 'available',
      type: 'boolean',
      title: 'Available',
      description: 'Availability status of the food item',
    },
    {
      name: 'relatedProducts',
      type: 'array',
      title: 'Related Products',
      description: 'Reference to other food items that are related',
      of: [
        {
          type: 'reference',
          to: [{ type: 'food' }],
        },
      ],
    },
    {
      name: 'rating',
      type: 'number',
      title: 'Rating',
      description: 'Rating out of 5',
      validation: (Rule: RuleType) => Rule.min(0).max(5).precision(1),
    },
    {
      name: 'reviews',
      type: 'array',
      title: 'Reviews',
      description: 'User reviews for this food item',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'reviewer',
              type: 'string',
              title: 'Reviewer Name',
            },
            {
              name: 'comment',
              type: 'text',
              title: 'Comment',
              description: 'User review comment',
            },
            {
              name: 'rating',
              type: 'number',
              title: 'Rating',
              description: 'Rating given by the reviewer (out of 5)',
              validation: (Rule: RuleType) => Rule.min(0).max(5).precision(1),
            },
            {
              name: 'date',
              type: 'datetime',
              title: 'Date',
              description: 'Date of the review',
            },
          ],
      }]
    },
  ],
};

export default foodSchema;

type RuleType = {
  min: (arg: number) => RuleType;
  max: (arg: number) => RuleType;
  precision: (arg: number) => RuleType;
};
