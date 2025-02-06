// sanity/schemas/user.ts
const userSchema = {
  name: "user", // name of the schema
  title: "User", // title in the Sanity Studio
  type: "document", // document type
  fields: [
    {
      name: "name", // field name
      title: "Name", // field title (visible in the Sanity Studio)
      type: "string", // field type
      validation: (Rule: { required: () => { (): typeof Rule; new(): typeof Rule; min: { (arg0: number): typeof Rule; new(): typeof Rule; }; }; }) => Rule.required().min(3), // validation to require at least 3 characters
    },
    {
      name: "email", // field name
      title: "Email", // field title
      type: "string", // field type
      validation: (Rule: { required: () => { (): typeof Rule; new(): typeof Rule; email: { (): typeof Rule; new(): typeof Rule; }; }; }) => Rule.required().email(), // validation to require a valid email
    },
    {
      name: "profileImage", // field name
      title: "Profile Image", // field title
      type: "image", // field type for uploading an image
      options: {
        hotspot: true, // allows for image cropping
      },
    },
    {
      name: "createdAt", // field name
      title: "Created At", // field title
      type: "datetime", // field type for storing dates
      initialValue: () => new Date().toISOString(), // auto-populate the current date
    },
  ],
};

export default userSchema;
