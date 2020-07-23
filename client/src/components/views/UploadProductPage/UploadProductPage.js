import React, { useState } from "react";
import { Typography, Button, Form, message, Input, Select, Icon } from "antd";
import FileUpload from "../../Utils/FileUploads";
import Axios from "axios";

const { Title } = Typography;
const { TextArea } = Input;

const Categories = [
  { key: 1, value: "Sneakers" },
  { key: 2, value: "T-shirts" },
  { key: 3, value: "Hoodie" },
  { key: 4, value: "Joggers" },
  { key: 5, value: "Hats" },
  { key: 6, value: "Bags" },
  { key: 7, value: "Glasses" },
  { key: 8, value: "Belts" },
];

function UploadProductPage(props) {
  const [TitleValue, setTitleValue] = useState("");
  const [DescriptionValue, setDescriptionValue] = useState("");
  const [PriceValue, setPriceValue] = useState(0);
  const [CategoriesValue, setCategoriesValue] = useState(1);

  const [Images, setImages] = useState([]);

  const onTitleChange = (event) => {
    setTitleValue(event.currentTarget.value);
  };

  const onDescriptionChange = (event) => {
    setDescriptionValue(event.currentTarget.value);
  };

  const onPriceChange = (event) => {
    setPriceValue(event.currentTarget.value);
  };

  const onCategoriesChange = (event) => {
    setCategoriesValue(event.currentTarget.value);
  };

  const updateImages = (newImages) => {
    setImages(newImages);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    if (
      !TitleValue ||
      !DescriptionValue ||
      !PriceValue ||
      !CategoriesValue ||
      !Images
    ) {
      return alert("fill all the fields first!");
    }

    const variables = {
      writer: props.user.userData._id,
      title: TitleValue,
      description: DescriptionValue,
      price: PriceValue,
      images: Images,
      categories: CategoriesValue,
    };

    Axios.post("/api/products/uploadProduct", variables).then((response) => {
      if (response.data.success) {
        alert("Product Successfully Uploaded");
        props.history.push("/");
      } else {
        alert("Failed to upload Product");
      }
    });
  };

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <Title level={2}>Upload Travel Product</Title>
      </div>

      <Form onSubmit={onSubmit}>
        {/* DropZone */}

        <FileUpload refreshFunction={updateImages} />

        <br />
        <br />
        <label>Title</label>
        <Input onChange={onTitleChange} value={TitleValue} />
        <br />
        <br />
        <label>Description</label>
        <TextArea onChange={onDescriptionChange} value={DescriptionValue} />
        <br />
        <br />
        <label>Price($)</label>

        <Input onChange={onPriceChange} value={PriceValue} type="number" />
        <br />
        <br />
        <label>Categories</label>
        <select onChange={onCategoriesChange} value={CategoriesValue}>
          {Categories.map((item) => (
            <option key={item.key} value={item.key}>
              {item.value}
            </option>
          ))}
        </select>
        <br />
        <br />

        <Button type="primary" onClick={onSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default UploadProductPage;
