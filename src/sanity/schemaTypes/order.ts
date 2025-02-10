const orderSchema = {
  name: "order",
  title: "Order",
  type: "document",
  fields: [
    {
      name: "firstName",
      title: "First Name",
      type: "string",
    },
    {
      name: "lastName",
      title: "Last Name",
      type: "string",
    },
    {
      name: "email",
      title: "Email",
      type: "string",
    },
    {
      name: "items",
      title: "Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", title: "Name", type: "string" },
            { name: "quantity", title: "Quantity", type: "number" },
            { name: "price", title: "Price", type: "number" },
            { name: "image", title: "Image", type: "string" },
          ],
        },
      ],
    },
    {
      name: "total",
      title: "Total",
      type: "number",
    },
    {
      name: "createdAt",
      title: "Created At",
      type: "datetime",
    },
  ],
};

export default orderSchema;
