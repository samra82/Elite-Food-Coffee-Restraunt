export default {
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
              { name: "name", type: "string" },
              { name: "quantity", type: "number" },
              { name: "price", type: "number" },
              { name: "image", type: "string" },
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